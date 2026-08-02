import { spawn } from "node:child_process";
import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const openNextOutput = resolve(projectRoot, ".open-next");
const workerEntrypoint = resolve(openNextOutput, "worker.js");
const hostingManifest = resolve(projectRoot, ".openai", "hosting.json");
const sitesOutput = resolve(projectRoot, "dist");
const serverOutput = resolve(sitesOutput, "server");
const assetsOutput = resolve(sitesOutput, "assets");
const manifestDirectory = resolve(sitesOutput, ".openai");
const workerBundleOutput = resolve(openNextOutput, "sites-worker-bundle");
const wranglerCli = resolve(projectRoot, "node_modules", "wrangler", "bin", "wrangler.js");

function run(command, args) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { cwd: projectRoot, stdio: "inherit" });

    child.on("error", rejectRun);
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolveRun();
        return;
      }

      rejectRun(new Error(`Worker bundling failed${signal ? ` with signal ${signal}` : ` with exit code ${code}`}.`));
    });
  });
}

await stat(workerEntrypoint);
await stat(hostingManifest);
await rm(sitesOutput, { recursive: true, force: true });

// Sites expects its server entrypoint at dist/server/index.js. Keep the full
// OpenNext output beside it so all of the worker's relative imports still work.
await cp(openNextOutput, serverOutput, { recursive: true });
await cp(workerEntrypoint, resolve(serverOutput, "index.js"));

// OpenNext emits absolute build-machine paths for next/og's WebAssembly and
// font modules. Sites deploys only dist/, so make those imports portable within
// the copied server tree before it uploads the worker modules.
const handlerOutput = resolve(serverOutput, "server-functions", "default", "handler.mjs");
const handlerSource = await readFile(handlerOutput, "utf8");
const portableHandlerSource = handlerSource.replace(
  /(["'])(?:[A-Za-z]:)?[^"']*\/\.open-next\/server-functions\/default\/node_modules\/([^"']+)\1/g,
  '$1./node_modules/$2$1',
);

if (/(["'])(?:[A-Za-z]:)?[^"']*\/\.open-next\/server-functions\/default\/node_modules\//.test(portableHandlerSource)) {
  throw new Error("Unable to make all OpenNext node_modules imports portable.");
}

await writeFile(handlerOutput, portableHandlerSource);

// Static assets and the project manifest are discovered from the dist root.
await cp(resolve(openNextOutput, "assets"), assetsOutput, { recursive: true });
await mkdir(manifestDirectory, { recursive: true });
await cp(hostingManifest, resolve(manifestDirectory, "hosting.json"));

// Sites publishes the entrypoint without Wrangler's normal deploy-time bundle.
// Pre-bundle it so Node-compatible dependencies do not leave a global require()
// call in the ESM worker at runtime.
await rm(workerBundleOutput, { recursive: true, force: true });
await run(process.execPath, [
  wranglerCli,
  "deploy",
  resolve(serverOutput, "index.js"),
  "--dry-run",
  "--outdir",
  workerBundleOutput,
  "--name",
  "amrita-gautam-portfolio",
  "--compatibility-date",
  "2026-08-02",
  "--compatibility-flags",
  "nodejs_compat",
  "--assets",
  assetsOutput,
]);
await cp(resolve(workerBundleOutput, "index.js"), resolve(serverOutput, "index.js"));

console.log("Prepared the bundled Sites worker, static assets, and hosting manifest.");

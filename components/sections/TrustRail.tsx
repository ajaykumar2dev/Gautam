import { ClipboardCheck, FileCheck2, LockKeyhole, ShieldCheck } from "lucide-react";

const principles = [
  { title: "Accuracy", detail: "Careful, protocol-led work", icon: ClipboardCheck },
  { title: "Quality", detail: "Controls and completeness", icon: FileCheck2 },
  { title: "Safety", detail: "Responsible laboratory practice", icon: ShieldCheck },
  { title: "Confidentiality", detail: "Respect for private information", icon: LockKeyhole },
];

export function TrustRail() {
  return (
    <section aria-label="Professional principles" className="border-y border-line bg-surface">
      <div className="shell grid sm:grid-cols-2 lg:grid-cols-4">
        {principles.map(({ title, detail, icon: Icon }, index) => (
          <div key={title} className={`flex min-h-28 items-center gap-4 py-6 sm:px-6 ${index > 0 ? "border-t border-line sm:border-t-0" : ""} ${index > 1 ? "sm:border-t lg:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${index > 0 ? "lg:border-l" : ""}`}>
            <Icon className="h-5 w-5 shrink-0 text-medical-500" aria-hidden="true" />
            <div>
              <h2 className="font-bold text-ink">{title}</h2>
              <p className="mt-1 text-xs leading-5 text-muted">{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

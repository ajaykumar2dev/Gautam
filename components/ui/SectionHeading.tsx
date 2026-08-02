import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-4",
          align === "center" && "justify-center",
        )}
      >
        <span className="font-mono text-xs text-muted" aria-hidden="true">
          {index}
        </span>
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="section-title">{title}</h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

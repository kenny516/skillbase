interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow">{eyebrow}</span>
      <div className="flex flex-col gap-2">
        <h2 className="text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.1rem]">
          {title}
        </h2>
        <p className="max-w-[56ch] text-sm leading-7 text-[var(--foreground-soft)]">{description}</p>
      </div>
    </div>
  );
}

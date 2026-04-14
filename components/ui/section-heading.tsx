interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.24em] text-muted">{eyebrow}</span>
      <h2 className="text-xl font-medium tracking-[-0.04em] text-foreground sm:text-2xl">
        {title}
      </h2>
      <p className="max-w-xl text-sm leading-7 text-muted">{description}</p>
    </div>
  );
}

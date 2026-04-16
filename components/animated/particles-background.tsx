"use client";

type ParticlesBackgroundProps = {
  className?: string;
};

export function ParticlesBackground({ className = "" }: ParticlesBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          backgroundPosition: "0 0, 0 0",
        }}
      />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(139,92,246,0.16), transparent 18%), radial-gradient(circle at 75% 35%, rgba(99,102,241,0.1), transparent 16%), radial-gradient(circle at 55% 78%, rgba(139,92,246,0.12), transparent 20%)",
        }}
      />
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <div className="absolute inset-y-0 left-[-25%] w-[32%] animate-[particle-scan_16s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(139,92,246,0.08),transparent)] blur-xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.12),rgba(9,9,11,0.78))]" />
    </div>
  );
}

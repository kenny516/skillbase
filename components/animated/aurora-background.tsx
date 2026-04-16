"use client";

export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-[-12%] animate-[pulse_12s_ease-in-out_infinite] opacity-80">
        <div className="absolute left-[-8%] top-[-10%] h-[58%] w-[62%] rounded-full bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.26),transparent_72%)] blur-3xl" />
        <div className="absolute right-[-10%] top-[4%] h-[52%] w-[56%] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_72%)] blur-3xl" />
        <div className="absolute left-[18%] top-[20%] h-[62%] w-[52%] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_76%)] blur-3xl" />
        <div className="absolute bottom-[-10%] left-[8%] h-[46%] w-[64%] rounded-full bg-[radial-gradient(circle_at_center,rgba(91,33,182,0.18),transparent_74%)] blur-3xl" />
      </div>
      {/* darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,transparent_60%,#09090b_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09090b] to-transparent" />
    </div>
  );
}

export function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft top glow */}
      <div className="absolute left-1/2 top-[-20%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.28),rgba(139,92,246,0.08)_40%,transparent_70%)] blur-3xl" />

      {/* Conic accent halo */}
      <div className="absolute left-1/2 top-1/2 h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] [background:conic-gradient(from_180deg_at_50%_50%,#67e8f9_0deg,#8b5cf6_120deg,#f0abfc_240deg,#67e8f9_360deg)] rounded-full blur-[120px]" />

      {/* Faint perspective grid */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:900px]">
        <div
          className="absolute inset-0 origin-top [transform:rotateX(58deg)] opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 35%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 35%, transparent 95%)",
          }}
        />
      </div>

      {/* Concentric orbital rings (subtle) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[280, 440, 620].map((s) => (
          <div
            key={s}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/[0.07]"
            style={{ width: s, height: s, left: 0, top: 0 }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.85)_85%)]" />
    </div>
  );
}

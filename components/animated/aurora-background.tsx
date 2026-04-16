"use client";

import { Aurora } from "@appletosolutions/reactbits";

export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Aurora
        colorStops={["#1e0a3c", "#7c3aed", "#1d1160"]}
        amplitude={1.4}
        blend={0.55}
        speed={0.35}
      />
      {/* darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,transparent_60%,#09090b_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#09090b] to-transparent" />
    </div>
  );
}

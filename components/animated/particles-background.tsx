"use client";

import { Squares } from "@appletosolutions/reactbits";

type ParticlesBackgroundProps = {
  className?: string;
};

export function ParticlesBackground({ className = "" }: ParticlesBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-50">
        <Squares
          direction="diagonal"
          speed={0.25}
          squareSize={48}
          borderColor="rgba(255,255,255,0.05)"
          hoverFillColor="rgba(139,92,246,0.07)"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.12),rgba(9,9,11,0.78))]" />
    </div>
  );
}

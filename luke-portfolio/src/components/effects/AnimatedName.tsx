"use client";

import type { ReactNode } from "react";

type AnimatedNameProps = {
  children: ReactNode;
};

export default function AnimatedName({ children }: AnimatedNameProps) {
  return (
    <div className="relative inline-block overflow-hidden">
      {/* Text (below animation) */}
      <span className="relative z-10">{children}</span>

      {/* Blue sliding background (above text) */}
      <div className="name-reveal-bg absolute inset-0 z-20 bg-[#1E90FF]" />
    </div>
  );
}

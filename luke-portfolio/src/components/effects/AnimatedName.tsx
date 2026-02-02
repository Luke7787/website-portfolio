"use client";

import type { ReactNode } from "react";

type AnimatedNameProps = {
  children: ReactNode;
};

export default function AnimatedName({ children }: AnimatedNameProps) {
  return (
    <div className="relative inline-block overflow-hidden">
      {/* Blue sliding background */}
      <div className="name-reveal-bg absolute inset-0 z-10 bg-[#1E90FF]" />

      {/* Content comes from parent */}
      <span className="relative z-20">{children}</span>
    </div>
  );
}

"use client";

export default function AnimatedName() {
  return (
    <div className="relative inline-block overflow-hidden">
      {/* Blue sliding background */}
      <div className="name-reveal-bg absolute inset-0 z-10 bg-[#1E90FF]" />

      {/* Text */}
      <span className="relative z-20 text-3xl font-bold tracking-[3.2px] text-white/90">
        LUKE ZHUANG
      </span>
    </div>
  );
}

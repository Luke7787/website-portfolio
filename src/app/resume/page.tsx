import Link from "next/link";

export default function ResumePage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#141414]">
      {/* Full-screen PDF container */}
      <div className="relative flex-1 min-h-0 w-full">
        <iframe
          src="/ZhuangLukeResume.pdf#view=Fit"
          className="absolute inset-0 w-full h-full border-0"
          title="Luke Zhuang Resume"
        />
      </div>
      {/* Back link */}
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white/90 hover:bg-white/20 hover:text-white transition-colors text-sm font-medium"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

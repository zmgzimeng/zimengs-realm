import Image from "next/image";

export default function ProjectCard() {
  return (
    <div className="p-6 rounded-2xl bg-space-card border border-space-border shadow-[0_0_25px_rgba(9,8,45,0.8)] hover:border-space-cyan/50 transition-all group">
      {/* Cyan tech tag */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-space-cyan bg-space-cyan/10 px-2.5 py-1 rounded-full border border-space-cyan/20">
          // HOME_SYS
        </span>
        <span className="w-2 h-2 rounded-full bg-space-pink shadow-[0_0_8px_#ff8fab]" />
      </div>

      {/* Main heading in White with Myzar font */}
      <h3 className="font-display text-2xl text-space-text tracking-wide group-hover:text-space-cyan transition-colors">
        ZIMENG'S REALM
      </h3>

      {/* Description in Space Grotesk */}
      <p className="font-body text-slate-300 text-sm leading-relaxed mt-2">
        Welcome to Zimeng's Realm. Coming Soon™.
      </p>
      <Image
        src="/myzar.svg"
        alt="Zimeng's Realm Favicon"
        width={50}
        height={50}
      />
    </div>
  );
}

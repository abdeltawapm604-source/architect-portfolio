"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Terminal, ExternalLink } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: "ocean",      tag: "Engineering", name: "Ocean",           desc: "High-performance CRM dashboard for complex enterprise workflows.",         monogram: "OC", image: "/ocean-preview.png",  link: "https://gitgo-d4gr.vercel.app/#" },
  { id: "Xpremo",     tag: "Luxury",      name: "X Premo",         desc: "Cinematic luxury marketplace with high-contrast editorial UI.",             monogram: "XP", image: "/xpreom.png",         link: "https://xpremo.vercel.app/#" },
  { id: "at-store",   tag: "E-Commerce",  name: "AT Store",        desc: "Premium retail experience engineered for conversion and delight.",          monogram: "AT", image: "/at-store.png",       link: "https://at-store-zzmq.vercel.app/#" },
  { id: "best-rest",  tag: "Hospitality", name: "Best Restaurant", desc: "Immersive dining platform with real-time booking and menu management.",  monogram: "BR", image: "/bestest.png",        link: "https://footcap-iota.vercel.app/#" },
  { id: "bit-go",     tag: "Dev Tools",   name: "Bit & Go",        desc: "Developer productivity platform built for speed and team collaboration.", monogram: "BG", image: "/bitgo.png",          link: "https://gitgo-mu.vercel.app/#" },
  { id: "footcap",    tag: "Sports",      name: "Footcap",         desc: "Sports retail reimagined with immersive product discovery experiences.",  monogram: "FC", image: "/footcap.png",        link: "https://footcap-iota.vercel.app/#" },
  { id: "nazeel",     tag: "Systems",     name: "NAZEEL",           desc: "Scalable property management system with real-time data sync.",             monogram: "NZ", image: "/nazeel.png",         link: "https://nazeel-ffoq.vercel.app/" },
  { id: "bahja",      tag: "Bakery",      name: "Bahja",           desc: "Traditional bakery brand with modern digital architecture.",               monogram: "BS", image: "/bahja.png",          link: "https://693c5899ab780e310bb5b746--superlative-marshmallow-4ce72f.netlify.app/" },
  { id: "just-beans", tag: "Dev Tools",   name: "Just Beans",      desc: "Minimalist code sharing and snippet management utility for developers.",  monogram: "JB", image: "/beans.png",          link: "https://just-beans-agmk.vercel.app/#" },
];

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];

const TAG_COLORS: Record<string, { rgb: string; hex: string }> = {
  Engineering: { rgb: "59,130,246",  hex: "#3b82f6" },
  Luxury:      { rgb: "168,85,247",  hex: "#a855f7" },
  "E-Commerce":{ rgb: "245,158,11",  hex: "#f59e0b" },
  Hospitality: { rgb: "16,185,129",  hex: "#10b981" },
  "Dev Tools": { rgb: "6,182,212",   hex: "#06b6d4" },
  Sports:      { rgb: "239,68,68",   hex: "#ef4444" },
  Systems:     { rgb: "139,92,246",  hex: "#8b5cf6" },
  Bakery:      { rgb: "249,115,22",  hex: "#f97316" },
  All:         { rgb: "255,255,255", hex: "#ffffff" },
};

const easing = [0.16, 1, 0.3, 1] as const;

// ─── FEATURED CARD ─────────────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const accent = TAG_COLORS[project.tag] ?? TAG_COLORS["All"];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouse = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const spotBg = useTransform(
    [mouseX, mouseY] as any,
    ([x, y]: number[]) =>
      `radial-gradient(300px circle at ${x}px ${y}px, ${accent.hex}16, transparent 70%)`
  );

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.55, ease: easing }}
      onMouseMove={handleMouse}
      className="group relative w-full h-[350px] md:h-full rounded-2xl overflow-hidden bg-[#0c0c0c]"
      style={{ border: `1px solid rgba(${accent.rgb},0.18)` }}
    >
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: spotBg }}
      />
      <div className="absolute top-0 left-0 right-0 h-px z-20 pointer-events-none" style={{ background: `linear-gradient(90deg, transparent, ${accent.hex}90, transparent)` }} />

      <div className="absolute inset-0">
        {project.image ? (
          <Image src={project.image} alt={project.name} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-top transition-transform duration-[2s] group-hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[5rem] md:text-[9rem] font-black select-none opacity-10" style={{ color: accent.hex, fontFamily: "Impact, sans-serif" }}>
            {project.monogram}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {project.link && (
        <Link href={project.link} target="_blank" className="absolute inset-0 z-30" aria-label={`Visit ${project.name}`} />
      )}

      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 z-40 pointer-events-none flex flex-col gap-2 md:gap-3">
        <span className="self-start inline-flex items-center gap-1.5 font-mono text-[8px] md:text-[9px] tracking-[0.22em] uppercase px-3 py-1 rounded-full border" style={{ color: accent.hex, borderColor: `${accent.hex}45`, background: `${accent.hex}14` }}>
          <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: accent.hex }} />
          {project.tag}
        </span>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4">
          <div>
            <h3 className="text-white leading-none tracking-wide drop-shadow-xl" style={{ fontFamily: "Impact, 'Arial Narrow', sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.6rem)", fontWeight: 900 }}>
              {project.name}
            </h3>
            <p className="font-mono text-[10px] md:text-[10.5px] text-slate-400 leading-relaxed mt-1.5 max-w-[380px] line-clamp-2 md:line-clamp-none">
              {project.desc}
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} className="hidden md:flex flex-shrink-0 items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-[10px] tracking-[0.15em] uppercase pointer-events-auto cursor-pointer" style={{ borderColor: `${accent.hex}45`, background: `${accent.hex}14`, color: accent.hex }}>
            <ExternalLink size={12} /> Live Site
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── THUMBNAIL CARD ────────────────────────────────────────────────────────────
function ThumbCard({ project, isActive, onClick }: { project: (typeof PROJECTS)[0]; isActive: boolean; onClick: () => void; }) {
  const accent = TAG_COLORS[project.tag] ?? TAG_COLORS["All"];

  return (
    <motion.button
      layout
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="group relative w-[180px] lg:w-full rounded-xl overflow-hidden text-left flex-shrink-0 focus:outline-none h-[75px] md:h-[86px]"
      style={{
        border: isActive ? `1px solid ${accent.hex}55` : "1px solid rgba(255,255,255,0.07)",
        background: isActive ? `${accent.hex}0d` : "rgba(10,10,10,0.9)",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <div className="absolute inset-0">
        {project.image && <Image src={project.image} alt="" fill sizes="240px" className="object-cover object-top opacity-30" />}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
      </div>
      {isActive && <motion.div layoutId="activeBar" className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r z-20" style={{ background: accent.hex, boxShadow: `0 0 8px ${accent.hex}` }} />}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 gap-0.5">
        <span className="font-mono text-[7px] md:text-[8px] tracking-[0.2em] uppercase" style={{ color: isActive ? accent.hex : "#475569" }}>{project.tag}</span>
        <span className="font-black text-[12px] md:text-[14px] leading-snug tracking-wide text-white" style={{ fontFamily: "Impact, sans-serif" }}>{project.name}</span>
      </div>
    </motion.button>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  const filtered = useMemo(() => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter)), [filter]);
  const featured = filtered.find((p) => p.id === activeId) ?? filtered[0];
  const accent = TAG_COLORS[featured.tag] ?? TAG_COLORS["All"];

  useEffect(() => { setActiveId(filtered[0]?.id ?? PROJECTS[0].id); }, [filter]);

  return (
    <section id="projects" className="relative w-full bg-[#030303] overflow-hidden min-h-screen py-16 md:py-24" style={{ fontFamily: "'Courier New', monospace" }}>
      {/* Background Aura */}
      <AnimatePresence mode="wait"><motion.div key={accent.hex} className="absolute pointer-events-none opacity-20" style={{ top: "-10%", left: "-5%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, ${accent.hex} 0%, transparent 70%)`, filter: "blur(80px)" }} initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }} /></AnimatePresence>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-16 flex flex-col gap-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-[10px] tracking-widest uppercase"><Terminal size={12} /> ls ./deployments</div>
            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter" style={{ fontFamily: "Impact, sans-serif" }}>SELECTED <motion.span animate={{ color: accent.hex }}>WORKS</motion.span></h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className="px-3 py-1.5 rounded-full border text-[9px] font-mono tracking-widest uppercase transition-all" style={{ borderColor: filter === cat ? TAG_COLORS[cat]?.hex : "rgba(255,255,255,0.1)", color: filter === cat ? "#fff" : "#64748b", background: filter === cat ? TAG_COLORS[cat]?.hex + "20" : "transparent" }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4 h-auto lg:h-[550px]">
          <AnimatePresence mode="wait"><FeaturedCard key={featured.id} project={featured} /></AnimatePresence>
          
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 no-scrollbar snap-x">
            {filtered.map((p) => (
              <div key={p.id} className="snap-start"><ThumbCard project={p} isActive={p.id === activeId} onClick={() => setActiveId(p.id)} /></div>
            ))}
          </div>
        </div>

        {/* MOBILE LIVE BUTTON */}
        <div className="md:hidden">
          <Link href={featured.link} target="_blank" className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold uppercase tracking-widest text-[10px]" style={{ background: accent.hex, color: "#000" }}>
            Open Live Site <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      <style jsx global>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
}
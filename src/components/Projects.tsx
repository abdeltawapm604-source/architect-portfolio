"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Terminal, ExternalLink, ChevronRight } from "lucide-react";

// ... (بيانات المشاريع والألوان تبقى كما هي)
const PROJECTS = [
  { id: "ocean", tag: "Engineering", name: "Ocean", desc: "High-performance CRM dashboard for complex enterprise workflows.", monogram: "OC", image: "/ocean-preview.png", link: "https://gitgo-d4gr.vercel.app/#" },
  { id: "Xpremo", tag: "Luxury", name: "X Premo", desc: "Cinematic luxury marketplace with high-contrast editorial UI.", monogram: "XP", image: "/xpreom.png", link: "https://xpremo.vercel.app/#" },
  { id: "at-store", tag: "E-Commerce", name: "AT Store", desc: "Premium retail experience engineered for conversion and delight.", monogram: "AT", image: "/at-store.png", link: "https://at-store-zzmq.vercel.app/#" },
  { id: "best-rest", tag: "Hospitality", name: "Best Restaurant", desc: "Immersive dining platform with real-time booking and menu management.", monogram: "BR", image: "/bestest.png", link: "https://footcap-iota.vercel.app/#" },
  { id: "bit-go", tag: "Dev Tools", name: "Bit & Go", desc: "Developer productivity platform built for speed and team collaboration.", monogram: "BG", image: "/bitgo.png", link: "https://gitgo-mu.vercel.app/#" },
  { id: "footcap", tag: "Sports", name: "Footcap", desc: "Sports retail reimagined with immersive product discovery experiences.", monogram: "FC", image: "/footcap.png", link: "https://footcap-iota.vercel.app/#" },
  { id: "nazeel", tag: "Systems", name: "NAZEEL", desc: "Scalable property management system with real-time data sync.", monogram: "NZ", image: "/nazeel.png", link: "https://nazeel-ffoq.vercel.app/" },
  { id: "bahja", tag: "Bakery", name: "Bahja", desc: "Traditional bakery brand with modern digital architecture.", monogram: "BS", image: "/bahja.png", link: "https://693c5899ab780e310bb5b746--superlative-marshmallow-4ce72f.netlify.app/" },
  { id: "just-beans", tag: "Dev Tools", name: "Just Beans", desc: "Minimalist code sharing and snippet management utility for developers.", monogram: "JB", image: "/beans.png", link: "https://just-beans-agmk.vercel.app/#" },
];

const TAG_COLORS: Record<string, { rgb: string; hex: string }> = {
  Engineering: { rgb: "59,130,246", hex: "#3b82f6" },
  Luxury: { rgb: "168,85,247", hex: "#a855f7" },
  "E-Commerce": { rgb: "245,158,11", hex: "#f59e0b" },
  Hospitality: { rgb: "16,185,129", hex: "#10b981" },
  "Dev Tools": { rgb: "6,182,212", hex: "#06b6d4" },
  Sports: { rgb: "239,68,68", hex: "#ef4444" },
  Systems: { rgb: "139,92,246", hex: "#8b5cf6" },
  Bakery: { rgb: "249,115,22", hex: "#f97316" },
  All: { rgb: "255,255,255", hex: "#ffffff" },
};

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))];
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
      `radial-gradient(400px circle at ${x}px ${y}px, ${accent.hex}15, transparent 70%)`
  );

  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5, ease: easing }}
      onMouseMove={handleMouse}
      className="group relative w-full h-[400px] md:h-full rounded-3xl overflow-hidden bg-[#080808] border border-white/5"
      style={{ boxShadow: `0 0 40px -10px rgba(${accent.rgb}, 0.1)` }}
    >
      {/* Spotlight */}
      <motion.div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: spotBg }} />

      {/* Image Container - المحرك الأساسي لإظهار الصورة كاملة */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-12 pb-32 md:pb-40">
        {project.image ? (
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.name}
              fill
              priority
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        ) : (
          <div className="text-[10rem] font-black opacity-5 select-none" style={{ color: accent.hex }}>{project.monogram}</div>
        )}
      </div>

      {/* Shadow Overlay - متدرج فقط في الأسفل للحفاظ على وضوح الصورة في الأعلى */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 z-30 pointer-events-none">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/50 backdrop-blur-md mb-4 font-mono text-[10px] tracking-widest uppercase" style={{ color: accent.hex }}>
           <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent.hex }} />
           {project.tag}
        </span>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-white text-4xl md:text-6xl font-black tracking-tighter leading-none mb-3" style={{ fontFamily: "Impact, sans-serif" }}>
              {project.name}
            </h3>
            <p className="font-mono text-xs md:text-sm text-slate-400 leading-relaxed line-clamp-2 md:line-clamp-none">
              {project.desc}
            </p>
          </div>
          
          <Link href={project.link} target="_blank" className="pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
            Live Preview <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── THUMB_CARD ────────────────────────────────────────────────────────────────
function ThumbCard({ project, isActive, onClick }: { project: (typeof PROJECTS)[0], isActive: boolean, onClick: () => void }) {
  const accent = TAG_COLORS[project.tag] ?? TAG_COLORS["All"];

  return (
    <motion.button
      layout
      onClick={onClick}
      className={`group relative flex-none w-[200px] lg:w-full h-[90px] md:h-[100px] rounded-2xl overflow-hidden text-left transition-all duration-300 border ${
        isActive ? "border-white/20 bg-white/5" : "border-white/5 bg-[#0c0c0c] grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
      }`}
    >
      <div className="absolute inset-0 p-2 opacity-30">
         {project.image && <Image src={project.image} alt="" fill className="object-contain p-1" />}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
      
      <div className="relative z-20 h-full flex flex-col justify-center px-5">
        <span className="font-mono text-[8px] uppercase tracking-widest mb-1" style={{ color: isActive ? accent.hex : "#666" }}>{project.tag}</span>
        <span className="text-white font-bold text-sm md:text-base">{project.name}</span>
      </div>
      
      {isActive && (
        <motion.div layoutId="bar" className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full" style={{ background: accent.hex }} />
      )}
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
    <section id="projects" className="relative w-full min-h-screen bg-[#030303] text-white flex flex-col py-16 md:py-24">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ background: `radial-gradient(circle at 10% 10%, ${accent.hex}10 0%, transparent 50%)` }}
          className="absolute inset-0 transition-colors duration-1000"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-12 flex flex-col gap-10 h-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-500 font-mono text-xs tracking-widest uppercase">
              <Terminal size={16} /> ls ./work
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter" style={{ fontFamily: "Impact, sans-serif" }}>
              FEATURED <span className="text-white/20">PROJECTS</span>
            </h2>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest border transition-all ${
                  filter === cat ? "bg-white text-black border-white" : "border-white/10 text-slate-500 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Display Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 min-h-[500px] lg:min-h-[650px]">
          <AnimatePresence mode="wait">
            <FeaturedCard key={featured.id} project={featured} />
          </AnimatePresence>

          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-4 lg:pb-0 snap-x">
            {filtered.map((p) => (
              <div key={p.id} className="snap-start">
                <ThumbCard project={p} isActive={p.id === activeId} onClick={() => setActiveId(p.id)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
}
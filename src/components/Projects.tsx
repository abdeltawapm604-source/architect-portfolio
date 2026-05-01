"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Terminal, ExternalLink, ChevronRight, LayoutGrid } from "lucide-react";

// ─── DATA (المشاريع والألوان) ──────────────────────────────────────────────────
const PROJECTS = [
  { id: "ocean", tag: "Engineering", name: "Ocean", desc: "High-performance CRM dashboard for complex enterprise workflows.", monogram: "OC", image: "/ocean-preview.png", link: "#" },
  { id: "Xpremo", tag: "Luxury", name: "X Premo", desc: "Cinematic luxury marketplace with high-contrast editorial UI.", monogram: "XP", image: "/xpreom.png", link: "#" },
  { id: "at-store", tag: "E-Commerce", name: "AT Store", desc: "Premium retail experience engineered for conversion and delight.", monogram: "AT", image: "/at-store.png", link: "#" },
  { id: "best-rest", tag: "Hospitality", name: "Best Restaurant", desc: "Immersive dining platform with real-time management.", monogram: "BR", image: "/bestest.png", link: "#" },
  { id: "bit-go", tag: "Dev Tools", name: "Bit & Go", desc: "Developer productivity platform built for speed.", monogram: "BG", image: "/bitgo.png", link: "#" },
  { id: "footcap", tag: "Sports", name: "Footcap", desc: "Sports retail reimagined with immersive product discovery.", monogram: "FC", image: "/footcap.png", link: "#" },
  { id: "nazeel", tag: "Systems", name: "NAZEEL", desc: "Scalable property management system with real-time sync.", monogram: "NZ", image: "/nazeel.png", link: "#" },
  { id: "bahja", tag: "Bakery", name: "Bahja", desc: "Traditional bakery brand with modern digital architecture.", monogram: "BS", image: "/bahja.png", link: "#" },
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
  
  return (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: easing }}
      className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/5 md:border-white/10"
    >
      {/* Image Layer */}
      <div className="absolute inset-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            className="object-cover object-top opacity-60 md:opacity-80 transition-transform duration-[3s] group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[5rem] md:text-[9rem] font-black opacity-10" style={{ color: accent.hex }}>
            {project.monogram}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end gap-4 pointer-events-none">
        <span className="self-start inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md" style={{ color: accent.hex }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent.hex }} />
          {project.tag}
        </span>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-white font-black text-4xl md:text-6xl tracking-tight leading-none uppercase" style={{ fontFamily: "Impact, sans-serif" }}>
              {project.name}
            </h3>
            <p className="font-mono text-xs md:text-sm text-slate-400 max-w-sm leading-relaxed">
              {project.desc}
            </p>
          </div>

          <Link href={project.link} target="_blank" className="pointer-events-auto self-start md:self-auto flex items-center gap-3 px-6 py-3 rounded-2xl bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all active:scale-95 shadow-xl">
            View Live <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── THUMBNAIL (Mobile: Carousel Item / Desktop: Sidebar Item) ───────────────
function ThumbCard({ project, isActive, onClick }: { project: (typeof PROJECTS)[0], isActive: boolean, onClick: () => void }) {
  const accent = TAG_COLORS[project.tag] ?? TAG_COLORS["All"];
  
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex-none w-[140px] md:w-full h-[80px] md:h-[90px] rounded-2xl overflow-hidden transition-all duration-500 border ${
        isActive ? "border-white/20 ring-1" : "border-white/5 opacity-50"
      }`}
      style={{ ringColor: isActive ? accent.hex : "transparent" }}
    >
      {project.image && (
        <Image src={project.image} alt="" fill className="object-cover opacity-40" />
      )}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      
      <div className="absolute inset-0 p-3 flex flex-col justify-center gap-0.5 text-left">
        <span className="font-mono text-[7px] md:text-[8px] uppercase tracking-widest" style={{ color: accent.hex }}>{project.tag}</span>
        <span className="text-white font-bold text-xs md:text-sm truncate">{project.name}</span>
      </div>
      
      {isActive && (
        <motion.div layoutId="activeInd" className="absolute bottom-0 left-0 right-0 h-1" style={{ background: accent.hex }} />
      )}
    </motion.button>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter)), [filter]);
  const featured = filtered.find((p) => p.id === activeId) ?? filtered[0];

  useEffect(() => {
    setActiveId(filtered[0]?.id ?? PROJECTS[0].id);
  }, [filter]);

  return (
    <section id="projects" className="relative w-full h-screen md:h-auto md:min-h-screen bg-[#030303] overflow-hidden flex flex-col pt-16 md:pt-24">
      {/* Background Orbs (Mobile Optimized) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent opacity-50 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col h-full md:h-auto gap-6 md:gap-10 pb-8 md:pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-500 font-mono text-[10px] tracking-[0.4em] uppercase">
              <Terminal size={14} /> ls ./projects
            </div>
            <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter" style={{ fontFamily: "Impact, sans-serif" }}>
              SELECTED <span className="opacity-20 hover:opacity-100 transition-opacity">WORKS</span>
            </h2>
          </div>

          {/* Filter Pills (Scrollable on Mobile) */}
          <div className="flex overflow-x-auto gap-2 pb-2 w-full md:w-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`flex-none px-5 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest border transition-all ${
                  filter === cat ? "bg-white text-black border-white" : "text-slate-500 border-white/10 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interface */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 md:gap-8">
          
          {/* Featured Card (Top on mobile, Left on desktop) */}
          <div className="h-[50dvh] md:h-[600px] lg:h-[650px]">
            <AnimatePresence mode="wait">
              <FeaturedCard project={featured} />
            </AnimatePresence>
          </div>

          {/* Thumbnail Controls (Horizontal scroll on mobile, Vertical on desktop) */}
          <div className="relative">
            <div className="hidden lg:block mb-4 font-mono text-[10px] text-slate-600 uppercase tracking-[0.3em]">
              Directory (0{filtered.length})
            </div>
            
            <div 
              ref={scrollRef}
              className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar snap-x snap-mandatory lg:max-h-[600px] pb-4"
            >
              {filtered.map((project) => (
                <div key={project.id} className="snap-center">
                  <ThumbCard 
                    project={project} 
                    isActive={project.id === featured.id} 
                    onClick={() => setActiveId(project.id)} 
                  />
                </div>
              ))}
            </div>
            
            {/* Mobile Swipe Hint */}
            <div className="lg:hidden mt-2 text-center font-mono text-[8px] text-slate-700 uppercase tracking-widest animate-pulse">
              ← Swipe to navigate →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
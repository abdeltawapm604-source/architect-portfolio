"use client";

import {
  useState, useMemo, useEffect, useRef, useCallback,
} from "react";
import {
  motion, AnimatePresence, useMotionValue, useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Terminal, ExternalLink, ArrowRight } from "lucide-react";

const PROJECTS = [
  { id: "ocean",      tag: "Engineering", name: "Ocean",         year: "2024", desc: "High-performance CRM architecture for complex enterprise workflows.",        monogram: "OC", image: "/ocean-preview.png",  link: "https://gitgo-d4gr.vercel.app/#" },
  { id: "Xpremo",     tag: "Luxury",      name: "X Premo",       year: "2024", desc: "Scalable backend infrastructure for a high-traffic luxury marketplace.",         monogram: "XP", image: "/xpreom.png",         link: "https://xpremo.vercel.app/#" },
  { id: "at-store",   tag: "E-Commerce",  name: "AT Store",      year: "2024", desc: "Robust retail system engineered for secure and rapid transactions.",          monogram: "AT", image: "/at-store.png",       link: "https://at-store-zzmq.vercel.app/#" },
  { id: "best-rest",  tag: "Hospitality", name: "Best Rest",     year: "2023", desc: "Real-time dining management platform with synchronized booking algorithms.",  monogram: "BR", image: "/bestest.png",        link: "https://footcap-iota.vercel.app/#" },
  { id: "bit-go",     tag: "Dev Tools",   name: "Bit & Go",      year: "2024", desc: "Developer productivity tool utilizing optimized database queries.", monogram: "BG", image: "/bitgo.png",          link: "https://gitgo-mu.vercel.app/#" },
  { id: "footcap",    tag: "Sports",      name: "Footcap",       year: "2023", desc: "E-commerce platform backend serving high-volume sports retail traffic.",  monogram: "FC", image: "/footcap.png",        link: "https://footcap-iota.vercel.app/#" },
  { id: "nazeel",     tag: "Systems",     name: "NAZEEL",        year: "2023", desc: "Cloud-based property management system with real-time data sync.",            monogram: "NZ", image: "/nazeel.png",         link: "https://nazeel-ffoq.vercel.app/" },
  { id: "bahja",      tag: "Bakery",      name: "Bahja",         year: "2023", desc: "Digital infrastructure and ordering system for traditional retail.",              monogram: "BS", image: "/bahja.png",          link: "https://693c5899ab780e310bb5b746--superlative-marshmallow-4ce72f.netlify.app/" },
  { id: "just-beans", tag: "Dev Tools",   name: "Just Beans",    year: "2022", desc: "Code sharing utility built on lightweight microservices architecture.", monogram: "JB", image: "/beans.png",          link: "https://just-beans-agmk.vercel.app/#" },
] as const;

type Project = (typeof PROJECTS)[number];

const CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.tag)))] as string[];

const PALETTE: Record<string, { h: number; hex: string; rgb: string }> = {
  Engineering: { h: 217, hex: "#3b82f6", rgb: "59,130,246"  },
  Luxury:      { h: 280, hex: "#a855f7", rgb: "168,85,247"  },
  "E-Commerce":{ h: 38,  hex: "#f59e0b", rgb: "245,158,11"  },
  Hospitality: { h: 158, hex: "#10b981", rgb: "16,185,129"  },
  "Dev Tools": { h: 191, hex: "#06b6d4", rgb: "6,182,212"   },
  Sports:      { h: 0,   hex: "#ef4444", rgb: "239,68,68"   },
  Systems:     { h: 262, hex: "#8b5cf6", rgb: "139,92,246"  },
  Bakery:      { h: 25,  hex: "#f97316", rgb: "249,115,22"  },
  All:         { h: 220, hex: "#94a3b8", rgb: "148,163,184" },
};

const EASE = [0.16, 1, 0.3, 1] as const;

type Dot = {
  type?: "ring";
  x: number; y: number;
  vx?: number; vy?: number;
  r: number; maxR?: number;
  alpha: number; decay?: number;
  color: string; speed?: number; gravity?: number;
};

function useParticleBurst(canvasRef: React.RefObject<HTMLCanvasElement>) {
  const pool = useRef<Dot[]>([]);
  const raf  = useRef<number>(0);

  const fire = useCallback((cx: number, cy: number, hex: string) => {
    for (let i = 0; i < 55; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd   = 2.5 + Math.random() * 5.5;
      pool.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        r: Math.random() * 2.5 + 0.5,
        alpha: 1,
        color: hex,
        decay: 0.011 + Math.random() * 0.015,
        gravity: 0.07,
      });
    }
    for (let i = 0; i < 3; i++) {
      pool.current.push({
        type: "ring",
        x: cx, y: cy, r: 0,
        maxR: 70 + i * 55,
        alpha: 0.65 - i * 0.18,
        color: hex,
        speed: 4 + i * 2,
        decay: 0.016,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pool.current = pool.current.filter((p) => {
        if (p.type === "ring") {
          p.r += p.speed!;
          p.alpha -= p.decay!;
          if (p.alpha <= 0) return false;
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
          return true;
        }
        p.x += p.vx!; p.y += p.vy!;
        p.vy! += p.gravity!;
        p.vx! *= 0.98;
        p.alpha -= p.decay!;
        if (p.alpha <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [canvasRef]);

  return fire;
}

function AuroraBg({ hue }: { hue: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        key={hue}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          background: `radial-gradient(ellipse 80% 55% at 18% 12%, hsl(${hue},65%,11%) 0%, transparent 58%),
                       radial-gradient(ellipse 55% 40% at 82% 88%, hsl(${hue + 25},55%,8%) 0%, transparent 52%),
                       #020202`,
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          background: [
            `radial-gradient(ellipse 40% 30% at 50% 50%, hsl(${hue},50%,6%) 0%, transparent 70%)`,
            `radial-gradient(ellipse 45% 35% at 50% 50%, hsl(${hue},55%,9%) 0%, transparent 70%)`,
            `radial-gradient(ellipse 40% 30% at 50% 50%, hsl(${hue},50%,6%) 0%, transparent 70%)`,
          ],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)`,
          backgroundSize: "58px 58px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#020202_88%)]" />
    </div>
  );
}

function ScanTitle({ hex }: { hex: string }) {
  return (
    <div className="flex flex-col">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="font-black leading-[0.85] tracking-tight uppercase text-white"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
      >
        SYSTEMS
      </motion.h2>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className="font-black leading-[0.85] tracking-tight uppercase"
        style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          color: "transparent",
          WebkitTextStroke: `1.5px ${hex}`,
          transition: "-webkit-text-stroke-color 0.5s",
        }}
      >
        ARCHITECTURE.
      </motion.h2>
    </div>
  );
}

function Counter({ value, color }: { value: number; color: string }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current === value) return;
    let f = 0;
    const from = prev.current;
    const tick = () => {
      f++;
      const t = 1 - Math.pow(1 - f / 20, 3);
      setDisplay(Math.round(from + (value - from) * t));
      if (f < 20) requestAnimationFrame(tick);
      else { setDisplay(value); prev.current = value; }
    };
    requestAnimationFrame(tick);
  }, [value]);

  return (
    <span className="font-black text-[3.5rem] tracking-tighter" style={{ color, lineHeight: 0.9 }}>
      {String(display).padStart(2, "0")}
    </span>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const pal = PALETTE[project.tag] ?? PALETTE["All"];
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRX  = useSpring(rotX, { damping: 32, stiffness: 220 });
  const sRY  = useSpring(rotY, { damping: 32, stiffness: 220 });
  const ref  = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    rotX.set(((e.clientY - top)  / height - 0.5) * -10);
    rotY.set(((e.clientX - left) / width  - 0.5) *  10);
  };

  return (
    <motion.div
      key={project.id}
      ref={ref}
      initial={{ opacity: 0, scale: 0.96, filter: "blur(14px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
      transition={{ duration: 0.62, ease: EASE }}
      onMouseMove={onMove}
      onMouseLeave={() => { rotX.set(0); rotY.set(0); }}
      style={{
        rotateX: sRX, rotateY: sRY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className="group relative w-full h-full rounded-[2rem] overflow-hidden cursor-pointer select-none border border-white/5 bg-[#070707]"
    >
      <motion.div
        className="absolute inset-0 rounded-[2rem] pointer-events-none z-30"
        animate={{ boxShadow: `inset 0 0 0 1px rgba(${pal.rgb},0.15), 0 0 80px -20px rgba(${pal.rgb},0.3)` }}
        transition={{ duration: 0.5 }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {project.image && (
          <div className="absolute inset-0 p-8 pb-32 md:p-12 md:pb-40 pointer-events-none">
            <div className="relative w-full h-full">
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority
                className="object-contain transition-transform duration-[3s] ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#020202] via-[#020202]/90 to-transparent z-10 pointer-events-none" />
      </div>

      {project.link && (
        <Link href={project.link} target="_blank" className="absolute inset-0 z-40" aria-label={`Visit ${project.name}`} />
      )}

      <div className="absolute inset-x-0 bottom-0 z-50 px-8 pb-10 flex flex-col gap-4 pointer-events-none">
        <div className="flex items-center justify-between">
          <motion.span
            animate={{ color: pal.hex, borderColor: `${pal.hex}40`, background: `${pal.hex}10` }}
            className="px-4 py-2 rounded-full border text-[11px] font-bold tracking-[0.25em] uppercase"
          >
            {project.tag}
          </motion.span>
          <span className="text-[12px] font-medium tracking-[0.3em] text-white/40 uppercase">{project.year}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
          <div className="max-w-xl">
            <h3 className="text-white leading-tight tracking-tight font-black" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              {project.name}
            </h3>
            <p className="text-[14px] text-white/50 leading-relaxed mt-3 font-medium max-w-md">
              {project.desc}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05, backgroundColor: pal.hex, color: "#000" }}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl border font-bold text-[12px] tracking-widest uppercase transition-colors shrink-0"
            animate={{ borderColor: `${pal.hex}60`, color: pal.hex }}
          >
            <ExternalLink size={14} />
            Live Project
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ThumbCard({
  project, isActive, idx, onClick, fireBurst, sectionRef,
}: {
  project: Project;
  isActive: boolean;
  idx: number;
  onClick: () => void;
  fireBurst: (x: number, y: number, hex: string) => void;
  sectionRef: React.RefObject<HTMLElement>;
}) {
  const pal = PALETTE[project.tag] ?? PALETTE["All"];
  const btnRef = useRef<HTMLButtonElement>(null);

  const onEnter = () => {
    if (!btnRef.current || !sectionRef.current) return;
    const sr = sectionRef.current.getBoundingClientRect();
    const tr = btnRef.current.getBoundingClientRect();
    fireBurst(
      tr.left - sr.left + tr.width  / 2,
      tr.top  - sr.top  + tr.height / 2,
      pal.hex,
    );
  };

  return (
    <motion.button
      ref={btnRef}
      layout
      onClick={onClick}
      onMouseEnter={onEnter}
      whileHover={{ scale: 1.02, x: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group relative w-full text-left overflow-hidden rounded-2xl transition-all duration-500 shrink-0"
      style={{
        height: 115,
        background: isActive ? `rgba(${pal.rgb},0.12)` : "rgba(10,10,10,0.4)",
        border: `1px solid ${isActive ? `rgba(${pal.rgb},0.4)` : "rgba(255,255,255,0.05)"}`,
        boxShadow: isActive ? `0 20px 40px -15px rgba(${pal.rgb},0.2)` : "none",
      }}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#070707]">
        {project.image && (
          <div className="absolute inset-0 p-4 opacity-50">
            <div className="relative w-full h-full">
              <Image 
                src={project.image} 
                alt="" 
                fill 
                className="object-contain object-right"
                style={{ opacity: isActive ? 0.6 : 0.2, transform: isActive ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.8s' }} 
              />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/90 to-transparent pointer-events-none" />
      </div>

      {isActive && (
        <motion.div
          layoutId="thumbBar"
          className="absolute left-0 inset-y-0 w-1.5"
          style={{ background: pal.hex, boxShadow: `0 0 20px ${pal.hex}` }}
        />
      )}

      <div className="relative z-10 h-full flex flex-col justify-center px-7 gap-1.5">
        <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60"
          style={{ color: isActive ? pal.hex : "#888" }}>
          {project.tag}
        </span>
        <span className="text-[17px] font-black tracking-tight transition-colors duration-300"
          style={{ color: isActive ? "#fff" : "#555" }}>
          {project.name}
        </span>
      </div>

      <motion.div
        className="absolute right-6 bottom-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"
        animate={{ x: isActive ? 0 : 10 }}
      >
        <ArrowRight size={18} style={{ color: pal.hex }} />
      </motion.div>
    </motion.button>
  );
}

function FilterPill({ cat, active, onClick }: { cat: string; active: boolean; onClick: () => void }) {
  const pal = PALETTE[cat] ?? PALETTE["All"];
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="relative font-bold text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border transition-all duration-300"
      style={{
        borderColor: active ? `${pal.hex}60` : "rgba(255,255,255,0.08)",
        color: active ? "#fff" : "#666",
        background: active ? pal.hex : "transparent",
      }}
    >
      <span className="relative z-10">{cat}</span>
    </motion.button>
  );
}

export default function ProjectsSection() {
  const [filter,   setFilter]   = useState("All");
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const fireBurst  = useParticleBurst(canvasRef);
  const prevId     = useRef(activeId);

  const filtered = useMemo(
    () => (filter === "All" ? [...PROJECTS] : PROJECTS.filter((p) => p.tag === filter)),
    [filter]
  );

  const featured = filtered.find((p) => p.id === activeId) ?? filtered[0];
  const pal = PALETTE[featured.tag] ?? PALETTE["All"];

  useEffect(() => { setActiveId(filtered[0]?.id ?? PROJECTS[0].id); }, [filter]);

  useEffect(() => {
    if (prevId.current === activeId || !canvasRef.current) return;
    prevId.current = activeId;
    const cw = canvasRef.current.width;
    const ch = canvasRef.current.height;
    fireBurst(cw * 0.4, ch * 0.45, pal.hex);
  }, [activeId, fireBurst, pal.hex]);

  useEffect(() => {
    const resize = () => {
      if (!canvasRef.current || !sectionRef.current) return;
      canvasRef.current.width  = sectionRef.current.offsetWidth;
      canvasRef.current.height = sectionRef.current.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#020202] overflow-hidden flex flex-col justify-center min-h-screen py-16 md:py-24"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
      <AuroraBg hue={pal.h} />
      <canvas ref={canvasRef} className="absolute inset-0 z-[5] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col h-full gap-8 lg:gap-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
          <div className="flex flex-col gap-4">
            <motion.div className="flex items-center gap-3">
              <Terminal size={14} style={{ color: pal.hex }} />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase opacity-50">
                /root/projects/featured
              </span>
            </motion.div>

            <ScanTitle hex={pal.hex} />
            
            <p className="text-[15px] text-white/40 font-medium tracking-wide max-w-md leading-relaxed mt-2">
              Architecting robust backend systems and scalable digital infrastructure for high-performance environments.
            </p>
          </div>

          <div className="flex items-baseline gap-3">
            <motion.div animate={{ color: pal.hex }}>
              <Counter value={filtered.length} color={pal.hex} />
            </motion.div>
            <span className="text-[12px] font-black tracking-[0.4em] text-white/20 uppercase">Units</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          {CATEGORIES.map((cat) => (
            <FilterPill key={cat} cat={cat} active={filter === cat} onClick={() => setFilter(cat)} />
          ))}
        </div>

        <motion.div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 flex-1 min-h-[550px] lg:min-h-[650px]">
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <FeaturedCard key={featured.id} project={featured} />
            </AnimatePresence>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar h-full max-h-[650px]">
            <AnimatePresence>
              {filtered.map((p, i) => (
                <ThumbCard
                  key={p.id}
                  project={p}
                  isActive={p.id === featured.id}
                  idx={i}
                  onClick={() => setActiveId(p.id)}
                  fireBurst={fireBurst}
                  sectionRef={sectionRef}
                />
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex items-center justify-between border-t border-white/5 pt-6 shrink-0 mt-4">
          <div className="flex gap-2">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="h-1.5 rounded-full transition-all duration-500"
                style={{ 
                  width: p.id === featured.id ? 48 : 8, 
                  background: p.id === featured.id ? pal.hex : "rgba(255,255,255,0.1)" 
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase italic">
            Systems & Infrastructure — 2026
          </span>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
      `}</style>
    </section>
  );
}
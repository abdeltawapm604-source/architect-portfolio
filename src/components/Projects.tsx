"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Terminal, ExternalLink } from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: "ocean",      tag: "Engineering", name: "Ocean",           desc: "High-performance CRM dashboard for complex enterprise workflows.",        monogram: "OC", image: "/ocean-preview.png",  link: "https://gitgo-d4gr.vercel.app/#" },
  { id: "Xpremo",     tag: "Luxury",      name: "X Premo",         desc: "Cinematic luxury marketplace with high-contrast editorial UI.",            monogram: "XP", image: "/xpreom.png",         link: "https://xpremo.vercel.app/#" },
  { id: "at-store",   tag: "E-Commerce",  name: "AT Store",        desc: "Premium retail experience engineered for conversion and delight.",         monogram: "AT", image: "/at-store.png",       link: "https://at-store-zzmq.vercel.app/#" },
  { id: "best-rest",  tag: "Hospitality", name: "Best Restaurant", desc: "Immersive dining platform with real-time booking and menu management.",   monogram: "BR", image: "/bestest.png",        link: "https://footcap-iota.vercel.app/#" },
  { id: "bit-go",     tag: "Dev Tools",   name: "Bit & Go",        desc: "Developer productivity platform built for speed and team collaboration.", monogram: "BG", image: "/bitgo.png",          link: "https://gitgo-mu.vercel.app/#" },
  { id: "footcap",    tag: "Sports",      name: "Footcap",         desc: "Sports retail reimagined with immersive product discovery experiences.",  monogram: "FC", image: "/footcap.png",        link: "https://footcap-iota.vercel.app/#" },
  { id: "nazeel",     tag: "Systems",     name: "NAZEEL",          desc: "Scalable property management system with real-time data sync.",            monogram: "NZ", image: "/nazeel.png",         link: "https://nazeel-ffoq.vercel.app/" },
  { id: "bahja",      tag: "Bakery",      name: "Bahja",           desc: "Traditional bakery brand with modern digital architecture.",              monogram: "BS", image: "/bahja.png",          link: "https://693c5899ab780e310bb5b746--superlative-marshmallow-4ce72f.netlify.app/" },
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
      className="group relative w-full h-full rounded-2xl overflow-hidden bg-[#0c0c0c]"
      style={{ border: `1px solid rgba(${accent.rgb},0.18)` }}
    >
      {/* spotlight */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: spotBg }}
      />

      {/* top line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-20 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${accent.hex}90, transparent)` }}
      />

      {/* IMAGE — full, clear, object-cover from top */}
      <div className="absolute inset-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-top transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center text-[9rem] font-black select-none"
            style={{ color: `${accent.hex}10`, fontFamily: "Impact, sans-serif" }}
          >
            {project.monogram}
          </div>
        )}

        {/* Only bottom fade — image content stays visible */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* full-card link */}
      {project.link && (
        <Link href={project.link} target="_blank" className="absolute inset-0 z-30" aria-label={`Visit ${project.name}`} />
      )}

      {/* bottom info overlay */}
      <div className="absolute inset-x-0 bottom-0 p-7 z-40 pointer-events-none flex flex-col gap-3">
        {/* tag */}
        <span
          className="self-start inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.22em] uppercase px-3 py-1 rounded-full border"
          style={{
            color: accent.hex,
            borderColor: `${accent.hex}45`,
            background: `${accent.hex}14`,
          }}
        >
          <span className="w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background: accent.hex }} />
          {project.tag}
        </span>

        {/* name + CTA */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3
              className="text-white leading-none tracking-wide drop-shadow-lg"
              style={{
                fontFamily: "Impact, 'Arial Narrow', sans-serif",
                fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                fontWeight: 900,
              }}
            >
              {project.name}
            </h3>
            <p className="font-mono text-[10.5px] text-slate-400 leading-relaxed mt-1.5 max-w-[380px]">
              {project.desc}
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-[10px] tracking-[0.15em] uppercase pointer-events-auto cursor-pointer"
            style={{
              borderColor: `${accent.hex}45`,
              background: `${accent.hex}14`,
              color: accent.hex,
            }}
          >
            <ExternalLink size={12} />
            Live Site
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── THUMBNAIL CARD ────────────────────────────────────────────────────────────
function ThumbCard({
  project,
  isActive,
  onClick,
}: {
  project: (typeof PROJECTS)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const accent = TAG_COLORS[project.tag] ?? TAG_COLORS["All"];

  return (
    <motion.button
      layout
      onClick={onClick}
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.25, ease: easing }}
      className="group relative w-full rounded-xl overflow-hidden text-left flex-shrink-0 focus:outline-none"
      style={{
        height: 86,
        border: isActive ? `1px solid ${accent.hex}55` : "1px solid rgba(255,255,255,0.07)",
        background: isActive ? `${accent.hex}0d` : "rgba(10,10,10,0.9)",
        boxShadow: isActive ? `0 0 18px ${accent.hex}18` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s, background 0.3s",
      }}
    >
      {/* thumbnail image */}
      <div className="absolute inset-0">
        {project.image && (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="240px"
            className="object-cover object-top transition-opacity duration-500"
            style={{ opacity: isActive ? 0.55 : 0.35 }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      </div>

      {/* active left border */}
      {isActive && (
        <motion.div
          layoutId="activeBar"
          className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r"
          style={{ background: accent.hex, boxShadow: `0 0 8px ${accent.hex}` }}
        />
      )}

      <div className="relative z-10 h-full flex flex-col justify-center px-4 gap-0.5">
        <span
          className="font-mono text-[8px] tracking-[0.2em] uppercase transition-colors duration-300"
          style={{ color: isActive ? accent.hex : "#475569" }}
        >
          {project.tag}
        </span>
        <span
          className="font-black text-[14px] leading-snug tracking-wide transition-colors duration-300"
          style={{
            fontFamily: "Impact, 'Arial Narrow', sans-serif",
            color: isActive ? "#fff" : "#64748b",
          }}
        >
          {project.name}
        </span>
      </div>

      {/* hover arrow */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ExternalLink size={12} style={{ color: accent.hex }} />
      </div>
    </motion.button>
  );
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  const filtered = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter)),
    [filter]
  );

  const featured = filtered.find((p) => p.id === activeId) ?? filtered[0];
  const accent = TAG_COLORS[featured.tag] ?? TAG_COLORS["All"];

  useEffect(() => {
    setActiveId(filtered[0]?.id ?? PROJECTS[0].id);
  }, [filter]);

  // keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const idx = filtered.findIndex((p) => p.id === featured.id);
      if (e.key === "ArrowDown" && idx < filtered.length - 1) setActiveId(filtered[idx + 1].id);
      if (e.key === "ArrowUp" && idx > 0) setActiveId(filtered[idx - 1].id);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [filtered, featured]);

  return (
    <section
      id="projects"
      className="relative w-full bg-[#030303] overflow-hidden"
      style={{ minHeight: "100vh", fontFamily: "'Courier New', monospace" }}
    >
      {/* ambient glow — changes with active project */}
      <AnimatePresence>
        <motion.div
          key={accent.hex}
          className="absolute pointer-events-none"
          style={{
            top: "-15%", left: "-10%",
            width: "55vw", height: "55vw",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${accent.hex}10 0%, transparent 65%)`,
            filter: "blur(70px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 md:pt-24 pb-14 flex flex-col gap-8">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easing }}
              className="flex items-center gap-2.5 mb-4"
            >
              <Terminal size={12} style={{ color: accent.hex }} />
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{ color: accent.hex }}>
                ls ./deployments
              </span>
              <motion.div
                className="h-px w-16 origin-left"
                style={{ background: `linear-gradient(90deg,${accent.hex}60,transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: easing }}
                className="leading-none"
                style={{
                  fontFamily: "Impact,'Arial Narrow',sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(2.6rem,5.5vw,4.2rem)",
                  letterSpacing: "0.06em",
                  color: "#fff",
                }}
              >
                SELECTED{" "}
                <motion.span animate={{ color: accent.hex }} transition={{ duration: 0.5 }}>
                  WORKS
                </motion.span>
                <span style={{ color: "rgba(255,255,255,0.15)" }}>.</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="mt-2 text-[11px] text-slate-500 leading-relaxed max-w-[280px]"
            >
              A curated portfolio of digital products — engineering meets refined aesthetics.
            </motion.p>
          </div>

          {/* counter */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex items-baseline gap-2 self-start md:self-auto"
          >
            <motion.span
              animate={{ color: accent.hex }}
              transition={{ duration: 0.5 }}
              style={{ fontFamily: "Impact, sans-serif", fontSize: "3rem", fontWeight: 900, lineHeight: 1 }}
            >
              {String(filtered.length).padStart(2, "0")}
            </motion.span>
            <span className="font-mono text-[9px] tracking-[0.25em] text-slate-600 uppercase">Projects</span>
          </motion.div>
        </div>

        {/* ── FILTER PILLS ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="flex flex-wrap gap-2"
        >
          {CATEGORIES.map((cat) => {
            const catAccent = TAG_COLORS[cat] ?? TAG_COLORS["All"];
            const isActive = filter === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="relative font-mono text-[9px] tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full border overflow-hidden"
                style={{
                  borderColor: isActive ? `${catAccent.hex}55` : "rgba(255,255,255,0.1)",
                  color: isActive ? catAccent.hex : "#475569",
                  background: isActive ? `${catAccent.hex}10` : "rgba(8,8,8,0.9)",
                  boxShadow: isActive ? `0 0 14px ${catAccent.hex}18` : "none",
                  transition: "all 0.3s",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${catAccent.hex}07` }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── MAIN: featured left + thumbs right ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-3"
          style={{ height: "clamp(400px, 56vh, 620px)" }}
        >
          {/* featured image card */}
          <AnimatePresence mode="wait">
            <FeaturedCard key={featured.id} project={featured} />
          </AnimatePresence>

          {/* thumbnail stack */}
          <div
            className="flex flex-col gap-2 overflow-y-auto pr-0.5"
            style={{ scrollbarWidth: "none" }}
          >
            {filtered.map((project) => (
              <ThumbCard
                key={project.id}
                project={project}
                isActive={project.id === featured.id}
                onClick={() => setActiveId(project.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── FOOTER BAR ── */}
        <div className="flex items-center justify-between pt-1">
          {/* progress dots */}
          <div className="flex items-center gap-2">
            {filtered.map((p) => (
              <motion.button
                key={p.id}
                onClick={() => setActiveId(p.id)}
                animate={{
                  width: p.id === featured.id ? 22 : 6,
                  background: p.id === featured.id ? accent.hex : "rgba(255,255,255,0.14)",
                  opacity: p.id === featured.id ? 1 : 0.45,
                }}
                transition={{ duration: 0.4 }}
                className="h-[3px] rounded-full"
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="font-mono text-[8px] tracking-[0.3em] text-slate-700 uppercase">
              ↑ ↓ navigate
            </span>
            <div className="w-px h-3.5 bg-white/10" />
            <motion.span
              animate={{ color: accent.hex }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[9px] tracking-[0.2em] uppercase"
            >
              {featured.name}
            </motion.span>
            <div className="w-px h-3.5 bg-white/10" />
            <Link
              href={featured.link ?? "#"}
              target="_blank"
              className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] uppercase text-slate-600 hover:text-slate-300 transition-colors duration-300"
            >
              <ExternalLink size={10} />
              Live Preview
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

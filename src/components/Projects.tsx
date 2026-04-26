"use client";
import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import Reveal from "./Reveal";
import Link from "next/link";

const PROJECTS = [
  {
    id: "mastery",
    tag: "Corporate Ecosystem",
    name: "Mastery Group",
    desc: "Complete digital presence and brand system for an elite software and consulting firm — engineered for enterprise scalability.",
    monogram: "MG",
    image: "/mastery-group.jpeg",
    color: "#C9A227",
    bg: "linear-gradient(135deg, #1a170c, #0e0c06)",
    tech: ["System Design", "React", "Next.js"],
    link: "", // ← أضف اللينك هنا
  },
  {
    id: "bahja",
    tag: "E-Commerce Experience",
    name: "Bahja Sweets",
    desc: "A premium digital storefront for an authentic Arabic bakery — seamlessly blending traditional aesthetics with modern web architecture.",
    monogram: "BS",
    image: "/bahja.png",
    color: "#C88A60",
    bg: "linear-gradient(135deg, #17120e, #0c0805)",
    tech: ["React.js", "Tailwind CSS", "Firebase"],
    link: "https://693c5899ab780e310bb5b746--superlative-marshmallow-4ce72f.netlify.app/",
  },
  {
    id: "nazeel",
    tag: "Luxury Inventory",
    name: "NAZEEL",
    desc: "A scalable, high-performance property management platform engineered for seamless reservations, real-time sync, and operational excellence.",
    monogram: "NZ",
    image: "/nazeel.png",
    color: "#64748B",
    bg: "linear-gradient(135deg, #10141a, #0a0c10)",
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    link: "https://nazeel-ffoq.vercel.app/", 
  },
  {
    id: "just-beans",
    tag: "Interactive Web",
    name: "Just Beans",
    desc: "A minimalist, fast-paced code and text sharing utility designed for developers who value speed and clean architecture.",
    monogram: "JB",
    image: "/beans.png",
    color: "#38bdf8",
    bg: "linear-gradient(135deg, #081217, #04090c)",
    tech: ["JavaScript", "CSS", "HTML"],
    link: "", // ← أضف اللينك هنا
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(((clientX - left) / width) * 100);
    mouseY.set(((clientY - top) / height) * 100);
  }

  const glowBg = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, ${project.color}15, transparent 65%)`;
  const hasLink = Boolean(project.link);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.13, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col border border-white/[0.07] bg-[#0c0c0c] overflow-hidden
        transition-[border-color] duration-500 hover:border-white/[0.18]
        ${hasLink ? "cursor-pointer" : "cursor-default"}`}
    >
      {/* ── كارت كله clickable لو فيه لينك ── */}
      {hasLink && (
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-30"
          aria-label={`View ${project.name} live project`}
        />
      )}

      {/* mouse glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        style={{ background: glowBg }}
      />

      {/* corner accents */}
      {(["top-2 left-2 border-t border-l", "bottom-2 right-2 border-b border-r"] as const).map(
        (pos, i) => (
          <span
            key={i}
            className={`absolute w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-500 z-10 ${pos}`}
            style={{ borderColor: project.color }}
          />
        )
      )}

      {/* scan line */}
      <span className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent -top-full group-hover:animate-scan z-10 pointer-events-none" />

      {/* bottom progress bar */}
      <span
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-out z-10 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${project.color}50, ${project.color})`,
        }}
      />

      {/* ── Image area ── */}
      <div
        className="relative overflow-hidden flex-shrink-0 border-b border-white/[0.06] h-[220px] md:h-[260px]"
        style={{ background: project.bg }}
      >
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 z-[1]" />

        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-45 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0 z-0"
          />
        ) : (
          <span
            className="absolute inset-0 flex items-center justify-center font-bebas text-[80px] tracking-[0.15em] opacity-[0.08] group-hover:opacity-[0.2] group-hover:scale-110 transition-all duration-700 z-0"
            style={{ color: project.color }}
            aria-hidden="true"
          >
            {project.monogram}
          </span>
        )}

        {/* live badge — بيظهر لو فيه لينك */}
        {hasLink && (
          <span
            className="absolute top-3 right-3 z-20 font-mono text-[8px] tracking-[0.2em] uppercase px-[9px] py-[5px] border opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              borderColor: `${project.color}55`,
              color: project.color,
              background: `${project.color}0d`,
            }}
          >
            View Live ↗
          </span>
        )}

        {/* coming soon badge */}
        {!hasLink && (
          <span className="absolute top-3 right-3 z-20 font-mono text-[8px] tracking-[0.2em] uppercase px-[9px] py-[5px] border border-white/[0.08] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            Coming Soon
          </span>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="p-6 md:p-8 flex flex-col justify-between relative z-[2] flex-1">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span
              className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] uppercase"
              style={{ color: project.color }}
            >
              {project.tag}
            </span>
            <span className="font-mono text-[9px] md:text-[10px] tracking-widest text-white/30">
              PRJ-0{index + 1}
            </span>
          </div>

          <h3 className="font-syne font-bold text-white/90 tracking-wide mb-3 text-[20px] md:text-[23px] leading-[1.2] group-hover:text-white transition-colors duration-400">
            {project.name}
          </h3>

          <p className="font-mono text-[11px] md:text-[12px] text-white/38 leading-[1.8] mb-6">
            {project.desc}
          </p>
        </div>

        {/* footer */}
        <div className="border-t border-white/[0.07] group-hover:border-white/[0.12] pt-5 mt-auto transition-colors duration-400 flex items-center justify-between gap-3">
          {/* tech pills */}
          <div className="flex gap-[6px] flex-wrap">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] uppercase px-[9px] py-[5px] border border-white/[0.07] text-white/38 transition-all duration-400 group-hover:border-white/[0.13] group-hover:text-white/65 group-hover:bg-white/[0.02]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* arrow — بيتدوّر لو فيه لينك */}
          <div
            className={`w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500
              ${hasLink
                ? "border-white/10 group-hover:border-white/25 group-hover:bg-white/[0.05] group-hover:-rotate-45"
                : "border-white/[0.05] opacity-30"
              }`}
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={project.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 lg:py-32 px-5 md:px-12 lg:px-16 bg-[#080808] overflow-hidden border-b border-white/[0.06]"
    >
      {/* dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#2C2926_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />

      {/* header */}
      <Reveal className="flex items-center gap-[14px] mb-12 md:mb-20 relative z-10">
        <span className="font-mono text-[10px] text-[#C9A227] tracking-[0.25em]">03</span>
        <div className="h-px w-12 bg-gradient-to-r from-[#C9A227]/50 to-transparent" />
        <h2 className="font-bebas text-[36px] md:text-5xl tracking-[0.18em] text-white leading-none">
          Featured Case Studies
        </h2>
      </Reveal>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-7xl mx-auto relative z-10">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

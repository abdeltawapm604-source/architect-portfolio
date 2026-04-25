"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const TECH = [
  { name: "JavaScript", label: "JS", color: "#f7df1e", glow: "rgba(247,223,30,0.12)" },
  { name: "React", label: "⚛", color: "#61dafb", glow: "rgba(97,218,251,0.12)" },
  { name: "Node.js", label: "⬡", color: "#68a063", glow: "rgba(104,160,99,0.12)" },
  { name: "Firebase", label: "🔥", color: "#ffca28", glow: "rgba(255,202,40,0.12)" },
  { name: "TypeScript", label: "TS", color: "#3178c6", glow: "rgba(49,120,198,0.12)" },
  { name: "Next.js", label: "▲", color: "#e8edf5", glow: "rgba(232,237,245,0.06)" },
  { name: "Electron", label: "⚡", color: "#9feaf9", glow: "rgba(159,234,249,0.1)" },
];

export default function TechStack() {
  return (
    <section id="tech" className="relative py-32 px-16 bg-bg overflow-hidden">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <Reveal className="flex items-center gap-5 mb-16 relative z-10">
        <span className="font-mono text-[0.6rem] text-accent tracking-widest">02</span>
        <div className="h-px w-16 bg-gradient-to-r from-border to-transparent" />
        <h2 className="font-bebas text-5xl tracking-widest">My Tech Stack</h2>
      </Reveal>

      <div className="grid grid-cols-4 gap-4 relative z-10 max-w-4xl">
        {TECH.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative clip-sm border border-border bg-surface p-6 text-center cursor-default overflow-hidden"
            style={{ "--glow": tech.glow } as React.CSSProperties}
          >
            {/* Hover glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(ellipse at center, ${tech.glow} 0%, transparent 70%)` }}
            />

            {/* Icon */}
            <div
              className="font-bebas text-3xl mb-3 transition-all duration-300 group-hover:scale-110"
              style={{ color: tech.color, filter: `drop-shadow(0 0 8px ${tech.color}60)` }}
            >
              {tech.label}
            </div>

            {/* Name */}
            <div className="font-mono text-[0.6rem] tracking-widest uppercase text-muted group-hover:text-white transition-colors duration-300">
              {tech.name}
            </div>

            {/* Bottom dot */}
            <motion.div
              className="mx-auto mt-3 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: tech.color }}
            />

            {/* Border glow on hover */}
            <motion.div
              className="absolute inset-0 clip-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ border: `1px solid ${tech.color}40` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

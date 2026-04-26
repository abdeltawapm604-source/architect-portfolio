"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const TECH = [
  { name: "JavaScript", label: "JS", color: "#f7df1e", glow: "rgba(247,223,30,0.08)" },
  { name: "React", label: "⚛", color: "#61dafb", glow: "rgba(97,218,251,0.08)" },
  { name: "TypeScript", label: "TS", color: "#3178c6", glow: "rgba(49,120,198,0.08)" },
  { name: "Next.js", label: "▲", color: "#ffffff", glow: "rgba(255,255,255,0.04)" },
  { name: "Tailwind", label: "TW", color: "#38bdf8", glow: "rgba(56,189,248,0.08)" },
  { name: "CSS3", label: "#", color: "#264de4", glow: "rgba(38,77,228,0.08)" },
];

export default function TechStack() {
  return (
    <section id="tech" className="relative py-24 lg:py-40 px-6 md:px-12 lg:px-16 bg-surface overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <Reveal className="flex items-center gap-6 mb-20 relative z-10">
        <span className="font-mono text-[0.65rem] text-accent tracking-[0.4em] font-bold">02</span>
        <div className="h-px w-20 bg-gradient-to-r from-accent/40 via-accent/10 to-transparent" />
        <h2 className="font-bebas text-5xl md:text-6xl tracking-[0.15em] text-white">Tech Stack</h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 relative z-10 w-full max-w-7xl mx-auto">
        {TECH.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: i * 0.05, 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            whileHover={{ y: -5 }}
            className="group relative border border-border/50 bg-[#0c0c0c]/50 backdrop-blur-xl p-8 lg:p-10 flex flex-col items-center justify-center transition-all duration-500"
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${tech.glow} 0%, transparent 80%)` }}
            />

            <div
              className="font-bebas text-4xl mb-4 transition-transform duration-500 group-hover:scale-110 z-10"
              style={{ 
                color: tech.color, 
                filter: `drop-shadow(0 0 12px ${tech.color}40)` 
              }}
            >
              {tech.label}
            </div>

            <div className="font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.2em] uppercase text-muted group-hover:text-white transition-colors duration-300 z-10">
              {tech.name}
            </div>

            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 group-hover:w-1/2 transition-all duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)` }}
            />

            <div className="absolute inset-0 border border-white/0 group-hover:border-white/5 transition-colors duration-500 pointer-events-none" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
"use client";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiGithub
} from "react-icons/si";

const TECH = [
  { name: "JavaScript", Icon: SiJavascript, color: "#f7df1e", glow: "rgba(247,223,30,0.15)" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178c6", glow: "rgba(49,120,198,0.15)" },
  { name: "React", Icon: SiReact, color: "#61dafb", glow: "rgba(97,218,251,0.15)" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff", glow: "rgba(255,255,255,0.1)" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#38bdf8", glow: "rgba(56,189,248,0.15)" },
  { name: "Git", Icon: SiGit, color: "#f05032", glow: "rgba(240,80,50,0.15)" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff", glow: "rgba(255,255,255,0.1)" },
];

export default function TechStack() {
  return (
    <section id="tech" className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 bg-[#020202] overflow-hidden border-b border-white/5">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
      />
      
      <Reveal className="flex items-center gap-6 mb-16 relative z-10 max-w-6xl mx-auto">
        <span className="font-mono text-[0.65rem] text-cyan-400 tracking-[0.4em] font-bold">02</span>
        <div className="h-px w-20 bg-gradient-to-r from-cyan-400/40 via-cyan-400/10 to-transparent" />
        <h2 className="font-sans font-black text-4xl md:text-5xl tracking-tighter text-white">Tech Stack.</h2>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 w-full max-w-6xl mx-auto">
        {TECH.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(5px)" }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: i * 0.05, 
              duration: 0.6, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-10 flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] shadow-lg hover:shadow-2xl"
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(circle at center, ${tech.glow} 0%, transparent 70%)` }}
            />

            <div
              className="mb-5 transition-transform duration-500 group-hover:scale-110 z-10"
              style={{ 
                color: tech.color, 
                filter: `drop-shadow(0 0 16px ${tech.color}40)` 
              }}
            >
              <tech.Icon className="w-12 h-12 lg:w-14 lg:h-14" />
            </div>

            <div className="font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.25em] uppercase text-slate-500 group-hover:text-white transition-colors duration-300 z-10">
              {tech.name}
            </div>

            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
              style={{ background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const REPORT = [
  { id: "01", title: "Enterprise Architecture", desc: "Building scalable, production-ready systems across web and mobile." },
  { id: "02", title: "AI-Powered Interfaces", desc: "Deep integration of LLMs and AI models into seamless user experiences." },
  { id: "03", title: "Cross-Platform Mastery", desc: "React Native & Flutter — unified logic, flawless native performance." },
  { id: "04", title: "Technical Leadership", desc: "Driving innovation and leading engineering development at Mastery Group." },
];

const TAGS = ["System Architecture", "Next.js", "React Native", "Flutter", "AI Integration", "Performance"];

export default function About() {
  const ref = useRef(null);
  
  // Parallax for the huge background text
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "5%"]);
  // زودنا الـ opacity سنة بسيطة عشان تظهر أحلى
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0]);

  return (
    <section id="about" ref={ref} className="relative py-20 lg:py-32 px-6 md:px-12 lg:px-16 bg-surface border-y border-border overflow-hidden">
      
      {/* Cinematic Background Text (Responsive Clamp) */}
      <motion.div
        style={{ x, opacity }}
        className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none select-none z-0 mix-blend-overlay"
      >
        <span className="font-bebas text-[clamp(5rem,18vw,16rem)] text-white whitespace-nowrap tracking-widest">
          THE ARCHITECT
        </span>
      </motion.div>

      {/* Section Header */}
      <Reveal className="relative z-10 flex items-center gap-4 md:gap-5 mb-12 md:mb-20">
        <span className="font-mono text-[0.6rem] md:text-[0.65rem] text-accent tracking-[0.3em]">01</span>
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-accent/50 to-transparent" />
        <h2 className="font-bebas text-4xl md:text-5xl tracking-widest text-white">About Me</h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start relative z-10">
        
        {/* Left: Typography & Story */}
        <div className="max-w-xl">
          <Reveal delay={0.1}>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-6 font-syne">
              I am <strong className="text-white font-medium">Abdeltawap Tarek El-Tawil</strong>, a Software Engineer at Mastery Group. I specialize in transforming complex business logic into elegant, high-performance digital solutions.
            </p>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-6 font-syne">
              My engineering philosophy revolves around building <strong className="text-white font-medium">scalable architectures</strong> and integrating <strong className="text-white font-medium">intelligent AI systems</strong>. I don't just write code; I architect systems that drive business growth and user engagement.
            </p>
          </Reveal>
          
          <Reveal delay={0.3}>
            <p className="text-muted text-base md:text-lg leading-relaxed mb-10 font-syne">
              From crafting seamless cross-platform applications to leading developer teams, I ensure precision, purpose, and craft in every layer of the stack.
            </p>
          </Reveal>
          
          {/* Tags / Skills */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ 
                    borderColor: "rgba(200,138,96,0.5)", 
                    color: "#C88A60", 
                    backgroundColor: "rgba(200,138,96,0.05)",
                    y: -2 
                  }}
                  className="font-mono text-[0.6rem] md:text-[0.65rem] tracking-widest px-3 md:px-4 py-2 border border-border text-muted cursor-default transition-all duration-300 uppercase"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: The "Fast Report" Premium Card */}
        <Reveal delay={0.15} direction="right">
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group clip-both border border-border bg-[#0a0a0a]/80 backdrop-blur-md p-6 md:p-10 relative overflow-hidden shadow-2xl"
          >
            {/* Animated Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Subtle radial glow inside card */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-accent/10 transition-colors duration-500" />

            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="font-mono text-[0.55rem] md:text-[0.65rem] text-accent tracking-[0.25em] uppercase font-bold">
                Executive Summary
              </span>
              <div className="flex-1 h-px bg-border" />
              <span className="font-mono text-[0.5rem] md:text-[0.55rem] text-muted tracking-widest">2026</span>
            </div>

            <div className="space-y-1">
              {REPORT.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  className="relative flex gap-4 md:gap-5 py-4 border-b border-border/40 last:border-0 cursor-default hover:bg-white/[0.02] transition-colors duration-300 px-2 md:px-4 -mx-2 md:-mx-4 rounded-sm"
                >
                  {/* Premium Number Badge */}
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-surface border border-border flex items-center justify-center flex-shrink-0 relative overflow-hidden group/badge">
                    <div className="absolute inset-0 bg-accent/10 translate-y-[100%] group-hover/badge:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 font-mono text-[0.55rem] md:text-[0.65rem] text-accent tracking-widest">{item.id}</span>
                  </div>
                  
                  <div>
                    <div className="font-syne font-semibold text-xs md:text-sm text-white mb-1 md:mb-1.5 tracking-wide group-hover:text-accent transition-colors duration-300">{item.title}</div>
                    <div className="font-mono text-[0.6rem] md:text-[0.65rem] text-muted leading-relaxed tracking-wide">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>

      </div>
    </section>
  );
}
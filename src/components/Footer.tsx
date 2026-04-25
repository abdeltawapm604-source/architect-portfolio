"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-border overflow-hidden pt-24 pb-10 px-8 md:px-16">
      {/* شبكة خلفية خفيفة */}
      <div className="absolute inset-0 bg-[radial-gradient(#2C2926_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* الجزء العلوي من الفوتر */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20 max-w-7xl mx-auto">
        
        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 px-4 py-2 border border-border bg-[#0a0a0a]/50 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[0.65rem] tracking-widest uppercase text-muted">
            Currently accepting new clients
          </span>
        </motion.div>

        {/* Back to top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group flex items-center gap-3 font-mono text-[0.65rem] tracking-widest uppercase text-muted hover:text-accent transition-colors duration-300"
        >
          Back to top
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors duration-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-[-90deg]">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </div>
        </motion.button>
      </div>

      {/* الاسم العملاق (Cinematic Typography) */}
      <div className="relative z-10 flex justify-center overflow-hidden mb-10 pointer-events-none select-none border-b border-border/40 pb-10">
        <motion.h2 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-bebas text-[clamp(4rem,15vw,16rem)] leading-[0.8] tracking-widest text-white/5"
        >
          ABDELTAWAP
        </motion.h2>
      </div>

      {/* الجزء السفلي (حقوق النشر) */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto font-mono text-[0.55rem] text-muted tracking-widest uppercase">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          © 2026 Abdeltawap Tarek El-Tawil. All Rights Reserved.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Architected with <span className="text-accent">Next.js</span> & <span className="text-white">Framer Motion</span>
        </motion.div>
      </div>
    </footer>
  );
}
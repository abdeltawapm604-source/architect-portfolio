"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";

const TITLES = [
  "SOFTWARE ENGINEER",
  "WEB DEVELOPER",
];

const FireworkText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const letters = Array.from(text);

  return (
    <div className={`relative inline-flex flex-wrap justify-center ${className}`}>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-accent/40 blur-[50px] rounded-full pointer-events-none z-0"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 1.5, 0], opacity: [1, 0.6, 0] }}
        transition={{ duration: 1.5, ease: "easeOut", delay }}
      />
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const velocity = 80 + Math.abs(Math.sin(i * 12.5)) * 180; 
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute top-1/2 left-1/2 w-1 h-1 bg-accent rounded-full pointer-events-none z-0"
            initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 1 }}
            animate={{
              x: `calc(-50% + ${tx}px)`,
              y: `calc(-50% + ${ty}px)`,
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.1 }}
          />
        );
      })}
      <span className="relative z-10 flex">
        {letters.map((char, index) => {
          const rx = Math.sin(index * 4.3) * 350;
          const ry = Math.cos(index * 2.1) * 350;
          const rz = Math.sin(index * 7.5) * 180;
          const rDelay = Math.abs(Math.cos(index * 3.2)) * 0.15;

          return (
            <motion.span
              key={index}
              className="inline-block origin-center"
              initial={{ opacity: 0, x: rx, y: ry, rotate: rz, scale: 3, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 150,
                delay: delay + rDelay, 
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </span>
    </div>
  );
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    // التايتل يبدأ يلف بعد 7 ثواني
    const timeout = setTimeout(() => {
      const t = setInterval(() => setTitleIdx((i) => (i + 1) % TITLES.length), 2800);
      return () => clearInterval(t);
    }, 7000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-accent3/5 blur-[100px]" />
      </div>
      <div className="scanline absolute inset-0 pointer-events-none z-10" />

      {/* المسافات هنا متجاوبة: px-6 للموبايل و px-16 للكمبيوتر */}
      <motion.div style={{ y, opacity }} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 7.2 }}
            className="inline-flex items-center gap-2 font-mono text-[0.6rem] md:text-[0.65rem] tracking-[0.18em] uppercase text-accent border border-accent/30 px-3 py-1.5 bg-accent/5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Web Development Expert
          </motion.div>

          <div className="overflow-visible mb-2 h-auto">
            {/* حجم الخط بيصغر عالموبايل بشكل ذكي (clamp) */}
            <FireworkText 
              text="Abdeltawap" 
              delay={7.3} 
              className="font-bebas text-[clamp(2.8rem,10vw,7.5rem)] leading-[0.9] tracking-wide glow-text" 
            />
          </div>
          
          <div className="overflow-visible mb-6 h-auto">
            <FireworkText 
              text="Tarek El-Tawil" 
              delay={7.7} 
              className="font-bebas text-[clamp(2.8rem,10vw,7.5rem)] leading-[0.9] tracking-wide text-accent" 
            />
          </div>

          <div className="h-8 mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIdx}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-mono text-[0.7rem] md:text-[0.75rem] tracking-[0.22em] uppercase text-accent2"
              >
                {TITLES[titleIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 8.5, duration: 0.7 }}
              className="text-muted text-sm md:text-base leading-relaxed max-w-lg mb-10"
             >  Software Engineering student and Web Development specialist, dedicated to building premium and scalable web applications. 
            </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 8.7, duration: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a href="#projects" whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }} className="clip-tl px-6 md:px-8 py-3 md:py-4 bg-accent text-bg font-mono text-[0.6rem] md:text-[0.68rem] tracking-widest uppercase font-bold w-full md:w-auto text-center">
              View Projects
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }} className="clip-br px-6 md:px-8 py-3 md:py-4 border border-border text-accent2 font-mono text-[0.6rem] md:text-[0.68rem] tracking-widest uppercase hover:border-accent hover:text-accent transition-colors duration-300 w-full md:w-auto text-center">
              Book a Call
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 8.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div className="float">
            <div className="absolute inset-0 bg-accent/10 blur-[60px] scale-110 rounded-full" />
            <div className="group relative w-[320px] h-[400px] clip-both border border-border bg-surface overflow-hidden">
              {/* صورتك أهي هنا متظبطة ✅ */}
              <Image src="/prot-img.jpeg" alt="Abdeltawap Tarek El-Tawil" fill priority className="object-cover object-top filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-90" />
              <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-accent to-transparent" />
              <div className="absolute top-0 left-0 h-16 w-px bg-gradient-to-b from-accent to-transparent" />
              <div className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-accent to-transparent" />
              <div className="absolute bottom-0 right-0 h-16 w-px bg-gradient-to-t from-accent to-transparent" />
            </div>

            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 9.2, duration: 0.7 }}
              className="absolute -bottom-6 -right-10 bg-surface border border-border clip-tl px-6 py-5 min-w-[150px] shadow-2xl"
            >
              {[ { num: "Next.js", label: "Core Framework" }, { num: "React", label: "UI Architecture" } ].map((s) => (
                <div key={s.label} className="mb-4 last:mb-0">
                  <div className="font-bebas text-2xl text-accent leading-none tracking-wide">{s.num}</div>
                  <div className="font-mono text-[0.55rem] text-muted tracking-widest uppercase mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 9.5 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[0.5rem] md:text-[0.55rem] tracking-widest uppercase text-muted">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 md:h-10 bg-gradient-to-b from-accent/60 to-transparent" />
      </motion.div>
    </section>
  );
}
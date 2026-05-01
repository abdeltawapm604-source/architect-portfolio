"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const TITLES = ["SOFTWARE ENGINEER", "WEB DEVELOPER", "FRONT-END EXPERT"];

const prng = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const LivingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-[2px] h-[2px] bg-blue-300/50 rounded-full shadow-[0_0_8px_#93C5FD]"
          style={{
            left: `${prng(i) * 100}%`,
            top: `${prng(i + 100) * 100}%`,
          }}
          animate={{
            y: [0, -800],
            opacity: [0, Math.random() * 1, 0],
            scale: [0, Math.random() * 3 + 1, 0],
          }}
          transition={{
            duration: Math.random() * 12 + 8,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

const MegaExplosion = ({ delay, scaleMult = 1 }: { delay: number, scaleMult?: number }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex justify-center items-center">
      <motion.div
        className="absolute w-8 h-8 md:w-16 md:h-16 bg-white rounded-full mix-blend-screen shadow-[0_0_150px_#ffffff]"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 20 * scaleMult, 0], opacity: [1, 1, 0] }}
        transition={{ delay, duration: 0.5, ease: "circOut" }}
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30) * (Math.PI / 180);
        const distance = 150 * scaleMult + Math.random() * 100;
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-[2px] h-[10px] md:w-[4px] md:h-[20px] bg-white rounded-full shadow-[0_0_15px_#fff]"
            style={{ rotate: `${i * 30 + 90}deg` }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0, 1.2, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ delay, duration: 0.6, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

const GPUAcceleratedLetter = ({ char, globalIndex, endColor }: { char: string, globalIndex: number, endColor: string }) => {
  const r1 = prng(globalIndex * 1.1 + 1);
  const r2 = prng(globalIndex * 2.2 + 2);
  const explodeX = (r1 - 0.5) * 2000; 
  const explodeY = (r2 - 0.5) * 2000;
  const rotZ = (r1 - 0.5) * 1000;

  return (
    <motion.span
      className="inline-block relative z-50 origin-center will-change-transform"
      initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 1, 1, 1],
        x: [0, explodeX, (r1 - 0.5) * 200, 0],
        y: [0, explodeY, (r2 - 0.5) * 200, 0],
        rotate: [0, rotZ, rotZ / 10, 0],
        scale: [0, 6, 2, 1], 
        color: ["#ffffff", "#93C5FD", "#3b82f6", endColor],
      }}
      transition={{
        duration: 4, 
        times: [0, 0.1, 0.6, 1], 
        ease: "easeOut", 
        delay: 2 + (globalIndex * 0.02) 
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const GlowingText = ({ text, startIndex = 0, className = "", endColor = "#ffffff" }: { text: string, startIndex?: number, className?: string, endColor?: string }) => {
  const letters = Array.from(text);
  return (
    <div className={`relative inline-flex flex-wrap ${className}`}>
      <span className="relative z-10 flex">
        {letters.map((char, index) => (
          <GPUAcceleratedLetter key={index} char={char} globalIndex={startIndex + index} endColor={endColor} />
        ))}
      </span>
    </div>
  );
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * 20;
    const y = (clientY / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * 20;
    mouseX.set(x);
    mouseY.set(y);
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollYTransform = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  const [titleIdx, setTitleIdx] = useState(0);
  const delayOffset = 6; 

  useEffect(() => {
    const timeout = setTimeout(() => {
      const t = setInterval(() => setTitleIdx((i) => (i + 1) % TITLES.length), 3500);
      return () => clearInterval(t);
    }, (delayOffset + 1) * 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section 
      ref={ref} 
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen lg:min-h-screen flex items-center overflow-hidden bg-[#030303] pt-10 lg:pt-0"
    >
      <LivingBackground />
      
      <div className="absolute inset-0 opacity-[0.08]" 
           style={{ backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} 
      />

      <motion.div 
        style={{ y: scrollYTransform }} 
        className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-16 grid grid-cols-[1.5fr_1fr] lg:grid-cols-[1.2fr_0.8fr] gap-2 md:gap-8 items-center -translate-y-4"
      >
        
        {/* -- الجزء الخاص بالنصوص (يسار) -- */}
        <motion.div 
          style={{ x: useTransform(springX, (val) => val * -0.5), y: useTransform(springY, (val) => val * -0.5) }} 
          className="flex flex-col relative z-30"
        >
          <div className="flex flex-col gap-0 mb-4 md:mb-8 overflow-visible relative">
            <MegaExplosion delay={delayOffset} scaleMult={1} />
            <GlowingText 
              text="ABDELTAWAP" 
              startIndex={0} 
              endColor="#ffffff"
              className="font-bebas text-[clamp(1.5rem,7vw,8rem)] leading-[0.85] tracking-tight" 
            />
            <GlowingText 
              text="EL-TAWIL" 
              startIndex={10} 
              endColor="#3b82f6" 
              className="font-bebas text-[clamp(1.5rem,7vw,8rem)] leading-[0.85] tracking-tight" 
            />
          </div>

          <div className="h-6 md:h-10 mb-4 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIdx}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.4 }} 
                className="font-mono text-[0.6rem] md:text-[0.9rem] tracking-[0.1em] md:tracking-[0.4em] uppercase text-cyan-300"
              >
                {TITLES[titleIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delayOffset + 0.8 }}
            className="text-slate-400 text-[0.65rem] md:text-[1.1rem] leading-relaxed max-w-[200px] md:max-w-lg mb-6 md:mb-10 font-light"
          >
            Engineering <span className="text-white">digital experiences</span> with 
            <span className="text-blue-400 font-bold"> precision.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delayOffset + 1 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.a 
              href="#projects" 
              whileTap={{ scale: 0.95 }} 
              className="px-4 py-2 md:px-10 md:py-4 bg-blue-600 text-white font-mono font-bold text-[0.6rem] md:text-[0.8rem] tracking-widest uppercase text-center"
            >
              Work
            </motion.a>
          </motion.div>
        </motion.div>

        {/* --- الجزء الخاص بالصورة (يمين) --- */}
        <motion.div
          style={{ x: springX, y: springY }} 
          className="relative flex justify-center items-center z-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: delayOffset + 0.5 }}
            className="relative flex justify-center items-center"
          >
            {/* الحلقات - مصغرة للموبايل */}
            <motion.div 
              animate={{ rotateZ: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[140px] h-[140px] md:w-[450px] md:h-[450px] rounded-full border border-dashed border-cyan-500/20"
            />

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative group w-[100px] h-[140px] md:w-[320px] md:h-[460px] z-10"
            >
              <div className="absolute inset-0 border border-blue-500/40 translate-x-1 translate-y-1 md:translate-x-4 md:translate-y-4 transition-transform duration-500" />
              
              <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] border border-white/10">
                <Image 
                  src="/prot-img.jpeg" 
                  alt="Profile" 
                  fill 
                  priority
                  className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                />
                <motion.div 
                  className="absolute top-0 left-0 w-full h-[2px] bg-cyan-300/50 shadow-[0_0_15px_#22d3ee]"
                  animate={{ top: ["-10%", "110%", "-10%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* مؤشر النزول */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </div>
    </section>
  );
}
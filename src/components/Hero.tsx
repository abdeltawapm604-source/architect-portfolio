"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const TITLES = ["SOFTWARE ENGINEER", "WEB DEVELOPER", "FRONT-END EXPERT"];

// دالة أرقام عشوائية ثابتة
const prng = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// --- 1. خلفية حية (جزيئات تسبح باستمرار) ---
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

// --- 2. انفجارات ضخمة ومحسنة (Mega Explosion) ---
const MegaExplosion = ({ delay, scaleMult = 1 }: { delay: number, scaleMult?: number }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex justify-center items-center">
      <motion.div
        className="absolute w-16 h-16 bg-white rounded-full mix-blend-screen shadow-[0_0_150px_#ffffff]"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 20 * scaleMult, 0], opacity: [1, 1, 0] }}
        transition={{ delay, duration: 0.5, ease: "circOut" }}
      />
      
      <motion.div
        className="absolute w-[100px] h-[100px] rounded-full border-[10px] border-cyan-300"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 25 * scaleMult], opacity: [1, 0], borderWidth: [30, 1] }}
        transition={{ delay: delay + 0.05, duration: 0.7, ease: "easeOut" }}
      />

      <motion.div
        className="absolute w-[100px] h-[100px] rounded-full border-[4px] border-blue-500 shadow-[0_0_60px_#3b82f6]"
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: [0, 40 * scaleMult], opacity: [1, 0], borderWidth: [15, 0] }}
        transition={{ delay: delay + 0.1, duration: 1.2, ease: "easeOut" }}
      />

      {/* شظايا الانفجار السريعة */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15) * (Math.PI / 180);
        const distance = 400 * scaleMult + Math.random() * 300;
        return (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-[4px] h-[20px] bg-white rounded-full shadow-[0_0_15px_#fff]"
            style={{ rotate: `${i * 15 + 90}deg` }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, filter: "blur(0px)" }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
              filter: ["blur(0px)", "blur(4px)", "blur(0px)"]
            }}
            transition={{ delay, duration: 0.6 + Math.random() * 0.4, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

// --- 3. حروف بتأثير طيران مرن (Motion Blur Elastic Bounce) ---
const GPUAcceleratedLetter = ({ char, globalIndex, endColor }: { char: string, globalIndex: number, endColor: string }) => {
  const r1 = prng(globalIndex * 1.1 + 1);
  const r2 = prng(globalIndex * 2.2 + 2);
  const r3 = prng(globalIndex * 3.3 + 3);

  const explodeX = (r1 - 0.5) * 4000; 
  const explodeY = (r2 - 0.5) * 4000;
  
  const floatX = (r3 - 0.5) * 600;
  const floatY = (r1 - 0.5) * 600;

  const rotZ = (r1 - 0.5) * 2000;

  return (
    <motion.span
      className="inline-block relative z-50 origin-center will-change-transform"
      initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0, filter: "blur(0px)" }}
      animate={{
        opacity: [0, 1, 1, 1, 1],
        x: [0, explodeX, floatX, (r1 - 0.5) * -100, 0],
        y: [0, explodeY, floatY, (r2 - 0.5) * -100, 0],
        rotate: [0, rotZ, rotZ / 2, rotZ / 10, 0],
        scale: [0, 8, 3.5, 0.9, 1], 
        color: ["#ffffff", "#E0F2FE", "#93C5FD", "#3b82f6", endColor],
        filter: ["blur(20px)", "blur(10px)", "blur(5px)", "blur(0px)", "blur(0px)"]
      }}
      transition={{
        duration: 4.8, 
        times: [0, 0.08, 0.5, 0.85, 1], 
        ease: ["easeOut", "easeInOut", "easeOut", "backOut"], 
        delay: 2 + (globalIndex * 0.025) 
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const GlowingText = ({ text, startIndex = 0, className = "", endColor = "#ffffff" }: { text: string, startIndex?: number, className?: string, endColor?: string }) => {
  const letters = Array.from(text);
  return (
    <div className={`relative inline-flex flex-wrap justify-start lg:justify-center ${className}`}>
      <span className="relative z-10 flex">
        {letters.map((char, index) => (
          <GPUAcceleratedLetter 
            key={index} 
            char={char} 
            globalIndex={startIndex + index} 
            endColor={endColor} 
          />
        ))}
      </span>
    </div>
  );
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  
  // -- حركة الماوس (Parallax) --
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / (typeof window !== 'undefined' ? window.innerWidth : 1000) - 0.5) * 30;
    const y = (clientY / (typeof window !== 'undefined' ? window.innerHeight : 1000) - 0.5) * 30;
    mouseX.set(x);
    mouseY.set(y);
  };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollYTransform = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  
  const [titleIdx, setTitleIdx] = useState(0);
  const delayOffset = 7; 

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
      className="relative min-h-[110vh] lg:min-h-screen flex items-center overflow-hidden bg-[#030303] pt-24 lg:pt-0 perspective-1000"
    >
      <LivingBackground />
      
      <div className="absolute inset-0 opacity-[0.08]" 
           style={{ backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`, backgroundSize: '80px 80px' }} 
      />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none z-0" />

      <motion.div 
        animate={{ 
          x: [0, -8, 8, -5, 5, -2, 2, 0]
        }}
        transition={{ delay: delayOffset, duration: 0.5, ease: "easeInOut" }}
        style={{ y: scrollYTransform }} 
        // ضفت -translate-y-[8px] هنا لرفع المحتوى كله 8 بيكسل
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center -translate-y-[8px]"
      >
        
        {/* -- الجزء الخاص بالنصوص -- */}
        <motion.div 
          style={{ x: useTransform(springX, (val) => val * -0.5), y: useTransform(springY, (val) => val * -0.5) }} 
          className="flex flex-col relative z-30"
        >
          
          {/* شلنا الـ Available Glitch Badge من هنا عشان يبقى أنضف */}

          <div className="flex flex-col gap-0 mb-6 md:mb-8 overflow-visible relative">
            <MegaExplosion delay={delayOffset} scaleMult={1.3} />
            <GlowingText 
              text="ABDELTAWAP" 
              startIndex={0} 
              endColor="#ffffff"
              className="font-bebas text-[clamp(3.2rem,11vw,8rem)] leading-[0.85] tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
            />
            <GlowingText 
              text="TAREK EL-TAWIL" 
              startIndex={10} 
              endColor="#3b82f6" 
              className="font-bebas text-[clamp(3.2rem,11vw,8rem)] leading-[0.85] tracking-tight drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" 
            />
          </div>

          <div className="h-8 md:h-10 mb-4 md:mb-6 overflow-hidden relative">
             <motion.div 
               className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/80 to-transparent"
               initial={{ scaleX: 0, originX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: delayOffset + 0.5, duration: 1, ease: "circOut" }}
             />
            <AnimatePresence mode="wait">
              <motion.p
                key={titleIdx}
                initial={{ y: 20, opacity: 0, filter: "blur(5px)", scale: 0.95 }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ y: -20, opacity: 0, filter: "blur(5px)", scale: 1.05 }}
                transition={{ duration: 0.4, delay: titleIdx === 0 ? delayOffset + 0.6 : 0 }} 
                className="font-mono text-[0.75rem] md:text-[0.9rem] tracking-[0.25em] md:tracking-[0.4em] uppercase text-cyan-300 mt-3"
              >
                {TITLES[titleIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delayOffset + 0.8, duration: 0.8 }}
            className="text-slate-300 text-sm md:text-[1.15rem] leading-relaxed max-w-lg mb-8 md:mb-10 font-light"
          >
            Crafting high-performance digital experiences where 
            <span className="text-white font-medium"> engineering </span> meets 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"> aesthetic precision.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delayOffset + 1, duration: 0.8 }}
            className="flex flex-wrap gap-5"
          >
            <motion.a 
              href="#projects" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="relative group px-8 py-3 md:px-12 md:py-4 bg-blue-600 overflow-hidden w-full sm:w-auto text-center border border-blue-400 transition-shadow"
            >
              <motion.div 
                className="absolute inset-0 bg-blue-500/40"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer z-0" />
              <div className="absolute inset-0 shadow-[0_0_20px_rgba(59,130,246,0.6)_inset] group-hover:shadow-[0_0_40px_rgba(59,130,246,1)_inset] transition-shadow duration-300 z-0" />
              
              <span className="relative z-10 text-white font-mono font-bold text-[0.7rem] md:text-[0.8rem] tracking-[0.2em] uppercase">Explore Work</span>
            </motion.a>
            
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05, backgroundColor: "rgba(34,211,238,0.15)", borderColor: "rgba(34,211,238,0.8)" }} 
              whileTap={{ scale: 0.95 }} 
              className="px-8 py-3 md:px-12 md:py-4 border border-blue-500/40 transition-all font-mono text-[0.7rem] md:text-[0.8rem] tracking-[0.2em] uppercase text-slate-200 bg-transparent w-full sm:w-auto text-center backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-cyan-400/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <span className="relative z-10 group-hover:text-cyan-300 transition-colors">Get In Touch</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* --- 4. تصميم الصورة المبتكر والصغير (Parallax + Orbital Rings) --- */}
        <motion.div
          style={{ x: springX, y: springY }} 
          className="relative flex justify-center items-center z-20 mt-16 lg:mt-0 pb-10 lg:pb-0"
        >
          <MegaExplosion delay={delayOffset + 1.2} scaleMult={0.9} />

          <motion.div 
            initial={{ opacity: 0, scale: 0.3, filter: "brightness(5) blur(30px)", rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)", rotateY: 0 }}
            transition={{ duration: 1.5, delay: delayOffset + 1.2, ease: "circOut" }}
            className="relative flex justify-center items-center"
          >
            <motion.div 
              animate={{ rotateZ: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] rounded-full border border-dashed border-cyan-500/30 z-0"
            />
            <motion.div 
              animate={{ rotateZ: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] rounded-full border border-blue-600/20 z-0 opacity-50"
            />

            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative group w-[220px] h-[300px] sm:w-[260px] sm:h-[360px] lg:w-[280px] lg:h-[400px] xl:w-[320px] xl:h-[460px] z-10"
            >
              <div className="absolute inset-0 border-2 border-blue-500/60 translate-x-3 translate-y-3 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 z-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
              <div className="absolute inset-0 border-2 border-cyan-400/40 -translate-x-3 -translate-y-3 group-hover:-translate-x-6 group-hover:-translate-y-6 transition-transform duration-500 z-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]" />
              
              <div className="absolute -inset-12 bg-gradient-to-tr from-blue-600/40 via-cyan-500/20 to-transparent blur-3xl rounded-sm pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] shadow-[0_0_50px_rgba(59,130,246,0.25)] group-hover:shadow-[0_0_100px_rgba(34,211,238,0.5)] z-10 border border-white/20 transition-all duration-500">
                <Image 
                  src="/prot-img.jpeg" 
                  alt="Profile" 
                  fill 
                  priority
                  className="object-cover transform scale-110 group-hover:scale-125 transition-transform duration-[3s] ease-out grayscale-[30%] group-hover:grayscale-0" 
                />
                
                <motion.div 
                  className="absolute top-0 left-0 w-full h-[3px] bg-cyan-300 shadow-[0_0_30px_#22d3ee] opacity-80 mix-blend-screen"
                  animate={{ top: ["-10%", "110%", "-10%"] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-white shadow-[0_0_10px_#fff] z-20" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-cyan-400 shadow-[0_0_10px_#22d3ee] z-20" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* مؤشر النزول */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delayOffset + 2.5 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 hidden md:flex"
      >
        <span className="font-mono text-[9px] tracking-[0.5em] uppercase text-cyan-500/60 rotate-90 mb-12">Scroll</span>
        <div className="w-[2px] h-12 md:h-16 bg-blue-900/40 relative overflow-hidden rounded-full">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }} 
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400 shadow-[0_0_15px_#22d3ee] rounded-full"
            />
        </div>
      </motion.div>
    </section>
  );
}
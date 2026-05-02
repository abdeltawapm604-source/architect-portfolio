"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";

const TITLES = ["FRONT-END DEVELOPER", "REACT.JS EXPERT", "WEB UI/UX ENGINEER", "CREATIVE DEVELOPER"];
const NAME_1  = "ABDELTAWAP";
const NAME_2  = "MOHAMED";
const DELAY   = 1.5;

const prng = (seed: number) => { const x = Math.sin(seed + 1) * 10000; return x - Math.floor(x); };

const BG_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  left:  `${prng(i) * 100}%`,
  top:   `${prng(i + 100) * 100}%`,
  dur:   prng(i + 200) * 15 + 10,
  del:   prng(i + 300) * 5,
  isBlue: prng(i + 400) > 0.5,
  maxOp: prng(i + 500) * 0.4 + 0.1,
}));

const AmbientField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {BG_PARTICLES.map((p, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          left: p.left, top: p.top,
          width: 2, height: 2,
          background: p.isBlue ? "rgba(147,197,253,0.3)" : "rgba(34,211,238,0.2)",
          boxShadow: p.isBlue ? "0 0 8px #93C5FD" : "0 0 8px #22d3ee",
        }}
        animate={{ y: [0, -300], opacity: [0, p.maxOp, 0] }}
        transition={{ duration: p.dur, repeat: Infinity, ease: "linear", delay: p.del }}
      />
    ))}
  </div>
);

const AnimLetter = ({
  char, idx, endColor,
}: {
  char: string; idx: number; endColor: string;
}) => {
  return (
    <motion.span
      className="inline-block origin-bottom will-change-transform"
      initial={{ opacity: 0, y: 30, rotateX: -40, filter: "blur(8px)" }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        color: ["#ffffff", endColor],
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], 
        delay: DELAY + idx * 0.04, 
      }}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const GlowRow = ({
  text, startIdx, endColor, className, style,
}: {
  text: string; startIdx: number; endColor: string; className?: string; style?: React.CSSProperties;
}) => (
  <span className={`inline-flex overflow-hidden pb-2 ${className ?? ""}`} style={style}>
    {Array.from(text).map((ch, i) => (
      <AnimLetter key={i} char={ch} idx={startIdx + i} endColor={endColor} />
    ))}
  </span>
);

const Flash = ({ delay }: { delay: number }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
    <motion.div
      className="absolute bg-blue-400 rounded-full mix-blend-screen filter blur-3xl"
      style={{ width: 100, height: 100 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 6, 0], opacity: [0, 0.5, 0] }}
      transition={{ delay, duration: 1, ease: "easeInOut" }}
    />
  </div>
);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [titleIdx, setTitleIdx] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cfg    = { damping: 30, stiffness: 100 };
  const sX     = useSpring(mouseX, cfg);
  const sY     = useSpring(mouseY, cfg);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    mouseX.set((e.clientX / window.innerWidth  - 0.5) * 15);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 15);
  }, [mouseX, mouseY]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(() => setTitleIdx((i) => (i + 1) % TITLES.length), 3500);
      return () => clearInterval(iv);
    }, (DELAY + 2) * 1000);
    return () => clearTimeout(t);
  }, []);

  const txtX = useTransform(sX, v => v * -0.3);
  const txtY = useTransform(sY, v => v * -0.3);
  const imgX = useTransform(sX, v => v * 0.4);
  const imgY = useTransform(sY, v => v * 0.4);

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={onMouseMove}
      className="relative flex items-center overflow-hidden bg-[#030303]"
      style={{ minHeight: "100svh" }}
    >
      <AmbientField />

      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-[1]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none z-[1]" />

      <motion.div
        style={{ y: scrollY }}
        className="relative z-[5] w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
      >
        <div
          className="grid items-center gap-6 sm:gap-10 lg:gap-16"
          style={{
            gridTemplateColumns: "1.3fr 1fr",
            paddingTop:    "clamp(40px, 8vw, 80px)",
            paddingBottom: "clamp(50px, 10vw,  80px)",
          }}
        >

          <motion.div style={{ x: txtX, y: txtY }} className="flex flex-col min-w-0">

            <div className="relative mb-4 sm:mb-6 overflow-visible mt-6">
              <Flash delay={DELAY} />

              <div className="overflow-visible leading-[0.85] font-sans font-black tracking-tighter drop-shadow-lg">
                <GlowRow
                  text={NAME_1}
                  startIdx={0}
                  endColor="#ffffff"
                  style={{ fontSize: "clamp(2.5rem, 7.5vw, 7.5rem)" }}
                />
              </div>

              <div className="overflow-visible leading-[0.85] font-sans font-black tracking-tighter drop-shadow-lg">
                <GlowRow
                  text={NAME_2}
                  startIdx={NAME_1.length}
                  endColor="#3b82f6"
                  style={{ fontSize: "clamp(2.5rem, 7.5vw, 7.5rem)" }}
                />
              </div>
            </div>

            <div className="overflow-hidden h-6 sm:h-8 md:h-10 mb-4 sm:mb-6 relative flex items-center">
              <motion.div
                className="absolute left-0 w-8 h-px bg-cyan-400 mr-4"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: DELAY + 1, duration: 0.6 }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={titleIdx}
                  initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="font-mono uppercase text-cyan-300 ml-12"
                  style={{
                    fontSize: "clamp(0.6rem, 1.5vw, 0.9rem)",
                    letterSpacing: "clamp(0.1em, 0.4vw, 0.3em)",
                  }}
                >
                  {TITLES[titleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: DELAY + 1.2, duration: 0.8 }}
              className="text-slate-400 leading-relaxed mb-8 sm:mb-10 font-light"
              style={{
                fontSize: "clamp(0.75rem, 1.8vw, 1.1rem)",
                maxWidth: "clamp(260px, 45vw, 520px)",
              }}
            >
              Building pixel-perfect, scalable web interfaces where{" "}
              <span className="text-white font-medium">clean code</span> meets{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-semibold">
                exceptional UX.
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: DELAY + 1.4, duration: 0.7 }}
              className="flex flex-row gap-3 sm:gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl border border-blue-500 bg-blue-600 text-center shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all"
                style={{ padding: "clamp(10px,1.5vw,16px) clamp(20px,3.5vw,40px)" }}
              >
                <span className="relative z-10 font-sans font-bold text-white uppercase tracking-[0.1em]" style={{ fontSize: "clamp(0.6rem, 1.3vw, 0.85rem)" }}>
                  Explore Work
                </span>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-md text-center transition-all"
                style={{ padding: "clamp(10px,1.5vw,16px) clamp(20px,3.5vw,40px)" }}
              >
                <span className="relative z-10 font-sans font-medium text-slate-300 uppercase tracking-[0.1em] group-hover:text-white transition-colors" style={{ fontSize: "clamp(0.6rem, 1.3vw, 0.85rem)" }}>
                  Contact Me
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ x: imgX, y: imgY }}
            className="relative flex justify-center items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-dashed border-blue-500/20 pointer-events-none"
              style={{ width: "clamp(160px,28vw,380px)", height: "clamp(160px,28vw,380px)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)", rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotateY: 0 }}
              transition={{ duration: 1.2, delay: DELAY + 1, ease: "easeOut" }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="group relative"
                style={{
                  width:  "clamp(120px, 22vw, 320px)",
                  height: "clamp(160px, 30vw, 420px)",
                }}
              >
                <div className="absolute inset-0 border border-blue-500/30 rounded-2xl pointer-events-none translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
                
                <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a] rounded-2xl border border-white/10 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <Image
                    src="/prot-img.jpeg"
                    alt="Abdeltawap Mohamed"
                    fill
                    priority
                    className="object-cover object-top w-full h-full scale-[1.02] group-hover:scale-[1.08] transition-transform duration-700 ease-out grayscale-[15%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: DELAY + 1.8, duration: 0.6 }}
                  className="absolute z-20 flex flex-col justify-center border border-white/10 backdrop-blur-xl bg-black/60 rounded-xl"
                  style={{
                    bottom: "-15px",
                    left: "-15px",
                    padding: "clamp(8px,1.2vw,16px) clamp(12px,1.8vw,24px)",
                  }}
                >
                  <p className="font-mono uppercase text-cyan-400 mb-1" style={{ fontSize: "clamp(7px,0.9vw,11px)", letterSpacing: "0.2em" }}>
                    Front-End
                  </p>
                  <p className="font-sans font-bold text-white tracking-tight leading-none" style={{ fontSize: "clamp(10px,1.2vw,14px)" }}>
                    Abdeltawap Mohamed
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: DELAY + 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3 z-10"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500/50 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-cyan-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
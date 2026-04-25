"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const AVAILABLE = [2, 4, 7, 9, 14, 16, 18, 22, 24];
const SLOTS = ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"];

const SOCIALS = [
  { 
    name: "LinkedIn", 
    handle: "abdeltawap-mohamed", 
    color: "#0077b5", 
    href: "https://linkedin.com/in/abdeltawap-mohamed-33312534",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  },
  { 
    name: "GitHub", 
    handle: "abdeltawapm604-source", 
    color: "#ffffff",
    href: "https://github.com/abdeltawapm604-source",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  },
  { 
    name: "Instagram", 
    handle: "@a.eltaweel15", 
    color: "#E1306C", 
    href: "https://instagram.com/a.eltaweel15",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  },
  { 
    name: "Email", 
    handle: "abdeltawapm604@gmail.com", 
    color: "#EA4335", 
    href: "mailto:abdeltawapm604@gmail.com",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>
  },
];

const OFFSET = 3;
const TOTAL_DAYS = 30;

export default function Contact() {
  const [selected, setSelected] = useState(14);
  const [slot, setSlot] = useState("11:00 AM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [booked, setBooked] = useState(false);

  const cells = [
    ...Array(OFFSET).fill(null),
    ...Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
  ];

  const handleBook = () => {
    if (name && email) setBooked(true);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-32 px-6 md:px-12 lg:px-16 bg-surface overflow-hidden border-b border-border">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#2C2926_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
      <div className="absolute top-1/2 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <Reveal className="flex items-center gap-4 md:gap-5 mb-12 md:mb-20 relative z-10">
        <span className="font-mono text-[0.6rem] md:text-[0.65rem] text-accent tracking-[0.3em]">04</span>
        <div className="h-px w-16 md:w-24 bg-gradient-to-r from-accent/50 to-transparent" />
        <h2 className="font-bebas text-4xl md:text-5xl tracking-widest text-white">Start a Conversation</h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10 max-w-7xl mx-auto">
        
        {/* Calendar / Booking System */}
        <Reveal direction="left">
          <div className="clip-both border border-border bg-[#0a0a0a]/50 backdrop-blur-md p-6 md:p-10 relative overflow-hidden shadow-2xl">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-70" />

            {/* Month Header */}
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <span className="font-syne font-semibold text-xl md:text-2xl text-white tracking-wide">April 2026</span>
              <div className="flex gap-2">
                {["‹", "›"].map((ch) => (
                  <motion.button
                    key={ch}
                    whileHover={{ scale: 1.05, borderColor: "#C88A60", color: "#C88A60" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 bg-surface border border-border text-muted font-mono text-lg flex items-center justify-center transition-colors"
                  >
                    {ch}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2 md:mb-3">
              {DAYS.map((d) => (
                <div key={d} className="font-mono text-[0.55rem] md:text-[0.6rem] text-muted text-center py-1 tracking-widest uppercase">
                  {d}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-6 md:mb-8">
              {cells.map((day, i) =>
                day === null ? (
                  <div key={`e-${i}`} />
                ) : (
                  <motion.button
                    key={day}
                    onClick={() => setSelected(day)}
                    whileHover={day !== selected ? { scale: 1.05, backgroundColor: "rgba(255,255,255,0.03)" } : {}}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square flex items-center justify-center font-mono text-[0.65rem] md:text-[0.75rem] relative transition-all border border-transparent"
                    style={{
                      background: selected === day ? "#C88A60" : "transparent",
                      color: selected === day ? "#0B0A0A" : AVAILABLE.includes(day) ? "#E6D5B8" : "#4b5a6e",
                      borderColor: selected === day ? "#C88A60" : "transparent",
                      fontWeight: selected === day ? "bold" : "normal",
                    }}
                  >
                    {day}
                    {AVAILABLE.includes(day) && selected !== day && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent/50" />
                    )}
                  </motion.button>
                )
              )}
            </div>

            {/* Time Slots */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 justify-center lg:justify-start">
              {SLOTS.map((s) => (
                <motion.button
                  key={s}
                  onClick={() => setSlot(s)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="font-mono text-[0.6rem] md:text-[0.65rem] tracking-wider px-3 md:px-4 py-2 border transition-all"
                  style={{
                    borderColor: slot === s ? "#C88A60" : "#2C2926",
                    color: slot === s ? "#C88A60" : "#736B63",
                    background: slot === s ? "rgba(200, 138, 96, 0.05)" : "transparent",
                  }}
                >
                  {s}
                </motion.button>
              ))}
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {!booked ? (
                <motion.div key="form" className="flex flex-col gap-3">
                  {[
                    { ph: "Full Name", val: name, set: setName },
                    { ph: "Work Email", val: email, set: setEmail },
                  ].map((f) => (
                    <motion.input
                      key={f.ph}
                      value={f.val}
                      onChange={(e) => f.set(e.target.value)}
                      placeholder={f.ph}
                      whileFocus={{ borderColor: "#C88A60" }}
                      className="px-4 md:px-5 py-3 md:py-4 bg-bg border border-border text-white font-mono text-[0.7rem] md:text-[0.75rem] outline-none placeholder-muted transition-colors focus:bg-surface"
                    />
                  ))}
                  <motion.button
                    onClick={handleBook}
                    whileHover={{ scale: 1.01, backgroundColor: "#B37A55" }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 md:py-4 bg-accent text-bg font-mono font-bold text-[0.65rem] md:text-[0.7rem] tracking-widest uppercase mt-2 transition-colors"
                  >
                    Confirm Booking — Apr {selected}, {slot}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8 md:py-10 bg-bg border border-border"
                >
                  <div className="text-accent mb-4">
                    <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div className="font-syne font-bold text-lg md:text-xl text-white mb-2">Meeting Confirmed</div>
                  <div className="font-mono text-[0.6rem] md:text-[0.65rem] tracking-wider text-muted">
                    INVITATION SENT FOR APR {selected} AT {slot}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Social Links & Info */}
        <div className="flex flex-col gap-3 md:gap-4 justify-center">
          {SOCIALS.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.1} direction="right">
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 md:gap-5 p-4 md:p-5 border border-border bg-[#0a0a0a]/30 relative overflow-hidden group transition-all duration-300 hover:border-accent/30"
              >
                {/* Top Animated Bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                  style={{ background: s.color }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                />

                {/* SVG Icon */}
                <div
                  className="w-10 h-10 md:w-12 md:h-12 bg-surface border border-border flex items-center justify-center flex-shrink-0 group-hover:bg-white/5 transition-all duration-300"
                  style={{ color: s.color }}
                >
                  {s.svg}
                </div>

                {/* Text Info */}
                <div className="flex-1 overflow-hidden">
                  <div className="font-syne font-semibold text-white text-sm md:text-base mb-1 tracking-wide">{s.name}</div>
                  <div className="font-mono text-[0.6rem] md:text-[0.65rem] text-muted tracking-wider truncate">{s.handle}</div>
                </div>

                {/* Arrow */}
                <span className="text-muted group-hover:text-accent transition-colors duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                </span>
              </motion.a>
            </Reveal>
          ))}

          {/* Response Time Indicator */}
          <Reveal delay={0.5} direction="right">
            <div className="p-5 md:p-6 bg-surface border border-border mt-2 md:mt-4 flex items-center justify-between">
              <div>
                <div className="font-mono text-[0.55rem] md:text-[0.6rem] text-accent tracking-[0.2em] uppercase mb-1 md:mb-2">
                  Typical Response
                </div>
                <div className="font-bebas text-2xl md:text-3xl text-white tracking-widest">Under 12 Hours</div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-border flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
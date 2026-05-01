"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, CalendarDays, Clock, Cpu, ArrowUpRight, CheckCircle2 } from "lucide-react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const AVAILABLE = [2, 4, 7, 9, 14, 16, 18, 22, 24];
const SLOTS = ["09:00", "11:00", "14:00", "16:00"];

const SOCIALS = [
  { 
    name: "LinkedIn", 
    handle: "abdeltawap-mohamed", 
    color: "#0077b5", 
    href: "https://linkedin.com/in/abdeltawap-mohamed-33312534",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  },
  { 
    name: "GitHub", 
    handle: "abdeltawapm604", 
    color: "#ffffff",
    href: "https://github.com/abdeltawapm604-source",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  },
  { 
    name: "Email", 
    handle: "abdeltawapm604@gmail.com", 
    color: "#22d3ee", // Cyan to match theme
    href: "mailto:abdeltawapm604@gmail.com",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg>
  },
];

const OFFSET = 5; // يبدأ يوم الجمعة مثلاً (مايو 2026)
const TOTAL_DAYS = 31;

export default function Contact() {
  const [selected, setSelected] = useState(14);
  const [slot, setSlot] = useState("11:00");
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
    <section id="contact" className="relative py-24 lg:py-32 px-6 md:px-12 lg:px-16 bg-[#030303] overflow-hidden border-t border-white/5">
      
      {/* --- Tech Background (Grid + Glow) --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* --- Header --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col gap-3 mb-16 md:mb-24 relative z-10 max-w-7xl mx-auto"
      >
        <div className="flex items-center gap-3">
          <Terminal size={16} className="text-cyan-400" />
          <span className="font-mono text-[0.65rem] md:text-[0.75rem] text-cyan-400 tracking-[0.3em] uppercase">
            sys.connect("abdeltawap")
          </span>
          <div className="h-px w-24 bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>
        <h2 className="font-bebas text-5xl md:text-6xl tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          INITIATE PROTOCOL.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-16 relative z-10 max-w-7xl mx-auto items-start">
        
        {/* --- Left: Booking System (IDE Vibe) --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] rounded-sm"
        >
          {/* Top Window Bar */}
          <div className="h-8 bg-[#111] border-b border-white/5 flex items-center px-4 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-[0.55rem] text-slate-500 tracking-widest">schedule_meeting.tsx</span>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-white">
                <CalendarDays size={18} className="text-cyan-400" />
                <span className="font-mono font-bold text-lg md:text-xl tracking-wider uppercase">May 2026</span>
              </div>
              <div className="flex gap-1">
                {["<", ">"].map((ch) => (
                  <motion.button
                    key={ch}
                    whileHover={{ backgroundColor: "rgba(34,211,238,0.1)", color: "#22d3ee" }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded border border-white/10 text-slate-400 font-mono text-sm flex items-center justify-center transition-colors"
                  >
                    {ch}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map((d) => (
                <div key={d} className="font-mono text-[0.6rem] text-slate-500 text-center py-1 tracking-widest uppercase">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-8">
              {cells.map((day, i) =>
                day === null ? (
                  <div key={`e-${i}`} />
                ) : (
                  <motion.button
                    key={day}
                    onClick={() => setSelected(day)}
                    whileHover={day !== selected ? { scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" } : {}}
                    whileTap={{ scale: 0.95 }}
                    className="aspect-square rounded flex items-center justify-center font-mono text-[0.7rem] md:text-[0.8rem] relative transition-all border"
                    style={{
                      background: selected === day ? "rgba(34,211,238,0.15)" : "transparent",
                      color: selected === day ? "#22d3ee" : AVAILABLE.includes(day) ? "#e2e8f0" : "#334155",
                      borderColor: selected === day ? "rgba(34,211,238,0.5)" : "transparent",
                      boxShadow: selected === day ? "0 0 15px rgba(34,211,238,0.2)" : "none",
                    }}
                  >
                    {day}
                    {AVAILABLE.includes(day) && selected !== day && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                    )}
                  </motion.button>
                )
              )}
            </div>

            {/* Time Slots */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
              {SLOTS.map((s) => (
                <motion.button
                  key={s}
                  onClick={() => setSlot(s)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-mono text-[0.65rem] md:text-[0.7rem] tracking-wider px-3 md:px-4 py-2 border rounded transition-all flex items-center gap-2"
                  style={{
                    borderColor: slot === s ? "#22d3ee" : "rgba(255,255,255,0.1)",
                    color: slot === s ? "#22d3ee" : "#94a3b8",
                    background: slot === s ? "rgba(34,211,238,0.05)" : "transparent",
                  }}
                >
                  <Clock size={12} /> {s}
                </motion.button>
              ))}
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {!booked ? (
                <motion.div key="form" className="flex flex-col gap-3">
                  {[
                    { ph: "const name = ", val: name, set: setName, type: "text" },
                    { ph: "const email = ", val: email, set: setEmail, type: "email" },
                  ].map((f) => (
                    <div key={f.ph} className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-slate-500 text-[0.7rem]">{'>_'}</span>
                      <input
                        type={f.type}
                        value={f.val}
                        onChange={(e) => f.set(e.target.value)}
                        placeholder={f.ph}
                        className="w-full pl-10 pr-4 py-3 md:py-4 bg-[#111] border border-white/10 rounded text-cyan-50 font-mono text-[0.7rem] md:text-[0.75rem] outline-none placeholder-slate-600 transition-all focus:border-cyan-500/50 focus:bg-[#151515]"
                      />
                    </div>
                  ))}
                  <motion.button
                    onClick={handleBook}
                    whileHover={{ scale: 1.01, boxShadow: "0 0 20px rgba(34,211,238,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 mt-2 bg-cyan-500 text-black font-mono font-bold text-[0.7rem] tracking-widest uppercase rounded transition-all flex items-center justify-center gap-2"
                  >
                    Deploy Function <ArrowUpRight size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 bg-cyan-500/10 border border-cyan-500/30 rounded"
                >
                  <CheckCircle2 size={40} className="text-cyan-400 mx-auto mb-4" />
                  <div className="font-mono font-bold text-lg text-white mb-2 uppercase tracking-wider">Execution Successful</div>
                  <div className="font-mono text-[0.65rem] tracking-wider text-cyan-200/70">
                    PAYLOAD SENT: APR {selected} @ {slot}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* --- Right: Social Links & System Status --- */}
        <div className="flex flex-col gap-4 justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[0.65rem] text-slate-500 tracking-[0.2em] uppercase mb-2"
          >
            // Communication_Links
          </motion.div>

          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: -8, backgroundColor: "rgba(255,255,255,0.05)" }}
              className="flex items-center justify-between p-4 md:p-5 border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-sm rounded-sm group transition-all duration-300 hover:border-white/30 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded bg-[#111] border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{ color: s.color }}
                >
                  {s.svg}
                </div>
                <div>
                  <div className="font-mono font-bold text-white text-sm tracking-widest uppercase mb-1">{s.name}</div>
                  <div className="font-mono text-[0.6rem] text-slate-400 tracking-wider truncate">{s.handle}</div>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-slate-600 group-hover:text-white transition-colors duration-300" />
            </motion.a>
          ))}

          {/* System Latency Indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-5 border border-cyan-500/20 bg-cyan-500/5 mt-4 flex items-center justify-between rounded-sm relative overflow-hidden"
          >
            {/* Animated Scanline */}
            <motion.div 
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 right-0 h-[1px] bg-cyan-400/50 shadow-[0_0_10px_#22d3ee]"
            />

            <div className="flex items-center gap-4">
              <Cpu size={24} className="text-cyan-400" />
              <div>
                <div className="font-mono text-[0.55rem] md:text-[0.6rem] text-slate-400 tracking-[0.2em] uppercase mb-1">
                  System Latency (Avg Response)
                </div>
                <div className="font-mono text-lg md:text-xl text-white font-bold tracking-widest">
                  {'<'} 12 HOURS
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
              <span className="font-mono text-[0.45rem] text-cyan-400 tracking-widest uppercase">Online</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
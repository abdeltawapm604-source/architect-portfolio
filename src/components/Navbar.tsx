"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// استيراد أيقونة Home مع باقي الأيقونات
import { Home, User, Code2, Briefcase, Mail } from "lucide-react";

// ضفنا الـ Home في أول القائمة
const links = [
  { href: "#hero", label: "Home", Icon: Home },
  { href: "#about", label: "About", Icon: User },
  { href: "#tech", label: "Stack", Icon: Code2 },
  { href: "#projects", label: "Projects", Icon: Briefcase },
  { href: "#contact", label: "Contact", Icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState("#hero"); // خليت الـ Home هو النشط كبداية
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* =========================================
          1. الجزء العلوي (اللوجو وحالة العمل) 
          ========================================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 7.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[900] px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between transition-all duration-500 pointer-events-none ${
          scrolled ? "bg-[#030303]/40 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <motion.a
          href="#"
          className="font-bebas text-2xl md:text-3xl tracking-widest text-white relative z-50 pointer-events-auto"
          whileHover={{ scale: 1.05 }}
        >
          AT<span className="text-cyan-400">.</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 8.3 }}
          className="flex items-center gap-2 font-mono text-[0.6rem] md:text-[0.65rem] tracking-wider text-emerald-400 border border-emerald-400/20 px-3 py-1.5 bg-emerald-400/5 backdrop-blur-sm pointer-events-auto shadow-[0_0_15px_rgba(52,211,153,0.1)] rounded-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="hidden sm:inline">Available for Work</span>
          <span className="sm:hidden">Available</span>
        </motion.div>
      </motion.header>

      {/* =========================================
          2. شريط الأيقونات السفلي (بعرض الشاشة ومسافات متناسقة)
          ========================================= */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 7.8, ease: "backOut" }}
        className="fixed bottom-0 left-0 right-0 w-full z-[950] flex items-center justify-center gap-8 sm:gap-16 md:gap-28 pb-[19px] pt-10 bg-gradient-to-t from-[#030303]/60 to-transparent pointer-events-none"
        onMouseLeave={() => setHovered(null)}
      >
        {links.map((l) => {
          const isActive = active === l.href;
          const isHovered = hovered === l.href;

          return (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setActive(l.href)}
              onMouseEnter={() => setHovered(l.href)}
              className="relative group block pointer-events-auto"
            >
              {/* حاوية الأيقونة مع خلفية زجاجية ثابتة للزرار نفسه */}
              <div 
                className={`relative w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full z-10 transition-all duration-300 hover:scale-110 ${
                  isActive 
                    ? "bg-gradient-to-b from-cyan-500/20 to-blue-600/10 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]" 
                    : "bg-white/5 backdrop-blur-md border border-white/5 hover:bg-white/10"
                }`}
              >
                {/* الأيقونة */}
                <l.Icon 
                  size={isActive ? 24 : 22} 
                  strokeWidth={isActive ? 2.5 : 2}
                  className={`relative z-20 transition-colors duration-300 ${
                    isActive ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" : "text-slate-400 group-hover:text-white drop-shadow-md"
                  }`} 
                />

                {/* مؤشر خطي نيون تحت القسم النشط (اختياري بس بيدي شكل حلو) */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute -bottom-2 w-6 h-[3px] bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee] z-20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#111]/90 backdrop-blur-md border border-white/10 rounded font-mono text-[0.65rem] tracking-widest uppercase text-slate-200 pointer-events-none shadow-xl whitespace-nowrap z-50"
                  >
                    {l.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}
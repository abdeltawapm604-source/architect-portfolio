"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#tech", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [isOpen, setIsOpen] = useState(false); // للتحكم في منيو الموبايل

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      // تأخير 7.5 ثانية عشان ينزل بعد الانفجار وشاشة القرآن والحديث
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 7.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[900] px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled || isOpen
          ? "bg-bg/90 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <motion.a
        href="#"
        className="font-bebas text-2xl md:text-3xl tracking-widest text-white relative z-50"
        whileHover={{ scale: 1.05 }}
      >
        AT<span className="text-accent">.</span>
      </motion.a>

      {/* Desktop Links (مخفية عالموبايل) */}
      <ul className="hidden md:flex gap-10">
        {links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            // التأخير هنا كمان متظبط بعد 7 ثواني
            transition={{ delay: 7.5 + (0.1 * i) }}
          >
            <a
              href={l.href}
              onClick={() => setActive(l.href)}
              className="relative font-mono text-[0.65rem] tracking-widest uppercase text-muted hover:text-white transition-colors duration-300 group"
            >
              {l.label}
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-accent"
                initial={{ width: 0 }}
                animate={{ width: active === l.href ? "100%" : 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Status badge (الكمبيوتر بس) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8.3 }}
        className="hidden lg:flex items-center gap-2 font-mono text-[0.6rem] tracking-wider text-emerald-400 border border-emerald-400/20 px-3 py-1.5 bg-emerald-400/5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Available
      </motion.div>

      {/* Mobile Menu Button (الموبايل بس) */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 7.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 p-2 text-white flex flex-col gap-1.5"
      >
        <motion.span 
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} 
          className="w-6 h-px bg-white block transition-all"
        />
        <motion.span 
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
          className="w-6 h-px bg-white block transition-all"
        />
        <motion.span 
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} 
          className="w-6 h-px bg-white block transition-all"
        />
      </motion.button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-bg/95 backdrop-blur-xl border-b border-border/50 py-8 px-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setActive(l.href);
                  setIsOpen(false); // يقفل المنيو لما يدوس
                }}
                className="font-bebas text-3xl tracking-widest text-muted hover:text-accent transition-colors duration-300 border-b border-border/30 pb-4"
              >
                {l.label}
              </motion.a>
            ))}
            
            {/* Status badge in mobile menu */}
            <div className="flex items-center gap-3 mt-4 font-mono text-[0.65rem] tracking-wider text-emerald-400 border border-emerald-400/20 px-4 py-3 bg-emerald-400/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Work
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}
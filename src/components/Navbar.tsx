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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[900] px-16 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <motion.a
        href="#"
        className="font-bebas text-2xl tracking-widest text-white"
        whileHover={{ scale: 1.05 }}
      >
        AT<span className="text-accent">.</span>
      </motion.a>

      {/* Links */}
      <ul className="flex gap-10">
        {links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.3 }}
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

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-2 font-mono text-[0.6rem] tracking-wider text-emerald-400 border border-emerald-400/20 px-3 py-1.5 bg-emerald-400/5"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Available
      </motion.div>
    </motion.nav>
  );
}

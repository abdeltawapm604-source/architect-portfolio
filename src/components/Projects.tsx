"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// ── DATA ──
const PROJECTS = [
  {
    id: "ocean",
    tag: "Engineering",
    name: "Ocean",
    desc: "High-performance CRM dashboard for complex workflows.",
    monogram: "OC",
    image: "/ocean-preview.png",
    link: "https://gitgo-d4gr.vercel.app/#",
  },
  {
    id: "Xpremo",
    tag: "Luxury",
    name: "X premo",
    desc: "Cinematic marketplace featuring high-contrast UI.",
    monogram: "XP",
    image: "/xpreom.png",
    link: "https://xpremo.vercel.app/#",
  },
  {
    id: "at-store",
    tag: "E-Commerce",
    name: "AT Store",
    desc: "Premium retail experience optimized for conversion.",
    monogram: "AT",
    image: "/at-store.png",
    link: "https://at-store-zzmq.vercel.app/#",
  },
   {
    id: "at-store",
    tag: "Dev Tools",
    name: "Best Resturant",
    desc: "Premium retail experience optimized for conversion.",
    monogram: "BS",
    image: "/bestest.png",
    link: "https://footcap-iota.vercel.app/#",
  },
  {
    id: "at-store",
    tag: "Dev Tools",
    name: "Bit & Go",
    desc: "Premium retail experience optimized for conversion.",
    monogram: "BS",
    image: "/bitgo.png",
    link: "https://gitgo-mu.vercel.app/#",
  },
  {
    id: "at-store",
    tag: "Dev Tools",
    name: "Footcap",
    desc: "Premium retail experience optimized for conversion.",
    monogram: "AT",
    image: "/footcap.png",
    link: "https://footcap-iota.vercel.app/#",
  },
  {
    id: "nazeel",
    tag: "Systems",
    name: "NAZEEL",
    desc: "Scalable property management with real-time sync.",
    monogram: "NZ",
    image: "/nazeel.png",
    link: "https://nazeel-ffoq.vercel.app/",
  },
  {
    id: "bahja",
    tag: "Bakery",
    name: "Bahja",
    desc: "Traditional aesthetics meet modern architecture.",
    monogram: "BS",
    image: "/bahja.png",
    link: "https://693c5899ab780e310bb5b746--superlative-marshmallow-4ce72f.netlify.app/",
  },
  {
    id: "just-beans",
    tag: "Dev Tools",
    name: "Just Beans",
    desc: "Minimalist code sharing utility for developers.",
    monogram: "JB",
    image: "/beans.png",
    link: "https://just-beans-agmk.vercel.app/#",
  },
];

const CATEGORIES = ["All", "E-Commerce", "Systems", "Engineering"];

const transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

// ── COMPONENT: Card ──
function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...transition, delay: index * 0.05 }}
      className="group relative w-full aspect-[4/5] bg-[#070707] overflow-hidden cursor-pointer"
    >
      {project.link && (
        <Link href={project.link} target="_blank" className="absolute inset-0 z-40" aria-label={project.name} />
      )}

      {/* Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden p-8 pb-32 flex items-center justify-center">
        {project.image ? (
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.name}
              fill
              // أزلنا الجراي سكيل والشفافية.. الصورة الآن واضحة 100%
              className="object-contain group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center font-bebas text-8xl text-white/5 bg-[#111]">
            {project.monogram}
          </div>
        )}
      </div>

      {/* Content Container (Bottom Aligned) */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-20 bg-gradient-to-t from-[#070707] via-[#070707]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        
        {/* Category Tag */}
        <div className="overflow-hidden mb-3">
          <motion.span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 translate-y-0 group-hover:-translate-y-full transition-transform duration-500 ease-in-out">
            {project.tag}
          </motion.span>
          <motion.span className="block font-mono text-[10px] tracking-[0.2em] uppercase text-white translate-y-full group-hover:-translate-y-full transition-transform duration-500 ease-in-out absolute top-0">
            View Project
          </motion.span>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="font-bebas text-3xl md:text-4xl tracking-wide text-white">
            {project.name}
          </h3>
          
          {/* Minimal Arrow */}
          <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-white group-hover:text-black transition-all duration-500">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>

        {/* Expandable Description */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="overflow-hidden">
            <p className="font-mono text-[11px] text-white/60 pt-4 leading-relaxed max-w-[90%]">
              {project.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── MAIN SECTION ──
export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    return filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tag.includes(filter));
  }, [filter]);

  return (
    <section id="projects" className="relative py-24 lg:py-32 bg-[#030303] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Minimalist Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-10">
          <div className="max-w-xl">
            <h2 className="font-bebas text-4xl md:text-5xl lg:text-6xl tracking-[0.05em] text-white leading-none mb-4">
              SELECTED WORKS
            </h2>
            <p className="font-mono text-xs md:text-[13px] text-white/40 leading-relaxed max-w-md">
              A curated collection of digital experiences, combining precise engineering with refined aesthetics.
            </p>
          </div>

          {/* Minimalist Text-Only Filters */}
          <div className="flex flex-wrap gap-6 md:gap-8 border-b border-white/10 pb-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="relative font-mono text-[10px] md:text-[11px] tracking-[0.15em] uppercase pb-2 transition-colors duration-300"
              >
                <span className={filter === cat ? "text-white" : "text-white/30 hover:text-white/70"}>
                  {cat}
                </span>
                
                {/* Underline Indicator */}
                {filter === cat && (
                  <motion.div
                    layoutId="filter-indicator"
                    className="absolute left-0 right-0 bottom-0 h-[1px] bg-white"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Perfect Uniform Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
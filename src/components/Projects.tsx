"use client";
import { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image"; // 👈 استدعاء مكتبة الصور
import Reveal from "./Reveal";

const PROJECTS = [
  
  {
    id: "justbeans",
    tag: "Interactive Web",
    name: "Just Beans Coffee",
    desc: "An immersive e-commerce and brand platform featuring 3D tilt mechanics, cinematic parallax scrolling, and staggered reveal animations.",
    monogram: "JB",
    image: "/beans.png", // 👈 ضفنا مسار الصورة هنا (غير الاسم لو صورتك اسمها مختلف)
    color: "#E6D5B8", 
    bg: "linear-gradient(135deg, #0A0A0A, #171512)",
    tech: ["JavaScript", "CSS3D", "UI/UX Architecture"],
    featured: false,
  },
  {
    id: "coresystem",
    tag: "Enterprise App",
    name: "Core System App", // تقدر تغير الاسم لاسم النظام الفعلي
    desc: "A robust cross-platform application system engineered for enterprise management. Features real-time data sync, complex state management, and a seamless native user experience.",
    monogram: "SYS",
    image: "/nizam.jpeg", // 👈 لو عندك صورة للنظام حطها في public وسميها system.jpg، ولو مفيش امسح السطر ده وهيعرض الحروف
    color: "#64748B", // لون رمادي معدني فخم جداً (Slate)
    bg: "linear-gradient(135deg, #0A0A0A, #10141a)", // خلفية ليلية كلاسيكية
    tech: ["Flutter", "Dart", "System Architecture"],
    featured: false, // خليها false عشان يظهر كارت عادي، أو true لو عايزه ياخد عرض الشاشة كلها
  },
  {
    id: "mastery",
    tag: "Corporate Ecosystem",
    name: "Mastery Group",
    desc: "Complete digital presence and architectural brand system for an elite software and consulting firm. Designed for enterprise scalability.",
    monogram: "MG",
    image: "/mastery-group.jpeg",
    color: "#D4AF37", 
    bg: "linear-gradient(135deg, #0A0A0A, #1A170C)",
    tech: ["System Design", "React", "Next.js"],
    featured: true, 
  },
];

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative border border-border bg-[#0a0a0a]/40 backdrop-blur-sm overflow-hidden transition-all duration-700 hover:border-accent/40 ${
        project.featured ? "md:col-span-2 flex flex-col md:flex-row" : "flex flex-col"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${project.color}15,
              transparent 80%
            )
          `,
        }}
      />

      {/* منطقة العرض (Preview) */}
      <div
        className={`relative overflow-hidden flex items-center justify-center border-border/30 ${
          project.featured ? "md:w-1/2 md:border-r border-b md:border-b-0 h-64 md:h-auto" : "h-64 border-b"
        }`}
        style={{ background: project.bg }}
      >
        {/* لو في صورة، هنعرضها، لو مفيش هنعرض الحروف */}
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-bg/40 group-hover:bg-transparent transition-colors duration-700" />
          </>
        ) : (
          <span
            className="font-bebas text-[8rem] tracking-widest opacity-10 text-white transition-all duration-700 group-hover:scale-110 group-hover:opacity-30"
            style={{ color: project.color }}
          >
            {project.monogram}
          </span>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-80" />
      </div>

      <div className={`p-8 md:p-10 flex flex-col justify-between relative z-10 ${project.featured ? "md:w-1/2" : ""}`}>
        <div>
          <div className="flex justify-between items-center mb-4">
            <span 
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-500 group-hover:text-white"
              style={{ color: project.color }}
            >
              {project.tag}
            </span>
            <span className="font-mono text-[0.55rem] tracking-widest text-muted">
              PRJ-0{index + 1}
            </span>
          </div>

          <h3 className="font-syne font-semibold text-2xl text-white mb-4 tracking-wide group-hover:text-accent2 transition-colors duration-300">
            {project.name}
          </h3>

          <p className="font-mono text-[0.7rem] text-muted leading-relaxed mb-8">
            {project.desc}
          </p>
        </div>

        <div className="flex items-end justify-between border-t border-border/40 pt-6 mt-auto">
          <div className="flex gap-2 flex-wrap max-w-[80%]">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[0.55rem] tracking-widest uppercase px-3 py-1.5 bg-white/[0.02] border border-border text-muted transition-colors duration-300 group-hover:border-white/10 group-hover:text-white/70"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted transition-all duration-500 group-hover:border-accent group-hover:text-accent overflow-hidden relative">
            <motion.div
              className="absolute"
              initial={{ x: -20, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </motion.div>
            <motion.div
              className="absolute"
              initial={{ x: 0, opacity: 1 }}
              whileHover={{ x: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-16 bg-surface overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(#2C2926_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <Reveal className="flex items-center gap-5 mb-20 relative z-10">
        <span className="font-mono text-[0.65rem] text-accent tracking-[0.3em]">03</span>
        <div className="h-px w-24 bg-gradient-to-r from-accent/50 to-transparent" />
        <h2 className="font-bebas text-5xl tracking-widest text-white">Featured Case Studies</h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto relative z-10">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
"use client";
import { motion } from "framer-motion";

const SKILLS = [
  "Software Engineering",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "UI/UX Architecture",
];

export default function Marquee() {
  // كررنا المهارات 4 مرات عشان نضمن إن الشريط ميخلصش أبداً على الشاشات الكبيرة
  const duplicatedSkills = [...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS];

  return (
    <div className="relative overflow-hidden border-y border-border/50 py-6 bg-surface flex">
      {/* ظلال أقوى على الأطراف عشان الكلمات تظهر وتختفي بنعومة */}
      <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      {/* شريط التحرك */}
      <motion.div
        className="flex gap-12 whitespace-nowrap w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 35, // بطأنا السرعة شوية عشان تدي إحساس بالفخامة
          repeat: Infinity,
        }}
      >
        {duplicatedSkills.map((item, i) => {
          // حركة تبادلية: كلمة عادية وكلمة مفرغة (Stroke)
          const isOutline = i % 2 !== 0; 

          return (
            <span
              key={i}
              className="font-bebas text-4xl md:text-5xl tracking-[0.08em] flex items-center gap-12 cursor-pointer group"
            >
              <motion.span
                className={`transition-all duration-500 ${
                  isOutline
                    ? "text-transparent"
                    : "text-muted group-hover:text-accent group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                }`}
                style={
                  isOutline
                    ? { WebkitTextStroke: "1px rgba(255,255,255,0.4)" }
                    : {}
                }
                whileHover={
                  isOutline
                    ? { WebkitTextStroke: "1.5px var(--accent)", scale: 1.05 }
                    : { scale: 1.05 }
                }
              >
                {item}
              </motion.span>

              {/* نجمة فاصلة بتدور */}
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-accent opacity-50 text-xl md:text-2xl"
              >
                ✦
              </motion.span>
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}
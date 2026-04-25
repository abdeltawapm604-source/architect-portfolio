"use client";
import { motion } from "framer-motion";

// حطيت لك مهارات تقيلة تعكس خبرتك في الويب والموبايل
const SKILLS = [
  "Software Engineering",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Flutter",
  "Dart",
  "UI/UX Architecture",
  "Cross-Platform Dev",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border py-5 bg-surface flex">
      {/* تأثير التلاشي (Fade) على الأطراف لشكل سينمائي */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

      {/* شريط التحرك بـ Framer Motion */}
      <motion.div
        className="flex gap-10 whitespace-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 25, // تقدر تقلل الرقم لو عايزه أسرع أو تزوده لو عايزه أبطأ
          repeat: Infinity,
        }}
      >
        {/* بنكرر المصفوفة مرتين عشان اللوب (Loop) ميبقاش فيه أي قطع */}
        {[...SKILLS, ...SKILLS].map((item, i) => (
          <span
            key={i}
            className="font-bebas text-2xl tracking-widest text-muted flex items-center gap-10 cursor-default"
          >
            <span className="hover:text-accent transition-colors duration-300">
              {item}
            </span>
            <span className="text-accent opacity-50 text-sm">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
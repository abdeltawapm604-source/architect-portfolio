"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [stage, setStage] = useState(0); // 0: آية, 1: حديث, 2: الموقع يظهر

  useEffect(() => {
    // إيقاف السكرول أثناء عرض شاشة البداية
    document.body.style.overflow = "hidden";

    // بعد 3.5 ثواني نعرض الحديث
    const t1 = setTimeout(() => setStage(1), 3500);
    
    // بعد 7 ثواني نشيل الشاشة كلها ونشغل الموقع
    const t2 = setTimeout(() => {
      setStage(2);
      document.body.style.overflow = ""; // إرجاع السكرول
    }, 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {stage < 2 && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-bg"
        >
          {/* إضاءة خلفية خفيفة */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {/* عرض الآية */}
            {stage === 0 && (
              <motion.div
                key="quran"
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center px-6"
                dir="rtl"
              >
                <h2 className="text-3xl md:text-5xl text-accent2 font-semibold leading-relaxed mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                  ﴿ وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ ﴾
                </h2>
                <p className="text-muted text-sm md:text-base tracking-widest opacity-60">
                  [سورة النجم: ٣٩]
                </p>
              </motion.div>
            )}

            {/* عرض الحديث */}
            {stage === 1 && (
              <motion.div
                key="hadith"
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-center px-6 max-w-4xl"
                dir="rtl"
              >
                <h2 className="text-2xl md:text-4xl text-accent2 font-semibold leading-relaxed mb-6 tracking-wide drop-shadow-lg" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                  « إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ »
                </h2>
                <p className="text-muted text-sm md:text-base tracking-widest opacity-60">
                  صدق رسول الله ﷺ
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
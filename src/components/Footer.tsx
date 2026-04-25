"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-border overflow-hidden pt-20 pb-6 px-6 md:px-12 lg:px-16 flex flex-col items-center">
      
      {/* إضاءة خلفية سينمائية وشبكة */}
      <div className="absolute inset-0 bg-[radial-gradient(#2C2926_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* قسم الدعوة للعمل (Call to Action) - تم تصغير المسافات والخطوط */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center mb-10"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 border border-accent/20 bg-accent/5 rounded-full mb-5 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[0.6rem] tracking-widest uppercase text-accent2">
            Available for freelance & collaborations
          </span>
        </div>
        
        <h2 className="font-syne text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Let's build the <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent2 italic font-serif pr-1">extraordinary.</span>
        </h2>
        
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3.5 bg-white text-black font-bebas text-xl tracking-widest hover:bg-accent hover:text-white transition-colors duration-300 clip-br"
        >
          START A PROJECT
        </motion.a>
      </motion.div>

      {/* الاسم العملاق - تم تصغيره عشان مياخدش نص الشاشة */}
      <div className="relative w-full flex justify-center items-center overflow-hidden mb-6 pointer-events-none select-none">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-bebas text-[clamp(3rem,12vw,10rem)] leading-[0.8] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white/10 to-transparent"
        >
          ABDELTAWAP
        </motion.h1>
      </div>

      {/* شريط سفلي زجاجي عائم - ملموم أكتر */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-3 md:py-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl md:rounded-full rounded-2xl">
          
          {/* حقوق النشر */}
          <div className="font-mono text-[0.55rem] md:text-[0.6rem] text-muted tracking-widest uppercase text-center md:text-left">
            © {new Date().getFullYear()} Abdeltawap Tarek.<br className="md:hidden" /> All Rights Reserved.
          </div>

          {/* اللوكيشن */}
          <div className="font-mono text-[0.55rem] md:text-[0.6rem] text-white/40 tracking-widest uppercase hidden md:block">
            ISTANBUL, TÜRKİYE
          </div>

          {/* زر العودة للأعلى */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 font-mono text-[0.55rem] md:text-[0.6rem] tracking-widest uppercase text-white hover:text-accent transition-colors"
          >
            Back to top
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <svg 
                width="10" 
                height="10" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="rotate-[-90deg] group-hover:-translate-y-1 transition-transform"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
          
        </div>
      </div>
    </footer>
  );
}
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export function Envelope() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Connect scroll to animation progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for a weighted feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    mass: 0.8
  });

  // Animation Maps
  // 0-30%: Open Flap
  const flapRotate = useTransform(smoothProgress, [0, 0.3], [0, 180]);
  const flapZIndex = useTransform(smoothProgress, [0, 0.29, 0.3], [30, 30, 1]); // Move flap behind after opening
  
  // 30-40%: Wax Seal Fade
  const sealOpacity = useTransform(smoothProgress, [0.1, 0.25], [1, 0]);
  
  // 40-100%: Letter Slide & Scale
  // Letter moves UP relative to envelope (negative Y)
  const letterY = useTransform(smoothProgress, [0.3, 0.8], ["0%", "-120%"]); 
  const letterScale = useTransform(smoothProgress, [0.6, 1], [0.9, 1.1]);
  const letterOpacity = useTransform(smoothProgress, [0.2, 0.3], [0, 1]);

  // Envelope Body fade out at the very end to focus on letter
  const envelopeOpacity = useTransform(smoothProgress, [0.85, 0.95], [1, 0]);

  return (
    <div ref={containerRef} className="h-[300vh] w-full relative bg-[#F9F7F2]">
      {/* Sticky Container - Holds the scene in place while scrolling */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden perspective-1000">
        
        {/* ENVELOPE CONTAINER */}
        <motion.div 
          className="relative w-[340px] md:w-[400px] h-[240px] md:h-[280px]"
          style={{ opacity: envelopeOpacity }}
        >
          
          {/* LETTER (Initially hidden inside) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[90%] h-[140%] bg-paper shadow-lg flex flex-col items-center justify-center p-8 text-center origin-bottom z-10"
            style={{
              top: "10px", // Just peeking out slightly
              y: letterY,
              scale: letterScale,
              opacity: letterOpacity,
              border: "1px solid rgba(139, 0, 0, 0.1)"
            }}
          >
             {/* Use higher res texture logic in CSS */}
            <div className="absolute inset-2 border border-[#8B0000]/30 pointer-events-none" />
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-10 w-full flex flex-col items-center"
            >
              <h1 className="text-3xl md:text-4xl font-script text-[#8B0000] mb-8">My Dearest,</h1>
              <div className="flex flex-col items-center gap-4">
                <p className="font-script text-2xl md:text-3xl leading-relaxed text-[#3E2723] uppercase tracking-wide">
                  COME HOME BABY, I MISS YOU SM
                </p>
                <p className="font-script text-xl md:text-2xl text-[#8B0000] mt-4">
                  LOVE, MEANIE
                </p>
              </div>
              <div className="mt-12 flex justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#8B0000" className="opacity-80">
                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </motion.div>
          </motion.div>


          {/* ENVELOPE BACK (The static part behind everything) */}
          <div className="absolute inset-0 bg-[#E8E0D5] rounded-b-lg shadow-xl z-0 overflow-hidden border border-[#D6CBB8]">
             {/* Back Texture/Text */}
             <div className="absolute bottom-4 left-0 right-0 text-center opacity-60">
                <p className="text-[10px] tracking-[0.2em] font-serif text-[#5D4037] uppercase">COME HOME BABY, I MISS YOU SM</p>
                <p className="text-[10px] tracking-[0.2em] font-serif text-[#5D4037] uppercase mt-2 italic">LOVE, MEANIE</p>
             </div>
          </div>


          {/* ENVELOPE FLAP (The part that rotates) */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 origin-top z-30 preserve-3d"
            style={{ 
              rotateX: flapRotate,
              zIndex: flapZIndex
            }}
          >
            {/* Front of Flap (Closed state color) */}
            <div className="absolute inset-0 bg-[#F0EBE0] rounded-t-none" 
                 style={{ 
                   clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                   backfaceVisibility: "hidden",
                   borderTop: "1px solid #D6CBB8"
                 }} 
            />
            
            {/* Back of Flap (Inside color, visible when open) */}
            <div className="absolute inset-0 bg-[#E8E0D5] rounded-t-none rotate-x-180" 
                 style={{ 
                   clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                 }} 
            />
          </motion.div>


          {/* ENVELOPE FRONT (The bottom pocket) */}
          <div className="absolute bottom-0 left-0 w-full h-full z-20 pointer-events-none">
             <div className="w-full h-full"
                  style={{
                    background: "linear-gradient(to bottom right, #F0EBE0 50%, transparent 50%), linear-gradient(to bottom left, #F0EBE0 50%, transparent 50%)",
                    clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                    filter: "drop-shadow(0 -2px 2px rgba(0,0,0,0.05))"
                  }}
             >
                <div className="absolute bottom-6 w-full text-center">
                   <p className="text-xs font-serif tracking-widest text-[#8B0000]/80">LOVE, MEANIE</p>
                </div>
             </div>
          </div>


          {/* WAX SEAL */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-16 h-16 rounded-full flex items-center justify-center shadow-md"
            style={{ 
              opacity: sealOpacity,
              background: "radial-gradient(circle at 30% 30%, #A52A2A, #8B0000)"
            }}
          >
            <div className="w-12 h-12 rounded-full border-2 border-[#5a0000]/20 flex items-center justify-center">
               <span className="font-script text-2xl text-[#5a0000]/60 font-bold">M</span>
            </div>
            {/* Realistic wax drip effect */}
            <div className="absolute -bottom-1 right-2 w-3 h-3 bg-[#8B0000] rounded-full" />
            <div className="absolute -top-1 left-2 w-2 h-2 bg-[#8B0000] rounded-full" />
          </motion.div>

        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div 
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
           style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#8B0000]/60">SCROLL TO OPEN ME BABY</span>
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[#8B0000]/0 via-[#8B0000]/40 to-[#8B0000]/0"
          />
        </motion.div>
      </div>
    </div>
  );
}

import { AudioPlayer } from "@/components/AudioPlayer";
import { Envelope } from "@/components/Envelope";
import { useLogInteraction } from "@/hooks/use-interactions";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const { mutate: logInteraction } = useLogInteraction();

  useEffect(() => {
    logInteraction('open');
  }, [logInteraction]);

  return (
    <div className="min-h-screen bg-paper overflow-hidden selection:bg-[#8B0000]/10 selection:text-[#8B0000]">
      {/* Decorative corners */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none opacity-20 bg-[url('https://pixabay.com/get/g246d0db1a1532c409e6fc1f20916459db5cffa621fd420df877bfc85bbeb3baca50d84542188d4db4f661f55ddd49fef2dfd43c9fcb7f7380ff7e89174d22b05_1280.jpg')] bg-no-repeat bg-contain rotate-180 mix-blend-multiply z-0" />
      <div className="fixed bottom-0 right-0 w-48 h-48 pointer-events-none opacity-20 bg-[url('https://pixabay.com/get/g246d0db1a1532c409e6fc1f20916459db5cffa621fd420df877bfc85bbeb3baca50d84542188d4db4f661f55ddd49fef2dfd43c9fcb7f7380ff7e89174d22b05_1280.jpg')] bg-no-repeat bg-contain mix-blend-multiply z-0" />

      {/* Main Content */}
      <main className="relative z-10">
        <Envelope />
      </main>

      {/* Persistent Audio Player */}
      <AudioPlayer />
      
      {/* Overlay Grain for Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
}

import { useState, useEffect, useCallback } from "react";
import { Howl } from "howler";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogInteraction } from "@/hooks/use-interactions";

export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [howl, setHowl] = useState<Howl | null>(null);
  const { mutate: logInteraction } = useLogInteraction();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const sound = new Howl({
      src: ["/music.mp3"], // Expects this file in public/
      loop: true,
      volume: 0.5,
      html5: true,
      onloaderror: (_id, err) => console.error("Audio load error:", err),
    });
    setHowl(sound);

    return () => {
      sound.unload();
    };
  }, []);

  const togglePlay = () => {
    if (!howl) return;
    if (playing) {
      howl.pause();
    } else {
      howl.play();
    }
    setPlaying(!playing);
  };

  // Attempt autoplay on first user interaction
  const handleFirstInteraction = useCallback(() => {
    if (hasStarted || !howl) return;
    
    howl.play();
    setPlaying(true);
    setHasStarted(true);
    logInteraction('play');

    // Remove listeners once started
    window.removeEventListener('scroll', handleFirstInteraction);
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
  }, [hasStarted, howl, logInteraction]);

  useEffect(() => {
    window.addEventListener('scroll', handleFirstInteraction);
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    return () => {
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [handleFirstInteraction]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 right-6 z-50 bg-[#8B0000]/10 hover:bg-[#8B0000]/20 p-3 rounded-full backdrop-blur-sm transition-colors duration-300"
      onClick={togglePlay}
      aria-label={playing ? "Mute music" : "Play music"}
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.div
            key="on"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <Volume2 className="w-6 h-6 text-[#8B0000]" />
          </motion.div>
        ) : (
          <motion.div
            key="off"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <VolumeX className="w-6 h-6 text-[#8B0000]/70" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

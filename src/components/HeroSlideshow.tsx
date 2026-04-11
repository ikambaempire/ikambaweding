import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80",
    title: "Capturing Love",
    subtitle: "CREATING TIMELESS MEMORIES",
  },
  {
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&q=80",
    title: "Romantic & Timeless",
    subtitle: "\"WHERE EVERY FRAME FEELS LIKE FOREVER\"",
  },
  {
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1920&q=80",
    title: "Heartfelt Moments",
    subtitle: "YOUR LOVE STORY, BEAUTIFULLY TOLD",
  },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 md:pb-28 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground leading-none mb-4">
              {slides[current].title}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-primary-foreground/70 tracking-[0.3em] uppercase">
              {slides[current].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-8" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-primary-foreground/50 hover:text-primary-foreground transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={36} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-primary-foreground/50 hover:text-primary-foreground transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={36} />
      </button>

      {/* Slide counter */}
      <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-10 hidden md:flex flex-col items-end">
        <span className="text-4xl font-display font-bold text-primary-foreground/80">{String(current + 1).padStart(2, "0")}</span>
        <div className="w-px h-8 bg-primary-foreground/30 my-1" />
        <span className="text-sm text-primary-foreground/40">{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
};

export default HeroSlideshow;

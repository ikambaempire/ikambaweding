import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import couple4 from "@/assets/couple-4.jpg";
import couple5 from "@/assets/couple-5.jpg";
import couple6 from "@/assets/couple-6.jpg";
import couple7 from "@/assets/couple-7.jpg";

const images = [couple1, couple2, couple3, couple4, couple5, couple6, couple7];

const StorySection = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-card/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={idx}
                src={images[idx]}
                alt="Ikamba Wedding moments"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-8 bg-primary" : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm tracking-[0.4em] text-primary uppercase mb-4">Our Story</h2>
            <p className="text-2xl md:text-3xl font-display text-foreground leading-snug mb-6">
              Welcome to <span className="text-primary font-semibold">"IKAMBA WEDDING"</span> where every frame feels like forever.
            </p>
            <p className="text-muted-foreground font-serif leading-relaxed text-base md:text-lg mb-5">
              We believe wedding photography should be more than posed smiles and pretty backdrops.
              It should reflect the real, the raw, and the romantic.
            </p>
            <p className="text-primary/80 font-serif italic text-lg md:text-xl mb-8">
              This is your story. Let's preserve it, poetically.
            </p>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 rounded-none px-10 py-6 tracking-widest text-xs uppercase"
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;

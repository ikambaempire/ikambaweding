import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import w1 from "@/assets/wedding-1.jpg";
import w2 from "@/assets/wedding-2.jpg";
import w3 from "@/assets/wedding-3.jpg";
import w4 from "@/assets/wedding-4.jpg";
import w5 from "@/assets/wedding-5.jpg";
import w8 from "@/assets/wedding-8.jpg";

const slides = [w1, w2, w3, w4, w5, w8];

const StoryShowcase = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[index]}
                src={slides[index]}
                alt="Ikamba Wedding moment"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-primary-foreground/40"}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center lg:text-left"
          >
            <p className="text-xs tracking-[0.4em] text-primary uppercase mb-4">Our Story</p>
            <p className="text-muted-foreground font-serif leading-relaxed text-base md:text-lg mb-5">
              Welcome to <span className="text-primary font-semibold">"IKAMBA WEDDING"</span> — where every frame feels like forever.
            </p>
            <p className="text-muted-foreground font-serif leading-relaxed text-base md:text-lg mb-5">
              We believe wedding photography should be more than posed smiles and pretty backdrops.
              It should reflect the real, the raw, and the romantic.
            </p>
            <p className="text-primary/80 font-serif italic text-lg md:text-xl mb-10">
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

export default StoryShowcase;

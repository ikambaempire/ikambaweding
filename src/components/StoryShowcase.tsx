import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import couple from "@/assets/welcome-couple.jpg";

const StoryShowcase = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Single image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
          >
            <img
              src={couple}
              alt="iKAMBA Wedding moment"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
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
              Welcome to <span className="text-primary font-semibold">"iKAMBA WEDDING"</span> — where every frame feels like forever.
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

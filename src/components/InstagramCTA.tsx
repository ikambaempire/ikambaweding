import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const InstagramCTA = () => (
  <section className="py-16 bg-background">
    <div className="container text-center">
      <motion.a
        href="https://www.instagram.com/ikambawedding"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex flex-col items-center gap-3 group"
      >
        <Instagram size={28} className="text-primary group-hover:scale-110 transition-transform" />
        <span className="text-sm tracking-[0.3em] text-muted-foreground uppercase">Instagram</span>
        <div className="w-12 h-px bg-border group-hover:bg-primary transition-colors" />
        <span className="text-lg font-display text-foreground group-hover:text-primary transition-colors">
          @ikambawedding
        </span>
      </motion.a>
    </div>
  </section>
);

export default InstagramCTA;

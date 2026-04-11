import { motion } from "framer-motion";

const QuoteSection = () => (
  <section className="relative py-32 md:py-40 overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1920&q=80"
        alt="Wedding atmosphere"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
    </div>

    <div className="relative z-10 container max-w-3xl mx-auto text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-12 h-px bg-primary mx-auto mb-8" />
        <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display italic text-primary-foreground leading-snug mb-8">
          "I have found the one whom my soul loves"
        </blockquote>
        <div className="w-12 h-px bg-primary mx-auto mb-6" />
        <p className="text-primary-foreground/50 tracking-[0.4em] text-xs uppercase">
          — Light. Emotion. Forever.
        </p>
      </motion.div>
    </div>
  </section>
);

export default QuoteSection;

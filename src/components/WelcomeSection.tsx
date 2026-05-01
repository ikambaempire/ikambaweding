import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const WelcomeSection = () => (
  <section className="py-24 md:py-32 bg-background">
    <div className="container max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="text-sm md:text-base text-primary mb-8 font-serif italic leading-relaxed">
          With a fine-art eye and a heart for storytelling, we capture love in its most natural light<br />
          The in-between glances, gentle hands, joyful tears, and glowing moments you'll cherish<br />
          for a lifetime.
        </p>

        <img src={logo} alt="Ikamba Wedding Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain mx-auto mb-6" />

        <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-2">
          W E L C O M E
        </h2>
        <div className="w-16 h-px bg-primary mx-auto my-6" />
      </motion.div>
    </div>
  </section>
);

export default WelcomeSection;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

        <p className="text-muted-foreground font-serif leading-relaxed text-base md:text-lg max-w-2xl mx-auto mb-4">
          Welcome to <span className="text-primary font-semibold">"IKAMBA WEDDING"</span> where every frame feels like forever.
        </p>
        <p className="text-muted-foreground font-serif leading-relaxed text-base md:text-lg max-w-2xl mx-auto mb-4">
          We believe wedding photography should be more than posed smiles and pretty backdrops. 
          It should reflect the real, the raw, and the romantic.
        </p>
        <br />
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
  </section>
);

export default WelcomeSection;

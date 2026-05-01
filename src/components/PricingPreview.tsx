import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPackages, Package } from "@/lib/storage";

const PricingPreview = () => {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    getPackages(true).then(setPackages);
  }, []);

  if (packages.length === 0) return null;

  return (
    <section className="py-20 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Our <span className="text-primary">Packages</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Choose the perfect package for your wedding day. Custom packages also available.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-xl p-6 border ${
                pkg.isPopular
                  ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                  : "border-border bg-background"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} /> Most Popular
                </div>
              )}
              <h3 className="font-display font-bold text-xl text-foreground mb-1">{pkg.name}</h3>
              <p className="text-2xl font-bold text-primary mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild className={`w-full rounded-full ${pkg.isPopular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"}`}>
                <Link to="/booking">Get Quote</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPreview;

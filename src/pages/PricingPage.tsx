import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPackages, Package } from "@/lib/storage";

const PricingPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    getPackages(true).then(setPackages);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-3">
              Our <span className="text-primary">Packages</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Transparent pricing for every wedding style. Custom packages available upon request.
            </p>
          </motion.div>

          {packages.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No packages available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`relative rounded-2xl p-8 border ${
                    pkg.isPopular ? "border-primary bg-primary/5 shadow-xl shadow-primary/10" : "border-border bg-card"
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1">
                      <Star size={12} /> Most Popular
                    </div>
                  )}
                  <h3 className="font-display font-bold text-2xl text-foreground">{pkg.name}</h3>
                  {pkg.subtitle && <p className="text-muted-foreground text-sm mb-4">{pkg.subtitle}</p>}
                  <p className="text-3xl font-bold text-primary mb-6">{pkg.price}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check size={16} className="text-primary flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className={`w-full rounded-full py-6 ${pkg.isPopular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"}`}>
                    <Link to="/booking">Get Quote</Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-12">
            <p className="text-muted-foreground text-sm">
              Need something custom? <Link to="/booking" className="text-primary hover:underline">Contact us</Link> and we'll create a tailored package just for you.
            </p>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;

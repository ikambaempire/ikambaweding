import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Vendor } from "@/data/mockData";

interface VendorCardProps {
  vendor: Vendor;
  index?: number;
}

const VendorCard = ({ vendor, index = 0 }: VendorCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-RW", {
      style: "currency",
      currency: "RWF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={`/vendor/${vendor.id}`} className="group block">
        <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {vendor.featured && (
              <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-semibold text-card-foreground truncate">
                {vendor.name}
              </h3>
              <div className="flex items-center gap-1 shrink-0">
                <Star size={14} className="fill-accent text-accent" />
                <span className="text-sm font-medium text-card-foreground">
                  {vendor.rating}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({vendor.reviewCount})
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{vendor.location}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">
                From {formatPrice(vendor.startingPrice)}
              </span>
              <span className="text-xs text-primary font-medium group-hover:underline">
                View Profile →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default VendorCard;

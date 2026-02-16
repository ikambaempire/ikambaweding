import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  MessageCircle,
  Calendar,
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { vendors, categories } from "@/data/mockData";

const galleryImages = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400",
  "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=400",
  "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=400",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=400",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400",
  "https://images.unsplash.com/photo-1555244162-803834f70033?w=400",
];

const packages = [
  {
    name: "Essential",
    price: 300000,
    features: ["4 hours coverage", "100 edited photos", "Online gallery", "1 photographer"],
  },
  {
    name: "Premium",
    price: 600000,
    features: [
      "8 hours coverage",
      "300 edited photos",
      "Online gallery",
      "2 photographers",
      "Engagement shoot",
      "Photo album",
    ],
    popular: true,
  },
  {
    name: "Luxury",
    price: 1000000,
    features: [
      "Full day coverage",
      "500+ edited photos",
      "Online gallery",
      "2 photographers",
      "Engagement shoot",
      "Premium album",
      "Canvas prints",
      "Same-day edits",
    ],
  },
];

const reviews = [
  { name: "Marie C.", rating: 5, text: "Absolutely incredible service! They captured every moment beautifully. Highly recommend!", date: "2 weeks ago" },
  { name: "Jean-Paul K.", rating: 5, text: "Professional, creative, and so easy to work with. Our photos are stunning.", date: "1 month ago" },
  { name: "Claudine N.", rating: 4, text: "Great experience overall. The team was punctual and delivered on time.", date: "2 months ago" },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-RW", { style: "currency", currency: "RWF", maximumFractionDigits: 0 }).format(price);

const VendorProfile = () => {
  const { id } = useParams();
  const vendor = vendors.find((v) => v.id === id) || vendors[0];
  const category = categories.find((c) => c.id === vendor.category);

  return (
    <Layout>
      {/* Cover */}
      <div className="relative h-64 md:h-80">
        <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <Button variant="secondary" size="sm" asChild>
            <Link to="/vendors">
              <ArrowLeft size={16} className="mr-1" /> Back
            </Link>
          </Button>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="icon" className="w-9 h-9">
            <Heart size={16} />
          </Button>
          <Button variant="secondary" size="icon" className="w-9 h-9">
            <Share2 size={16} />
          </Button>
        </div>
      </div>

      <div className="container pb-16">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="-mt-12 relative z-10 bg-card rounded-xl shadow-card p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-card-foreground">
                  {vendor.name}
                </h1>
                <CheckCircle size={20} className="text-primary shrink-0" />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="bg-teal-light text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {category?.label}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {vendor.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="fill-accent text-accent" /> {vendor.rating} ({vendor.reviewCount} reviews)
                </span>
              </div>
              <p className="text-muted-foreground max-w-xl">{vendor.description}</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <Button size="lg" className="font-semibold">
                <Calendar size={18} className="mr-2" /> Book Now
              </Button>
              <Button size="lg" variant="outline">
                <MessageCircle size={18} className="mr-2" /> Chat
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="text-xl font-display font-bold text-foreground mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {vendor.description} We have been serving couples in Kigali and across Rwanda for over 5 years, 
                bringing passion, creativity, and professionalism to every wedding we are part of. Our team is 
                dedicated to making your special day truly unforgettable with attention to every detail.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Clock size={20} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold text-foreground">5+ Years</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Users size={20} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold text-foreground">200+</p>
                  <p className="text-xs text-muted-foreground">Weddings</p>
                </div>
                <div className="bg-muted rounded-lg p-4 text-center">
                  <Star size={20} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm font-semibold text-foreground">{vendor.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </section>

            {/* Gallery */}
            <section>
              <h2 className="text-xl font-display font-bold text-foreground mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {galleryImages.map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="aspect-square rounded-lg overflow-hidden"
                  >
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-display font-bold text-foreground mb-4">Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <div key={i} className="bg-card rounded-lg p-5 shadow-soft">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {review.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-sm text-card-foreground">{review.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} size={12} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Packages */}
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-foreground">Packages</h2>
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl p-5 border ${
                  pkg.popular
                    ? "border-primary bg-teal-light shadow-card"
                    : "border-border bg-card shadow-soft"
                }`}
              >
                {pkg.popular && (
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display font-bold text-lg text-card-foreground">{pkg.name}</h3>
                <p className="text-2xl font-bold text-primary my-2">{formatPrice(pkg.price)}</p>
                <ul className="space-y-2 mb-4">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                  Select Package
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorProfile;

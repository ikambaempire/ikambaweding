import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="iKAMBA Wedding" className="w-10 h-10 object-contain" />
            <span className="font-display font-bold text-foreground text-xl">
              iKAMBA <span className="text-primary">WEDDING</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            We capture your love story with cinematic elegance. Every frame tells the story of your most beautiful day.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[{ to: "/portfolio", label: "Portfolio" }, { to: "/services", label: "Services" }, { to: "/pricing", label: "Pricing" }, { to: "/booking", label: "Book Now" }].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foreground mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <a href="tel:+250780000000" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={14} /> +250 780 000 000
            </a>
            <a href="mailto:info@ikambawedding.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={14} /> info@ikambawedding.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Kigali, Rwanda
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} iKAMBA Wedding. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Made with <Heart size={12} className="text-primary" /> in Rwanda
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

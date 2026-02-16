import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Find Vendors", href: "/vendors" },
    { label: "List Your Business", href: "/register" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
  ],
  Categories: [
    { label: "Venues", href: "/vendors?category=venues" },
    { label: "Photographers", href: "/vendors?category=photographers" },
    { label: "Catering", href: "/vendors?category=catering" },
    { label: "Decorators", href: "/vendors?category=decorators" },
  ],
  Company: [
    { label: "About Us", href: "/#about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">RK</span>
              </div>
              <span className="font-display text-lg font-bold text-background">
                Royal Knot
              </span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Rwanda's premier wedding planning marketplace. Find, book, and manage your dream wedding vendors in one place.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-background mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-background/50 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Royal Knot Rwanda. All rights reserved.
          </p>
          <p className="text-xs text-background/40 flex items-center gap-1">
            Made with <Heart size={12} className="text-primary" /> in Kigali
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

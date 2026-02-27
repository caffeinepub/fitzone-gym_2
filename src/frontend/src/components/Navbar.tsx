import { useState, useEffect } from "react";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Gyms", href: "#gyms" },
  { label: "Equipment", href: "#equipment" },
  { label: "Workouts", href: "#workouts" },
  { label: "Diet", href: "#diet" },
  { label: "Quotes", href: "#quotes" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-gym-orange rounded flex items-center justify-center group-hover:bg-gym-orange-dark transition-colors">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span
              className="text-2xl md:text-3xl font-display text-foreground tracking-wider"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Fit<span className="text-gym-orange">Zone</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gym-orange group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleNavClick("#gyms")}
              className="hidden sm:flex bg-gym-orange hover:bg-gym-orange-dark text-white font-semibold text-sm px-5 py-2 rounded-sm"
              style={{ backgroundColor: "oklch(0.70 0.18 46)" }}
            >
              Join Now
            </Button>
            <button
              type="button"
              className="md:hidden p-2 text-foreground hover:text-gym-orange transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98 backdrop-blur-md animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-gym-orange hover:bg-muted/50 rounded-sm transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick("#gyms")}
              className="mt-3 w-full bg-gym-orange hover:bg-gym-orange-dark text-white font-semibold"
              style={{ backgroundColor: "oklch(0.70 0.18 46)" }}
            >
              Join Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

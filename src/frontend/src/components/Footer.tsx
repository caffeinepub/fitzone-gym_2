import { Zap, Heart, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const footerLinks = {
  "Quick Links": [
    { label: "Home", href: "#home" },
    { label: "Gym Locations", href: "#gyms" },
    { label: "Equipment Shop", href: "#equipment" },
    { label: "Workouts", href: "#workouts" },
    { label: "Diet Planner", href: "#diet" },
    { label: "Quotes", href: "#quotes" },
  ],
  Contact: [
    { label: "info@fitzoneGym.com", href: "#" },
    { label: "(800) FIT-ZONE", href: "#" },
    { label: "Open 24/7 at select locations", href: "#" },
    { label: "New York · Los Angeles", href: "#" },
    { label: "Atlanta · Chicago", href: "#" },
  ],
};

const socialLinks = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Twitter, label: "Twitter/X", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer
      className="relative border-t"
      style={{
        backgroundColor: "oklch(0.10 0.005 260)",
        borderColor: "oklch(0.20 0.008 260)",
      }}
    >
      {/* Top gradient line */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.70 0.18 46), transparent)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-2 mb-4 group"
            >
              <div
                className="w-9 h-9 rounded flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.70 0.18 46)" }}
              >
                <Zap className="w-5 h-5 text-white fill-white" />
              </div>
              <span
                className="text-3xl font-display text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Fit<span style={{ color: "oklch(0.70 0.18 46)" }}>Zone</span>
              </span>
            </button>

            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
              Where champions are forged. FitZone delivers world-class training,
              expert nutrition guidance, and a community that pushes you beyond your limits.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-sm flex items-center justify-center transition-all hover:scale-105"
                  style={{
                    backgroundColor: "oklch(0.20 0.008 260)",
                    color: "oklch(0.70 0.18 46)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.70 0.18 46)";
                    (e.currentTarget as HTMLElement).style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "oklch(0.20 0.008 260)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(0.70 0.18 46)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="font-display text-base text-white mb-4 tracking-wider"
                style={{ fontFamily: "'Bebas Neue', sans-serif", color: "oklch(0.70 0.18 46)" }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(href)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "oklch(0.20 0.008 260)" }}
        >
          <p className="text-xs text-muted-foreground">
            © 2026 FitZone Gym. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Built with{" "}
            <Heart
              className="w-3.5 h-3.5 fill-current"
              style={{ color: "oklch(0.70 0.18 46)" }}
            />{" "}
            using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              style={{ color: "oklch(0.70 0.18 46)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

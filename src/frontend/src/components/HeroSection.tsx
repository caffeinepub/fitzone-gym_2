import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/gym-hero.dim_1920x1080.jpg')`,
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
      {/* Orange accent glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, oklch(0.70 0.18 46 / 0.12) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        {/* Tag line */}
        <div
          className="inline-flex items-center gap-2 border border-gym-orange/50 bg-gym-orange/10 px-4 py-1.5 rounded-full text-gym-orange text-xs font-semibold tracking-widest uppercase mb-8 opacity-0 animate-fade-slide-up"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gym-orange inline-block" />
          No Excuses. Only Results.
        </div>

        {/* Main headline */}
        <h1
          className="font-display text-7xl sm:text-8xl md:text-[10rem] lg:text-[13rem] leading-none text-white opacity-0 animate-fade-slide-up tracking-wider"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            animationDelay: "0.25s",
            animationFillMode: "forwards",
          }}
        >
          FORGE YOUR{" "}
          <span
            className="relative inline-block"
            style={{
              WebkitTextStroke: "2px oklch(0.70 0.18 46)",
              color: "transparent",
            }}
          >
            LEGEND
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="mt-6 text-base md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed opacity-0 animate-fade-slide-up"
          style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
        >
          Transform your body. Elevate your mind.{" "}
          <span className="text-gym-orange font-medium">Dominate every rep.</span>
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0 animate-fade-slide-up"
          style={{ animationDelay: "0.65s", animationFillMode: "forwards" }}
        >
          <Button
            onClick={() => handleScroll("#workouts")}
            className="px-8 py-6 text-base font-semibold text-white rounded-sm shadow-orange-glow"
            style={{
              backgroundColor: "oklch(0.70 0.18 46)",
              letterSpacing: "0.05em",
            }}
          >
            Start Training
          </Button>
          <Button
            onClick={() => handleScroll("#gyms")}
            variant="outline"
            className="px-8 py-6 text-base font-semibold rounded-sm"
            style={{
              borderColor: "oklch(0.70 0.18 46)",
              color: "oklch(0.70 0.18 46)",
              backgroundColor: "transparent",
              letterSpacing: "0.05em",
            }}
          >
            Explore Gyms
          </Button>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mt-16 opacity-0 animate-fade-slide-up"
          style={{ animationDelay: "0.85s", animationFillMode: "forwards" }}
        >
          {[
            { num: "50K+", label: "Active Members" },
            { num: "4", label: "Premium Locations" },
            { num: "200+", label: "Equipment Items" },
            { num: "100+", label: "Workout Programs" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-3xl md:text-4xl font-display text-gym-orange"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {num}
              </div>
              <div className="text-xs text-white/60 tracking-widest uppercase mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => handleScroll("#quotes")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-gym-orange transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}

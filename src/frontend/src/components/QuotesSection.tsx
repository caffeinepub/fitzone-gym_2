import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const QUOTES = [
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
  },
  {
    text: "Push harder than yesterday if you want a different tomorrow.",
    author: "Vincent Williams Jr.",
  },
  {
    text: "Success starts with self-discipline.",
    author: "Unknown",
  },
  {
    text: "Train insane or remain the same.",
    author: "Jade Johnson",
  },
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    author: "Unknown",
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Arnold Schwarzenegger",
  },
  {
    text: "Don't stop when it hurts. Stop when you're done.",
    author: "Unknown",
  },
  {
    text: "Champions aren't made in gyms. Champions are made from something they have deep inside them.",
    author: "Muhammad Ali",
  },
];

const INTERVAL = 5000;

export default function QuotesSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % QUOTES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + QUOTES.length) % QUOTES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const quote = QUOTES[current];

  return (
    <section
      id="quotes"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.008 260) 0%, oklch(0.18 0.012 46) 50%, oklch(0.14 0.008 260) 100%)",
      }}
    >
      {/* Decorative element */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.70 0.18 46), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.70 0.18 46), transparent)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        {/* Section label */}
        <div
          className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ color: "oklch(0.70 0.18 46)" }}
        >
          Daily Fuel
        </div>

        {/* Large quote icon */}
        <div className="flex justify-center mb-8">
          <Quote
            className="w-12 h-12 rotate-180"
            style={{ color: "oklch(0.70 0.18 46 / 0.6)" }}
          />
        </div>

        {/* Quote text */}
        <div
          className="min-h-[120px] flex items-center justify-center"
          style={{ opacity: animating ? 0 : 1, transition: "opacity 0.3s ease" }}
        >
          <blockquote>
            <p
              className="text-2xl md:text-4xl lg:text-5xl text-white leading-tight mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.03em" }}
            >
              "{quote.text}"
            </p>
            <footer
              className="text-sm md:text-base font-medium tracking-widest uppercase"
              style={{ color: "oklch(0.70 0.18 46)" }}
            >
              — {quote.author}
            </footer>
          </blockquote>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            type="button"
            onClick={prev}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-gym-orange hover:text-gym-orange transition-colors"
            style={{ borderColor: "oklch(0.30 0.008 260)" }}
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {QUOTES.map((q, i) => (
              <button
                type="button"
                key={`quote-dot-${q.author}-${q.text.slice(0, 10)}`}
                onClick={() => goTo(i)}
                aria-label={`Go to quote ${i + 1}`}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    i === current
                      ? "oklch(0.70 0.18 46)"
                      : "oklch(0.35 0.008 260)",
                  transform: i === current ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="w-10 h-10 rounded-full border flex items-center justify-center hover:border-gym-orange hover:text-gym-orange transition-colors"
            style={{ borderColor: "oklch(0.30 0.008 260)" }}
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFAQs } from "../hooks/useQueries";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
}

const FALLBACK_QA: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ["days", "train", "week", "how many", "often"],
    answer: "Beginners: 3 days, Intermediate: 4-5 days, Advanced: 5-6 days. Always include at least 1-2 rest days for recovery. 💪",
  },
  {
    keywords: ["eat before", "pre workout", "before workout", "before training"],
    answer: "Eat a balanced meal 2-3 hours before, or a light snack (banana, oats) 30-60 minutes before. Include carbs for energy and some protein. 🍌",
  },
  {
    keywords: ["lose weight", "weight loss", "fat", "slim"],
    answer: "Focus on a calorie deficit (eat less than you burn), combine cardio and strength training, stay hydrated, and get 7-8 hours sleep. 🏃",
  },
  {
    keywords: ["abs", "stomach", "core", "six pack"],
    answer: "Planks, bicycle crunches, leg raises, and mountain climbers are highly effective. Remember: abs are made in the kitchen too! 🔥",
  },
  {
    keywords: ["protein", "how much protein", "intake"],
    answer: "Aim for 1.6-2.2g of protein per kg of bodyweight for muscle building. Good sources: chicken, eggs, legumes, Greek yogurt. 🥩",
  },
  {
    keywords: ["how long", "workout duration", "long should"],
    answer: "45-75 minutes is ideal for most people. Quality over quantity — focus on intensity rather than duration. ⏱️",
  },
  {
    keywords: ["home workout", "equipment", "home gym"],
    answer: "Dumbbells, resistance bands, and a pull-up bar cover most exercises. A jump rope is great for cardio. 🏠",
  },
  {
    keywords: ["sore", "soreness", "doms", "muscle pain", "recovery"],
    answer: "Warm up properly, cool down with stretching, stay hydrated, get enough sleep, and consider foam rolling. 🧘",
  },
  {
    keywords: ["beginner", "start", "new", "routine for beginner"],
    answer: "Start with 3 days/week full-body workouts. Include compound movements: squats, deadlifts, bench press, rows, overhead press. 🌱",
  },
  {
    keywords: ["sleep", "rest", "muscle growth", "recover"],
    answer: "Very important! Most muscle repair and growth happens during sleep. Aim for 7-9 hours per night. 😴",
  },
  {
    keywords: ["hello", "hi", "hey", "start", "help"],
    answer: "Hey there! 💪 I'm FitZone AI. Ask me anything about training, nutrition, recovery, or equipment!",
  },
  {
    keywords: ["diet", "meal", "food", "eat"],
    answer: "Use our Diet Planner section above to get a personalized meal plan! Generally: prioritize whole foods, lean proteins, complex carbs, and healthy fats. 🥗",
  },
  {
    keywords: ["gym", "location", "where", "near me", "branch"],
    answer: "FitZone has 4 locations: Downtown NY, Westside LA, Midtown Atlanta, and North Chicago. Check the Gyms section for details! 📍",
  },
  {
    keywords: ["price", "cost", "membership", "fee", "join"],
    answer: "FitZone memberships start at $39/month. Premium all-access plans available at $79/month. Visit any location to sign up! 💳",
  },
];

const GREETING: Message = {
  id: "greeting",
  role: "bot",
  text: "Hey! I'm FitZone AI 🤖💪 Your personal fitness assistant. Ask me anything about training, nutrition, equipment, or recovery!",
};

function getBotResponse(message: string): string {
  const lower = message.toLowerCase();
  for (const qa of FALLBACK_QA) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return "Great question! 🤔 I'm still learning, but I'd recommend speaking with one of our certified trainers at any FitZone location for personalized advice. Is there anything else I can help with?";
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: "oklch(0.70 0.18 46 / 0.2)" }}
      >
        <Bot className="w-4 h-4" style={{ color: "oklch(0.70 0.18 46)" }} />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
        style={{ backgroundColor: "oklch(0.22 0.008 260)" }}
      >
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full inline-block animate-typing-dot"
            style={{
              backgroundColor: "oklch(0.50 0.008 260)",
              animationDelay: `${(i - 1) * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: faqs } = useFAQs();

  const msgCount = messages.length;
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [msgCount, isTyping]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const findAnswerFromFAQs = (question: string): string | null => {
    if (!faqs || faqs.length === 0) return null;
    const lower = question.toLowerCase();
    for (const faq of faqs) {
      const keywords = faq.question.toLowerCase().split(" ").filter((w) => w.length > 3);
      if (keywords.some((kw) => lower.includes(kw))) {
        return faq.answer;
      }
    }
    return null;
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const faqAnswer = findAnswerFromFAQs(text);
      const answer = faqAnswer ?? getBotResponse(text);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: answer,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-4 md:right-6 z-50 w-80 md:w-96 rounded-lg overflow-hidden border animate-slide-in-right"
          style={{
            backgroundColor: "oklch(0.14 0.008 260)",
            borderColor: "oklch(0.28 0.008 260)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            maxHeight: "480px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b shrink-0"
            style={{
              backgroundColor: "oklch(0.70 0.18 46)",
              borderColor: "oklch(0.62 0.18 46)",
            }}
          >
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-white" />
              <div>
                <div className="text-sm font-semibold text-white">FitZone AI</div>
                <div className="text-xs text-white/80">Personal Fitness Assistant</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors text-white"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1" style={{ height: "320px" }}>
            <div ref={scrollRef as React.RefObject<HTMLDivElement>} className="p-4 space-y-3 overflow-y-auto" style={{ height: "320px" }}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.role === "bot" && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "oklch(0.70 0.18 46 / 0.2)" }}
                    >
                      <Bot className="w-3.5 h-3.5" style={{ color: "oklch(0.70 0.18 46)" }} />
                    </div>
                  )}
                  <div
                    className="max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            backgroundColor: "oklch(0.70 0.18 46)",
                            color: "white",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            backgroundColor: "oklch(0.22 0.008 260)",
                            color: "oklch(0.90 0.005 260)",
                            borderBottomLeftRadius: "4px",
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </ScrollArea>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-3 border-t shrink-0"
            style={{ borderColor: "oklch(0.22 0.008 260)", backgroundColor: "oklch(0.16 0.008 260)" }}
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              className="flex-1 h-9 text-xs rounded-full border-0"
              style={{
                backgroundColor: "oklch(0.22 0.008 260)",
                color: "oklch(0.90 0.005 260)",
              }}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all disabled:opacity-40"
              style={{ backgroundColor: "oklch(0.70 0.18 46)" }}
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-4 md:right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-orange-glow transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: "oklch(0.70 0.18 46)" }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white fill-white" />
        )}
      </button>
    </>
  );
}

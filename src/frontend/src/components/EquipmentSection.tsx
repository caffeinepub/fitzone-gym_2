import { ShoppingCart, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useEquipment } from "../hooks/useQueries";
import type { Equipment } from "../backend.d";

const FALLBACK_EQUIPMENT: Equipment[] = [
  { name: "Olympic Barbell", description: "Professional grade 20kg Olympic barbell", category: "Weights", price: BigInt(189) },
  { name: "Adjustable Dumbbells", description: "5-50kg adjustable dumbbell set", category: "Weights", price: BigInt(349) },
  { name: "Pull-Up Bar", description: "Heavy-duty doorframe pull-up bar", category: "Bodyweight", price: BigInt(49) },
  { name: "Resistance Bands", description: "Set of 5 resistance bands, various strengths", category: "Accessories", price: BigInt(29) },
  { name: "Kettlebell Set", description: "Cast iron kettlebell set 8kg-24kg", category: "Weights", price: BigInt(220) },
  { name: "Foam Roller", description: "High-density foam roller for recovery", category: "Recovery", price: BigInt(35) },
  { name: "Jump Rope", description: "Speed jump rope with ball bearings", category: "Cardio", price: BigInt(25) },
  { name: "Ab Wheel", description: "Double wheel ab roller with knee pad", category: "Core", price: BigInt(22) },
];

const CATEGORY_COLORS: Record<string, string> = {
  Weights: "oklch(0.65 0.20 27)",
  Bodyweight: "oklch(0.60 0.15 200)",
  Accessories: "oklch(0.70 0.18 46)",
  Recovery: "oklch(0.65 0.15 140)",
  Cardio: "oklch(0.65 0.18 280)",
  Core: "oklch(0.70 0.15 80)",
};

function EquipmentCard({ item }: { item: Equipment }) {
  const categoryColor = CATEGORY_COLORS[item.category] ?? "oklch(0.70 0.18 46)";

  const handleAddToCart = () => {
    toast.success(`${item.name} added to cart!`, {
      description: `$${Number(item.price)} — ready to power your workout.`,
    });
  };

  return (
    <article
      className="group rounded-sm border overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{
        backgroundColor: "oklch(0.16 0.008 260)",
        borderColor: "oklch(0.25 0.008 260)",
      }}
    >
      {/* Placeholder image area */}
      <div
        className="h-32 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, oklch(0.14 0.008 260), oklch(0.20 0.015 46))`,
        }}
      >
        <span
          className="text-5xl font-display group-hover:scale-110 transition-transform duration-300"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            color: `${categoryColor}`,
            opacity: 0.3,
          }}
        >
          {item.name.slice(0, 2).toUpperCase()}
        </span>
        {/* Category badge */}
        <Badge
          className="absolute top-2 left-2 text-xs rounded-sm border-0"
          style={{
            backgroundColor: `${categoryColor}20`,
            color: categoryColor,
          }}
        >
          {item.category}
        </Badge>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-semibold text-white text-sm mb-1 group-hover:text-gym-orange transition-colors line-clamp-1"
        >
          {item.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Tag className="w-3 h-3" style={{ color: "oklch(0.70 0.18 46)" }} />
            <span
              className="text-lg font-bold font-display"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "oklch(0.70 0.18 46)",
              }}
            >
              ${Number(item.price)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="text-xs rounded-sm text-white h-8 px-3"
            style={{ backgroundColor: "oklch(0.70 0.18 46)" }}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function EquipmentSection() {
  const { data, isLoading, isError } = useEquipment();
  const equipment: Equipment[] =
    !isError && data && data.length > 0 ? data : FALLBACK_EQUIPMENT;

  return (
    <section
      id="equipment"
      className="py-20 md:py-28"
      style={{ backgroundColor: "oklch(0.13 0.006 260)" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.70 0.18 46)" }}
          >
            Shop
          </div>
          <h2
            className="text-5xl md:text-7xl font-display text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Pro <span style={{ color: "oklch(0.70 0.18 46)" }}>Equipment</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Professional-grade gear for serious athletes. Train harder with the right tools.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton
                key={i}
                className="h-52 rounded-sm"
                style={{ backgroundColor: "oklch(0.18 0.008 260)" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {equipment.map((item) => (
              <EquipmentCard key={item.name} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

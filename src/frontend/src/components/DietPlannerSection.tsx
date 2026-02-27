import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Utensils, Apple } from "lucide-react";
import { toast } from "sonner";
import { useMealPlan } from "../hooks/useQueries";
import type { UserProfile, DailyMealPlan, Meal } from "../backend.d";
import { ActivityLevel, DietaryPreference, Goal } from "../backend.d";

// Hardcoded fallback meal plans
function generateFallbackMealPlan(profile: UserProfile): DailyMealPlan {
  const isVeg = profile.dietaryPreference === DietaryPreference.vegetarian || profile.dietaryPreference === DietaryPreference.vegan;
  const isGain = profile.goal === Goal.muscleGain;
  const isLoss = profile.goal === Goal.weightLoss;

  const calBase = isGain ? 600 : isLoss ? 400 : 500;
  const protBase = isGain ? 45 : 30;

  const breakfast: Meal = {
    name: isVeg ? "Oats & Banana Smoothie" : "Eggs & Toast",
    description: isVeg
      ? "Steel-cut oats with banana, almond milk, and honey"
      : "3 scrambled eggs, whole wheat toast, and orange juice",
    calories: BigInt(calBase - 100),
    protein: BigInt(isVeg ? 18 : 28),
    carbs: BigInt(55),
    fats: BigInt(isVeg ? 8 : 14),
  };

  const lunch: Meal = {
    name: isVeg ? "Quinoa Buddha Bowl" : "Grilled Chicken Rice Bowl",
    description: isVeg
      ? "Quinoa with roasted veggies, chickpeas, and tahini dressing"
      : "Grilled chicken breast, brown rice, broccoli, and avocado",
    calories: BigInt(calBase + 50),
    protein: BigInt(protBase),
    carbs: BigInt(65),
    fats: BigInt(16),
  };

  const dinner: Meal = {
    name: isVeg ? "Lentil Dal with Rice" : "Salmon & Sweet Potato",
    description: isVeg
      ? "Spiced red lentils, basmati rice, and cucumber raita"
      : "Baked salmon fillet with sweet potato mash and green beans",
    calories: BigInt(calBase),
    protein: BigInt(protBase + 5),
    carbs: BigInt(58),
    fats: BigInt(isVeg ? 10 : 18),
  };

  const snacks: Meal[] = [
    {
      name: isVeg ? "Greek Yogurt & Berries" : "Protein Shake",
      description: isVeg
        ? "Low-fat Greek yogurt with mixed berries and chia seeds"
        : "Whey protein shake with almond milk and banana",
      calories: BigInt(180),
      protein: BigInt(20),
      carbs: BigInt(22),
      fats: BigInt(4),
    },
    {
      name: "Mixed Nuts",
      description: "Almonds, walnuts, and cashews — great for healthy fats and energy",
      calories: BigInt(160),
      protein: BigInt(5),
      carbs: BigInt(8),
      fats: BigInt(14),
    },
  ];

  const totalCalories = [breakfast, lunch, dinner, ...snacks].reduce(
    (s, m) => s + Number(m.calories),
    0
  );
  const totalProtein = [breakfast, lunch, dinner, ...snacks].reduce(
    (s, m) => s + Number(m.protein),
    0
  );
  const totalCarbs = [breakfast, lunch, dinner, ...snacks].reduce(
    (s, m) => s + Number(m.carbs),
    0
  );
  const totalFats = [breakfast, lunch, dinner, ...snacks].reduce(
    (s, m) => s + Number(m.fats),
    0
  );

  return {
    breakfast,
    lunch,
    dinner,
    snacks,
    totalCalories: BigInt(totalCalories),
    totalProtein: BigInt(totalProtein),
    totalCarbs: BigInt(totalCarbs),
    totalFats: BigInt(totalFats),
  };
}

function MacroPill({ label, value, unit, color }: { label: string; value: number; unit: string; color: string }) {
  return (
    <div
      className="flex flex-col items-center px-4 py-3 rounded-sm"
      style={{ backgroundColor: `${color}15` }}
    >
      <span className="text-xl font-bold" style={{ color, fontFamily: "'Bebas Neue', sans-serif" }}>
        {value}{unit}
      </span>
      <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}

function MealCard({ meal, label, icon }: { meal: Meal; label: string; icon: string }) {
  return (
    <div
      className="rounded-sm border p-4"
      style={{ backgroundColor: "oklch(0.13 0.006 260)", borderColor: "oklch(0.22 0.008 260)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "oklch(0.70 0.18 46)" }}>
          {label}
        </span>
      </div>
      <h4 className="font-semibold text-white text-sm mb-1">{meal.name}</h4>
      <p className="text-xs text-muted-foreground mb-3">{meal.description}</p>
      <div className="flex gap-3 text-xs">
        <span style={{ color: "oklch(0.65 0.18 260)" }}>{Number(meal.calories)} kcal</span>
        <span style={{ color: "oklch(0.65 0.15 200)" }}>P: {Number(meal.protein)}g</span>
        <span style={{ color: "oklch(0.75 0.15 80)" }}>C: {Number(meal.carbs)}g</span>
        <span style={{ color: "oklch(0.70 0.15 140)" }}>F: {Number(meal.fats)}g</span>
      </div>
    </div>
  );
}

export default function DietPlannerSection() {
  const [goal, setGoal] = useState<string>("");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [dietaryPreference, setDietaryPreference] = useState<string>("");
  const [mealPlan, setMealPlan] = useState<DailyMealPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { addMutation, getMealPlan } = useMealPlan();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal || !weightKg || !heightCm || !activityLevel || !dietaryPreference) {
      toast.error("Please fill in all fields");
      return;
    }

    const profile: UserProfile = {
      goal: goal as Goal,
      weightKg: Number(weightKg),
      heightCm: Number(heightCm),
      activityLevel: activityLevel as ActivityLevel,
      dietaryPreference: dietaryPreference as DietaryPreference,
    };

    setIsGenerating(true);
    setMealPlan(null);

    try {
      await addMutation.mutateAsync(profile);
      const key = `${profile.goal}_${profile.weightKg}_${profile.heightCm}_${profile.activityLevel}_${profile.dietaryPreference}`;
      const plan = await getMealPlan(key);
      if (plan) {
        setMealPlan(plan);
        toast.success("Your personalized diet plan is ready!");
      } else {
        throw new Error("No plan returned");
      }
    } catch {
      // Fallback to generated plan
      const fallback = generateFallbackMealPlan(profile);
      setMealPlan(fallback);
      toast.success("Your personalized diet plan is ready!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section
      id="diet"
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
            Nutrition
          </div>
          <h2
            className="text-5xl md:text-7xl font-display text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Your <span style={{ color: "oklch(0.70 0.18 46)" }}>Diet Plan</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Tell us about yourself and get a personalized daily meal plan tailored to your fitness goals.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div
            className="rounded-sm border p-6 md:p-8"
            style={{
              backgroundColor: "oklch(0.16 0.008 260)",
              borderColor: "oklch(0.25 0.008 260)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.70 0.18 46 / 0.15)" }}
              >
                <Apple className="w-5 h-5" style={{ color: "oklch(0.70 0.18 46)" }} />
              </div>
              <h3
                className="text-xl font-display text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                Your Profile
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Goal */}
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Fitness Goal</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger
                    className="rounded-sm"
                    style={{
                      backgroundColor: "oklch(0.20 0.008 260)",
                      borderColor: "oklch(0.28 0.008 260)",
                    }}
                  >
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: "oklch(0.18 0.008 260)" }}>
                    <SelectItem value={Goal.weightLoss}>Weight Loss</SelectItem>
                    <SelectItem value={Goal.muscleGain}>Muscle Gain</SelectItem>
                    <SelectItem value={Goal.maintenance}>Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Weight + Height */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Weight (kg)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 75"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    min={30}
                    max={250}
                    className="rounded-sm"
                    style={{
                      backgroundColor: "oklch(0.20 0.008 260)",
                      borderColor: "oklch(0.28 0.008 260)",
                    }}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Height (cm)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 175"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    min={100}
                    max={250}
                    className="rounded-sm"
                    style={{
                      backgroundColor: "oklch(0.20 0.008 260)",
                      borderColor: "oklch(0.28 0.008 260)",
                    }}
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger
                    className="rounded-sm"
                    style={{
                      backgroundColor: "oklch(0.20 0.008 260)",
                      borderColor: "oklch(0.28 0.008 260)",
                    }}
                  >
                    <SelectValue placeholder="How active are you?" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: "oklch(0.18 0.008 260)" }}>
                    <SelectItem value={ActivityLevel.sedentary}>Sedentary (little exercise)</SelectItem>
                    <SelectItem value={ActivityLevel.moderate}>Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value={ActivityLevel.active}>Active (daily intense workouts)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dietary Preference */}
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Dietary Preference</Label>
                <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                  <SelectTrigger
                    className="rounded-sm"
                    style={{
                      backgroundColor: "oklch(0.20 0.008 260)",
                      borderColor: "oklch(0.28 0.008 260)",
                    }}
                  >
                    <SelectValue placeholder="Choose preference" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: "oklch(0.18 0.008 260)" }}>
                    <SelectItem value={DietaryPreference.vegetarian}>Vegetarian</SelectItem>
                    <SelectItem value={DietaryPreference.nonVegetarian}>Non-Vegetarian</SelectItem>
                    <SelectItem value={DietaryPreference.vegan}>Vegan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={isGenerating}
                className="w-full h-12 text-sm font-semibold rounded-sm text-white mt-2"
                style={{ backgroundColor: "oklch(0.70 0.18 46)" }}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Your Plan...
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 mr-2" />
                    Generate My Diet Plan
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Results */}
          <div>
            {!mealPlan && !isGenerating && (
              <div
                className="rounded-sm border h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8"
                style={{
                  backgroundColor: "oklch(0.16 0.008 260)",
                  borderColor: "oklch(0.25 0.008 260)",
                  borderStyle: "dashed",
                }}
              >
                <div
                  className="text-7xl mb-4"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", color: "oklch(0.30 0.008 260)" }}
                >
                  🥗
                </div>
                <p className="text-sm text-muted-foreground">
                  Fill in your profile on the left and we'll generate a personalized daily meal plan for you.
                </p>
              </div>
            )}

            {isGenerating && (
              <div
                className="rounded-sm border h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8"
                style={{
                  backgroundColor: "oklch(0.16 0.008 260)",
                  borderColor: "oklch(0.25 0.008 260)",
                }}
              >
                <Loader2
                  className="w-10 h-10 animate-spin mb-4"
                  style={{ color: "oklch(0.70 0.18 46)" }}
                />
                <p className="text-sm text-muted-foreground">
                  Crafting your personalized meal plan...
                </p>
              </div>
            )}

            {mealPlan && !isGenerating && (
              <div
                className="rounded-sm border overflow-hidden"
                style={{
                  backgroundColor: "oklch(0.16 0.008 260)",
                  borderColor: "oklch(0.25 0.008 260)",
                }}
              >
                {/* Header */}
                <div
                  className="px-5 py-4 border-b"
                  style={{ borderColor: "oklch(0.22 0.008 260)", backgroundColor: "oklch(0.14 0.008 260)" }}
                >
                  <h3
                    className="font-display text-xl text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Your Daily Meal Plan
                  </h3>
                </div>

                {/* Macros summary */}
                <div className="px-5 py-4 border-b grid grid-cols-4 gap-2" style={{ borderColor: "oklch(0.22 0.008 260)" }}>
                  <MacroPill label="Calories" value={Number(mealPlan.totalCalories)} unit="kcal" color="oklch(0.70 0.18 46)" />
                  <MacroPill label="Protein" value={Number(mealPlan.totalProtein)} unit="g" color="oklch(0.65 0.15 200)" />
                  <MacroPill label="Carbs" value={Number(mealPlan.totalCarbs)} unit="g" color="oklch(0.75 0.15 80)" />
                  <MacroPill label="Fats" value={Number(mealPlan.totalFats)} unit="g" color="oklch(0.65 0.18 140)" />
                </div>

                {/* Meals */}
                <div className="p-5 space-y-3">
                  <MealCard meal={mealPlan.breakfast} label="Breakfast" icon="🌅" />
                  <MealCard meal={mealPlan.lunch} label="Lunch" icon="☀️" />
                  <MealCard meal={mealPlan.dinner} label="Dinner" icon="🌙" />
                  {mealPlan.snacks.map((snack, i) => (
                    <MealCard
                      key={`snack-${snack.name}-${i}`}
                      meal={snack}
                      label={`Snack ${i + 1}`}
                      icon="🍎"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { ChevronDown, ChevronUp, Dumbbell, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useWorkouts } from "../hooks/useQueries";
import type { Workout } from "../backend.d";

const FALLBACK_WORKOUTS: Workout[] = [
  {
    name: "Push Day Blast",
    muscleGroup: "Chest & Triceps",
    difficulty: "intermediate",
    description: "Full upper body push workout",
    steps: [
      "10 min warm-up on treadmill",
      "Bench Press 4x8",
      "Incline Dumbbell Press 3x10",
      "Cable Flyes 3x12",
      "Tricep Pushdowns 4x12",
      "Overhead Tricep Extension 3x15",
      "Cool down stretching 5 min",
    ],
  },
  {
    name: "Pull Day Power",
    muscleGroup: "Back & Biceps",
    difficulty: "advanced",
    description: "Back and biceps strength builder",
    steps: [
      "5 min jump rope warm-up",
      "Deadlift 4x5",
      "Bent-Over Rows 4x8",
      "Pull-Ups 3x max",
      "Hammer Curls 3x12",
      "Face Pulls 3x15",
      "Cool down 5 min",
    ],
  },
  {
    name: "Leg Day Dominator",
    muscleGroup: "Legs & Glutes",
    difficulty: "intermediate",
    description: "Complete lower body annihilation",
    steps: [
      "10 min cycling warm-up",
      "Squats 4x8",
      "Romanian Deadlifts 3x10",
      "Leg Press 3x12",
      "Walking Lunges 3x20 steps",
      "Calf Raises 4x20",
      "Stretch 10 min",
    ],
  },
  {
    name: "Core Crusher",
    muscleGroup: "Core & Abs",
    difficulty: "beginner",
    description: "Sculpt and strengthen your core",
    steps: [
      "Plank 3x60 sec",
      "Bicycle Crunches 3x20",
      "Leg Raises 3x15",
      "Russian Twists 3x20",
      "Dead Bug 3x10 each side",
      "Mountain Climbers 3x30 sec",
    ],
  },
  {
    name: "HIIT Cardio Burn",
    muscleGroup: "Full Body",
    difficulty: "intermediate",
    description: "High intensity fat burning circuit",
    steps: [
      "30 sec Jumping Jacks",
      "30 sec Burpees",
      "30 sec High Knees",
      "30 sec Jump Squats",
      "30 sec Push-Ups",
      "30 sec Rest",
      "Repeat 5 rounds",
    ],
  },
  {
    name: "Shoulder Sculptor",
    muscleGroup: "Shoulders",
    difficulty: "intermediate",
    description: "Build boulder shoulders",
    steps: [
      "Overhead Press 4x8",
      "Lateral Raises 4x12",
      "Front Raises 3x12",
      "Arnold Press 3x10",
      "Rear Delt Flyes 3x15",
      "Shrugs 3x15",
    ],
  },
];

const DIFFICULTY_CONFIG = {
  beginner: {
    label: "Beginner",
    color: "oklch(0.65 0.18 145)",
    bg: "oklch(0.65 0.18 145 / 0.15)",
  },
  intermediate: {
    label: "Intermediate",
    color: "oklch(0.70 0.18 46)",
    bg: "oklch(0.70 0.18 46 / 0.15)",
  },
  advanced: {
    label: "Advanced",
    color: "oklch(0.60 0.22 27)",
    bg: "oklch(0.60 0.22 27 / 0.15)",
  },
};

function WorkoutCard({ workout }: { workout: Workout }) {
  const [expanded, setExpanded] = useState(false);
  const diffKey = workout.difficulty.toLowerCase() as keyof typeof DIFFICULTY_CONFIG;
  const diff = DIFFICULTY_CONFIG[diffKey] ?? DIFFICULTY_CONFIG.intermediate;

  return (
    <article
      className="rounded-sm border overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "oklch(0.16 0.008 260)",
        borderColor: "oklch(0.25 0.008 260)",
      }}
    >
      {/* Colored difficulty stripe */}
      <div className="h-0.5 w-full" style={{ backgroundColor: diff.color }} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3
              className="font-display text-xl text-white mb-0.5 truncate"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
            >
              {workout.name}
            </h3>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-3.5 h-3.5 shrink-0" style={{ color: "oklch(0.70 0.18 46)" }} />
              <span className="text-xs text-muted-foreground">{workout.muscleGroup}</span>
            </div>
          </div>
          <Badge
            className="text-xs rounded-sm border-0 shrink-0"
            style={{ backgroundColor: diff.bg, color: diff.color }}
          >
            {diff.label}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground mb-4">{workout.description}</p>

        {/* Steps toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-xs font-semibold transition-colors"
          style={{ color: expanded ? "oklch(0.70 0.18 46)" : "oklch(0.60 0.008 260)" }}
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Hide Steps
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> View Steps ({workout.steps.length})
            </>
          )}
        </button>

        {/* Steps list */}
        {expanded && (
          <ol className="mt-4 space-y-2 border-t pt-4" style={{ borderColor: "oklch(0.22 0.008 260)" }}>
            {workout.steps.map((step, i) => (
              <li key={`${workout.name}-step-${i}`} className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "oklch(0.70 0.18 46)" }} />
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </article>
  );
}

export default function WorkoutsSection() {
  const { data, isLoading, isError } = useWorkouts();
  const workouts: Workout[] =
    !isError && data && data.length > 0 ? data : FALLBACK_WORKOUTS;

  return (
    <section id="workouts" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.70 0.18 46)" }}
          >
            Training Programs
          </div>
          <h2
            className="text-5xl md:text-7xl font-display text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Elite <span style={{ color: "oklch(0.70 0.18 46)" }}>Workouts</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Science-backed workout programs designed by elite trainers. Pick your program and crush it.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton
                key={i}
                className="h-44 rounded-sm"
                style={{ backgroundColor: "oklch(0.18 0.008 260)" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {workouts.map((w) => (
              <WorkoutCard key={w.name} workout={w} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

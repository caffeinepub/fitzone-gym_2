import { useQuery, useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type {
  GymLocation,
  Equipment,
  Workout,
  FAQ,
  UserProfile,
  DailyMealPlan,
} from "../backend.d";

export function useGymLocations() {
  const { actor, isFetching } = useActor();
  return useQuery<GymLocation[]>({
    queryKey: ["gymLocations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listGymLocations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useEquipment() {
  const { actor, isFetching } = useActor();
  return useQuery<Equipment[]>({
    queryKey: ["equipment"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listEquipment();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useWorkouts() {
  const { actor, isFetching } = useActor();
  return useQuery<Workout[]>({
    queryKey: ["workouts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listWorkouts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFAQs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMealPlan() {
  const { actor } = useActor();

  const addMutation = useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      await actor.addMealPlan(profile);
    },
  });

  const getMealPlan = async (key: string): Promise<DailyMealPlan | null> => {
    if (!actor) return null;
    try {
      return await actor.getMealPlan(key);
    } catch {
      return null;
    }
  };

  return { addMutation, getMealPlan };
}

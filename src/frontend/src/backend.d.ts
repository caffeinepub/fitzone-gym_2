import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Meal {
    carbs: bigint;
    fats: bigint;
    calories: bigint;
    name: string;
    description: string;
    protein: bigint;
}
export interface FAQ {
    question: string;
    answer: string;
    category: string;
}
export interface GymLocation {
    hours: string;
    city: string;
    name: string;
    amenities: Array<string>;
    address: string;
    phone: string;
}
export interface Equipment {
    name: string;
    description: string;
    category: string;
    price: bigint;
}
export interface DailyMealPlan {
    totalCarbs: bigint;
    breakfast: Meal;
    totalFats: bigint;
    totalCalories: bigint;
    lunch: Meal;
    snacks: Array<Meal>;
    totalProtein: bigint;
    dinner: Meal;
}
export interface Workout {
    difficulty: string;
    name: string;
    description: string;
    steps: Array<string>;
    muscleGroup: string;
}
export interface UserProfile {
    activityLevel: ActivityLevel;
    heightCm: number;
    goal: Goal;
    weightKg: number;
    dietaryPreference: DietaryPreference;
}
export enum ActivityLevel {
    active = "active",
    sedentary = "sedentary",
    moderate = "moderate"
}
export enum DietaryPreference {
    vegan = "vegan",
    nonVegetarian = "nonVegetarian",
    vegetarian = "vegetarian"
}
export enum Goal {
    weightLoss = "weightLoss",
    muscleGain = "muscleGain",
    maintenance = "maintenance"
}
export interface backendInterface {
    addEquipment(equipment: Equipment): Promise<void>;
    addFAQ(faq: FAQ): Promise<void>;
    addGymLocation(location: GymLocation): Promise<void>;
    addMealPlan(profile: UserProfile): Promise<void>;
    addWorkout(workout: Workout): Promise<void>;
    getEquipment(name: string): Promise<Equipment>;
    getFAQ(question: string): Promise<FAQ>;
    getGymLocation(name: string): Promise<GymLocation>;
    getMealPlan(key: string): Promise<DailyMealPlan>;
    getWorkout(name: string): Promise<Workout>;
    listEquipment(): Promise<Array<Equipment>>;
    listFAQs(): Promise<Array<FAQ>>;
    listGymLocations(): Promise<Array<GymLocation>>;
    listWorkouts(): Promise<Array<Workout>>;
}

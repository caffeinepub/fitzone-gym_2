import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type Goal = { #weightLoss; #muscleGain; #maintenance };
  type ActivityLevel = { #sedentary; #moderate; #active };
  type DietaryPreference = { #vegetarian; #nonVegetarian; #vegan };

  type UserProfile = {
    goal : Goal;
    weightKg : Float;
    heightCm : Float;
    activityLevel : ActivityLevel;
    dietaryPreference : DietaryPreference;
  };

  type Meal = {
    name : Text;
    calories : Nat;
    protein : Nat;
    carbs : Nat;
    fats : Nat;
    description : Text;
  };

  type DailyMealPlan = {
    breakfast : Meal;
    lunch : Meal;
    dinner : Meal;
    snacks : [Meal];
    totalCalories : Nat;
    totalProtein : Nat;
    totalCarbs : Nat;
    totalFats : Nat;
  };

  type FAQ = {
    question : Text;
    answer : Text;
    category : Text;
  };

  type Workout = {
    name : Text;
    muscleGroup : Text;
    difficulty : Text;
    description : Text;
    steps : [Text];
  };

  type Equipment = {
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
  };

  type GymLocation = {
    name : Text;
    address : Text;
    city : Text;
    phone : Text;
    hours : Text;
    amenities : [Text];
  };

  module Goal {
    public func toText(goal : Goal) : Text {
      switch (goal) {
        case (#weightLoss) { "weightLoss" };
        case (#muscleGain) { "muscleGain" };
        case (#maintenance) { "maintenance" };
      };
    };
  };

  // Data Storage
  let dietsMap = Map.empty<Text, DailyMealPlan>();
  let faqMap = Map.empty<Text, FAQ>();
  let workoutMap = Map.empty<Text, Workout>();
  let equipmentMap = Map.empty<Text, Equipment>();
  let gymLocationMap = Map.empty<Text, GymLocation>();

  // Diet Planner
  public shared ({ caller }) func addMealPlan(profile : UserProfile) : async () {
    let mealPlan : DailyMealPlan = {
      breakfast = {
        name = "Oatmeal";
        calories = 300;
        protein = 10;
        carbs = 50;
        fats = 5;
        description = "Healthy oats with fruits";
      };
      lunch = {
        name = "Grilled Chicken Salad";
        calories = 400;
        protein = 30;
        carbs = 30;
        fats = 10;
        description = "Lean protein and veggies";
      };
      dinner = {
        name = "Stir-fried Vegetables";
        calories = 350;
        protein = 15;
        carbs = 45;
        fats = 8;
        description = "Veggie mix with tofu";
      };
      snacks = [
        {
          name = "Protein Bar";
          calories = 200;
          protein = 20;
          carbs = 20;
          fats = 6;
          description = "High-protein snack";
        },
      ];
      totalCalories = 1250;
      totalProtein = 75;
      totalCarbs = 145;
      totalFats = 29;
    };
    dietsMap.add(Goal.toText(profile.goal) # profile.weightKg.toText(), mealPlan);
  };

  public query ({ caller }) func getMealPlan(key : Text) : async DailyMealPlan {
    switch (dietsMap.get(key)) {
      case (null) { Runtime.trap("Meal plan does not exist") };
      case (?mealPlan) { mealPlan };
    };
  };

  // Chatbot - FAQ
  public shared ({ caller }) func addFAQ(faq : FAQ) : async () {
    faqMap.add(faq.question, faq);
  };

  public query ({ caller }) func getFAQ(question : Text) : async FAQ {
    switch (faqMap.get(question)) {
      case (null) { Runtime.trap("FAQ does not exist") };
      case (?faq) { faq };
    };
  };

  // Workout Library
  public shared ({ caller }) func addWorkout(workout : Workout) : async () {
    workoutMap.add(workout.name, workout);
  };

  public query ({ caller }) func getWorkout(name : Text) : async Workout {
    switch (workoutMap.get(name)) {
      case (null) { Runtime.trap("Workout does not exist") };
      case (?workout) { workout };
    };
  };

  // Equipment Shop
  public shared ({ caller }) func addEquipment(equipment : Equipment) : async () {
    equipmentMap.add(equipment.name, equipment);
  };

  public query ({ caller }) func getEquipment(name : Text) : async Equipment {
    switch (equipmentMap.get(name)) {
      case (null) { Runtime.trap("Equipment does not exist") };
      case (?equipment) { equipment };
    };
  };

  // Gym Locations
  public shared ({ caller }) func addGymLocation(location : GymLocation) : async () {
    gymLocationMap.add(location.name, location);
  };

  public query ({ caller }) func getGymLocation(name : Text) : async GymLocation {
    switch (gymLocationMap.get(name)) {
      case (null) { Runtime.trap("Location does not exist") };
      case (?location) { location };
    };
  };

  // List Functions
  public query ({ caller }) func listFAQs() : async [FAQ] {
    faqMap.values().toArray();
  };

  public query ({ caller }) func listWorkouts() : async [Workout] {
    workoutMap.values().toArray();
  };

  public query ({ caller }) func listEquipment() : async [Equipment] {
    equipmentMap.values().toArray();
  };

  public query ({ caller }) func listGymLocations() : async [GymLocation] {
    gymLocationMap.values().toArray();
  };
};

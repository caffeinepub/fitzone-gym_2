import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuotesSection from "./components/QuotesSection";
import GymLocationsSection from "./components/GymLocationsSection";
import EquipmentSection from "./components/EquipmentSection";
import WorkoutsSection from "./components/WorkoutsSection";
import DietPlannerSection from "./components/DietPlannerSection";
import ChatbotWidget from "./components/ChatbotWidget";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <QuotesSection />
        <GymLocationsSection />
        <EquipmentSection />
        <WorkoutsSection />
        <DietPlannerSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

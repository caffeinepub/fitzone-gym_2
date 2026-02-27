import { MapPin, Phone, Clock, Wifi } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGymLocations } from "../hooks/useQueries";
import type { GymLocation } from "../backend.d";

const FALLBACK_LOCATIONS: GymLocation[] = [
  {
    name: "FitZone Downtown",
    address: "123 Main St",
    city: "New York",
    phone: "(212) 555-0101",
    hours: "Mon-Sun 5AM-11PM",
    amenities: ["Pool", "Sauna", "CrossFit", "Parking"],
  },
  {
    name: "FitZone Westside",
    address: "456 Sunset Blvd",
    city: "Los Angeles",
    phone: "(310) 555-0202",
    hours: "Mon-Sat 6AM-10PM",
    amenities: ["Olympic Lifting", "Yoga Studio", "Juice Bar"],
  },
  {
    name: "FitZone Midtown",
    address: "789 Peachtree Rd",
    city: "Atlanta",
    phone: "(404) 555-0303",
    hours: "Mon-Fri 5AM-12AM",
    amenities: ["Basketball Court", "Cardio Zone", "Personal Training"],
  },
  {
    name: "FitZone North",
    address: "321 Lake Shore Dr",
    city: "Chicago",
    phone: "(312) 555-0404",
    hours: "Mon-Sun 24/7",
    amenities: ["24/7 Access", "Ice Bath", "Boxing Ring", "Café"],
  },
];

function LocationCard({ location }: { location: GymLocation }) {
  return (
    <article
      className="group relative rounded-sm border overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "oklch(0.16 0.008 260)",
        borderColor: "oklch(0.25 0.008 260)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.70 0.18 46 / 0.6)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px oklch(0.70 0.18 46 / 0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.25 0.008 260)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Orange top accent */}
      <div
        className="h-1 w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: "oklch(0.70 0.18 46)" }}
      />

      <div className="p-6">
        {/* Name + city */}
        <div className="mb-4">
          <h3
            className="text-xl font-display text-white mb-1 group-hover:text-gym-orange transition-colors"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
          >
            {location.name}
          </h3>
          <p
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "oklch(0.70 0.18 46)" }}
          >
            {location.city}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.70 0.18 46)" }} />
            <span className="text-sm text-muted-foreground">
              {location.address}, {location.city}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 shrink-0" style={{ color: "oklch(0.70 0.18 46)" }} />
            <span className="text-sm text-muted-foreground">{location.phone}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 shrink-0" style={{ color: "oklch(0.70 0.18 46)" }} />
            <span className="text-sm text-muted-foreground">{location.hours}</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-start gap-2 pt-4 border-t flex-wrap" style={{ borderColor: "oklch(0.25 0.008 260)" }}>
          <Wifi className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.008 260)" }} />
          <div className="flex flex-wrap gap-1.5">
            {location.amenities.map((amenity) => (
              <Badge
                key={amenity}
                className="text-xs rounded-sm border-0"
                style={{
                  backgroundColor: "oklch(0.22 0.01 46 / 0.5)",
                  color: "oklch(0.80 0.10 46)",
                }}
              >
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function GymLocationsSection() {
  const { data, isLoading, isError } = useGymLocations();

  const locations: GymLocation[] =
    !isError && data && data.length > 0 ? data : FALLBACK_LOCATIONS;

  return (
    <section id="gyms" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: "oklch(0.70 0.18 46)" }}
          >
            Locations
          </div>
          <h2
            className="text-5xl md:text-7xl font-display text-white mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Our <span style={{ color: "oklch(0.70 0.18 46)" }}>Gyms</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            World-class facilities across major cities. Find your nearest FitZone and
            start your transformation today.
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-64 rounded-sm" style={{ backgroundColor: "oklch(0.18 0.008 260)" }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <LocationCard key={loc.name} location={loc} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

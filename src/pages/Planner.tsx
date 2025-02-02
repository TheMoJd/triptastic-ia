import { useState } from "react";
import { ArrowRight, Plane, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Planner = () => {
  const [destination, setDestination] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => setIsGenerating(false), 2000);
    console.log("Generating plan for:", destination);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Plan Your Trip
        </h1>
        <p className="text-gray-500">
          Let AI create your perfect itinerary
        </p>
      </header>

      <Card className="mb-6 animate-fade-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Where do you want to go?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter destination..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleGenerate}
              disabled={!destination || isGenerating}
              className={`w-full flex items-center justify-center gap-2 bg-primary text-white p-3 rounded-lg 
                ${!destination || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {isGenerating ? (
                <div className="animate-pulse">Generating...</div>
              ) : (
                <>
                  <Plane className="h-5 w-5" />
                  Generate Plan
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Popular Destinations
        </h2>
        {["Tokyo, Japan", "Paris, France", "New York, USA"].map((place) => (
          <Card 
            key={place}
            className="cursor-pointer transform transition-all hover:scale-[1.02]"
            onClick={() => setDestination(place)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{place}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Planner;
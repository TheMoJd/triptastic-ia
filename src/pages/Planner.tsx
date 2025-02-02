import { useState } from "react";
import { ArrowRight, Plane, MapPin, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateTravelPlan } from "@/lib/openai";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";

const Planner = () => {
  const [destination, setDestination] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [travelPlan, setTravelPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!destination) return;
    
    setIsGenerating(true);
    setTravelPlan(null);
    
    try {
      const plan = await generateTravelPlan(destination);
      setTravelPlan(plan);
      toast({
        title: "Travel Plan Generated!",
        description: "Scroll down to see your personalized itinerary.",
      });
    } catch (error) {
      console.error("Failed to generate plan:", error);
      toast({
        title: "Error",
        description: "Failed to generate travel plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 pb-20">
      <header className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Plan Your Trip
        </h1>
        <p className="text-muted-foreground">
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
              className="w-full p-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={handleGenerate}
              disabled={!destination || isGenerating}
              className={`w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground p-3 rounded-lg transition-all
                ${!destination || isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating your plan...
                </>
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

      {!travelPlan && !isGenerating && (
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
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {travelPlan && (
        <Card className="mt-8 animate-fade-up">
          <CardHeader>
            <CardTitle>Your Travel Plan for {destination}</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            <ReactMarkdown>{travelPlan}</ReactMarkdown>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Planner;
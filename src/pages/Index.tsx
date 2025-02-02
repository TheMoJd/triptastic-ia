import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  setTimeout(() => setIsLoading(false), 1500);

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8 animate-fade-up">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Where to next?
        </h1>
        <p className="text-gray-500">
          Let AI plan your perfect trip
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div 
            onClick={() => navigate("/planner")}
            className="bg-primary p-6 rounded-lg text-white cursor-pointer transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex items-center justify-between mb-4">
              <Sparkles className="h-6 w-6" />
              <ArrowRight className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Start Planning</h2>
            <p className="text-primary-foreground/80 text-sm">
              Get personalized travel recommendations
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Popular Destinations
            </h3>
            
            {["Paris", "Tokyo", "New York"].map((city) => (
              <div
                key={city}
                className="bg-secondary p-4 rounded-lg cursor-pointer transform transition-all hover:bg-secondary/80"
              >
                <h4 className="font-medium text-foreground">{city}</h4>
                <p className="text-sm text-gray-500">
                  Tap to explore
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
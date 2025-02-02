import { useState } from "react";
import { ArrowRight, Plane, MapPin, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateTravelPlan } from "@/lib/openai";
import { useToast } from "@/components/ui/use-toast";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

const Planner = () => {
  const [destination, setDestination] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [travelPlan, setTravelPlan] = useState<string | null>(null);
  const { toast } = useToast();

  // Récupérer les voyages existants
  const { data: trips } = useQuery({
    queryKey: ['trips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleGenerate = async () => {
    if (!destination) return;
    
    setIsGenerating(true);
    setTravelPlan(null);
    
    try {
      const plan = await generateTravelPlan(destination);
      setTravelPlan(plan);

      // Sauvegarder le plan dans Supabase
      const { error } = await supabase
        .from('trips')
        .insert({
          destination,
          title: `Voyage à ${destination}`,
          description: plan,
          itinerary: plan
        });

      if (error) throw error;

      toast({
        title: "Plan de voyage généré !",
        description: "Votre itinéraire a été sauvegardé.",
      });
    } catch (error) {
      console.error("Erreur lors de la génération du plan:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le plan de voyage. Veuillez réessayer.",
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
          Planifiez votre voyage
        </h1>
        <p className="text-muted-foreground">
          Laissez l'IA créer votre itinéraire parfait
        </p>
      </header>

      <Card className="mb-6 animate-fade-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Où souhaitez-vous aller ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Entrez une destination..."
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
                  Génération en cours...
                </>
              ) : (
                <>
                  <Plane className="h-5 w-5" />
                  Générer le plan
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>

      {!travelPlan && !isGenerating && trips && trips.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Vos voyages précédents
          </h2>
          {trips.map((trip) => (
            <Card 
              key={trip.id}
              className="cursor-pointer transform transition-all hover:scale-[1.02]"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{trip.destination}</span>
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
            <CardTitle>Votre plan de voyage pour {destination}</CardTitle>
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
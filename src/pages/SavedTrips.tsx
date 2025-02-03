import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const SavedTrips = () => {
  const navigate = useNavigate();

  const { data: trips, isLoading } = useQuery({
    queryKey: ['saved-trips'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="animate-pulse text-primary">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 pb-20 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Voyages sauvegardés
        </h1>
        <p className="text-muted-foreground">
          Retrouvez tous vos itinéraires planifiés
        </p>
      </header>

      <div className="space-y-6">
        {trips?.map((trip) => (
          <Card 
            key={trip.id}
            className="cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-md"
            onClick={() => navigate(`/trip/${trip.id}`)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {trip.destination}
                  </CardTitle>
                  {(trip.start_date || trip.end_date) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      {trip.start_date && (
                        <span>
                          Du {new Date(trip.start_date).toLocaleDateString()}
                        </span>
                      )}
                      {trip.end_date && (
                        <span>
                          au {new Date(trip.end_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none line-clamp-3">
                <ReactMarkdown>{trip.description || trip.itinerary || ""}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        ))}

        {(!trips || trips.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Vous n'avez pas encore de voyages sauvegardés.
            </p>
            <button
              onClick={() => navigate("/planner")}
              className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
            >
              Planifier un voyage
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTrips;
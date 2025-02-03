import { User, Settings, BookMarked, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Récupérer les informations du profil
  const { data: profile, isError, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      console.log("Fetching profile data...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No authenticated user found");
        throw new Error("Non authentifié");
      }

      console.log("User found, fetching profile...", user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }

      if (!data) {
        console.log("No profile found, creating one...");
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([{ id: user.id, email: user.email }])
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
          throw createError;
        }

        return newProfile;
      }

      console.log("Profile found:", data);
      return data;
    },
    retry: 1,
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const menuItems = [
    { 
      icon: BookMarked, 
      label: "Voyages sauvegardés", 
      action: () => navigate("/saved-trips"),
      description: "Consultez vos itinéraires enregistrés"
    },
    { 
      icon: Settings, 
      label: "Paramètres", 
      action: () => navigate("/settings"),
      description: "Gérez vos préférences"
    },
    { 
      icon: LogOut, 
      label: "Déconnexion", 
      action: handleLogout,
      description: "Se déconnecter de l'application"
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="animate-pulse text-primary">Chargement...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-destructive">Une erreur est survenue lors du chargement du profil.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-primary text-xl text-primary-foreground">
              {profile?.full_name?.charAt(0) || profile?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {profile?.full_name || "Utilisateur"}
            </h1>
            <p className="text-muted-foreground">
              {profile?.email}
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-4 max-w-md mx-auto">
        {menuItems.map((item) => (
          <Card
            key={item.label}
            className="cursor-pointer transform transition-all hover:scale-[1.02] hover:shadow-md"
            onClick={item.action}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Profile;
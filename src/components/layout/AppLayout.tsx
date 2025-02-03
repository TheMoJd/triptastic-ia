import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Home, Map, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Vérifier l'état de l'authentification au chargement
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    // Écouter les changements d'état d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-y-auto pb-20 animate-fade-in">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => navigate("/")}
            className={`flex flex-col items-center space-y-1 ${
              isActive("/") ? "text-primary" : "text-gray-400"
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Accueil</span>
          </button>
          
          <button
            onClick={() => navigate("/planner")}
            className={`flex flex-col items-center space-y-1 ${
              isActive("/planner") ? "text-primary" : "text-gray-400"
            }`}
          >
            <Map size={24} />
            <span className="text-xs">Planifier</span>
          </button>
          
          <button
            onClick={() => navigate("/profile")}
            className={`flex flex-col items-center space-y-1 ${
              isActive("/profile") ? "text-primary" : "text-gray-400"
            }`}
          >
            <User size={24} />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
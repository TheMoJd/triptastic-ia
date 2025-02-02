import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Map, User } from "lucide-react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-background">
      <main className="flex-1 overflow-y-auto pb-20 animate-fade-in">
        {children}
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
            <span className="text-xs">Home</span>
          </button>
          
          <button
            onClick={() => navigate("/planner")}
            className={`flex flex-col items-center space-y-1 ${
              isActive("/planner") ? "text-primary" : "text-gray-400"
            }`}
          >
            <Map size={24} />
            <span className="text-xs">Plan</span>
          </button>
          
          <button
            onClick={() => navigate("/profile")}
            className={`flex flex-col items-center space-y-1 ${
              isActive("/profile") ? "text-primary" : "text-gray-400"
            }`}
          >
            <User size={24} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
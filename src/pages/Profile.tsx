import { User, Settings, BookMarked, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Profile = () => {
  const menuItems = [
    { icon: BookMarked, label: "Saved Trips", action: () => console.log("Saved trips clicked") },
    { icon: Settings, label: "Settings", action: () => console.log("Settings clicked") },
    { icon: LogOut, label: "Log Out", action: () => console.log("Logout clicked") },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-8 animate-fade-up">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              John Doe
            </h1>
            <p className="text-gray-500">
              john.doe@example.com
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <Card
            key={item.label}
            className="cursor-pointer transform transition-all hover:bg-secondary/50"
            onClick={item.action}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="font-medium">{item.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          App Version 1.0.0
        </p>
      </div>
    </div>
  );
};

export default Profile;
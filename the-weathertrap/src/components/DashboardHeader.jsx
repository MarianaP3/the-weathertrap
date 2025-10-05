import { Cloud } from "lucide-react";
import "@/styles/Dashboard.css";

export default function DashboardHeader() {
  return (
    <div className="mb-8 text-center animate-fade-in">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Cloud className="w-10 h-10 text-primary weather-glow" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Dashboard Climático
        </h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Información meteorológica completa en tiempo real
      </p>
    </div>
  );
}

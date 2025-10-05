

interface DashboardCardProps {
  title: string;
  info: number;
  description: string;
  extraInfo?: string;  
  icon?: React.ElementType; 
}

export default function DashboardCardBig({
  title,
  info,
  description, 
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div className="text-white animate-fade-in weather-card weather-glow-card bg-card text-card-foreground p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-border">
      <div className="flex items-start justify-between">        
        <div>
          <h2 className="text-sm mb-2">{title}</h2>

          <div className="flex items-center gap-4 mb-4">
            {Icon && <Icon className="w-16 h-16 text-accent" />}
            <div>
              <div className="text-6xl font-bold">{info}°</div>
              <p className="text-xl mt-2">{description}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

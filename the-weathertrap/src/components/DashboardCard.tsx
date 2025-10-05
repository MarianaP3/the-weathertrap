interface DashboardCardProps {
  title: string;
  info: string;
  description: string;
  extraInfo?: string;
  icon?: React.ElementType;
}

export default function DashboardCard({
  title,
  info,
  description,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div className="text-white animate-fade-in weather-card weather-glow-card bg-card text-card-foreground p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-border">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            {Icon && <Icon className="w-6 h-6 text-accent" />}
            <h2 className="text-sm mb-2">{title}</h2>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div>
              <div className="text-3xl font-bold">{info}°</div>
              <p className="text-sm mt-4">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

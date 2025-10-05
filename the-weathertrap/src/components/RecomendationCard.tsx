interface RecomendationCardProps {
  title: string;
  description: string;
  icon?: React.ElementType;
}

export default function RecomendationCard({
  title,
  description,
  icon: Icon,
}: RecomendationCardProps) {
  return (
    <div className="text-white animate-fade-in weather-card weather-glow-card bg-card text-card-foreground p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-border ">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-4 mb-4">
            {Icon && <Icon />}
            <h2 className="text-sm mb-2">{title}</h2>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="text-sm mt-2 whitespace-pre-line max-h-40 overflow-auto">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

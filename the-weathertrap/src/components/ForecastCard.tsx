import "@/styles/EventCard.css";
import {
	ArrowDown,
	CloudRainWind,
	Droplets,
	Eye,
	Sparkles,
	Sun,
	Sunset,
	Waves,
	Wind,
} from "lucide-react";

interface ForecastCardProps {
	title?: string;
	time?: string;
	description?: string;
}

export default function ForecastCard({
	title,
	time,
	description,
}: ForecastCardProps) {
	return (
		<div className="mb-4 eventCardColor text-left rounded-xl bg-card pr-6 pl-6 pt-2.5 pb-3.5 shadow-sm relative overflow-hidden ">
			<div className="absolute left-0 top-0 h-full w-3 bg-accent rounded-l-xl"></div>
			<h1 className="text-l font-semibold text-">{title}</h1>
			<div className="flex mt-2">
				<Sparkles className="w-4 h-4 mr-1 mt-1" />
				<span
					id="air-quality"
					className="text-sm"
				>
					Calidad del aire:
				</span>
			</div>
			<div className="flex mt-2">
				<Waves className="w-4 h-4 mr-1 mt-1" />
				<span
					id="feels-like"
					className="text-sm"
				>
					Sensación térmica:
				</span>
			</div>
			<div className="flex mt-2">
				<Sun className="w-4 h-4 mr-1 mt-1" />
				<span
					id="uv-index"
					className="text-sm"
				>
					Índice UV:
				</span>
			</div>
			<div className="flex mt-2">
				<Wind className="w-4 h-4 mr-1 mt-1" />
				<span
					id="wind"
					className="text-sm"
				>
					Viento:
				</span>
			</div>
			<div className="flex mt-2">
				<Sunset className="w-4 h-4 mr-1 mt-1" />
				<span
					id="sunset"
					className="text-sm"
				>
					Hora del atardecer:
				</span>
			</div>
			<div className="flex mt-2">
				<CloudRainWind className="w-4 h-4 mr-1 mt-1" />
				<span
					id="precipitation"
					className="text-sm"
				>
					Precipitación:
				</span>
			</div>
			<div className="flex mt-2">
				<Eye className="w-4 h-4 mr-1 mt-1" />
				<span
					id="visibility"
					className="text-sm"
				>
					Visibilidad:
				</span>
			</div>
		</div>
	);
}

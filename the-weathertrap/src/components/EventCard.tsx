import "@/styles/EventCard.css";
import { Clock } from "lucide-react";

interface EventCardProps {
  title?: string;
  time?: string;
  description?: string;
}

export default function EventCard({
  title,
  time,
  description,
}: EventCardProps) {
  return (
    <div className="mb-4 eventCardColor text-left rounded-xl bg-card pr-6 pl-6 pt-2 pb-3 shadow-sm relative overflow-hidden ">
      <div className="absolute left-0 top-0 h-full w-3 bg-blue-500 rounded-l-xl"></div>
      <h1 className="text-l font-semibold text-">{title}</h1>      
        <div className="flex mt-2">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{time}</span>
        </div>
      <p className="mt-1 text-gray-300">{description}</p>
    </div>
  );
}

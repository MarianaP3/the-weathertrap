import { useEffect, useState } from "react";
import { getSuggestions } from "../lib/SugestionsService";

interface SuggestionCardsProps {
  info: string;
}

export default function SuggestionsCard({
  info
}: SuggestionCardsProps) {

    
  return (
    <div className="text-white animate-fade-in weather-card weather-glow-card bg-card text-card-foreground p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-border">
        <div id="info-suggestion" className="text-3xl font-bold">{info}</div>
    </div>
  );
}

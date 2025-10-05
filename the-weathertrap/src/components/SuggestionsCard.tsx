import { useEffect, useState } from "react";
import { getSuggestions } from "../lib/SugestionsService";

interface SuggestionCardsProps {
  info: string;
}

export default function SuggestionsCard({
  info
}: SuggestionCardsProps) {

    useEffect(() => {
        try{
            const fetchSuggestions = async () => {
                const response = await getSuggestions({
                    forecast: {}, // Aquí deberías pasar el pronóstico real
                    description: "" // Aquí deberías pasar la descripción real
                });
                
                if(response)
                    console.log("Suggestions fetched:", response);
            }
        }
        catch(err){
            console.error("Error fetching suggestions:", err);
        }

    }, []);
  return (
    <div className="text-white animate-fade-in weather-card weather-glow-card bg-card text-card-foreground p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-border">
        <div className="text-3xl font-bold">{info}</div>
    </div>
  );
}

import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import {
  Cloud,
  Wind,
  ThermometerSnowflake,
  ThermometerSun,
  CloudRain,
  Zap,
  Fan,
  Thermometer,
  Info,
} from "lucide-react";
import { getCurrentWeather } from "../lib/PerHour";
import { getCurrentWeatherDaily } from "../lib/DayService";
import DashboardCardBig from "./DashboardCardBig";
import RecomendationCard from "./RecomendationCard";

// Funciones para generar descripciones dinámicas
const getTemperatureDescription = (temp: number): string => {
  if (temp < 10) return "Hace mucho frío, abrígate bien";
  if (temp < 18) return "Temperatura fresca";
  if (temp < 25) return "Temperatura agradable";
  if (temp < 30) return "Hace calor";
  return "Temperatura muy alta, mantente hidratado";
};

const getRainDescription = (probability: number): string => {
  if (probability < 20) return "Muy baja probabilidad";
  if (probability < 40) return "Baja probabilidad";
  if (probability < 60) return "Probabilidad moderada";
  if (probability < 80) return "Alta probabilidad, lleva paraguas";
  return "Muy alta probabilidad de lluvia";
};

const getUVDescription = (uv: number): string => {
  if (uv < 3) return "UV bajo, protección mínima";
  if (uv < 6) return "UV moderado, usa protector solar";
  if (uv < 8) return "UV alto, protección necesaria";
  if (uv < 11) return "UV muy alto, evita el sol directo";
  return "UV extremo, máxima protección";
};

const getWindDescription = (speed: number): string => {
  if (speed < 10) return "Viento calmo";
  if (speed < 20) return "Brisa ligera";
  if (speed < 40) return "Viento moderado";
  if (speed < 60) return "Viento fuerte";
  return "Viento muy fuerte, precaución";
};

const getAirQualityDescription = (category: string): string => {
  const descriptions: { [key: string]: string } = {
    Good: "Excelente para actividades al aire libre",
    Moderate: "Calidad aceptable",
    "Unhealthy for Sensitive Groups": "Sensibles deben limitar actividades",
    Unhealthy: "Evita actividades prolongadas al exterior",
    "Very Unhealthy": "Permanece en interiores si es posible",
    Hazardous: "Alerta de salud, quédate en casa",
  };
  return descriptions[category] || "Condición actual";
};

interface WeatherCardData {
  title: string;
  info: string;
  description: string;
  icon: React.ReactNode;
}

export default function WeatherCards() {
  const [weatherData, setWeatherData] = useState<WeatherCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const long = position.coords.longitude.toFixed(6);

        try {
          //const data = await getCurrentWeather({ lat, long });
          const { forecasts: hourlyForecasts } = (await getCurrentWeather({
            lat,
            long,
          })) ?? {
            forecasts: [],
          };

          const {
            forecasts: [dailyForecasts],
          } = (await getCurrentWeatherDaily({ lat, long })) ?? {
            forecasts: [],
          };
          const now = new Date();

          const hourTemperature = hourlyForecasts[0].temperature.value ?? 0;
          const timeString = now.toLocaleTimeString("es-MX", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const cards: WeatherCardData[] = [
            {
              title: "Temperatura",
              info: (hourTemperature ?? 0) + " C°",
              description: getTemperatureDescription(hourTemperature),
              icon: <Thermometer className="w-12 h-12 text-accent" />,
            },
            {
              title: "Temperatura mínima",
              info: (dailyForecasts.temperature.minimum.value ?? 0) + " C°",
              description: getTemperatureDescription(
                dailyForecasts.temperature.minimum.value ?? 0
              ),
              icon: <ThermometerSnowflake className="w-6 h-6 text-accent" />,
            },
            {
              title: "Temperatura máxima",
              info: (dailyForecasts.temperature.maximum.value ?? 0) + " C°",
              description: getTemperatureDescription(
                dailyForecasts.temperature.maximum.value ?? 0
              ),
              icon: <ThermometerSun className="w-6 h-6 text-accent" />,
            },
            {
              title: "Probabilidad de lluvia",
              info: (dailyForecasts.day.rainProbability ?? 0) + " %",
              description: getRainDescription(
                dailyForecasts.day.rainProbability ?? 0
              ),
              icon: <CloudRain className="w-6 h-6 text-accent" />,
            },
            {
              title: "Sensación térmica máxima",
              info:
                (dailyForecasts.realFeelTemperature.maximum.value ?? 0) + " C°",
              description: getTemperatureDescription(
                dailyForecasts.realFeelTemperature.maximum.value ?? 0
              ),
              icon: <ThermometerSun className="w-6 h-6 text-accent" />,
            },
            {
              title: "Sensación térmica mínima",
              info:
                (dailyForecasts.realFeelTemperature.minimum.value ?? 0) + " C°",
              description: getTemperatureDescription(
                dailyForecasts.realFeelTemperature.minimum.value ?? 0
              ),
              icon: <ThermometerSnowflake className="w-6 h-6 text-accent" />,
            },
            {
              title: "Calidad de aire",
              info: dailyForecasts.airAndPollen[0].category ?? "N/A",
              description: getAirQualityDescription(
                dailyForecasts.airAndPollen[0].category ?? ""
              ),
              icon: <Fan className="w-6 h-6 text-accent" />,
            },
            {
              title: "Índice UV",
              info: dailyForecasts.airAndPollen[5].value ?? 0,
              description: getUVDescription(
                dailyForecasts.airAndPollen[5].value ?? 0
              ),
              icon: <Zap className="w-6 h-6 text-accent" />,
            },
            {
              title: "Viento",
              info: (dailyForecasts.day.wind.speed.value ?? 0) + " km/h",
              description: getWindDescription(
                dailyForecasts.day.wind.speed.value ?? 0
              ),
              icon: <Wind className="w-6 h-6 text-accent" />,
            },
          ];

          setWeatherData(cards);
        } catch (err) {
          setError("No se pudo obtener el clima.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("No se pudo acceder a tu ubicación.");
        setLoading(false);
        console.error(err);
      }
    );
  }, []);

  if (loading)
    return (
      <p className="text-white flex justify-center items-center mt-4">
        {" "}
        Cargando clima...
      </p>
    );
  if (error)
    return (
      <p className="text-red-500 flex justify-center items-center mt-4">
        {error}
      </p>
    );

  const firstSection = weatherData.slice(1, 4);
  const secondSection = weatherData.slice(3);

  return (
    <div className="space-y-6 mt-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-4">Clima actual</h1>
        <DashboardCardBig
          title={weatherData[0].title}
          info={weatherData[0].info}
          description={weatherData[0].description}
          icon={() => weatherData[0].icon}
        />
      </div>
      {/* Primera sección */}
      <div className="grid gap-6 grid-cols-5">
        {/* Tarjetas normales */}
        {firstSection.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            info={item.info}
            description={item.description}
            icon={() => item.icon}
          />
        ))}

        {/* RecomendationCard 2x2 */}
        <div className="col-span-2">
          <RecomendationCard
            title="Recomendaciones"
            description="Recuerda llevar un paraguas si la probabilidad de lluvia es alta. Mantente hidratado y usa protector solar en días soleados."
            icon={() => <Info className="w-6 h-6 text-accent" />}
          />
        </div>
      </div>

      {/* Segunda sección */}
      <div className="grid gap-6 grid-cols-4 mt-8 auto-rows-[200px]">
        {secondSection.map((item) => (
          <DashboardCard
            key={item.title}
            title={item.title}
            info={item.info}
            description={item.description}
            icon={() => item.icon}
          />
        ))}
      </div>
    </div>
  );
}

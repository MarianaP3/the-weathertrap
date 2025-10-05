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
              description: timeString,
              icon: <Thermometer className="w-12 h-12 text-accent" />,
            },
            {
              title: "Temperatura mínima",
              info: (dailyForecasts.temperature.minimum.value ?? 0) + " C°",
              description: "Condición actual",
              icon: <ThermometerSnowflake className="w-6 h-6 text-accent" />,
            },
            {
              title: "Temperatura máxima",
              info: (dailyForecasts.temperature.maximum.value ?? 0) + " C°",
              description: "Condición actual",
              icon: <ThermometerSun className="w-6 h-6 text-accent" />,
            },
            {
              title: "Probabilidad de lluvia",
              info: (dailyForecasts.day.rainProbability ?? 0) + " %",
              description: "Hxd",
              icon: <CloudRain className="w-6 h-6 text-accent" />,
            },
            {
              title: "Sensación térmica máxima",
              info:
                (dailyForecasts.realFeelTemperature.maximum.value ?? 0) + " %",
              description: "xd",
              icon: <ThermometerSun className="w-6 h-6 text-accent" />,
            },
            {
              title: "Sensación térmica mínima",
              info:
                (dailyForecasts.realFeelTemperature.minimum.value ?? 0) + " %",
              description: "xd",
              icon: <ThermometerSnowflake className="w-6 h-6 text-accent" />,
            },
            {
              title: "Calidad de aire",
              info: dailyForecasts.airAndPollen[0].category ?? 0,
              description: "xd",
              icon: <Fan className="w-6 h-6 text-accent" />,
            },
            {
              title: "Índice UV",
              info: dailyForecasts.airAndPollen[5].value ?? 0,
              description: dailyForecasts.airAndPollen[5].category ?? 0,
              icon: <Zap className="w-6 h-6 text-accent" />,
            },
            {
              title: "Viento",
              info: (dailyForecasts.day.wind.speed.value ?? 0) + " km/h",
              description:
                (dailyForecasts.day.wind.direction.degrees ?? 0) +
                "°" +
                " al " +
                (dailyForecasts.day.wind.direction.localizedDescription ?? 0),
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

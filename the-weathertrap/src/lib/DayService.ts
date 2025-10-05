export interface WeatherRequest {
  lat: string;
  long: string;
}

export interface WeatherResponse {
  temperature: number;
  humidity: number;
  condition: string;
  feels_like?: number;
  [key: string]: any;
}

export async function getCurrentWeatherDaily({
  lat,
  long,
}: WeatherRequest): Promise<WeatherResponse | null> {
  try {
    const res = await fetch("/api/weatherDaily", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, long }),
    });

    if (!res.ok) throw new Error("Error al obtener clima desde el servidor");

    const data: WeatherResponse = await res.json();    
    return data;
  } catch (err) {
    console.error("Error en getCurrentWeather:", err);
    return null;
  }
}

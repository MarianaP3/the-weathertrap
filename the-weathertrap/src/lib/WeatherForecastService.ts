export async function getWeatherForecast({
	lat,
	long,
}: {
	lat: number;
	long: number;
}): Promise<any | null> {
	const response = await fetch(`/api/weatherAll?lat=${lat}&long=${long}`);
	if (!response.ok) {
		console.error("Error fetching weather data:", response.statusText);
		return null;
	}
	const data = await response.json();
	return data || null;
}

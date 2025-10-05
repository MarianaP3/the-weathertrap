const currentHost = import.meta.env.HOSTNAME || "localhost:4321";

export default abstract class WeatherMock {
	constructor() {
		// Get hostname from the environment variable or default to localhost
		console.log("Current Host:", currentHost);
	}
	public static async getData() {
		const res = await fetch(`http://${currentHost}/mocks/weather.json`).catch(
			(err) => {
				console.error("Error fetching weather data:", err);
				return undefined;
			}
		);
		if (res && typeof res.json === "function") {
			return res.json();
		}
		return null;
	}
}

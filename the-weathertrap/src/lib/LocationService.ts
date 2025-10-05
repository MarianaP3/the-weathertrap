export async function getLocations({
	term,
}: {
	term: string;
}): Promise<any | null> {
	try {
		const res = await fetch("/api/locations", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ term }),
		});

		if (!res.ok) throw new Error("Error al obtener clima desde el servidor");

		const data: any = await res.json();
		return data;
	} catch (err) {
		console.error("Error en getCurrentWeather:", err);
		return null;
	}
}

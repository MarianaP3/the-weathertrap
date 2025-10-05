export async function createEvent({
	user_id,
	description,
	date,
	lat,
	long,
}: {
	user_id: string;
	description: string;
	date: string;
	lat: number;
	long: number;
}): Promise<any | null> {
	try {
		console.log({ user_id, description, date, lat, long });
		const res = await fetch("/api/events", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_id, description, date, lat, long }),
		});

		if (!res.ok) throw new Error("Error al crear evento en el servidor");

		const data: any = await res.json();
		return data;
	} catch (err) {
		console.error("Error en createEvent:", err);
		return null;
	}
}

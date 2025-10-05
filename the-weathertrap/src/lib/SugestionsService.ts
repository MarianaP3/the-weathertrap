export interface getSuggestionsRequest {
	forecast: object;
	description: string;
}

export interface getSuggestionsResponse {
	suggestions: object;
}

export async function getSuggestions({
	forecast,
	description,
}: getSuggestionsRequest): Promise<getSuggestionsResponse | null> {
	try {
		const query = JSON.stringify({ forecast, description });
		const res = await fetch("/api/suggestions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: query,
		});

		if (!res.ok) throw new Error("Error al obtener clima desde el servidor");

		const data: getSuggestionsResponse = await res.json();
		return data;
	} catch (err) {
		console.error("Error en getSuggestions:", err);
		return null;
	}
}

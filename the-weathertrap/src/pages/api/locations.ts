// src/pages/api/weather.ts
import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabaseClient";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const { term } = await request.json();

		const { data, error } = await supabase.functions.invoke(
			"get-search-location",
			{
				body: { term },
			}
		);

		if (error) {
			return new Response(JSON.stringify({ error: error.message }), {
				status: 500,
			});
		}

		return new Response(JSON.stringify(data), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		return new Response(
			JSON.stringify({ error: "Error interno del servidor" }),
			{ status: 500 }
		);
	}
};

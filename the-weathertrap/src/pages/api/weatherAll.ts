// src/pages/api/weather.ts
import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabaseClient";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	try {
		const { searchParams } = new URL(request.url);
		const lat = searchParams.get("lat");
		const long = searchParams.get("long");

		const { data, error } = await supabase.functions.invoke(
			"get-45-days-forecast",
			{
				body: { lat, long },
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

// src/pages/api/weather.ts
import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabaseClient";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const { user_id, description, date, lat, long } = await request.json();

		const {
			data: { session },
		} = await supabase.auth.getSession();
		const { data, error } = await supabase.functions.invoke(
			"create-new-event",
			{
				body: { description, date, lat, long },
				headers: { Authorization: `Bearer ${session?.access_token}` },
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

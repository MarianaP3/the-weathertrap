import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export function useAuthSession() {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Obtener sesión actual
		supabase.auth
			.getSession()
			.then(({ data: { session } }: { data: { session: Session | null } }) => {
				setSession(session);
				setLoading(false);
			});
	}, []);

	return { session, loading };
}

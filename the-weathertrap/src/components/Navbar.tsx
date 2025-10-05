import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import "@/styles/Navbar.css";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Obtener usuario actual
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/Login";
  };

  return (
    <nav className="bg-black px-8 sticky top-0 z-50 navbarColor">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src="/src/assets/theweathertrap_logo_degradado.svg"
            alt="The WeatherTrap"
            className="w-30 h-10 p-1.5 rounded"
          />
        </a>

        <div className="flex items-center gap-8">
          <a
            href="/Dashboard"
            className="text-white text-[15px] font-medium hover:text-blue-400 transition-colors"
          >
            Dashboard
          </a>
          <a
            href="/calendar"
            className="text-white text-[15px] font-medium hover:text-blue-400 transition-colors"
          >
            Calendar
          </a>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white text-sm">{user.email}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 h-10 px-6 py-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <a
              href="/Login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600 h-10 px-6 py-2"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

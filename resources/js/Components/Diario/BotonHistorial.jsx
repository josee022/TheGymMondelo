// BotonHistorial.jsx
import React from "react";
import { Link } from "@inertiajs/react";

export default function BotonHistorial() {
    return (
        <div className="relative w-full">
            <Link
                href={route("diario.historial")}
                className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-bounce"
            >
                📜 Ver Historial
            </Link>
        </div>
    );
}

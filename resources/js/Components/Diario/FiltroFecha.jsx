import React from "react";

export default function FiltroFecha({
    filtroFecha,
    setFiltroFecha,
    aplicarFiltros,
}) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-gradient-to-r from-lime-200 to-green-300 p-6 rounded-xl shadow-lg">
            <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-green-800">
                    📅 Fecha:
                </span>
                <input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200 transition duration-200 ease-in-out"
                />
            </div>
            <button
                onClick={aplicarFiltros}
                className="flex items-center space-x-2 bg-gradient-to-r from-lime-600 to-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition duration-300 ease-in-out transform"
            >
                <span>🔍</span>
                <span>Aplicar Filtro</span>
            </button>
        </div>
    );
}

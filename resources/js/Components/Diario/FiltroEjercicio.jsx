import React from "react";

export default function FiltroEjercicio({
    filtroEjercicio,
    setFiltroEjercicio,
    mostrarGrafica,
    limpiarGrafica,
    ejerciciosDisponibles,
}) {
    return (
        <div className="mt-8 bg-gradient-to-r from-lime-200 to-green-300 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold text-green-800">
                    🏋️ Ejercicio:
                </span>
                <select
                    value={filtroEjercicio}
                    onChange={(e) => setFiltroEjercicio(e.target.value)}
                    className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200 transition duration-200 ease-in-out"
                >
                    <option value="">Selecciona un ejercicio</option>
                    {ejerciciosDisponibles.map((ejercicio) => (
                        <option key={ejercicio} value={ejercicio}>
                            {ejercicio}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center space-x-4">
                <button
                    onClick={mostrarGrafica}
                    className="flex items-center space-x-2 bg-gradient-to-r from-lime-600 to-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition duration-300 ease-in-out transform"
                >
                    <span>📊 Mostrar Gráfica</span>
                </button>
                <button
                    onClick={limpiarGrafica}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition duration-300 ease-in-out transform"
                >
                    <span>🚮 Limpiar</span>
                </button>
            </div>
        </div>
    );
}

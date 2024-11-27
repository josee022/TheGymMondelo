import React, { useState } from "react";

export default function BotonesExportar({ filtroFecha }) {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const handleExportPDF = (exportarTodo = false) => {
        const url = exportarTodo
            ? `/diario/export/pdf?exportar_todo=true`
            : `/diario/export/pdf?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
        window.location.href = url;
        limpiarFiltros(); // Limpia los filtros al exportar
    };

    const handleExportCSV = (exportarTodo = false) => {
        const url = exportarTodo
            ? `/diario/export/csv?exportar_todo=true`
            : `/diario/export/csv?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
        window.location.href = url;
        limpiarFiltros(); // Limpia los filtros al exportar
    };

    const limpiarFiltros = () => {
        setFechaInicio("");
        setFechaFin("");
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 mt-10 shadow-lg text-center text-white">
            <h3 className="text-2xl font-bold mb-4 text-lime-400">
                📂 Exportar Diario de Ejercicio
            </h3>
            <p className="text-gray-300 mb-6">
                Descarga un respaldo de tus registros en PDF o CSV. Usa los
                filtros para exportar un rango o haz clic en "Exportar Todo".
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 mb-6">
                <input
                    type="date"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring focus:ring-lime-500"
                    placeholder="Fecha inicio"
                />
                <input
                    type="date"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring focus:ring-lime-500"
                    placeholder="Fecha fin"
                />
                <button
                    onClick={limpiarFiltros}
                    className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition duration-300 ease-in-out transform"
                >
                    <span>🚮 Limpiar</span>
                </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
                {/* Primera columna */}
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => handleExportPDF(false)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-3 rounded-full font-semibold shadow-md"
                    >
                        <span>📄 Exportar PDF</span>
                    </button>
                    <button
                        onClick={() => handleExportCSV(false)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-3 rounded-full font-semibold shadow-md"
                    >
                        <span>📊 Exportar CSV</span>
                    </button>
                </div>

                {/* Segunda columna */}
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => handleExportPDF(true)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-3 rounded-full font-semibold shadow-md"
                    >
                        <span>📄 Exportar Todo (PDF)</span>
                    </button>
                    <button
                        onClick={() => handleExportCSV(true)}
                        className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-3 rounded-full font-semibold shadow-md"
                    >
                        <span>📊 Exportar Todo (CSV)</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

import React from "react";

export default function BotonesExportar({ filtroFecha }) {
    const handleExportPDF = () => {
        const url = filtroFecha
            ? `/diario/export/pdf?fecha=${filtroFecha}`
            : `/diario/export/pdf`;
        window.location.href = url;
    };

    const handleExportCSV = () => {
        const url = filtroFecha
            ? `/diario/export/csv?fecha=${filtroFecha}`
            : `/diario/export/csv`;
        window.location.href = url;
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 mt-10 shadow-lg text-center text-white">
            <h3 className="text-2xl font-bold mb-4 text-lime-400">
                📂 Exportar Diario de Ejercicio
            </h3>
            <p className="text-gray-300 mb-6">
                Descarga un respaldo de tus registros día a día en PDF o CSV.
            </p>
            <div className="flex justify-center space-x-6">
                <button
                    onClick={handleExportPDF}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-5 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:from-blue-500 hover:to-teal-400 transition duration-300 ease-in-out transform"
                >
                    <span>📄 Exportar PDF</span>
                </button>
                <button
                    onClick={handleExportCSV}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-3 rounded-full font-semibold shadow-md hover:scale-105 hover:from-purple-500 hover:to-indigo-400 transition duration-300 ease-in-out transform"
                >
                    <span>📊 Exportar CSV</span>
                </button>
            </div>
        </div>
    );
}

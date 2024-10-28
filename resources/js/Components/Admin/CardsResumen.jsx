// resources/js/Components/Admin/SummaryCards.jsx
import React from "react";

export default function SummaryCards({ totalUsuarios, totalProductos, ingresosMensuales }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold">Usuarios Totales</h2>
                <p className="text-4xl font-bold">{totalUsuarios}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold">Total Productos</h2>
                <p className="text-4xl font-bold">{totalProductos}</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold">Ingresos (mensual)</h2>
                <p className="text-4xl font-bold">{ingresosMensuales} €</p>
            </div>
        </div>
    );
}

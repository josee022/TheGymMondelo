import React from "react";
import GraficaProgreso from "@/Components/Diario/GraficaProgreso";

export default function ContenedorGrafica({ datosGrafico }) {
    return (
        <div className="mt-6">
            <h3 className="text-2xl font-bold text-center text-teal-600">
                📈 Gráfica de Progreso
            </h3>
            <GraficaProgreso datos={datosGrafico} />
        </div>
    );
}

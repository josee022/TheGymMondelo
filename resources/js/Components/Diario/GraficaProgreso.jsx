import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip, // Importa Tooltip
} from "chart.js";

// Registra todos los elementos necesarios, incluyendo Tooltip
ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip
);

export default function GraficaProgreso({ datos }) {
    const data = {
        labels: datos.map((d) => d.fecha), // Fechas de cada entrada
        datasets: [
            {
                label: "Peso (kg)",
                data: datos.map((d) => d.peso), // Valores de peso
                borderColor: "#4ade80",
                backgroundColor: "rgba(74, 222, 128, 0.5)",
                tension: 0.2,
                pointBackgroundColor: "#4ade80", // Color del punto
                pointBorderColor: "#4ade80", // Borde del punto
                pointRadius: 5, // Tamaño del punto
            },
            {
                label: "Repeticiones",
                data: datos.map((d) => d.repeticiones), // Valores de repeticiones
                borderColor: "#34d399",
                backgroundColor: "rgba(52, 211, 153, 0.5)",
                tension: 0.2,
                pointBackgroundColor: "#34d399", // Color del punto
                pointBorderColor: "#34d399", // Borde del punto
                pointRadius: 5, // Tamaño del punto
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Progreso de Ejercicio",
            },
            tooltip: {
                enabled: true, // Activa las tooltips
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || "";
                        return `${label}: ${context.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg my-6">
            <Line data={data} options={options} />
        </div>
    );
}

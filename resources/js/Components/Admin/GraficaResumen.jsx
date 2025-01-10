import React from "react";
import { Line } from "react-chartjs-2";
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Chart,
} from "chart.js";

// Registro de los componentes necesarios para la gráfica de Chart.js
Chart.register(
    CategoryScale, // Escala de categorías (eje X)
    LinearScale, // Escala lineal (eje Y)
    PointElement, // Elemento de puntos en la gráfica
    LineElement, // Elemento de líneas en la gráfica
    Title, // Componente para mostrar el título
    Tooltip, // Herramientas emergentes al pasar el cursor (tooltips)
    Legend // Leyenda de la gráfica
);

// Componente que muestra una gráfica de usuarios registrados por mes
export default function UserTrendChart({ usuariosPorMes }) {
    // Datos para la gráfica
    const chartData = {
        labels: usuariosPorMes.map((item) => item.mes), // Etiquetas para el eje X (meses)
        datasets: [
            {
                label: "Usuarios Registrados", // Leyenda para la línea
                data: usuariosPorMes.map((item) => item.total), // Valores del eje Y (usuarios por mes)
                fill: false, // No rellena el área bajo la línea
                borderColor: "rgb(75, 192, 192)", // Color de la línea
                tension: 0.1, // Curvatura de la línea (0 para líneas rectas, valores más altos para curvas)
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-semibold mb-4">
                Tendencia de Usuarios (Últimos 6 Meses)
            </h2>
            <div
                style={{
                    maxHeight: "400px",
                    maxWidth: "900px",
                    margin: "0 auto",
                }}
            >
                <Line
                    data={chartData}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                        },
                    }}
                />
            </div>
        </div>
    );
}

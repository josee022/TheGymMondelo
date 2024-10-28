// resources/js/Components/Admin/UserTrendChart.jsx
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

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function UserTrendChart({ usuariosPorMes }) {
    const chartData = {
        labels: usuariosPorMes.map((item) => item.mes),
        datasets: [
            {
                label: "Usuarios Registrados",
                data: usuariosPorMes.map((item) => item.total),
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-semibold mb-4">Tendencia de Usuarios (Últimos 6 Meses)</h2>
            <div style={{ maxHeight: "400px", maxWidth: "900px", margin: "0 auto" }}>
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

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function IngresosChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Ingresos",
                data: [],
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
        ],
    });

    useEffect(() => {
        fetch("/admin/reportes/ingresos-mensuales")
            .then((response) => response.json())
            .then((ingresos) => {
                setChartData({
                    labels: ingresos.map(
                        (item) => `${item.month}/${item.year}`
                    ),
                    datasets: [
                        {
                            label: "Ingresos",
                            data: ingresos.map((item) => item.ingresos),
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                });
            });
    }, []);

    return (
        <div
            className="bg-white p-6 rounded-lg shadow mb-8"
            style={{ maxWidth: "800px", margin: "0 auto" }}
        >
            <h2 className="text-2xl font-semibold mb-4">
                Historial de Ingresos (Mensual)
            </h2>
            <div style={{ maxHeight: "400px" }}>
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

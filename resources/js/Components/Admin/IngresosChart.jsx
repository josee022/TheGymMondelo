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

// Registrar variables de chart necesarias para la gráfica
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
        labels: [], // Las etiquetas que se mostrarán en el eje X (por ejemplo, fechas)
        datasets: [
            {
                label: "Ingresos", // Etiqueta para la serie de datos
                data: [], // Los datos que se mostrarán en el gráfico
                borderColor: "rgb(75, 192, 192)", // Color de la línea del gráfico
                tension: 0.1, // Controla la curvatura de la línea (0 = líneas rectas, 1 = curvas suaves)
            },
        ],
    });


    // Obtener datos de los ingresos
    useEffect(() => {
        fetch("/admin/reportes/ingresos-mensuales")
            .then((response) => response.json())
            .then((ingresos) => {
                setChartData({
                    labels: ingresos.map(
                        (item) => `${item.month}/${item.year}` // Formato de la etiqueta del mes/año
                    ),
                    datasets: [
                        {
                            label: "Ingresos", // Etiqueta para la serie de ingresos
                            data: ingresos.map((item) => item.ingresos), // Datos de los ingresos
                            borderColor: "rgb(75, 192, 192)", // Color de la línea
                            tension: 0.1, // Curvatura de la línea
                        },
                    ],
                });
            });
    }, []); // Dependencia vacía asegura que esto solo se ejecute una vez al montar el componente

    return (
        <div
            className="bg-white p-6 rounded-lg shadow mb-8"
            style={{ maxWidth: "1000px", margin: "0 auto" }} // Ancho máximo aumentado
        >
            <h2 className="text-2xl font-semibold mb-4">
                Historial de Ingresos (Mensual)
            </h2>
            <div style={{ maxHeight: "500px", minHeight: "400px" }}>
                {" "}
                {/* Altura aumentada */}
                <Line
                    data={chartData}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                        },
                        scales: {
                            x: {
                                ticks: { maxRotation: 0, minRotation: 0 },
                            },
                            y: {
                                beginAtZero: true, // Para comenzar el eje Y en 0
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

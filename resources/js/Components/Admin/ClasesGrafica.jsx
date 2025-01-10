import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Registrar componentes de chat necesarios para la grafica
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ClasesGrafica = () => {
    const [data, setData] = useState({
        labels: [], // Etiquetas de las clases
        datasets: [
            {
                label: "Clases Más Adquiridas", // Título de la serie de datos
                data: [], // Datos de las clases adquiridas
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Color de fondo de las barras
                borderColor: "rgba(54, 162, 235, 1)", // Color de borde de las barras
                borderWidth: 1, // Grosor del borde de las barras
            },
        ],
    });

    useEffect(() => {
        fetch("/admin/graficas/clases-mas-adquiridas")
            .then((response) => response.json())
            .then((clases) => {
                setData({
                    labels: clases.map((clase) => clase.nombre), // Nombre de las clases
                    datasets: [
                        {
                            label: "Clases Más Adquiridas",
                            data: clases.map((clase) => clase.total), // Total de clases adquiridas
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((error) =>
                console.error("Error al obtener los datos:", error)
            );
    }, []);

    return (
        <div
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
            style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}
        >
            <h2 className="text-2xl font-semibold mb-4">
                Clases Más Adquiridas
            </h2>
            <div style={{ maxHeight: "450px", minHeight: "400px" }}>
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: "y",
                        plugins: {
                            legend: { display: false },
                        },
                        scales: {
                            x: {
                                beginAtZero: true,
                            },
                            y: {
                                ticks: {
                                    autoSkip: false,
                                    padding: 10,
                                },
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ClasesGrafica;

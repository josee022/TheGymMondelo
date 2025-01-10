import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const ProgramasGrafica = () => {
    const [data, setData] = useState({
        labels: [], // Etiquetas de los programas (nombres)
        datasets: [
            {
                label: "Programas Más Adquiridos", // Título de la serie de datos
                data: [], // Valores de los programas adquiridos
                backgroundColor: "rgba(153, 102, 255, 0.2)", // Color de fondo de las barras
                borderColor: "rgba(153, 102, 255, 1)", // Color de borde de las barras
                borderWidth: 1, // Grosor del borde de las barras
            },
        ],
    });

    useEffect(() => {
        fetch("/admin/graficas/programas-mas-adquiridos")
            .then((response) => response.json()) // Convierte la respuesta en formato JSON
            .then((programas) => {
                setData({
                    labels: programas.map((programa) => programa.nombre), // Extrae los nombres de los programas
                    datasets: [
                        {
                            label: "Programas Más Adquiridos",
                            data: programas.map((programa) => programa.total), // Extrae el total de adquisiciones
                            backgroundColor: "rgba(255, 99, 132, 0.2)", // Color de fondo
                            borderColor: "rgba(255, 99, 132, 1)", // Color de borde
                            borderWidth: 1, // Grosor del borde
                        },
                    ],
                });
            })
            .catch((error) =>
                console.error("Error al obtener los datos:", error)
            ); // Manejo de errores
    }, []);

    return (
        <div
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
            style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}
        >
            <h2 className="text-2xl font-semibold mb-4">
                Programas Más Adquiridos
            </h2>
            <div style={{ maxHeight: "450px", minHeight: "400px" }}>
                <Bar
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    maxRotation: 45, // Rotación máxima de las etiquetas
                                    minRotation: 45, // Rotación mínima para mejorar legibilidad
                                    autoSkip: false,
                                    padding: 5,
                                },
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default ProgramasGrafica;

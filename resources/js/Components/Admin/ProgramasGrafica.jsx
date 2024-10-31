import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const ProgramasGrafica = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Programas Más Adquiridos",
                data: [],
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                borderColor: "rgba(153, 102, 255, 1)",
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        fetch("/admin/graficas/programas-mas-adquiridos")
            .then((response) => response.json())
            .then((programas) => {
                setData({
                    labels: programas.map((programa) => programa.nombre),
                    datasets: [
                        {
                            label: "Programas Más Adquiridos",
                            data: programas.map((programa) => programa.total),
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
            })
            .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    return (
        <div
            className="bg-white p-6 rounded-lg shadow-lg mb-8"
            style={{ maxWidth: "600px", width: "100%", margin: "0 auto" }}
        >
            <h2 className="text-2xl font-semibold mb-4">Programas Más Adquiridos</h2>
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

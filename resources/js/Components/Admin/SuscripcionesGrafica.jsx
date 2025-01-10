import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrar componentes de chat necesarios para la grafica
ChartJS.register(ArcElement, Tooltip, Legend);

const SuscripcionesGrafica = () => {
    const [data, setData] = useState({
        labels: [], // Etiquetas de las suscripciones (tipos)
        datasets: [
            {
                label: "Suscripciones Más Adquiridas",
                data: [], // Datos de los totales de suscripciones
                backgroundColor: [
                    "rgba(255, 206, 86, 0.2)", // Color para la primera sección
                    "rgba(75, 192, 192, 0.2)", // Color para la segunda sección
                    "rgba(153, 102, 255, 0.2)", // Color para la tercera sección
                ],
                borderColor: [
                    "rgba(255, 206, 86, 1)", // Borde para la primera sección
                    "rgba(75, 192, 192, 1)", // Borde para la segunda sección
                    "rgba(153, 102, 255, 1)", // Borde para la tercera sección
                ],
                borderWidth: 1, // Grosor de los bordes
            },
        ],
    });

    useEffect(() => {
        fetch("/admin/graficas/suscripciones-mas-adquiridas")
            .then((response) => response.json())
            .then((suscripciones) => {
                setData({
                    labels: suscripciones.map(
                        (suscripcion) => suscripcion.tipo // Tipos de suscripciones
                    ),
                    datasets: [
                        {
                            label: "Suscripciones Más Adquiridas",
                            data: suscripciones.map(
                                (suscripcion) => suscripcion.total // Totales de suscripciones
                            ),
                            backgroundColor: [
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                            ],
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
            style={{
                maxWidth: "600px",
                width: "100%",
                maxHeight: "450px", // Altura máxima ajustada
                minHeight: "400px", // Altura mínima ajustada
                margin: "0 auto",
            }}
        >
            <h2 className="text-xl font-semibold mb-4 text-center">
                Suscripciones Más Adquiridas
            </h2>
            <Doughnut
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "bottom" },
                    },
                    layout: {
                        padding: 10, // Ajuste de contenido en el gráfico
                    },
                }}
            />
        </div>
    );
};

export default SuscripcionesGrafica;

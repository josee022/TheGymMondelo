import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const ProductosGrafica = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Productos Más Adquiridos",
                data: [],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        fetch("/admin/graficas/productos-mas-adquiridos")
            .then((response) => response.json())
            .then((productos) => {
                setData({
                    labels: productos.map((producto) => producto.nombre),
                    datasets: [
                        {
                            label: "Productos Más Adquiridos",
                            data: productos.map((producto) => producto.total),
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
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
                Productos Más Adquiridos
            </h2>
            <PolarArea
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: true, position: "bottom" },
                    },
                    layout: {
                        padding: 10, // Mayor espacio visual dentro del gráfico
                    },
                }}
            />
        </div>
    );
};

export default ProductosGrafica;

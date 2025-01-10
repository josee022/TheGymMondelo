import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";

// Registra los elementos necesarios para la gráfica de ChartJS, incluyendo Tooltip
ChartJS.register(
    LineElement, // Elemento de línea para gráficos
    PointElement, // Elemento de puntos para la gráfica
    CategoryScale, // Escala para las etiquetas (eje X)
    LinearScale, // Escala lineal para los valores (eje Y)
    Title, // Título de la gráfica
    Tooltip // Herramientas de información al pasar el cursor (tooltips)
);

export default function GraficaProgreso({ datos }) {
    // Configuración de los datos para la gráfica
    const data = {
        labels: datos.map((d) => d.fecha), // Fechas de las entradas, mostradas en el eje X
        datasets: [
            {
                label: "Peso (kg)", // Etiqueta para la línea de peso
                data: datos.map((d) => d.peso), // Valores de peso para la gráfica
                borderColor: "#4ade80", // Color de la línea
                backgroundColor: "rgba(74, 222, 128, 0.5)", // Color de fondo bajo la línea
                tension: 0.2, // Suavidad de la línea (0 para recta, mayor para curva)
                pointBackgroundColor: "#4ade80", // Color del punto en la línea
                pointBorderColor: "#4ade80", // Color del borde del punto
                pointRadius: 5, // Tamaño de los puntos
            },
            {
                label: "Repeticiones", // Etiqueta para la línea de repeticiones
                data: datos.map((d) => d.repeticiones), // Valores de repeticiones para la gráfica
                borderColor: "#34d399", // Color de la línea
                backgroundColor: "rgba(52, 211, 153, 0.5)", // Color de fondo bajo la línea
                tension: 0.2, // Suavidad de la línea
                pointBackgroundColor: "#34d399", // Color del punto en la línea
                pointBorderColor: "#34d399", // Color del borde del punto
                pointRadius: 5, // Tamaño de los puntos
            },
        ],
    };

    // Opciones para configurar el comportamiento y estilo de la gráfica
    const options = {
        responsive: true, // La gráfica se adapta al tamaño del contenedor
        plugins: {
            title: {
                display: true, // Muestra el título de la gráfica
                text: "Progreso de Ejercicio", // Texto del título
            },
            tooltip: {
                enabled: true, // Activa las tooltips al pasar el cursor
                callbacks: {
                    label: function (context) {
                        // Personaliza el texto mostrado en las tooltips
                        const label = context.dataset.label || ""; // Obtiene la etiqueta del dataset
                        return `${label}: ${context.raw}`; // Muestra el valor del punto
                    },
                },
            },
        },
    };

    return (
        // Renderiza la gráfica de tipo línea con los datos y opciones configurados
        <div className="bg-white p-6 rounded-lg shadow-lg my-6">
            <Line data={data} options={options} />
        </div>
    );
}

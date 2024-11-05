// EncabezadoEntrenamiento.jsx
import React from "react";

export default function EncabezadoEntrenamiento() {
    return (
        <header className="bg-lime-500 py-6 px-8 text-center flex flex-col items-center">
            <span className="text-5xl mb-2">🏆</span>
            <h3 className="text-4xl font-extrabold text-white">
                ¡Hora de Entrenar! 💪
            </h3>
            <p className="text-lg text-gray-200 mt-2">
                Registra cada detalle y sigue tu progreso 📈
            </p>
        </header>
    );
}

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";

export default function ListaClases({ clases }) {
    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="w-full max-w-7xl mx-auto bg-gradient-to-br from-lime-100 to-lime-300 shadow-2xl rounded-lg p-12">
            <div className="text-center mb-10">
                <motion.h1
                    className="text-5xl font-extrabold text-gray-900 mb-4 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-full"></span>
                        <span className="relative">Clases Disponibles</span> 💪
                    </span>
                </motion.h1>
                <p className="text-gray-700 text-xl">
                    ¡Descubre nuestras clases y da el primer paso hacia tu mejor
                    versión! 🚀
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-900">
                {clases.map((clase) => (
                    <motion.div
                        key={clase.id}
                        className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-500 transform hover:-translate-y-2 hover:scale-105"
                        whileHover={{ scale: 1.08 }}
                    >
                        <h2 className="text-3xl font-semibold text-lime-600 mb-3 flex items-center space-x-2">
                            {clase.nombre} <span>🔥</span>
                        </h2>
                        <p className="text-gray-600 mb-2">
                            <strong className="text-gray-800">📅 Fecha:</strong>{" "}
                            {formatFechaClase(clase.fecha)}
                        </p>
                        <p className="text-gray-600 mb-4">
                            <strong className="text-gray-800">
                                🕒 Horario:
                            </strong>{" "}
                            {clase.hora_inicio} - {clase.hora_fin}
                        </p>
                        <Link
                            href={`/clases/${clase.id}`}
                            className="inline-block px-6 py-2 bg-lime-500 text-white font-semibold rounded-lg shadow-lg hover:bg-lime-600 hover:shadow-xl transition-all duration-300"
                        >
                            Ver detalles ➡️
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

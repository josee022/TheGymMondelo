import React from "react";
import { FaCalendarAlt, FaClock, FaUsers, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ClaseDetalles({ clase, plazasDisponibles }) {
    // Formateo de fechas de las clases
    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <motion.div
            className="relative bg-gradient-to-br from-lime-200 to-green-300 p-8 rounded-2xl shadow-lg max-w-5xl mx-auto mb-12 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-5xl font-extrabold mb-8 text-center text-lime-700">
                {clase.nombre} 🏋️‍♂️
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-md">
                    <FaCalendarAlt className="text-3xl text-lime-600" />
                    <span>
                        <strong>Fecha:</strong> {formatFechaClase(clase.fecha)}
                    </span>
                </div>

                <div className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-md">
                    <FaClock className="text-3xl text-lime-600" />
                    <span>
                        <strong>Hora:</strong> {clase.hora_inicio} -{" "}
                        {clase.hora_fin}
                    </span>
                </div>

                <div className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-md">
                    <FaUsers className="text-3xl text-lime-600" />
                    <span>
                        <strong>Capacidad:</strong> {clase.capacidad} personas
                    </span>
                </div>

                <div className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-md">
                    <FaStar className="text-3xl text-lime-600" />
                    <span>
                        <strong>Descripción:</strong>{" "}
                        {clase.descripcion || "No disponible"}
                    </span>
                </div>

                <div className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-md col-span-2 justify-center">
                    <FaUsers
                        className={`text-3xl ${
                            plazasDisponibles > 0
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    />
                    <span>
                        <strong>
                            {plazasDisponibles > 0
                                ? `Plazas disponibles: ${plazasDisponibles}`
                                : "Clase completa"}
                        </strong>
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

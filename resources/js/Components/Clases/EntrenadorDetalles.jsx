import React from "react";
import { FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";

export default function EntrenadorDetalles({ entrenador }) {
    return (
        <motion.div
            className="bg-gradient-to-br from-lime-200 to-green-300 p-8 rounded-2xl shadow-lg max-w-5xl mx-auto mt-12 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h2 className="text-4xl font-extrabold text-center text-lime-700 mb-8">
                Tu Entrenador Personal 🤝
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                <div className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-md">
                    <FaUserTie className="text-3xl text-lime-600" />
                    <span>
                        <strong>Nombre:</strong>{" "}
                        {entrenador.usuario.name || "No disponible"}
                    </span>
                </div>

                <div className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-md">
                    <span className="text-3xl font-extrabold text-lime-600">
                        💼
                    </span>
                    <span>
                        <strong>Especialidad:</strong>{" "}
                        {entrenador.especialidad || "No disponible"}
                    </span>
                </div>

                <div className="flex items-center space-x-4 bg-white bg-opacity-70 p-4 rounded-xl shadow-md col-span-2 justify-center">
                    <span className="text-3xl font-extrabold text-lime-600">
                        💲
                    </span>
                    <span>
                        <strong>Tarifa:</strong>{" "}
                        {entrenador.tarifa
                            ? `${entrenador.tarifa} €/h`
                            : "No disponible"}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

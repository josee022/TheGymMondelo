import React from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { FiClock, FiTrendingUp, FiDollarSign } from "react-icons/fi"; // Iconos adicionales importados

export default function SuscripcionesProgramas({
    suscripciones,
    adquisiciones,
}) {
    const formatFechaSuscripcion = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const suscripcionesOrdenadas = suscripciones.sort(
        (a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio)
    );

    return (
        <div className="bg-gradient-to-r from-black via-gray-900 to-green-800 p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-green-400 mb-2 relative">
                    🌟 Mi Suscripción En TheGymMondelo 🌟
                </h1>
            </div>

            {suscripcionesOrdenadas.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-4xl mx-auto bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl"
                >
                    <p className="text-2xl font-semibold text-white text-center">
                        No tienes ninguna suscripción activa en estos momentos.
                    </p>
                </motion.div>
            ) : (
                suscripcionesOrdenadas.map((suscripcion) => (
                    <div
                        key={suscripcion.id}
                        className="max-w-4xl mx-auto bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl mb-6"
                    >
                        <h3 className="text-3xl font-semibold mb-6 text-center text-white">
                            Suscripción {suscripcion.tipo}
                        </h3>
                        <p className="mb-2 text-white text-xl">
                            <strong>Fecha de inicio:</strong>{" "}
                            {formatFechaSuscripcion(suscripcion.fecha_inicio)}
                        </p>
                        <p className="mb-2 text-white text-xl">
                            <strong>Fecha de fin:</strong>{" "}
                            {formatFechaSuscripcion(suscripcion.fecha_fin)}
                        </p>
                        <p className="mb-2 text-white text-xl">
                            <strong>Estado:</strong> {suscripcion.estado}
                        </p>

                        {suscripcion.estado === "Activa" && (
                            <div className="text-right mt-6">
                                <Link
                                    href={`/suscripciones/${suscripcion.id}/disable`}
                                    method="POST"
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Deshabilitar
                                </Link>
                            </div>
                        )}
                    </div>
                ))
            )}

            <h2 className="text-4xl font-extrabold text-center mb-10 text-green-400 mt-10">
                🌟 Tu Programa Adquirido 🌟
            </h2>
            <div className="max-w-4xl mx-auto hover:shadow-3xl transition-all duration-500 transform">
                {adquisiciones.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                    >
                        <p className="text-2xl font-semibold text-white text-center">
                            No tienes ningún programa adquirido aún. <br />
                            ¡Empieza ahora y alcanza tus metas!
                        </p>
                    </motion.div>
                ) : (
                    adquisiciones.map((adquisicion, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.2,
                            }}
                            className="bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                        >
                            <div className="text-center">
                                <h3 className="text-3xl font-bold mb-6 text-white flex justify-center items-center">
                                    {adquisicion.programa.nombre}{" "}
                                    <FaCrown className="ml-3 text-green-400 text-4xl" />
                                </h3>
                                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                    {adquisicion.programa.descripcion}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center justify-center text-white">
                                    <FiClock className="text-3xl mr-4" />
                                    <p className="text-xl">
                                        Duración:{" "}
                                        {adquisicion.programa.duracion} semanas
                                    </p>
                                </div>
                                <div className="flex items-center justify-center text-white">
                                    <FiTrendingUp className="text-3xl mr-4" />
                                    <p className="text-xl">
                                        Nivel: {adquisicion.programa.nivel}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center text-white">
                                    <FiDollarSign className="text-3xl mr-4" />
                                    <p className="text-xl">
                                        Precio:{" "}
                                        {parseFloat(
                                            adquisicion.programa.precio
                                        ).toFixed(2)}{" "}
                                        €
                                    </p>
                                </div>
                            </div>

                            {/* Botón para eliminar programa */}
                            <div className="text-right mt-6">
                                <Link
                                    href={`/programas/${adquisicion.programa.id}/delete`}
                                    method="POST"
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Eliminar Programa
                                </Link>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

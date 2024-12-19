import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa";
import { FiClock, FiTrendingUp } from "react-icons/fi";

export default function SuscripcionesProgramas({
    suscripciones, // Lista de suscripciones activas
    adquisiciones, // Lista de programas adquiridos
}) {
    // Función para formatear una fecha a "dd/mm/aaaa"
    const formatFecha = (fecha) => {
        const fechaObj = new Date(fecha); // Convierte la fecha en un objeto Date
        return fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit", // Día con dos dígitos
            month: "2-digit", // Mes con dos dígitos
            year: "numeric", // Año completo
        });
    };

    // Función para calcular el tiempo restante hasta una fecha
    const calculateRemainingTime = (fechaFin) => {
        const now = new Date(); // Fecha y hora actual
        const targetDate = new Date(fechaFin); // Convierte la fecha final en un objeto Date
        const difference = targetDate - now; // Calcula la diferencia en milisegundos

        if (difference <= 0) {
            return "Finalizado"; // Si la diferencia es menor o igual a 0, el tiempo ha finalizado
        }

        // Calcula días, horas, minutos y segundos restantes
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds }; // Devuelve el tiempo restante en un objeto
    };

    // Estado para el tiempo restante de las suscripciones
    const [timeRemainingSuscripciones, setTimeRemainingSuscripciones] =
        useState(
            suscripciones.map((s) => calculateRemainingTime(s.fecha_fin)) // Calcula el tiempo restante para cada suscripción
        );

    // Estado para el tiempo restante de los programas adquiridos
    const [timeRemainingProgramas, setTimeRemainingProgramas] = useState(
        adquisiciones.map((a) =>
            calculateRemainingTime(
                new Date(a.fecha_adquisicion).getTime() + // Fecha de adquisición en milisegundos
                    a.programa.duracion * 7 * 24 * 60 * 60 * 1000 // Suma la duración del programa (en semanas convertidas a milisegundos)
            )
        )
    );

    // Actualiza los tiempos restantes cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            // Recalcula el tiempo restante para las suscripciones
            setTimeRemainingSuscripciones(
                suscripciones.map((s) => calculateRemainingTime(s.fecha_fin))
            );

            // Recalcula el tiempo restante para los programas adquiridos
            setTimeRemainingProgramas(
                adquisiciones.map((a) =>
                    calculateRemainingTime(
                        new Date(a.fecha_adquisicion).getTime() +
                            a.programa.duracion * 7 * 24 * 60 * 60 * 1000
                    )
                )
            );
        }, 1000); // Actualización cada segundo

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [suscripciones, adquisiciones]); // Se ejecuta nuevamente si cambian las suscripciones o adquisiciones

    return (
        <div className="bg-gradient-to-r from-black via-gray-900 to-green-800 p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-green-400 mb-2 relative">
                    🌟 Mi Suscripción En TheGymMondelo 🌟
                </h1>
            </div>

            {/* Sección de Suscripciones */}
            <div className="max-w-4xl mx-auto">
                {suscripciones.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl"
                    >
                        <p className="text-2xl font-semibold text-white text-center">
                            No tienes ninguna suscripción activa en estos
                            momentos.
                        </p>
                    </motion.div>
                ) : (
                    suscripciones.map((suscripcion, index) => (
                        <motion.div
                            key={suscripcion.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.2,
                            }}
                            className="bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                        >
                            <div className="text-center relative">
                                <h3 className="text-3xl font-bold mb-6 text-white flex justify-center items-center">
                                    Suscripción {suscripcion.tipo}{" "}
                                    <FaCrown className="ml-3 text-green-400 text-4xl" />
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center justify-center text-white">
                                    <FiClock className="text-3xl mr-4" />
                                    <p className="text-xl">
                                        Inicio:{" "}
                                        {formatFecha(suscripcion.fecha_inicio)}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center text-white">
                                    <FiTrendingUp className="text-3xl mr-4" />
                                    <p className="text-xl">
                                        Finaliza el:{" "}
                                        {formatFecha(suscripcion.fecha_fin)}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-white">
                                {typeof timeRemainingSuscripciones[index] ===
                                "string" ? (
                                    <p className="text-red-500 text-xl">
                                        {timeRemainingSuscripciones[index]}
                                    </p>
                                ) : (
                                    <p className="text-lg">
                                        Tiempo restante:{" "}
                                        <span className="text-green-400 font-bold">
                                            {
                                                timeRemainingSuscripciones[
                                                    index
                                                ].days
                                            }{" "}
                                            días,{" "}
                                            {
                                                timeRemainingSuscripciones[
                                                    index
                                                ].hours
                                            }{" "}
                                            horas,{" "}
                                            {
                                                timeRemainingSuscripciones[
                                                    index
                                                ].minutes
                                            }{" "}
                                            minutos,{" "}
                                            {
                                                timeRemainingSuscripciones[
                                                    index
                                                ].seconds
                                            }{" "}
                                            segundos
                                        </span>
                                    </p>
                                )}
                            </div>
                            {suscripcion.estado === "Activa" && (
                                <div className="text-right mt-6">
                                    <Link
                                        href={`/suscripciones/${suscripcion.id}/disable`}
                                        method="POST"
                                        as="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Deshabilitar Suscripción
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>

            <h2 className="text-4xl font-extrabold text-center mb-10 text-green-400 mt-10">
                🌟 Tu Programa Adquirido 🌟
            </h2>

            {/* Sección de Programas */}
            <div className="max-w-4xl mx-auto">
                {adquisiciones.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                    >
                        <p className="text-2xl font-semibold text-white text-center">
                            No tienes ningún programa adquirido aún. <br />
                            ¡Empieza ahora y alcanza tus metas!
                        </p>
                    </motion.div>
                ) : (
                    adquisiciones.map((adquisicion, index) => (
                        <motion.div
                            key={adquisicion.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.7,
                                delay: index * 0.2,
                            }}
                            className="bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                        >
                            <div className="text-center relative">
                                <h3 className="text-3xl font-bold mb-2 text-white flex justify-center items-center">
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
                                        Inicio:{" "}
                                        {formatFecha(
                                            adquisicion.fecha_adquisicion
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center text-white">
                                    <FiTrendingUp className="text-3xl mr-4" />
                                    <p className="text-xl">
                                        Finaliza el:{" "}
                                        {formatFecha(
                                            new Date(
                                                new Date(
                                                    adquisicion.fecha_adquisicion
                                                ).getTime() +
                                                    adquisicion.programa
                                                        .duracion *
                                                        7 *
                                                        24 *
                                                        60 *
                                                        60 *
                                                        1000
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-center text-white">
                                {typeof timeRemainingProgramas[index] ===
                                "string" ? (
                                    <p className="text-red-500 text-xl">
                                        {timeRemainingProgramas[index]}
                                    </p>
                                ) : (
                                    <p className="text-lg">
                                        Tiempo restante:{" "}
                                        <span className="text-green-400 font-bold">
                                            {timeRemainingProgramas[index].days}{" "}
                                            días,{" "}
                                            {
                                                timeRemainingProgramas[index]
                                                    .hours
                                            }{" "}
                                            horas,{" "}
                                            {
                                                timeRemainingProgramas[index]
                                                    .minutes
                                            }{" "}
                                            minutos,{" "}
                                            {
                                                timeRemainingProgramas[index]
                                                    .seconds
                                            }{" "}
                                            segundos
                                        </span>
                                    </p>
                                )}
                            </div>
                            <div className="text-right mt-6">
                                <Link
                                    href={`/programas/${adquisicion.programa.id}/delete`}
                                    method="POST"
                                    as="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Deshabilitar Programa
                                </Link>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}

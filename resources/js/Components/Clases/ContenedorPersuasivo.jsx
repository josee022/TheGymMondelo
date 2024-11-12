import React from "react";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

export default function ContenedorPersuasivo({
    clase,
    plazasDisponibles,
    handleReserve,
}) {
    return (
        <motion.div
            className="w-full max-w-6xl mx-auto bg-gradient-to-r from-lime-500 to-green-400 mt-10 p-10 rounded-2xl shadow-lg text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                className="text-5xl font-extrabold mb-6 text-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                ¡No pierdas la oportunidad de mejorar <br /> tu vida hoy! 💪🔥
            </motion.h2>

            <p className="text-lg mb-6 text-center">
                Transforma tu cuerpo, fortalece tu mente y alcanza tus metas con{" "}
                <span className="font-bold">{clase.nombre}</span>. Entrena con
                nuestro equipo especializado y obtén resultados duraderos.
            </p>

            <p className="text-lg mb-6 flex justify-center items-center text-center">
                <FaFire className="inline mr-2 text-yellow-300 text-2xl" />
                <span>
                    Esta clase es ideal para todos los niveles, diseñada para
                    adaptarse a tus necesidades y ayudarte a lograr una versión
                    más fuerte y saludable de ti mismo.
                </span>
            </p>

            <p className="text-lg mb-6 text-center">
                Cada paso cuenta, y este es el mejor lugar para comenzar o
                intensificar tu viaje de transformación. Al unirte, tendrás
                acceso a una comunidad motivadora, rutinas personalizadas y todo
                el apoyo necesario para que alcances tus objetivos.
            </p>

            {plazasDisponibles > 0 ? (
                <div className="flex justify-center mt-8">
                    <motion.button
                        onClick={handleReserve}
                        className="bg-white text-lime-600 font-bold py-3 px-12 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ¡Reserva tu lugar ahora! 🚀
                    </motion.button>
                </div>
            ) : (
                <p className="text-lg text-red-600 text-center font-semibold mt-8">
                    Clase completa
                </p>
            )}
        </motion.div>
    );
}

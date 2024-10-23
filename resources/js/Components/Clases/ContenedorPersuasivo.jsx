import React from 'react';
import { motion } from 'framer-motion';
import { FaFire } from 'react-icons/fa';

export default function ContenedorPersuasivo({ clase, plazasDisponibles, handleReserve }) {
    return (
        <motion.div
            className="w-full max-w-5xl mx-auto bg-gradient-to-r from-lime-500 to-green-400 mt-10 p-10 rounded-lg shadow-lg text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                className="text-4xl font-bold mb-6"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                ¡No pierdas la oportunidad de mejorar tu vida hoy! 💪🔥
            </motion.h2>
            <p className="text-lg mb-6">Transforma tu cuerpo, fortalece tu mente y alcanza tus metas con {clase.nombre}. Entrena con nuestro entrenador especializado y obtén resultados garantizados.</p>
            <p className="text-lg mb-6"><FaFire className="inline mr-2 text-yellow-300" /> Esta clase es ideal para todos los niveles, y te ayudará a lograr una versión más fuerte y saludable de ti mismo.</p>

            {plazasDisponibles > 0 ? (
                <div className="flex justify-center">
                    <motion.button
                        onClick={handleReserve}
                        className="bg-white text-lime-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ¡Reserva tu lugar ahora! 🚀
                    </motion.button>
                </div>
            ) : (
                <p className="text-lg text-red-600 text-center">Clase completa</p>
            )}
        </motion.div>
    );
}

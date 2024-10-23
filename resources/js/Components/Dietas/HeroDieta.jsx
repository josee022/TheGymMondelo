import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiTarget } from 'react-icons/fi';

export default function HeroDieta() {
    return (
        <motion.div
            className="relative flex flex-col items-center justify-center bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white py-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-6xl font-extrabold mb-4 tracking-wider">¡Maximiza Tu Potencial!</h1>
            <p className="text-lg text-gray-300 text-center max-w-2xl mb-6">
            Descubre planes dietéticos que se adaptan a tu estilo de vida y a tus objetivos de rendimiento. Logra resultados rápidos con nuestras dietas y entrenamientos personalizados.
            </p>
            <div className="flex gap-6 mt-4">
                <motion.div className="animate-bounce" whileHover={{ scale: 1.2 }}>
                    <FiHeart className="h-10 w-10 text-green-200" />
                </motion.div>
                <motion.div className="animate-bounce" whileHover={{ scale: 1.2 }}>
                    <FiTarget className="h-10 w-10 text-green-200" />
                </motion.div>
            </div>
        </motion.div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';

export default function ProgTips() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <motion.div
                className="bg-lime-500 text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h3 className="text-2xl font-bold mb-4">🎯 Define tus Objetivos</h3>
                <p>Antes de empezar, piensa en qué quieres lograr: ¿Perder peso? ¿Ganar músculo? Establece metas claras para mantenerte motivado.</p>
            </motion.div>
            <motion.div
                className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h3 className="text-2xl font-bold mb-4">💧 Mantente Hidratado</h3>
                <p>El agua es esencial para un buen rendimiento. Lleva siempre contigo una botella de agua y mantente hidratado durante todo el día.</p>
            </motion.div>
            <motion.div
                className="bg-lime-500 text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
            >
                <h3 className="text-2xl font-bold mb-4">🍎 Nutrición</h3>
                <p>Combina tu entrenamiento con una dieta balanceada. Los resultados son 70% alimentación y 30% ejercicio.</p>
            </motion.div>
        </div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaDumbbell, FaRunning } from 'react-icons/fa';

export default function Beneficios() {
    return (
        <div className="mt-16 p-8 bg-gradient-to-r from-green-500 via-gray-400 to-gray-300 rounded-lg shadow-lg w-full max-w-4xl">
            <h3 className="text-4xl font-bold text-center text-gray-800 mb-6">Beneficios de Entrenar con Nosotros 💪</h3>
            <div className="flex justify-around">
                <motion.div
                    className="w-1/4 text-center p-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaHeartbeat className="text-green-500 text-5xl mx-auto mb-4" />
                    <h4 className="text-2xl font-semibold text-gray-800 mb-2">Mejora la Salud 💚</h4>
                    <p className="text-gray-600">Entrenamientos diseñados para fortalecer tu corazón y cuerpo.</p>
                </motion.div>

                <motion.div
                    className="w-1/4 text-center p-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaDumbbell className="text-green-500 text-5xl mx-auto mb-4" />
                    <h4 className="text-2xl font-semibold text-gray-800 mb-2">Fuerza y Resistencia 🏋️‍♀️</h4>
                    <p className="text-gray-600">Programas para mejorar tu fuerza muscular y resistencia física.</p>
                </motion.div>

                <motion.div
                    className="w-1/4 text-center p-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaRunning className="text-green-500 text-5xl mx-auto mb-4" />
                    <h4 className="text-2xl font-semibold text-gray-800 mb-2">Rendimiento Deportivo 🏃‍♂️</h4>
                    <p className="text-gray-600">Optimiza tu rendimiento con nuestros planes especializados.</p>
                </motion.div>
            </div>
        </div>
    );
}

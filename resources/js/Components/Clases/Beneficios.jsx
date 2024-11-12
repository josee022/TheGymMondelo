import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaDumbbell, FaRunning } from 'react-icons/fa';

export default function Beneficios() {
    return (
        <div className="w-full max-w-7xl mx-auto mt-20 p-12 bg-gradient-to-r from-green-400 via-lime-500 to-green-600 rounded-3xl shadow-2xl text-white">
            <motion.h3
                className="text-5xl font-extrabold text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Beneficios de Entrenar con Nosotros 💪
            </motion.h3>

            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <motion.div
                    className="w-full md:w-1/3 text-center bg-white bg-opacity-20 backdrop-blur-xl p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <FaHeartbeat className="text-lime-300 text-6xl mx-auto mb-4" />
                    <h4 className="text-3xl font-semibold mb-4">Mejora la <br /> Salud 💚</h4>
                    <p className="text-lg">Entrenamientos diseñados para fortalecer tu corazón y cuerpo de manera integral.</p>
                </motion.div>

                <motion.div
                    className="w-full md:w-1/3 text-center bg-white bg-opacity-20 backdrop-blur-xl p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <FaDumbbell className="text-lime-300 text-6xl mx-auto mb-4" />
                    <h4 className="text-3xl font-semibold mb-4">Fuerza y <br /> Resistencia🏋️‍♀️</h4>
                    <p className="text-lg">Mejora tu fuerza muscular y resistencia con programas avanzados y efectivos.</p>
                </motion.div>

                <motion.div
                    className="w-full md:w-1/3 text-center bg-white bg-opacity-20 backdrop-blur-xl p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <FaRunning className="text-lime-300 text-6xl mx-auto mb-4" />
                    <h4 className="text-3xl font-semibold mb-4">Rendimiento Deportivo 🏃‍♂️</h4>
                    <p className="text-lg">Optimiza tu rendimiento y alcanza nuevos niveles con nuestros planes especializados.</p>
                </motion.div>
            </div>
        </div>
    );
}

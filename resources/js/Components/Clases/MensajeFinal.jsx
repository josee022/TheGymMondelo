import React from "react";
import { motion } from "framer-motion";

export default function MensajeFinal() {
    return (
        <motion.div
            className="w-full max-w-7xl mx-auto mt-20 p-12 bg-gradient-to-r from-lime-400 to-green-500 rounded-3xl shadow-2xl text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h3 className="text-4xl font-extrabold mb-6">
                ¡Únete a una de las clases de TheGymMondelo hoy! 🎉
            </h3>
            <p className="text-xl font-light mb-8">
                No pierdas la oportunidad de transformar tu salud y bienestar.{" "}
                <br />
                Con nuestras clases y entrenadores expertos, alcanzar tus metas
                nunca fue tan motivador y divertido.
            </p>
            <p className="text-lg mb-8">
                🚀 Mejora tu forma física, adquiere nuevos conocimientos y forma
                parte de una comunidad apasionada por el fitness. <br />
                ¡Toma el primer paso hacia tu mejor versión!
            </p>

            {/* Contenedor de mensaje motivacional final */}
            <div className="mt-10 p-8 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:bg-opacity-30">
                <p className="text-2xl font-semibold italic text-white">
                    “La verdadera fuerza no proviene de tus músculos, sino de tu
                    determinación para superarte cada día. En cada repetición,
                    en cada paso, estás construyendo la mejor versión de ti
                    mismo. ¡Sigue adelante y nunca te rindas!”
                </p>
            </div>
        </motion.div>
    );
}

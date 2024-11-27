import React from "react";
import { motion } from "framer-motion";
import { FiHeart, FiTarget } from "react-icons/fi";
import { Link } from "@inertiajs/react";
export default function HeroDieta() {
    return (
        <motion.div
            className="relative flex flex-col items-center justify-center bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white py-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-6xl font-extrabold mb-4 tracking-wider">
                ¡Maximiza Tu Potencial!
            </h1>
            <p className="text-lg text-gray-300 text-center max-w-2xl mb-6">
                Descubre planes dietéticos que se adaptan a tu estilo de vida y
                a tus objetivos de rendimiento. Logra resultados rápidos con
                nuestras dietas y entrenamientos personalizados.
            </p>
            <div className="flex gap-6 mt-4">
                <motion.div>
                    <FiHeart className="h-10 w-10 text-green-200" />
                </motion.div>
                <motion.div>
                    <FiTarget className="h-10 w-10 text-green-200" />
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-6 right-6 bg-green-700 bg-opacity-80 p-4 rounded-lg shadow-lg max-w-xs text-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-xl font-bold mb-2 text-green-100">
                    ¿Listo para empezar?
                </h2>
                <p className="text-sm text-gray-200 mb-4">
                    Accede a nuestras calculadoras para dar el primer paso hacia
                    tus metas y contar con esa ayuda extra que te proporcionamos.
                </p>
                <Link
                    href={route("calculadoras.index")}
                    className="bg-green-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-green-400 transition duration-300"
                >
                    Ir a las Calculadoras
                </Link>
            </motion.div>
        </motion.div>
    );
}

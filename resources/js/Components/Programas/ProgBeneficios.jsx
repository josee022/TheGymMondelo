import React from 'react';
import { motion } from 'framer-motion';

export default function ProgBeneficios() {
    return (
        <div className="mt-16">
            <motion.div
                className="bg-green-900 p-6 rounded-lg text-white mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-3xl font-bold mb-4">⚡ ¿Por qué elegir nuestros programas?</h3>
                <p>Nuestros entrenamientos están diseñados por expertos en fitness, combinando lo mejor de la ciencia del deporte con motivación y resultados garantizados.
                    Ya sea que busques perder peso, ganar masa muscular o simplemente ponerte en forma, tenemos el programa perfecto para ti.</p>
            </motion.div>
            <motion.div
                className="bg-black p-6 rounded-lg text-white"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-3xl font-bold mb-4">🎉 ¡Beneficios exclusivos para miembros!</h3>
                <ul className="list-disc list-inside">
                    <li>Acceso a contenido premium 🏅</li>
                    <li>Soporte personalizado con nuestros entrenadores 🧑‍🏫</li>
                    <li>Descuentos en suplementos y productos deportivos 🛒</li>
                </ul>
            </motion.div>
        </div>
    );
}

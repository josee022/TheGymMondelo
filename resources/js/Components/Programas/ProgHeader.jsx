import React from 'react';
import { motion } from 'framer-motion';

export default function ProgHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-10"
        >
            <h1 className="text-6xl font-extrabold mb-4">💪 Nuestros Programas 💪</h1>
            <p className="text-xl">
                Transforma tu vida con los mejores planes de fitness diseñados para ti. ¡Descubre cuál es el mejor para ti y empieza hoy! 🚀
            </p>
        </motion.div>
    );
}

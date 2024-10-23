import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { router } from '@inertiajs/react';

const getEmojiForLevel = (nivel) => {
    switch (nivel) {
        case 'Avanzado':
            return '🔥';
        case 'Intermedio':
            return '🏋️';
        case 'Principiante':
            return '🌱';
        default:
            return '';
    }
};

const handleInscribir = async (programaId) => {
    // Realiza la inscripción enviando una solicitud POST a la ruta correspondiente
    await router.post('/inscribir-programa', { programa_id: programaId });
    // Deja que el backend maneje los mensajes flash de éxito o error
};

export default function ProgLista({ programas }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programas.map((programa, index) => (
                <motion.div
                    key={index}
                    className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    <h3 className="text-2xl font-bold text-lime-400 mb-4">
                        {programa.nombre} {getEmojiForLevel(programa.nivel)}
                    </h3>
                    <p className="text-gray-400 mb-4">{programa.descripcion}</p>
                    <div className="text-lime-400 flex items-center mb-2">
                        <FiClock className="mr-2" />
                        <p>Duración : {programa.duracion} semanas</p>
                    </div>
                    <div className="text-lime-400 flex items-center mb-2">
                        <FiTrendingUp className="mr-2" />
                        <p>Nivel : {programa.nivel}</p>
                    </div>
                    <div className="text-lime-400 flex items-center mb-4">
                        <FiDollarSign className="mr-2" />
                        <p>Precio : {typeof programa.precio === 'number' ? programa.precio.toFixed(2) : parseFloat(programa.precio).toFixed(2)} €</p>
                    </div>
                    <button
                        className="bg-lime-500 text-black py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                        onClick={() => handleInscribir(programa.id)}
                    >
                        Inscribirse 💪
                    </button>
                </motion.div>
            ))}
        </div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function ListaClases({ clases }) {

    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
            <div className="text-center mb-8">
                <motion.h1
                    className="text-4xl font-bold text-gray-800 mb-2 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                        <span className="relative">Clases Disponibles</span> 💪
                    </span>
                </motion.h1>
                <p className="text-gray-600 text-lg">¡Descubre las clases que tenemos preparadas para ti y comienza tu transformación hoy! 🚀</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-900">
                {clases.map((clase) => (
                    <motion.div
                        key={clase.id}
                        className="bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h2 className="text-2xl font-semibold mb-2">{clase.nombre} 🔥</h2>
                        <p className="mb-2"><strong className="text-gray-700">📅 Fecha:</strong> {formatFechaClase(clase.fecha)}</p>
                        <p className="mb-2"><strong className="text-gray-700">🕒 Hora:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
                        <Link href={`/clases/${clase.id}`} className="text-lime-500 hover:text-lime-600 transition-colors">Ver detalles ➡️</Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

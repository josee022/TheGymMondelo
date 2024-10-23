import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { Link } from '@inertiajs/react';

export default function ReservaButton({ plazasDisponibles, handleReserve }) {
    return (
        <>
            <Link
                href="/clases"
                className="flex items-center bg-red-500 text-white py-3 px-6 rounded shadow-md hover:bg-red-600 transition-all"
            >
                <FaArrowLeft className="mr-2" /> Volver
            </Link>

            {plazasDisponibles > 0 ? (
                <motion.button
                    onClick={handleReserve}
                    className="flex items-center bg-lime-500 text-white py-3 px-6 rounded shadow-md hover:bg-lime-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaCheckCircle className="mr-2" /> Reservar Clase
                </motion.button>
            ) : (
                <p className="text-lg text-red-600">Clase completa</p>
            )}
        </>
    );
}

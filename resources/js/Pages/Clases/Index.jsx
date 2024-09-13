import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { motion } from 'framer-motion'; // Importa framer-motion para animaciones
import { FaRunning, FaDumbbell, FaHeartbeat, FaSmile } from 'react-icons/fa'; // Importa íconos adicionales

export default function Index({ clases, user }) {

    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nuestras Distintas Clases 🏋️‍♂️:</h2>}
        >
            <Head title="Clases Disponibles" />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
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

                {/* Sección de beneficios */}
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

                {/* Nueva Sección: Testimonios */}
                <div className="mt-12 p-8 bg-white rounded-lg shadow-md w-full max-w-4xl">
                    <h3 className="text-4xl font-bold text-center text-gray-800 mb-6">Testimonios 🗣️</h3>
                    <div className="flex flex-col space-y-6">
                        <div className="text-center">
                            <p className="text-xl text-gray-700 italic">"TheGymMondelo ha transformado mi vida, estoy en la mejor forma física de mi vida!"</p>
                            <p className="text-lg text-gray-800 font-semibold mt-2">- Juan Pérez</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xl text-gray-700 italic">"¡Los entrenadores y clases son increíbles! Mi rendimiento deportivo ha mejorado muchísimo."</p>
                            <p className="text-lg text-gray-800 font-semibold mt-2">- Laura Gómez</p>
                        </div>
                    </div>
                </div>

                {/* Sección de llamada a la acción */}
                <div className="mt-16 bg-gradient-to-r from-lime-400 to-green-500 rounded-lg shadow-lg w-full max-w-4xl p-8 text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">¡Únete a una de las clases de TheGymMondelo hoy! 🎉</h3>
                    <p className="text-white text-lg mb-6">No pierdas la oportunidad de mejorar tu salud y bienestar con nuestras clases y entrenadores expertos.</p>
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

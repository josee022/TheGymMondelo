import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { motion } from 'framer-motion';
import { FaUserTie, FaCalendarAlt, FaClock, FaUsers, FaStar, FaArrowLeft, FaCheckCircle, FaFire } from 'react-icons/fa';

export default function Show({ auth, clase, entrenador }) {

    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const { post } = useForm({
        clase_id: clase.id,
    });

    const handleReserve = (e) => {
        e.preventDefault();
        post(route('reservas.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Información de la clase seleccionada 🏋️‍♂️:</h2>}
        >
            <Head title={`Clase: ${clase.nombre}`} />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-16">
                {/* Contenedor principal ampliado */}
                <motion.div
                    className="w-full max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="text-5xl font-bold text-gray-800 mb-6"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {clase.nombre} 🏋️‍♂️
                    </motion.h1>

                    <p className="mb-4 text-lg text-gray-700"><FaCalendarAlt className="inline mr-2 text-lime-600" /> <strong>Fecha:</strong> {formatFechaClase(clase.fecha)}</p>
                    <p className="mb-4 text-lg text-gray-700"><FaClock className="inline mr-2 text-lime-600" /> <strong>Hora:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
                    <p className="mb-4 text-lg text-gray-700"><FaUsers className="inline mr-2 text-lime-600" /> <strong>Capacidad:</strong> {clase.capacidad} personas</p>
                    <p className="mb-4 text-lg text-gray-700"><FaStar className="inline mr-2 text-lime-600" /> <strong>Descripción:</strong> {clase.descripcion || 'No disponible'}</p>

                    <div className="mt-10">
                        <h2 className="text-3xl font-semibold mb-4">Conoce a tu Entrenador 🤝</h2>
                        <p className="mb-4 text-lg text-gray-700"><FaUserTie className="inline mr-2 text-lime-600" /> <strong>Nombre:</strong> {entrenador.usuario.name || 'No disponible'}</p>
                        <p className="mb-4 text-lg text-gray-700"><strong>Especialidad:</strong> {entrenador.especialidad || 'No disponible'}</p>
                        <p className="mb-4 text-lg text-gray-700"><strong>Tarifa:</strong> {entrenador.tarifa ? `${entrenador.tarifa} €/h` : 'No disponible'}</p>
                    </div>

                    <div className="flex justify-between mt-10">
                        {/* Botón para volver a la lista de clases */}
                        <Link
                            href="/clases"
                            className="flex items-center bg-red-500 text-white py-3 px-6 rounded shadow-md hover:bg-red-600 transition-all"
                        >
                            <FaArrowLeft className="mr-2" /> Volver
                        </Link>

                        {/* Botón para reservar la clase */}
                        <motion.button
                            onClick={handleReserve}
                            className="flex items-center bg-lime-500 text-white py-3 px-6 rounded shadow-md hover:bg-lime-600 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaCheckCircle className="mr-2" /> Reservar Clase
                        </motion.button>
                    </div>
                </motion.div>

                {/* Nuevo contenedor persuasivo para incentivar la reserva */}
                <motion.div
                    className="w-full max-w-5xl mx-auto bg-gradient-to-r from-lime-500 to-green-400 mt-10 p-10 rounded-lg shadow-lg text-white"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="text-4xl font-bold mb-6"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        ¡No pierdas la oportunidad de mejorar tu vida hoy! 💪🔥
                    </motion.h2>
                    <p className="text-lg mb-6">Transforma tu cuerpo, fortalece tu mente y alcanza tus metas con {clase.nombre}. Entrena con nuestro entrenador especializado y obtén resultados garantizados.</p>
                    <p className="text-lg mb-6"><FaFire className="inline mr-2 text-yellow-300" /> Esta clase es ideal para todos los niveles, y te ayudará a lograr una versión más fuerte y saludable de ti mismo.</p>

                    <div className="flex justify-center">
                        <motion.button
                            onClick={handleReserve}
                            className="bg-white text-lime-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ¡Reserva tu lugar ahora! 🚀
                        </motion.button>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

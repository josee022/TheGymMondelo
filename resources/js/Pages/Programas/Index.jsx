import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiTrendingUp, FiDollarSign, FiHeart } from 'react-icons/fi';
import { FaRunning, FaDumbbell } from 'react-icons/fa';
import Footer from '@/Components/Footer';
import { toast } from 'react-toastify'; // Importa react-toastify para los mensajes
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify
import axios from 'axios';
import { ToastContainer } from 'react-toastify';


export default function Programas({ auth, programas }) {

    // Función para obtener el emoji basado en el nivel
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

    // Función para manejar la inscripción
    const handleInscribir = async (programaId) => {
        try {
            const response = await axios.post('/inscribir-programa', { programa_id: programaId });
            toast.success(response.data.message); // Mostrar mensaje de éxito
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message); // Mostrar mensaje de error si ya está inscrito
            } else {
                toast.error('Ocurrió un error, por favor intenta de nuevo.');
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black-100 leading-tight">Programas de Entrenamiento :</h2>}
        >
            <ToastContainer />

            <Head title="Programas de Entrenamiento" />

            {/* Sección de Encabezado */}
            <div className="py-12 bg-gradient-to-b from-black via-green-800 to-lime-600 text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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

                    {/* Sección de Consejos */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <motion.div
                            className="bg-lime-500 text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">🎯 Define tus Objetivos</h3>
                            <p>Antes de empezar, piensa en qué quieres lograr: ¿Perder peso? ¿Ganar músculo? Establece metas claras para mantenerte motivado.</p>
                        </motion.div>
                        <motion.div
                            className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">💧 Mantente Hidratado</h3>
                            <p>El agua es esencial para un buen rendimiento. Lleva siempre contigo una botella de agua y mantente hidratado durante todo el día.</p>
                        </motion.div>
                        <motion.div
                            className="bg-lime-500 text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">🍎 Nutrición</h3>
                            <p>Combina tu entrenamiento con una dieta balanceada. Los resultados son 70% alimentación y 30% ejercicio.</p>
                        </motion.div>
                    </div>

                    {/* Sección de Programas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programas.map((programa, index) => (
                            <motion.div
                                key={index}
                                className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                {/* Añadiendo el emoji según el nivel */}
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
                                    onClick={() => handleInscribir(programa.id)} // Llamar a la función handleInscribir
                                >
                                    Inscribirse 💪
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sección de Iconos de Motivación */}
                    <div className="flex justify-center space-x-6 text-4xl text-white mt-16">
                        <FaRunning />
                        <FiHeart />
                        <FaDumbbell />
                        <FiCheckCircle />
                    </div>

                    {/* Contenedores Personalizados */}
                    <div className="mt-16">
                        <motion.div
                            className="bg-green-900 p-6 rounded-lg text-white mb-8"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-3xl font-bold mb-4">⚡ ¿Por qué elegir nuestros programas?</h3>
                            <p>Nuestros entrenamientos están diseñados por expertos en fitness, combinando lo mejor de la ciencia del deporte con motivación y resultados garantizados. Ya sea que busques perder peso, ganar masa muscular o simplemente ponerte en forma, tenemos el programa perfecto para ti.</p>
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
                </div>
            </div>

            <Footer />

        </AuthenticatedLayout>
    );
}

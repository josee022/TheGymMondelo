import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion'; // Librería para animaciones
import { FiHeart, FiTarget, FiActivity, FiTrendingUp, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import CalculadoraIMC from '@/Components/CalculadoraIMC'; // Importa el componente de la calculadora de IMC
import CalculadoraKcal from '@/Components/CalculadoraKcal'; // Importa el componente de la calculadora de kcal
import { FaDumbbell, FaHeartbeat } from 'react-icons/fa'; // Importa iconos de react-icons

export default function Dietas({ auth }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);  // Mostrar el mensaje de error si ya tiene una dieta
        }
    }, [flash]);


    // Función para manejar el registro de dietas
    const handleDieta = (objetivo, descripcion) => {

        console.log('Objetivo:', objetivo);  // Para depuración
        console.log('Descripción:', descripcion);  // Para depuración

        router.post(route('dietas.store'), {
            objetivo, // objetivo de la dieta
            descripcion, // descripción personalizada para cada objetivo
        });
    };

    const plans = [
        {
            title: 'Pérdida de Peso',
            icon: <FiHeart className="text-green-500" size={32} />,
            description: 'Plan diseñado para perder peso de forma saludable, sin comprometer tu salud.',
            details: [
                'Proporción óptima de macronutrientes.',
                'Comidas deliciosas y balanceadas.',
                'Plan de ejercicio complementario.',
                'Asesoría personalizada semanal.',
            ],
            color: 'green-500',
            bgColor: 'bg-green-50',
            objetivo: 'Pérdida de peso', // El objetivo específico
        },
        {
            title: 'Ganancia Muscular',
            icon: <FiActivity className="text-sky-500" size={32} />,
            description: 'Plan ideal para ganar masa muscular y mejorar la fuerza.',
            details: [
                'Alto contenido proteico.',
                'Carbohidratos de absorción lenta.',
                'Planes de comidas post-entrenamiento.',
                'Asesoría en suplementos.',
            ],
            color: 'sky-500',
            bgColor: 'bg-sky-50',
            objetivo: 'Ganancia muscular', // El objetivo específico
        },
        {
            title: 'Mejor Rendimiento',
            icon: <FiTrendingUp className="text-red-500" size={32} />,
            description: 'Plan diseñado para maximizar el rendimiento deportivo y la resistencia física.',
            details: [
                'Plan alimenticio para deportes de alta intensidad.',
                'Mejora en resistencia y recuperación.',
                'Vitaminas y minerales esenciales.',
                'Diseñado para atletas.',
            ],
            color: 'red-500',
            bgColor: 'bg-red-50',
            objetivo: 'Mantenimiento', // El objetivo específico
        },
    ];

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Planes de Dieta Personalizados : </h2>}>
            <Head title="Dietas" />

            {/* Sección Hero Mejorada */}
            <motion.div
                className="relative flex flex-col items-center justify-center bg-gradient-to-b from-green-800 via-green-600 to-green-400 text-white py-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-6xl font-extrabold mb-4 tracking-wider">¡Maximiza Tu Potencial!</h1>
                <p className="text-lg text-gray-300 text-center max-w-2xl mb-6">
                    Descubre planes dietéticos que se adaptan a tu estilo de vida y a tus objetivos de rendimiento. Logra resultados rápidos con nuestras dietas y entrenamientos personalizados.
                </p>
                <div className="flex gap-6 mt-4">
                    <motion.div
                        className="animate-bounce"
                        whileHover={{ scale: 1.2 }}
                    >
                        <FiHeart className="h-10 w-10 text-green-200" />
                    </motion.div>
                    <motion.div
                        className="animate-bounce"
                        whileHover={{ scale: 1.2 }}
                    >
                        <FiTarget className="h-10 w-10 text-green-200" />
                    </motion.div>
                </div>
            </motion.div>

            {/* Sección de Resúmenes Informativos */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 py-12">
                <div className="container mx-auto px-6">
                <motion.h2
                        className="text-5xl font-bold text-center text-gray-800 mb-12 underline underline-offset-8 decoration-slate-400"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Todo Lo Que Necesitas Saber
                    </motion.h2>                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Macronutrientes */}
                        <motion.div
                            className="bg-green-200 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-4">
                                <FiActivity className="h-8 w-8 text-green-600 mr-2" />
                                <h3 className="text-2xl font-semibold text-gray-800">Macronutrientes</h3>
                            </div>
                            <p className="text-gray-600">
                                Los <span className="text-green-700 font-semibold">macronutrientes</span> son esenciales para el cuerpo y se dividen en <span className="text-green-700 font-semibold">proteínas</span>, <span className="text-green-700 font-semibold">carbohidratos</span> y <span className="text-green-700 font-semibold">grasas</span>.
                            </p>
                        </motion.div>

                        {/* Diferencias entre Dietas */}
                        <motion.div
                            className="bg-blue-200 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-4">
                                <FiTarget className="h-8 w-8 text-blue-600 mr-2" />
                                <h3 className="text-2xl font-semibold text-gray-800">Tipos de Dietas</h3>
                            </div>
                            <p className="text-gray-600">
                                Las dietas de <span className="text-blue-700 font-semibold">déficit calórico</span> son ideales para la pérdida de peso, mientras que un <span className="text-blue-700 font-semibold">superávit calórico</span> favorece la ganancia muscular.
                            </p>
                        </motion.div>

                        {/* Intervalos de Resultados */}
                        <motion.div
                            className="bg-yellow-200 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-4">
                                <FiTrendingUp className="h-8 w-8 text-yellow-600 mr-2" />
                                <h3 className="text-2xl font-semibold text-gray-800">Resultados en Diferentes Intervalos</h3>
                            </div>
                            <p className="text-gray-600">
                                Dependiendo de la <span className="text-yellow-700 font-semibold">consistencia</span> y la adherencia al plan, puedes comenzar a ver resultados en <span className="text-yellow-700 font-semibold">4-8 semanas</span>.
                            </p>
                        </motion.div>

                        {/* Entrenamiento y Dietas */}
                        <motion.div
                            className="bg-red-200 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-4">
                                <FiCheckCircle className="h-8 w-8 text-red-600 mr-2" />
                                <h3 className="text-2xl font-semibold text-gray-800">Entrenamiento según la Dieta</h3>
                            </div>
                            <p className="text-gray-600">
                                La combinación de <span className="text-red-700 font-semibold">dieta</span> y entrenamiento es clave.
                            </p>
                        </motion.div>

                        {/* Alimentos Clave */}
                        <motion.div
                            className="bg-purple-200 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-4">
                                <FiHeart className="h-8 w-8 text-purple-600 mr-2" />
                                <h3 className="text-2xl font-semibold text-gray-800">Alimentos Clave</h3>
                            </div>
                            <p className="text-gray-600">
                                Alimentos ricos en <span className="text-purple-700 font-semibold">proteínas magras</span> como el pollo, el pescado, y los huevos son fundamentales para el crecimiento muscular.
                            </p>
                        </motion.div>

                        {/* Suplementación */}
                        <motion.div
                            className="bg-pink-200 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center mb-4">
                                <FiAlertCircle className="h-8 w-8 text-pink-600 mr-2" />
                                <h3 className="text-2xl font-semibold text-gray-800">Suplementación</h3>
                            </div>
                            <p className="text-gray-600">
                                Los suplementos como el <span className="text-pink-700 font-semibold">whey protein</span> y la <span className="text-pink-700 font-semibold">creatina</span> pueden complementar la dieta para mejorar el rendimiento.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Sección Dietas */}
            <div className="py-16 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-5xl font-bold text-center text-gray-800 mb-12 underline underline-offset-8 decoration-slate-400"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Nuestros Planes De Dietas Personalizados
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={index}
                                className={`p-8 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-500 ${plan.bgColor}`}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    {plan.icon}
                                </div>
                                <h3 className="text-3xl font-semibold text-center text-gray-800 mb-2">{plan.title}</h3>

                                <p className="text-gray-600 text-center mb-4">{plan.description}</p>

                                <ul className="text-gray-500 mb-6">
                                    {plan.details.map((detail, i) => (
                                        <li key={i} className="flex items-center mb-2">
                                            <FiCheckCircle className={`mr-2 text-${plan.color}`} />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-center">
                                    <button
                                        onClick={() => handleDieta(plan.objetivo, plan.description)}
                                        className={`bg-${plan.color} text-white py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300`}
                                    >
                                        ¡Adquiere Aquí!
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-gradient-to-r from-lime-600 via-lime-400 to-lime-600 flex flex-col justify-center items-center py-16">
                <motion.h2
                    className="text-5xl font-bold text-center text-gray-800 mb-12 underline underline-offset-8 decoration-slate-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Calculadoras De Ayuda Sobre Información Fitness
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">

                    {/* Calculadora IMC */}
                    <div className="bg-gradient-to-br from-lime-50 via-lime-100 to-lime-300 shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
                        <div className="flex items-center justify-center mb-4">
                            <FaHeartbeat className="text-red-500 text-4xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Calculadora IMC</h2>
                        <CalculadoraIMC />
                    </div>

                    {/* Calculadora Kcal */}
                    <div className="bg-gradient-to-br from-lime-50 via-lime-100 to-lime-300 shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
                        <div className="flex items-center justify-center mb-4">
                            <FaDumbbell className="text-green-500 text-4xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Calculadora de Calorías</h2>
                        <CalculadoraKcal />
                    </div>

                </div>
            </div>

            <Footer />
            <ToastContainer />
        </AuthenticatedLayout>
    );
}

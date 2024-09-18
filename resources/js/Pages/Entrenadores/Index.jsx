import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaHeartbeat, FaRunning, FaDumbbell } from 'react-icons/fa'; // Importar íconos para redes sociales

export default function Index({ auth, entrenadores }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-gray-800 leading-tight">Nuestros Entrenadores :</h2>}
        >
            <Head title="Entrenadores" />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 to-lime-400 py-16 overflow-hidden">
                {/* Efecto de burbujas flotantes en el fondo */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-lime-300 to-transparent opacity-50 pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-lime-300 to-transparent opacity-50 pointer-events-none animate-bounce"></div>


                {/* Contenedor principal */}
                <div className="relative z-10 w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10 space-y-10 transition-all duration-500 transform hover:scale-105">
                    <div className="text-center mb-6">
                        <h1 className="text-5xl font-extrabold text-gray-900 tracking-widest relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-2 bg-lime-400"></span>
                                <span className="relative">Entrenadores en todos los campos</span>
                            </span>
                        </h1>
                    </div>

                    {/* Sección de entrenadores */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-900 animate-fade-in">
                        {entrenadores.map((entrenador) => (
                            <div key={entrenador.id} className="bg-gray-100 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-green-100">
                                <h2 className="text-3xl font-bold mb-3 text-green-800">{entrenador.usuario.name}</h2>
                                <p className="text-lg mb-2"><strong className="text-gray-700">Especialidad:</strong> {entrenador.especialidad}</p>
                                <p className="text-lg mb-2"><strong className="text-gray-700">Tarifa:</strong> {entrenador.tarifa} €/h</p>
                                <div className="flex space-x-4 mt-4">
                                    <a href="#" className="text-green-500 hover:text-green-700"><FaInstagram size={24} /></a>
                                    <a href="#" className="text-blue-500 hover:text-blue-700"><FaFacebook size={24} /></a>
                                    <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
                                    <a href="#" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={24} /></a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sección de información adicional */}
                    <div className="flex flex-col lg:flex-row justify-between items-center mt-12 bg-lime-100 rounded-lg shadow-lg p-8">
                        <div className="text-center lg:text-left space-y-4">
                            <h3 className="text-3xl font-bold text-gray-800">¿Listo para mejorar tu físico?</h3>
                            <p className="text-lg text-gray-700">Nuestros entrenadores certificados están aquí para ayudarte a alcanzar tus objetivos.</p>
                        </div>
                        <div className="mt-6 lg:mt-0">
                            <a href="/contacto" className="px-6 py-3 bg-lime-500 text-white rounded-full shadow-lg hover:bg-lime-600 transition duration-300 transform hover:scale-105">
                                Contáctanos
                            </a>
                        </div>
                    </div>
                </div>

                {/* Segundo contenedor */}
                <div className="relative z-10 w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10 mt-10 space-y-10 transition-all duration-500 transform hover:scale-105">
                    {/* Título */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 animate-bounce">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-2 bg-green-400"></span>
                                ¡Conoce a Nuestros Entrenadores! 🏆
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 font-semibold">Descubre a los expertos que te llevarán a alcanzar tus metas. ¡Empieza hoy mismo! 💪</p>
                    </div>

                    {/* Contenedor de información adicional */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-900">
                        {/* Contenedor 1: Entrenadores Certificados */}
                        <div className="relative bg-gradient-to-b from-blue-100 to-blue-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-110">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md">
                                🎓 Títulos Profesionales
                            </div>
                            <p className="text-center text-xl font-bold text-blue-700 mt-8">Entrenadores Certificados</p>
                            <p className="text-center text-md text-gray-600 mt-4 mb-6">
                                Nuestros entrenadores cuentan con certificaciones profesionales reconocidas internacionalmente. ¡Estás en buenas manos!
                            </p>
                            <a
                                href={route('dietas.index')} // Actualiza la ruta a la correcta para tu proyecto
                                className="relative w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 font-bold tracking-wide animate-glow"
                            >
                                ¡Descubre Más! 👨‍🏫
                                <div className="absolute inset-0 bg-white opacity-10 rounded-lg blur-md animate-blink"></div>
                            </a>
                        </div>

                        {/* Contenedor 2: Entrenamiento Personalizado */}
                        <div className="relative bg-gradient-to-b from-green-100 to-green-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-110">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white py-2 px-4 rounded-full shadow-md">
                                🎯 Planes Personalizados
                            </div>
                            <p className="text-center text-xl font-bold text-green-700 mt-8">Entrenamiento a tu Medida</p>
                            <p className="text-center text-md text-gray-600 mt-4 mb-6">
                                Cada entrenador te diseñará un plan de entrenamiento basado en tus necesidades y objetivos. ¡Optimiza tu rendimiento!
                            </p>
                            <a
                                href={route('programas.index')} // Actualiza la ruta a la correcta para tu proyecto
                                className="relative w-full bg-gradient-to-r from-green-400 to-lime-500 text-white py-3 px-6 rounded-lg hover:bg-green-500 transition-all duration-300 font-bold tracking-wide animate-glow"
                            >
                                ¡Comienza Ahora! 🚀
                                <div className="absolute inset-0 bg-white opacity-10 rounded-lg blur-md animate-blink"></div>
                            </a>
                        </div>

                        {/* Contenedor 3: Clases Grupales */}
                        <div className="relative bg-gradient-to-b from-yellow-100 to-yellow-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-110">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white py-2 px-4 rounded-full shadow-md">
                                🧘‍♂️ Clases Grupales
                            </div>
                            <p className="text-center text-xl font-bold text-yellow-700 mt-8">Entrenamiento en Grupo</p>
                            <p className="text-center text-md text-gray-600 mt-4 mb-6">
                                Disfruta de la motivación y la energía que te ofrecen las clases grupales dirigidas por nuestros expertos entrenadores.
                            </p>
                            <a
                                href={route('clases.index')} // Actualiza la ruta a la correcta para tu proyecto
                                className="relative w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all duration-300 font-bold tracking-wide animate-glow"
                            >
                                ¡Únete a una Clase! 🙌
                                <div className="absolute inset-0 bg-white opacity-10 rounded-lg blur-md animate-blink"></div>
                            </a>
                        </div>
                    </div>

                    {/* Contenedor extra: Motivación y Resultados */}
                    <div className="mt-12 text-center bg-gradient-to-r from-indigo-100 to-purple-100 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
                        <h2 className="text-3xl font-bold text-indigo-900 mb-4">¡Tus Resultados Son Nuestra Motivación! 🎉</h2>
                        <p className="text-lg text-gray-700 mb-6">
                            Nuestros entrenadores están aquí para motivarte en cada paso de tu transformación. ¡Comienza hoy y siente la diferencia! 🙌
                        </p>
                        <a
                            href={route('suscripciones.index')} // Actualiza la ruta a la correcta para tu proyecto
                            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:bg-indigo-600 transition duration-300 transform hover:scale-105"
                        >
                            ¡Suscríbete Ahora! 📈
                        </a>
                    </div>
                </div>



            </div>
            <Footer />
        </AuthenticatedLayout >
    );
}

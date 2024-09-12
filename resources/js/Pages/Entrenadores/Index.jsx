import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Importar íconos para redes sociales

export default function Index({ auth, entrenadores }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-gray-800 leading-tight">Nuestros Entrenadores</h2>}
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
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

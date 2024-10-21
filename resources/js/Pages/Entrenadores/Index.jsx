import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import SeccionTarjetas from '@/Components/Entrenadores/SeccionTarjetas';
import SeccionDestacada from '@/Components/Entrenadores/SeccionDestacada';
import SeccionContacto from '@/Components/Entrenadores/SeccionContacto';
import SeccionSuscripcion from '@/Components/Entrenadores/SeccionSuscripcion';

export default function Index({ auth, entrenadores }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-3xl text-gray-800 leading-tight">Nuestros Entrenadores :</h2>}
        >
            <Head title="Entrenadores" />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 to-lime-400 py-16 overflow-hidden">

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
                    <SeccionTarjetas entrenadores={entrenadores} />

                    {/* Sección de contacto */}
                    <SeccionContacto />
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
                        <SeccionDestacada
                            titulo="Entrenadores Certificados"
                            descripcion="Nuestros entrenadores cuentan con certificaciones profesionales reconocidas internacionalmente."
                            ruta={route('dietas.index')}
                            bgColor="bg-gradient-to-b from-blue-400 to-blue-300"
                            botonColor="bg-blue-500"
                            emoji="🎓"
                        />
                        <SeccionDestacada
                            titulo="Entrenamiento a tu Medida"
                            descripcion="Cada entrenador te diseñará un plan de entrenamiento basado en tus necesidades y objetivos."
                            ruta={route('programas.index')}
                            bgColor="bg-gradient-to-b from-green-400 to-green-300"
                            botonColor="bg-green-500"
                            emoji="🎯"
                        />
                        <SeccionDestacada
                            titulo="Entrenamiento en Grupo"
                            descripcion="Disfruta de la motivación y la energía que te ofrecen las clases grupales."
                            ruta={route('clases.index')}
                            bgColor="bg-gradient-to-b from-yellow-400 to-yellow-300"
                            botonColor="bg-yellow-500"
                            emoji="🧘‍♂️"
                        />
                    </div>

                    {/* Contenedor suscripcion */}
                    <SeccionSuscripcion />
                </div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

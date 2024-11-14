import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import SeccionTarjetas from "@/Components/Entrenadores/SeccionTarjetas";
import SeccionDestacada from "@/Components/Entrenadores/SeccionDestacada";
import SeccionContacto from "@/Components/Entrenadores/SeccionContacto";
import SeccionSuscripcion from "@/Components/Entrenadores/SeccionSuscripcion";

export default function Index({ auth, entrenadores }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-3xl font-extrabold text-center text-green-600 mt-4">
                    🛠️ Nuestros Entrenadores 🛠️
                </h2>
            }
        >
            <Head title="Entrenadores" />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-br from-green-100 to-lime-400 py-8 overflow-hidden">
                {/* Contenedor principal de tarjetas de entrenadores */}
                <div className="relative z-10 w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10 space-y-10 mt-6">
                    <div className="text-center mb-6">
                        <h1 className="text-5xl font-extrabold text-gray-900 tracking-widest relative">
                            <span className="relative inline-block">
                                <span className="relative">
                                    Entrenadores Personalizados Para Ti
                                </span>
                            </span>
                        </h1>
                    </div>

                    {/* Sección de entrenadores */}
                    <SeccionTarjetas entrenadores={entrenadores} />

                    {/* Sección de contacto */}
                    <SeccionContacto />
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-lg p-10 space-y-10 mt-10">
                    {/* Título de las secciones adicionales */}
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                            <span className="relative inline-block">
                                Descubre Nuestros Servicios Adicionales 🏆
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 font-semibold">
                            Explora nuestras opciones y encuentra el servicio
                            que te ayudará a alcanzar tus metas. ¡Empieza hoy
                            mismo! 💪
                        </p>
                    </div>

                    {/* Contenedor de información adicional */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-900">
                        <SeccionDestacada
                            titulo="Planes de Nutrición"
                            descripcion="Descubre nuestras dietas elaboradas por profesionales para potenciar tu rendimiento y salud."
                            ruta={route("dietas.index")}
                            bgColor="bg-gradient-to-b from-blue-400 to-blue-300"
                            botonColor="bg-blue-500"
                            emoji="🥗"
                        />
                        <SeccionDestacada
                            titulo="Programas de Entrenamiento"
                            descripcion="Elige entre nuestros programas de entrenamiento diseñados para todos los niveles y metas."
                            ruta={route("programas.index")}
                            bgColor="bg-gradient-to-b from-green-400 to-green-300"
                            botonColor="bg-green-500"
                            emoji="💪"
                        />
                        <SeccionDestacada
                            titulo="Clases Grupales"
                            descripcion="Disfruta de la energía y motivación que ofrecen nuestras clases grupales junto a otros compañeros."
                            ruta={route("clases.index")}
                            bgColor="bg-gradient-to-b from-yellow-400 to-yellow-300"
                            botonColor="bg-yellow-500"
                            emoji="🧘‍♂️"
                        />
                    </div>

                    {/* Contenedor suscripción */}
                    <SeccionSuscripcion />
                </div>

                {/* Efectos de fondo */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-lime-300 to-transparent opacity-50 pointer-events-none animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-lime-300 to-transparent opacity-50 pointer-events-none animate-bounce"></div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { router } from '@inertiajs/react';

export default function Suscripciones({ auth }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleSubscription = (tipo) => {
        router.post(route('suscripciones.store'), { tipo });
    };

    // Precios base
    const precioMensual = 25;
    const descuentoSemestral = 0.15; // 15% de descuento
    const descuentoAnual = 0.40; // 40% de descuento

    // Cálculos de precios con descuentos aplicados
    const precioSemestral = (precioMensual * (1 - descuentoSemestral)).toFixed(2);
    const pagoSemestral = (precioSemestral * 6).toFixed(2);

    const precioAnual = (precioMensual * (1 - descuentoAnual)).toFixed(2);
    const pagoAnual = (precioAnual * 12).toFixed(2);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nuestras Suscripciones :</h2>}
        >
            <Head title="Suscripciones" />
            <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 text-white py-8">
                {/* Fondo animado */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-20 blur-lg"></div>

                {/* Texto principal con glow */}
                <h1 className="text-4xl font-extrabold mb-4 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                    🚀 TU CAMBIO FÍSICO Y DE VIDA 💪
                </h1>

                {/* Subtítulo con emojis */}
                <p className="text-lg text-gray-300 text-center max-w-lg mb-6 animate-slide-up font-semibold">
                    Esto es lo que consigues si te apuntas a <span className="text-green-400 font-bold">TheGymMondelo</span>:
                    <span className="text-yellow-400"> 🌟</span>
                </p>

                {/* Flecha con efecto glow y rebote */}
                <div className="relative animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400 animate-glow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <div className="absolute inset-0 bg-green-400 opacity-50 blur-xl rounded-full animate-ping"></div>
                </div>
            </div>


            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-lime-400 py-12">
                <div className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    {/* Título con animación */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 ">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-2 bg-green-400"></span>
                                Planes de Suscripción 💪
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 font-semibold">Empieza tu viaje fitness con nosotros. ¡No pierdas más tiempo y elige tu plan hoy mismo! 🚀</p>
                    </div>

                    {/* Planes */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-gray-900">
                        {/* Suscripción Mensual */}
                        <div className="relative bg-gradient-to-b from-green-100 to-green-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-110">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white py-2 px-4 rounded-full shadow-md">
                                🔥 Mensual 🔥
                            </div>
                            <p className="text-center text-lg font-bold text-green-700 mt-8">Pago Mensual</p>
                            <p className="text-center text-xl font-extrabold text-black mt-4 mb-2 animate-pulse">🎁 5 DÍAS GRATIS 🎁</p>
                            <p className="text-center text-md text-gray-600">Después:</p>
                            <p className="text-center text-3xl font-extrabold text-black mt-2 mb-4">€25/mes</p>
                            <p className="text-center text-sm text-gray-600 mb-6">[Pago de €25 al mes]</p>
                            <button
                                onClick={() => handleSubscription('Mensual')}
                                className="relative w-full bg-gradient-to-r from-green-400 to-lime-500 text-white py-3 px-6 rounded-lg hover:bg-green-500 transition-all duration-300 font-bold tracking-wide animate-glow">
                                ¡Suscribirme! ✨
                                <div className="absolute inset-0 bg-white opacity-10 rounded-lg blur-md animate-blink"></div>
                            </button>
                            <ul className="mt-8 text-gray-800 text-md space-y-3">
                                <li className="border-b border-gray-200 pb-3">✅ Acceso ilimitado al gimnasio 🏋️‍♂️</li>
                                <li className="border-b border-gray-200 pb-3">✅ 1 sesión con entrenador al mes 👨‍🏫</li>
                                <li className="border-b border-gray-200 pb-3">✅ Acceso a clases grupales 🧘</li>
                                <li className="border-b border-gray-200 pb-3">✅ Pautas básicas de alimentación 🍎</li>
                                <li className="border-b border-gray-200 pb-3">✅ Acceso a la comunidad online 🌐</li>
                            </ul>
                        </div>

                        {/* Suscripción Semestral */}
                        <div className="relative bg-gradient-to-b from-yellow-100 to-yellow-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-110">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-white py-2 px-4 rounded-full shadow-md">
                                🌟 Semestral
                            </div>
                            <p className="text-center text-lg font-bold text-yellow-700 mt-8">Pago Semestral</p>
                            <div className="text-center mt-2">
                                <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full">-15% de descuento 🎉</span>
                            </div>
                            <p className="text-center text-xl font-extrabold text-black mt-4 mb-2">🎁 5 DÍAS GRATIS 🎁</p>
                            <p className="text-center text-md text-gray-600">Después:</p>
                            <p className="text-center text-3xl font-extrabold text-red-500 line-through mt-2 mb-1">€25/mes</p>
                            <p className="text-center text-3xl font-extrabold text-black mb-4">€{precioSemestral}/mes</p>
                            <p className="text-center text-sm text-gray-600 mb-6">[Pago de €{pagoSemestral} cada 6 meses]</p>
                            <button
                                onClick={() => handleSubscription('Semestral')}
                                className="relative w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all duration-300 font-bold tracking-wide animate-glow">
                                ¡Suscribirme! 🚀
                                <div className="absolute inset-0 bg-white opacity-10 rounded-lg blur-md animate-blink"></div>
                            </button>
                            <ul className="mt-8 text-gray-800 text-md space-y-3">
                                <li className="border-b border-gray-200 pb-3">✅ Acceso ilimitado al gimnasio 🏋️‍♂️</li>
                                <li className="border-b border-gray-200 pb-3">✅ 2 sesiones con entrenador al mes 👨‍🏫</li>
                                <li className="border-b border-gray-200 pb-3">✅ Acceso a clases grupales 🧘</li>
                                <li className="border-b border-gray-200 pb-3">✅ Pautas personalizadas de alimentación 🥑</li>
                                <li className="border-b border-gray-200 pb-3">✅ Acceso a la comunidad online 🌐</li>
                            </ul>
                        </div>

                        {/* Suscripción Anual */}
                        <div className="relative bg-gradient-to-b from-blue-100 to-blue-50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-110">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white py-2 px-4 rounded-full shadow-md">
                                ⭐ Anual ⭐
                            </div>
                            <p className="text-center text-lg font-bold text-blue-700 mt-8">Pago Anual</p>
                            <div className="text-center mt-2">
                                <span className="inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full">-20% de descuento 🎉</span>
                            </div>
                            <p className="text-center text-xl font-extrabold text-black mt-4 mb-2">🎁 5 DÍAS GRATIS 🎁</p>
                            <p className="text-center text-md text-gray-600">Después:</p>
                            <p className="text-center text-3xl font-extrabold text-red-500 line-through mt-2 mb-1">€25/mes</p>
                            <p className="text-center text-3xl font-extrabold text-black mb-4">€{precioAnual}/mes</p>
                            <p className="text-center text-sm text-gray-600 mb-6">[Pago de €{pagoAnual} al año]</p>
                            <button
                                onClick={() => handleSubscription('Anual')}
                                className="relative w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition-all duration-300 font-bold tracking-wide animate-glow">
                                ¡Suscribirme! ✨
                                <div className="absolute inset-0 bg-white opacity-10 rounded-lg blur-md animate-blink"></div>
                            </button>
                            <ul className="mt-8 text-gray-800 text-md space-y-3">
                                <li className="border-b border-gray-200 pb-3">✅ Acceso ilimitado al gimnasio 🏋️‍♂️</li>
                                <li className="border-b border-gray-200 pb-3">✅ 4 sesiones con entrenador al mes 👨‍🏫</li>
                                <li className="border-b border-gray-200 pb-3">✅ Acceso a clases grupales 🧘</li>
                                <li className="border-b border-gray-200 pb-3">✅ Pautas personalizadas de alimentación 🥗</li>
                                <li className="border-b border-gray-200 pb-3">✅ Acceso a eventos exclusivos 🎟️</li>
                                <li className="border-b border-gray-200 pb-3">✅ Acceso a la comunidad online 🌐</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <ToastContainer />
        </AuthenticatedLayout>
    );
}

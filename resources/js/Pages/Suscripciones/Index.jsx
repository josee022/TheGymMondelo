import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { router } from '@inertiajs/react';
import { toast, ToastContainer } from 'react-toastify'; // Importa toast y ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa el CSS de react-toastify

export default function Suscripciones({ auth }) {

    const handleSubscription = (tipo) => {
        router.post(route('suscripciones.store'), { tipo }, {
            onSuccess: () => {
                // Mostrar un mensaje de éxito
                toast.success('¡Suscripción creada con éxito!');
            },
            onError: () => {
                // Mostrar un mensaje de error
                toast.error('Hubo un error al crear la suscripción. Inténtalo nuevamente.');
            },
        });
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

            {/* Sección de presentación */}
            <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 text-white py-6">
                <h1 className="text-3xl font-bold mb-2 animate-fade-in">TU CAMBIO FÍSICO Y DE VIDA</h1>
                <p className="text-sm text-gray-300 text-center max-w-md mb-4 animate-slide-up">
                    Esto es lo que consigues si te apuntas a <span className="text-green-400 font-semibold">TheGymMondelo</span>.
                </p>
                <div className="animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Contenido */}
            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 rounded-lg p-6">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1 bg-green-400"></span>
                                <span className="relative">Planes de Suscripción</span>
                            </span>
                        </h1>
                        <p className="text-gray-600">Elige el plan que mejor se adapte a tus necesidades y empieza tu viaje fitness con nosotros.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-900">
                        {/* Suscripción Mensual */}
                        <div className="relative bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 text-white py-1 px-3 rounded-full shadow-lg">
                                Mensual
                            </div>
                            <p className="text-center text-md font-semibold text-gray-800 mt-6">Pago Mensual</p>
                            <br />
                            <p className="text-center text-lg font-bold mb-2">5 DÍAS GRATIS</p>
                            <p className="text-center text-xs text-gray-600">y después:</p>
                            <p className="text-center text-2xl font-bold mb-2">€25/mes</p>
                            <p className="text-center text-xs text-gray-600 mb-4">[Pago de €25 al mes]</p>
                            <button
                                onClick={() => handleSubscription('Mensual')} // Evento onClick para enviar la suscripción
                                className="w-full bg-green-400 text-white py-1 px-3 rounded-lg hover:bg-green-500 transition duration-300">
                                ¡Suscribirme!
                            </button>
                            <ul className="mt-4 text-gray-800 text-sm">
                                <li>✅ Acceso ilimitado al gimnasio</li>
                                <br />
                                <li>✅ 1 sesión con entrenador al mes</li>
                                <br />
                                <li>✅ Acceso a clases grupales</li>
                                <br />
                                <li>✅ Pautas básicas de alimentación</li>
                                <br />
                                <li>✅ Acceso a la comunidad online</li>
                                <br />
                            </ul>
                        </div>

                        {/* Suscripción Semestral */}
                        <div className="relative bg-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 text-white py-1 px-3 rounded-full shadow-lg">
                                Semestral
                            </div>
                            <p className="text-center text-md font-semibold text-gray-800 mt-6">Pago Semestral</p>
                            <br />
                            <div className="text-center">
                                <span className="inline-block bg-lime-400 text-white text-xs px-2 py-1 rounded-full mb-2">-15%</span>
                            </div>
                            <p className="text-center text-lg font-bold mb-2">5 DÍAS GRATIS</p>
                            <p className="text-center text-xs text-gray-600">y después:</p>
                            <p className="text-center text-2xl font-bold text-red-500 mb-2 line-through">€25/mes</p>
                            <p className="text-center text-2xl font-bold mb-2">€{precioSemestral}/mes</p>
                            <p className="text-center text-xs text-gray-600 mb-4">[Pago de €{pagoSemestral} cada 6 meses]</p>
                            <button
                                onClick={() => handleSubscription('Semestral')}
                                className="w-full bg-green-400 text-white py-1 px-3 rounded-lg hover:bg-green-500 transition duration-300">
                                ¡Suscribirme!
                            </button>
                            <ul className="mt-4 text-gray-800 text-sm">
                                <li>✅ Acceso ilimitado al gimnasio</li>
                                <br />
                                <li>✅ 2 sesiones con entrenador al mes</li>
                                <br />
                                <li>✅ Acceso a clases grupales</li>
                                <br />
                                <li>✅ Pautas medias de alimentación</li>
                                <br />
                                <li>✅ Acceso a la comunidad online</li>
                                <br />
                                <li>✅ 10% de descuento en la tienda</li>
                                <br />
                                <li>✅ Aplicación móvil para seguimiento</li>
                                <br />
                            </ul>
                        </div>

                        {/* Suscripción Anual */}
                        <div className="relative bg-gray-400 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-400 text-white py-1 px-3 rounded-full shadow-lg">
                                Anual
                            </div>
                            <p className="text-center text-md font-semibold text-gray-800 mt-6">Pago Anual</p>
                            <br />
                            <div className="text-center">
                                <span className="inline-block bg-lime-400 text-white text-xs px-2 py-1 rounded-full mb-2">-40%</span>
                            </div>
                            <p className="text-center text-lg font-bold mb-2">5 DÍAS GRATIS</p>
                            <p className="text-center text-xs text-gray-600">y después:</p>
                            <p className="text-center text-2xl font-bold text-red-500 mb-2 line-through">€25/mes</p>
                            <p className="text-center text-2xl font-bold mb-2">€{precioAnual}/mes</p>
                            <p className="text-center text-xs text-gray-600 mb-4">[Pago de €{pagoAnual} cada 12 meses]</p>
                            <button
                                onClick={() => handleSubscription('Anual')}
                                className="w-full bg-green-400 text-white py-1 px-3 rounded-lg hover:bg-green-500 transition duration-300">
                                ¡Suscribirme!
                            </button>
                            <ul className="mt-4 text-gray-800 text-sm">
                                <li>✅ Acceso ilimitado al gimnasio</li>
                                <br />
                                <li>✅ 4 sesiones con entrenador al mes</li>
                                <br />
                                <li>✅ Acceso a clases grupales</li>
                                <br />
                                <li>✅ Pautas avanzadas de alimentación</li>
                                <br />
                                <li>✅ Acceso a la comunidad online</li>
                                <br />
                                <li>✅ 20% de descuento en la tienda</li>
                                <br />
                                <li>✅ Aplicación móvil para seguimiento</li>
                                <br />
                                <li>✅ Nuevo contenido/rutinas semanal</li>
                                <br />
                                <li>✅ Retos, premios y sorpresas</li>
                                <br />
                                <li>✅ Acceso a eventos exclusivos</li>
                                <br />
                                <li>✅ Canal exclusivo de Telegram</li>
                                <br />
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

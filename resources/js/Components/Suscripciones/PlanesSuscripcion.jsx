import React from "react";
import { router } from "@inertiajs/react";

export default function PlanesSuscripcion({
    precioMensual,
    precioSemestral,
    pagoSemestral,
    precioAnual,
    pagoAnual,
}) {
    const handleSubscription = (tipo) => {
        router.post(route("suscripciones.store"), { tipo });
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-lime-400 py-12">
            <div className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                {/* Título con animación */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                        <span className="relative inline-block">
                            <span className="absolute inset-x-0 bottom-0 h-2 bg-green-400"></span>
                            Planes de Suscripción 💪
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 font-semibold">
                        Empieza tu viaje fitness con nosotros. ¡No pierdas más
                        tiempo y elige tu plan hoy mismo! 🚀
                    </p>
                </div>

                {/* Planes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-gray-900">
                    {/* Plan Mensual */}
                    <PlanCard
                        tipo="Mensual"
                        precio={`€${precioMensual}/mes`}
                        pago={`€${precioMensual} al mes`}
                        regalo="🎁 5 DÍAS GRATIS 🎁"
                        handleSubscription={handleSubscription}
                        beneficios={[
                            "✅ Acceso ilimitado al gimnasio 🏋️‍♂️",
                            "✅ 1 sesión con entrenador al mes 👨‍🏫",
                            "✅ Acceso a clases grupales 🧘",
                            "✅ Pautas básicas de alimentación 🍎",
                            "✅ Acceso a la comunidad online 🌐",
                        ]}
                    />

                    {/* Plan Semestral */}
                    <PlanCard
                        tipo="Semestral"
                        precio={`€${precioSemestral}/mes`}
                        pago={`€${pagoSemestral} cada 6 meses`}
                        descuento="-15% de descuento 🎉"
                        regalo="🎁 5 DÍAS GRATIS 🎁"
                        precioTachado="€25/mes"
                        handleSubscription={handleSubscription}
                        beneficios={[
                            "✅ Acceso ilimitado al gimnasio 🏋️‍♂️",
                            "✅ 2 sesiones con entrenador al mes 👨‍🏫",
                            "✅ Acceso a clases grupales 🧘",
                            "✅ Pautas personalizadas de alimentación 🥑",
                            "✅ Acceso a la comunidad online 🌐",
                        ]}
                    />

                    {/* Plan Anual */}
                    <PlanCard
                        tipo="Anual"
                        precio={`€${precioAnual}/mes`}
                        pago={`€${pagoAnual} al año`}
                        descuento="-40% de descuento 🎉"
                        regalo="🎁 5 DÍAS GRATIS 🎁"
                        precioTachado="€25/mes"
                        handleSubscription={handleSubscription}
                        beneficios={[
                            "✅ Acceso ilimitado al gimnasio 🏋️‍♂️",
                            "✅ 4 sesiones con entrenador al mes 👨‍🏫",
                            "✅ Acceso a clases grupales 🧘",
                            "✅ Pautas personalizadas de alimentación 🥗",
                            "✅ Acceso a eventos exclusivos 🎟️",
                            "✅ Acceso a la comunidad online 🌐",
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

function PlanCard({
    tipo,
    precio,
    pago,
    descuento,
    regalo,
    precioTachado,
    handleSubscription,
    beneficios,
}) {
    return (
        <div
            className={`relative bg-gradient-to-b ${
                tipo === "Mensual"
                    ? "from-green-100 to-green-50"
                    : tipo === "Semestral"
                    ? "from-yellow-100 to-yellow-50"
                    : "from-blue-100 to-blue-50"
            } p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-110`}
        >
            <div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                    tipo === "Mensual"
                        ? "bg-green-500"
                        : tipo === "Semestral"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                } text-white py-2 px-4 rounded-full shadow-md`}
            >
                {tipo === "Mensual"
                    ? "🔥 Mensual 🔥"
                    : tipo === "Semestral"
                    ? "🌟 Semestral"
                    : "⭐ Anual ⭐"}
            </div>
            <p
                className={`text-center text-lg font-bold ${
                    tipo === "Mensual"
                        ? "text-green-700"
                        : tipo === "Semestral"
                        ? "text-yellow-700"
                        : "text-blue-700"
                } mt-8`}
            >
                Pago {tipo}
            </p>
            {descuento && (
                <div className="text-center mt-2">
                    <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                        {descuento}
                    </span>
                </div>
            )}
            <p className="text-center text-xl font-extrabold text-black mt-4 mb-2">
                {regalo}
            </p>
            <p className="text-center text-md text-gray-600">Después:</p>
            {precioTachado && (
                <p className="text-center text-3xl font-extrabold text-red-500 line-through mt-2 mb-1">
                    {precioTachado}
                </p>
            )}
            <p className="text-center text-3xl font-extrabold text-black mb-4">
                {precio}
            </p>
            <p className="text-center text-sm text-gray-600 mb-6">
                [Pago de {pago}]
            </p>
            <button
                onClick={() => handleSubscription(tipo)}
                className={`relative w-full bg-gradient-to-r ${
                    tipo === "Mensual"
                        ? "from-green-400 to-lime-500"
                        : tipo === "Semestral"
                        ? "from-yellow-400 to-orange-500"
                        : "from-blue-400 to-indigo-500"
                } text-white py-3 px-6 rounded-lg hover:bg-green-500 transition-all duration-300 font-bold tracking-wide animate-glow`}
            >
                ¡Suscribirme! ✨
            </button>
            <ul className="mt-8 text-gray-800 text-md space-y-3">
                {beneficios.map((beneficio, index) => (
                    <li key={index} className="border-b border-gray-200 pb-3">
                        {beneficio}
                    </li>
                ))}
            </ul>
        </div>
    );
}

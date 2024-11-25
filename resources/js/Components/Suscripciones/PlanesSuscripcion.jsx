import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { router } from "@inertiajs/react";

const stripePromise = loadStripe(
    "pk_test_51QNXpKEJzO4kuy9zOXZXYML8FDTkpqKxXWbBlj4ep3yqQow14nzLCtbdc6X3Pk78zkGMWIMQvKYQKUTQaM1bL6EK00A6v5vnA9"
);

export default function PlanesSuscripcion({
    precioMensual,
    precioSemestral,
    pagoSemestral,
    precioAnual,
    pagoAnual,
    usuarioTieneSuscripcion,
}) {
    const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    const abrirModal = (tipo) => {
        setTipoSeleccionado(tipo);
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setTipoSeleccionado(null);
        setMostrarModal(false);
    };

    return (
        <Elements stripe={stripePromise}>
            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-100 to-lime-400 py-12">
                {usuarioTieneSuscripcion && (
                    <div className="absolute top-0 right-0 mt-4 mr-6 p-4 w-56 h-24 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-lg shadow-md flex items-center justify-center text-center font-medium">
                        <span className="text-sm">
                            ⚠️ Suscripción activa. <br />
                            Cancélala en tu perfil <br />
                            para adquirir otra.
                        </span>
                    </div>
                )}

                <div className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-10">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                            <span className="relative inline-block">
                                Planes de Suscripción 💪
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 font-semibold">
                            Empieza tu viaje fitness con nosotros. ¡No pierdas
                            más tiempo y elige tu plan hoy mismo! 🚀
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-gray-900">
                        <PlanCard
                            tipo="Mensual"
                            precio={`€${precioMensual}/mes`}
                            pago={`€${precioMensual} al mes`}
                            regalo="🎁 5 DÍAS GRATIS 🎁"
                            abrirModal={abrirModal}
                            beneficios={[
                                "✅ Acceso ilimitado al gimnasio 🏋️‍♂️",
                                "✅ 1 sesión con entrenador al mes 👨‍🏫",
                                "✅ Acceso a clases grupales 🧘",
                                "✅ Pautas básicas de alimentación 🍎",
                                "✅ Acceso a la comunidad online 🌐",
                            ]}
                            usuarioTieneSuscripcion={usuarioTieneSuscripcion}
                        />
                        <PlanCard
                            tipo="Semestral"
                            precio={`€${precioSemestral}/mes`}
                            pago={`€${pagoSemestral} cada 6 meses`}
                            descuento="-15% de descuento 🎉"
                            regalo="🎁 5 DÍAS GRATIS 🎁"
                            precioTachado="€25/mes"
                            abrirModal={abrirModal}
                            beneficios={[
                                "✅ Acceso ilimitado al gimnasio 🏋️‍♂️",
                                "✅ 2 sesiones con entrenador al mes 👨‍🏫",
                                "✅ Acceso a clases grupales 🧘",
                                "✅ Pautas personalizadas de alimentación 🥑",
                                "✅ Acceso a la comunidad online 🌐",
                            ]}
                            usuarioTieneSuscripcion={usuarioTieneSuscripcion}
                        />
                        <PlanCard
                            tipo="Anual"
                            precio={`€${precioAnual}/mes`}
                            pago={`€${pagoAnual} al año`}
                            descuento="-40% de descuento 🎉"
                            regalo="🎁 5 DÍAS GRATIS 🎁"
                            precioTachado="€25/mes"
                            abrirModal={abrirModal}
                            beneficios={[
                                "✅ Acceso ilimitado al gimnasio 🏋️‍♂️",
                                "✅ 4 sesiones con entrenador al mes 👨‍🏫",
                                "✅ Acceso a clases grupales 🧘",
                                "✅ Pautas personalizadas de alimentación 🥗",
                                "✅ Acceso a eventos exclusivos 🎟️",
                                "✅ Acceso a la comunidad online 🌐",
                            ]}
                            usuarioTieneSuscripcion={usuarioTieneSuscripcion}
                        />
                    </div>
                </div>

                {mostrarModal && (
                    <ModalPago
                        tipo={tipoSeleccionado}
                        monto={
                            tipoSeleccionado === "Mensual"
                                ? precioMensual
                                : tipoSeleccionado === "Semestral"
                                ? pagoSemestral
                                : pagoAnual
                        }
                        cerrarModal={cerrarModal}
                    />
                )}
            </div>
        </Elements>
    );
}

function PlanCard({
    tipo,
    precio,
    pago,
    descuento,
    regalo,
    precioTachado,
    abrirModal,
    beneficios,
    usuarioTieneSuscripcion,
}) {
    return (
        <div className="relative bg-gradient-to-b from-gray-100 to-gray-50 p-8 rounded-lg shadow-lg">
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
            {/* Ocultar el botón si el usuario ya tiene una suscripción */}
            {!usuarioTieneSuscripcion && (
                <button
                    onClick={() => abrirModal(tipo)}
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
            )}
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

function ModalPago({ tipo, monto, cerrarModal }) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            const response = await fetch(
                "/stripe/crear-intento-pago-suscripcion",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({ tipo, monto }),
                }
            );

            if (!response.ok) {
                throw new Error("Error al crear el intento de pago.");
            }

            const { clientSecret } = await response.json();

            const { error: stripeError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: { card: cardElement },
                }
            );

            if (stripeError) {
                setError(stripeError.message);
                setLoading(false);
                return;
            }

            await router.post(
                route("suscripciones.store"),
                { tipo },
                {
                    onSuccess: () => {
                        setLoading(false);
                        cerrarModal();
                    },
                    onError: (errors) => {
                        setError(errors);
                        setLoading(false);
                    },
                }
            );
        } catch (err) {
            setError(err.message || "Error procesando el pago.");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">
                    Pagar Suscripción {tipo}
                </h2>
                <p className="mb-4">Precio: {monto}€ </p>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        className="border p-3 rounded mb-4"
                        options={{
                            hidePostalCode: true,
                        }}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={cerrarModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded mr-4"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            {loading ? "Procesando..." : "Pagar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

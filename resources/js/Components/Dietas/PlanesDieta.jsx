import React, { useState } from "react";
import { motion } from "framer-motion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
    FiCheckCircle,
    FiActivity,
    FiHeart,
    FiTrendingUp,
} from "react-icons/fi";

// Configuración inicial de Stripe para manejar pagos
const stripePromise = loadStripe(
    "pk_test_51QNXpKEJzO4kuy9zOXZXYML8FDTkpqKxXWbBlj4ep3yqQow14nzLCtbdc6X3Pk78zkGMWIMQvKYQKUTQaM1bL6EK00A6v5vnA9"
);

// Componente para mostrar los planes de dieta
export default function PlanesDieta({ handleDieta, usuarioTieneDieta }) {
    // Lista de planes de dieta con detalles (título, descripción, precio, etc.)
    const plans = [
        {
            title: "Pérdida de Peso",
            icon: <FiHeart className="text-green-500" size={48} />, // Ícono representativo
            description: "Plan diseñado para perder peso de forma saludable.",
            details: [
                "Proporción óptima de macronutrientes.",
                "Comidas deliciosas y balanceadas.",
                "Plan de ejercicio complementario.",
                "Asesoría personalizada semanal.",
            ],
            color: "green-500",
            bgColor: "bg-green-100", // Colores personalizados para el estilo
            objetivo: "Pérdida de peso", // Objetivo del plan
            precio: 29.99, // Precio del plan
        },
        {
            title: "Ganancia Muscular",
            icon: <FiActivity className="text-blue-500" size={48} />,
            description: "Plan ideal para ganar masa muscular.",
            details: [
                "Alto contenido proteico.",
                "Carbohidratos de absorción lenta.",
                "Planes de comidas post-entrenamiento.",
                "Asesoría en suplementos.",
            ],
            color: "blue-500",
            bgColor: "bg-blue-100",
            objetivo: "Ganancia muscular",
            precio: 34.99,
        },
        {
            title: "Mejor Rendimiento",
            icon: <FiTrendingUp className="text-red-500" size={48} />,
            description:
                "Maximizar rendimiento deportivo y resistencia física.",
            details: [
                "Plan alimenticio para deportes de alta intensidad.",
                "Mejora en resistencia y recuperación.",
                "Vitaminas y minerales esenciales.",
                "Diseñado para atletas.",
            ],
            color: "red-500",
            bgColor: "bg-red-100",
            objetivo: "Mantenimiento",
            precio: 39.99,
        },
    ];

    // Estado para controlar el plan seleccionado en el modal
    const [planSeleccionado, setPlanSeleccionado] = useState(null);

    // Estado para controlar si el modal está visible
    const [mostrarModal, setMostrarModal] = useState(false);

    // Abre el modal con los detalles del plan seleccionado
    const abrirModal = (plan) => {
        setPlanSeleccionado(plan); // Define el plan que se mostrará
        setMostrarModal(true); // Muestra el modal
    };

    // Cierra el modal y limpia el plan seleccionado
    const cerrarModal = () => {
        setPlanSeleccionado(null);
        setMostrarModal(false);
    };

    return (
        <Elements stripe={stripePromise}>
            <div className="py-16 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 relative">
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-5xl font-bold text-center text-gray-800 mb-12 underline underline-offset-8 decoration-slate-400"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        Nuestros Planes De Dietas Personalizados
                    </motion.h2>

                    {usuarioTieneDieta && (
                        <div className="absolute top-0 right-0 mt-4 mr-6 p-4 w-56 h-24 bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-lg shadow-md flex items-center justify-center text-center font-medium">
                            <span className="text-sm">
                                🔒 Dieta en curso. <br />
                                Deshabilítala en tu perfil <br />
                                para adquirir una nueva.
                            </span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {plans.map((plan, index) => (
                            <PlanCard
                                key={index}
                                plan={plan}
                                abrirModal={abrirModal}
                                usuarioTieneDieta={usuarioTieneDieta}
                            />
                        ))}
                    </div>
                </div>
                {mostrarModal && (
                    <ModalPago
                        plan={planSeleccionado}
                        cerrarModal={cerrarModal}
                        handleDieta={handleDieta}
                    />
                )}
            </div>
        </Elements>
    );
}

function PlanCard({ plan, abrirModal, usuarioTieneDieta }) {
    return (
        <motion.div
            className={`p-8 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-500 ${plan.bgColor}`}
        >
            <div className="flex items-center justify-center mb-4">
                {plan.icon}
            </div>
            <h3 className="text-3xl font-semibold text-center text-gray-800 mb-2">
                {plan.title}
            </h3>
            <p className="text-gray-600 text-center mb-4">{plan.description}</p>
            <div className="flex items-center justify-center mb-6 text-lg font-semibold text-gray-700">
                <span>Precio:</span>
                <span className={`ml-2 text-${plan.color} text-2xl font-bold`}>
                    {plan.precio.toFixed(2)} €
                </span>
            </div>
            {/* Sección para mostrar detalles del plan */}
            <ul className="text-gray-500 mb-6">
                {plan.details.map((detail, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <FiCheckCircle className={`mr-2 text-${plan.color}`} />
                        {detail}
                    </li>
                ))}
            </ul>
            {!usuarioTieneDieta && (
                <div className="flex justify-center">
                    <button
                        onClick={() => abrirModal(plan)}
                        className={`py-3 px-6 rounded-full text-white bg-${plan.color} hover:bg-opacity-80 transition duration-300`}
                    >
                        ¡Adquiere Aquí!
                    </button>
                </div>
            )}
        </motion.div>
    );
}

function ModalPago({ plan, cerrarModal, handleDieta }) {
    // Configuración inicial para Stripe
    const stripe = useStripe(); // Hook para interactuar con Stripe
    const elements = useElements(); // Hook para acceder a los elementos de pago

    // Estados para manejar la carga y los errores durante el proceso de pago
    const [loading, setLoading] = useState(false); // Indica si el pago está en proceso
    const [error, setError] = useState(null); // Almacena mensajes de error si ocurren

    // Función para manejar el envío del formulario de pago
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        setLoading(true); // Muestra que el proceso de pago ha comenzado

        const cardElement = elements.getElement(CardElement); // Obtiene el elemento de tarjeta de Stripe

        try {
            // Obtiene el token CSRF para la seguridad de la solicitud
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content");

            // Solicita al servidor la creación de un intento de pago en Stripe
            const response = await fetch("/stripe/crear-intento-pago-dieta", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken, // Token CSRF para protección
                },
                body: JSON.stringify({ monto: plan.precio }), // Envía el monto del plan seleccionado
            });

            if (!response.ok) {
                throw new Error("Error al crear el intento de pago."); // Lanza un error si la respuesta no es exitosa
            }

            // Obtiene el clientSecret para confirmar el pago
            const { clientSecret } = await response.json();

            // Confirma el pago con Stripe usando el clientSecret y el elemento de tarjeta
            const { error: stripeError } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: { card: cardElement }, // Método de pago: tarjeta
                }
            );

            if (stripeError) {
                // Maneja errores específicos de Stripe
                setError(stripeError.message); // Muestra el mensaje de error de Stripe
                setLoading(false); // Detiene el estado de carga
                return;
            }

            // Maneja la dieta si el pago es exitoso
            handleDieta(plan.objetivo, plan.description);
            cerrarModal(); // Cierra el modal después del éxito
        } catch (err) {
            // Maneja errores generales
            setError(err.message || "Error procesando el pago."); // Muestra el mensaje de error
            setLoading(false); // Detiene el estado de carga
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">
                    Pagar Plan {plan.title}
                </h2>
                <p className="mb-4">Precio: {plan.precio.toFixed(2)} €</p>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        className="border p-3 rounded mb-4"
                        options={{ hidePostalCode: true }}
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

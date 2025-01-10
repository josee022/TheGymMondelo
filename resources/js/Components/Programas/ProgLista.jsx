import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiTrendingUp } from "react-icons/fi";
import { FaEuroSign } from "react-icons/fa";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import axios from "axios";

// Emoji según el nivel del programa
const getEmojiForLevel = (nivel) => {
    switch (nivel) {
        case "Avanzado":
            return "🔥";
        case "Intermedio":
            return "🏋️";
        case "Principiante":
            return "🌱";
        default:
            return "";
    }
};

export default function ProgLista({ programas, usuarioTienePrograma }) {
    // Estados para gestionar programas, orden, y el modal de pago
    const [sortedProgramas, setSortedProgramas] = useState(programas || []); // Lista de programas ordenados
    const [sortType, setSortType] = useState(null); // Tipo de orden (ascendente o descendente)
    const [showPaymentModal, setShowPaymentModal] = useState(false); // Controla la visibilidad del modal de pago
    const [selectedPrograma, setSelectedPrograma] = useState(null); // Programa seleccionado para el pago

    // Hooks de Stripe
    const stripe = useStripe();
    const elements = useElements();

    // **Ordenar programas**
    // Ordenar programas por precio de forma ascendente
    const sortProgramsByPriceAsc = () => {
        const sorted = [...sortedProgramas].sort(
            (a, b) => parseFloat(a.precio) - parseFloat(b.precio)
        );
        setSortedProgramas(sorted); // Actualiza la lista ordenada
        setSortType("asc"); // Establece el tipo de orden
    };

    // Ordenar programas por precio de forma descendente
    const sortProgramsByPriceDesc = () => {
        const sorted = [...sortedProgramas].sort(
            (a, b) => parseFloat(b.precio) - parseFloat(a.precio)
        );
        setSortedProgramas(sorted);
        setSortType("desc");
    };

    // Restablecer el orden al estado original
    const resetSort = () => {
        setSortedProgramas(programas || []);
        setSortType(null);
    };

    // **Mostrar el modal de pago**
    const iniciarPago = (programa) => {
        setSelectedPrograma(programa); // Define el programa seleccionado
        setShowPaymentModal(true); // Muestra el modal
    };

    // **Manejar el pago e inscripción**
    const handlePago = async () => {
        // Verifica que Stripe esté listo
        if (!stripe || !elements) {
            toast.error("Stripe no está listo.");
            return;
        }

        try {
            // Crea un intento de pago con el backend
            const response = await axios.post("/crear-intento-pago-programa", {
                programa_id: selectedPrograma.id, // ID del programa
                monto: selectedPrograma.precio, // Precio del programa
            });

            const { clientSecret } = response.data; // Obtiene el `clientSecret` del intento de pago

            // Confirma el pago con Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement), // Elemento de tarjeta de Stripe
                        billing_details: {
                            name: "Usuario", // Nombre del usuario (puedes personalizarlo)
                        },
                    },
                }
            );

            if (error) {
                // Manejo de errores específicos de la tarjeta
                switch (error.code) {
                    case "card_declined":
                        toast.error(
                            "El pago ha sido rechazado. Por favor, utiliza otra tarjeta."
                        );
                        break;
                    case "insufficient_funds":
                        toast.error(
                            "Fondos insuficientes. Intenta con otra tarjeta."
                        );
                        break;
                    case "expired_card":
                        toast.error(
                            "La tarjeta ha expirado. Usa una tarjeta válida."
                        );
                        break;
                    case "incorrect_cvc":
                        toast.error("El CVC ingresado es incorrecto.");
                        break;
                    case "authentication_required":
                        toast.error(
                            "Falla de autenticación con el banco. Intenta nuevamente."
                        );
                        break;
                    default:
                        toast.error(
                            "Error con tu tarjeta. Por favor, intenta nuevamente."
                        );
                }
            } else if (paymentIntent.status === "succeeded") {
                // Si el pago es exitoso
                toast.success("Pago realizado con éxito. Inscribiéndote...");
                await axios.post("/inscribir-programa", {
                    programa_id: selectedPrograma.id, // Inscribe al usuario en el programa
                });
                setShowPaymentModal(false); // Cierra el modal de pago
                toast.success("¡Inscripción completada con éxito!");

                // Recarga la página para reflejar los cambios
                window.location.reload();
            }
        } catch (err) {
            // Manejo de errores generales
            toast.error(
                err.response?.data?.error ||
                    "Hubo un error al procesar tu inscripción."
            );
        }
    };

    return (
        <div>
            {/* Botones de orden */}
            <div className="flex justify-end mb-6 space-x-4">
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        sortType === "asc"
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={sortProgramsByPriceAsc}
                    disabled={sortType === "asc"}
                >
                    Ordenar por Precio (Más Barato)
                </button>
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        sortType === "desc"
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={sortProgramsByPriceDesc}
                    disabled={sortType === "desc"}
                >
                    Ordenar por Precio (Más Caro)
                </button>
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        !sortType
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={resetSort}
                    disabled={!sortType}
                >
                    Restablecer Orden
                </button>
            </div>

            {/* Lista de programas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProgramas.map((programa, index) => (
                    <motion.div
                        key={programa.id}
                        className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-lime-400 mb-4">
                            {programa.nombre} {getEmojiForLevel(programa.nivel)}
                        </h3>
                        <p className="text-gray-400 mb-4">
                            {programa.descripcion}
                        </p>
                        <div className="text-lime-400 flex items-center mb-2">
                            <FiClock className="mr-2" />
                            <p>Duración: {programa.duracion} semanas</p>
                        </div>
                        <div className="text-lime-400 flex items-center mb-2">
                            <FiTrendingUp className="mr-2" />
                            <p>Nivel: {programa.nivel}</p>
                        </div>
                        <div className="text-lime-400 flex items-center mb-4">
                            <FaEuroSign className="mr-2" />
                            <p>
                                Precio: {parseFloat(programa.precio).toFixed(2)}{" "}
                                €
                            </p>
                        </div>
                        {!usuarioTienePrograma && (
                            <button
                                className="bg-lime-500 text-black py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                                onClick={() => iniciarPago(programa)}
                            >
                                Inscribirse 💪
                            </button>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Modal de pago */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => setShowPaymentModal(false)}
                        >
                            ✕
                        </button>
                        <h3 className="text-xl text-white mb-4 text-center">
                            Pago para {selectedPrograma.nombre}
                        </h3>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        color: "#000000",
                                        backgroundColor: "#ffffff",
                                        fontSize: "16px",
                                        "::placeholder": {
                                            color: "#555555",
                                        },
                                    },
                                    invalid: {
                                        color: "#e5424d",
                                    },
                                },
                                hidePostalCode: true,
                            }}
                            className="p-3 border rounded-lg bg-white"
                        />
                        <div className="flex justify-between mt-6">
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                onClick={() => setShowPaymentModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-lime-500 text-black py-2 px-4 rounded-lg hover:bg-lime-600"
                                onClick={handlePago}
                            >
                                Confirmar Pago
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

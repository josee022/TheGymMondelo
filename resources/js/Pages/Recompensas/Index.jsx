import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import { toast } from "react-toastify";

// Componente para gestionar recompensas
const Recompensas = () => {
    const { auth, recompensas, flash } = usePage().props; // Obtiene datos del usuario, recompensas y mensajes flash desde el backend

    // Efecto para manejar notificaciones basadas en mensajes flash
    useEffect(() => {
        if (flash.success) {
            // Notificación de éxito
            Swal.fire("¡Adquirido!", flash.success, "success"); // Modal de éxito
            toast.success(flash.success); // Notificación flotante
        }

        if (flash.error) {
            // Notificación de error
            Swal.fire("Error", flash.error, "error"); // Modal de error
            toast.error(flash.error); // Notificación flotante
        }
    }, [flash]); // Se ejecuta cuando cambian los mensajes flash

    // Función para adquirir una recompensa
    const handleAdquirir = (recompensaId) => {
        // Confirma la acción con un modal de SweetAlert2
        Swal.fire({
            title: "¿Estás seguro de que deseas adquirir esta recompensa?",
            icon: "question",
            showCancelButton: true, // Botón de cancelar
            confirmButtonText: "Sí, adquirir", // Botón de confirmación
            cancelButtonText: "Cancelar", // Botón de cancelación
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, envía una solicitud POST para adquirir la recompensa
                router.post(
                    route("recompensas.adquirir", recompensaId), // Ruta de adquisición
                    {}, // Datos del cuerpo (vacío en este caso)
                    {
                        // Configura las acciones en caso de éxito o error
                        onSuccess: (response) => {
                            // Muestra mensajes de éxito
                            Swal.fire(
                                "¡Adquirido!",
                                "¡Has adquirido la recompensa correctamente y se te han restado los puntos!",
                                "success"
                            );
                            toast.success(
                                "¡Enhorabuena! Has canjeado tus puntos por la recompensa."
                            );
                        },
                        onError: (error) => {
                            // Muestra mensajes de error
                            const errorMessage =
                                error.response?.data?.error ||
                                "Hubo un error al procesar tu solicitud.";
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: errorMessage,
                            });
                        },
                    }
                );
            }
        });
    };

    // Función para descargar un PDF de una recompensa
    const handleDescargarPdf = (recompensaId) => {
        // Redirige al usuario a la ruta para descargar el PDF
        window.location.href = route("recompensas.descargarPdf", recompensaId);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-4xl text-center text-lime-600 mt-4">
                    Recompensas 🎁
                </h2>
            }
        >
            <motion.div
                className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-5xl font-extrabold mb-8 text-center">
                    ¡Canjea tus puntos en{" "}
                    <span className="text-lime-500">TheGymMondelo</span>!
                </h1>

                <p className="text-lg text-gray-400 mb-12 text-center">
                    Por cada 10€ de compras en nuestra tienda, obtendrás un
                    punto. <br /> Tus puntos actuales son:{" "}
                    <span className="text-lime-500">{auth.user.puntos}</span>
                </p>

                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {recompensas.map((recompensa) => (
                        <motion.div
                            key={recompensa.id}
                            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold text-lime-400 mb-4">
                                {recompensa.nombre}
                            </h3>
                            <p className="text-gray-300 mb-4">
                                {recompensa.descripcion}
                            </p>
                            <p className="text-lg font-semibold text-gray-400 mb-4">
                                Puntos necesarios:{" "}
                                <span className="text-lime-500">
                                    {recompensa.puntos}
                                </span>
                            </p>

                            {recompensa.adquirida ? (
                                <button
                                    onClick={() =>
                                        handleDescargarPdf(recompensa.id)
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Descargar PDF
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleAdquirir(recompensa.id)
                                    }
                                    className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Adquirir
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
            <Footer />
        </AuthenticatedLayout>
    );
};

export default Recompensas;

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import { toast } from "react-toastify";

const Recompensas = () => {
    const { auth, recompensas, flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            Swal.fire("¡Adquirido!", flash.success, "success");
            toast.success(flash.success);
        }

        if (flash.error) {
            Swal.fire("Error", flash.error, "error");
            toast.error(flash.error);
        }
    }, [flash]);

    const handleAdquirir = (recompensaId) => {
        Swal.fire({
            title: "¿Estás seguro de que deseas adquirir esta recompensa?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, adquirir",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("recompensas.adquirir", recompensaId),
                    {},
                    {
                        onSuccess: (response) => {
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

    const handleDescargarPdf = (recompensaId) => {
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

                            {recompensa.estado === "disponible" ? (
                                <button
                                    onClick={() =>
                                        handleAdquirir(recompensa.id)
                                    }
                                    className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Adquirir
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleDescargarPdf(recompensa.id)
                                    }
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                                >
                                    Descargar PDF
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

import React from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import ClaseDetalles from "@/Components/Clases/ClaseDetalles";
import EntrenadorDetalles from "@/Components/Clases/EntrenadorDetalles";
import ReservaButton from "@/Components/Clases/ReservaButton";
import ContenedorPersuasivo from "@/Components/Clases/ContenedorPersuasivo";
import { motion } from "framer-motion";

export default function Show({ auth, clase, entrenador, plazasDisponibles }) {
    // Inicializa el formulario con la clase seleccionada
    const { post } = useForm({ clase_id: clase.id }); // `clase_id` contiene el ID de la clase que se desea reservar

    // Maneja el evento de reserva de una clase
    const handleReserve = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        // Realiza una solicitud POST al servidor para crear la reserva
        post(route("reservas.store")); // Usa la ruta "reservas.store" para registrar la reserva en el backend
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-3xl text-center text-lime-600 mt-4">
                    Información de la clase seleccionada 🏋️‍♂️
                </h2>
            }
        >
            <Head title={`Clase: ${clase.nombre}`} />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-16">
                <motion.div
                    className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Detalles de la clase */}
                    <ClaseDetalles
                        clase={clase}
                        plazasDisponibles={plazasDisponibles}
                    />

                    {/* Detalles del entrenador */}
                    <EntrenadorDetalles entrenador={entrenador} />

                    {/* Botones de acción */}
                    <div className="flex justify-between mt-10">
                        <ReservaButton
                            plazasDisponibles={plazasDisponibles}
                            handleReserve={handleReserve}
                        />
                    </div>
                </motion.div>

                {/* Contenedor persuasivo */}
                <ContenedorPersuasivo
                    clase={clase}
                    plazasDisponibles={plazasDisponibles}
                    handleReserve={handleReserve}
                />
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

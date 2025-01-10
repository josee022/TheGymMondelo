import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePage } from "@inertiajs/react";
import HeroDieta from "@/Components/Dietas/HeroDieta";
import ResumenInformativo from "@/Components/Dietas/ResumenInformativo";
import PlanesDieta from "@/Components/Dietas/PlanesDieta";
import { router } from "@inertiajs/react";

export default function Dietas({ auth, usuarioTieneDieta }) {
    const { flash } = usePage().props; // Obtiene mensajes flash (éxito o error) de las props de la página

    // Mostrar notificaciones según el mensaje flash recibido
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success); // Muestra notificación de éxito
        }
        if (flash?.error) {
            toast.error(flash.error); // Muestra notificación de error
        }
    }, [flash]); // Se ejecuta cada vez que el valor de `flash` cambia

    // Función para manejar el envío de una nueva dieta
    const handleDieta = (objetivo, descripcion) => {
        router.post(route("dietas.store"), { objetivo, descripcion }); // Envía los datos de la dieta al servidor
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {/* Hero de la dieta */}
            <HeroDieta />

            {/* Sección de resúmenes informativos */}
            <ResumenInformativo />

            {/* Sección de planes de dieta */}
            <PlanesDieta
                handleDieta={handleDieta}
                usuarioTieneDieta={usuarioTieneDieta}
            />

            <Footer />
            <ToastContainer />
        </AuthenticatedLayout>
    );
}

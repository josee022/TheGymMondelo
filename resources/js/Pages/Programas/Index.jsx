import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgHeader from "@/Components/Programas/ProgHeader";
import ProgTips from "@/Components/Programas/ProgTips";
import ProgLista from "@/Components/Programas/ProgLista";
import ProgIconos from "@/Components/Programas/ProgIconos";
import ProgBeneficios from "@/Components/Programas/ProgBeneficios";
import Pagination from "@/Components/Pagination";

export default function Programas({ auth, programas }) {
    const { flash } = usePage().props; // Acceder a los mensajes flash desde el backend

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success); // Mostrar mensaje de éxito
        }

        if (flash?.error) {
            toast.error(flash.error); // Mostrar mensaje de error
        }
    }, [flash]);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Programas de Entrenamiento" />
            <ToastContainer />

            <div className="py-12 bg-gradient-to-b from-black via-green-800 to-lime-600 text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Encabezado de Programas */}
                    <ProgHeader />

                    {/* Consejos previos al inicio de los programas */}
                    <ProgTips />

                    {/* Lista de Programas */}
                    <ProgLista programas={programas.data} />

                    {/* Paginación */}
                    <Pagination className="mt-6" links={programas.links} />

                    {/* Iconos de Motivación */}
                    <ProgIconos />

                    {/* Beneficios y Exclusividades */}
                    <ProgBeneficios />
                </div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

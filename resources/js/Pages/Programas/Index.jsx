import React, { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgHeader from "@/Components/Programas/ProgHeader";
import ProgTips from "@/Components/Programas/ProgTips";
import ProgLista from "@/Components/Programas/ProgLista";
import ProgIconos from "@/Components/Programas/ProgIconos";
import ProgBeneficios from "@/Components/Programas/ProgBeneficios";
import Pagination from "@/Components/Pagination";

export default function Programas({ auth, programas, search }) {
    const { flash } = usePage().props; // Acceder a los mensajes flash desde el backend
    const [searchTerm, setSearchTerm] = useState(search || "");
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success); // Mostrar mensaje de éxito
        }

        if (flash?.error) {
            toast.error(flash.error); // Mostrar mensaje de error
        }
    }, [flash]);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus(); // Mantener el foco en el campo de búsqueda
        }
    }, [programas]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        router.get(
            route("programas.index"),
            { search: value },
            {
                replace: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Programas de Entrenamiento" />
            <ToastContainer />

            <div className="py-12 bg-gradient-to-b from-black via-green-800 to-lime-600 text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Encabezado de Programas */}
                    <ProgHeader />

                    {/* Barra de búsqueda */}
                    <input
                        type="text"
                        placeholder="Buscar programas..."
                        className="w-full p-3 mb-6 rounded-lg border border-gray-300 text-black"
                        value={searchTerm}
                        ref={searchInputRef}
                        onChange={handleSearchChange}
                    />

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

import React, { useState, useEffect, useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, router } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import ListaClases from "@/Components/Clases/ListaClases";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Beneficios from "@/Components/Clases/Beneficios";
import Testimonios from "@/Components/Clases/Testimonios";
import MensajeFinal from "@/Components/Clases/MensajeFinal";
import Pagination from "@/Components/Pagination";

export default function Index({ clases, user, search }) {
    const { flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState(search || "");
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus(); // Mantener el foco en el campo de búsqueda
        }
    }, [clases]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        router.get(
            route("clases.index"),
            { search: value },
            {
                replace: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-3xl text-center text-lime-600 mt-4">
                    Nuestras Distintas Clases 🏋️‍♂️
                </h2>
            }
        >
            <Head title="Clases Disponibles" />
            <ToastContainer />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
                {/* Barra de búsqueda con el mismo ancho que ListaClases */}
                <div className="w-full max-w-7xl mx-auto mb-6">
                    <input
                        type="text"
                        placeholder="Buscar clases..."
                        className="w-full p-3 rounded-lg border border-gray-300 text-black"
                        value={searchTerm}
                        ref={searchInputRef}
                        onChange={handleSearchChange}
                    />
                </div>

                {/* Lista de Clases Paginada */}
                <ListaClases clases={clases.data} />

                {/* Componente de Paginación */}
                <Pagination className="mt-6" links={clases.links} />

                {/* Sección de Beneficios */}
                <Beneficios />

                {/* Sección de Testimonios */}
                <Testimonios />

                {/* Mensaje Final */}
                <MensajeFinal />
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

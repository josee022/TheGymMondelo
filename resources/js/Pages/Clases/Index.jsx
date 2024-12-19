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
    // Obtiene mensajes flash y configura el término de búsqueda inicial
    const { flash } = usePage().props; // Mensajes de éxito o error desde el backend
    const [searchTerm, setSearchTerm] = useState(search || ""); // Estado para el término de búsqueda
    const searchInputRef = useRef(null); // Referencia para el campo de búsqueda

    // Mostrar notificaciones basadas en los mensajes flash
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success); // Notificación de éxito
        }

        if (flash?.error) {
            toast.error(flash.error); // Notificación de error
        }
    }, [flash]); // Se ejecuta cuando cambian los mensajes flash

    // Colocar foco en el campo de búsqueda al cargar o actualizar las clases
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus(); // Mantener el foco en el input de búsqueda
        }
    }, [clases]); // Se ejecuta cuando la lista de clases cambia

    // Manejar cambios en el campo de búsqueda
    const handleSearchChange = (e) => {
        const value = e.target.value; // Obtiene el valor ingresado
        setSearchTerm(value); // Actualiza el estado del término de búsqueda

        // Realiza una solicitud al servidor para filtrar las clases
        router.get(
            route("clases.index"), // Ruta de la página de clases
            { search: value }, // Parámetro de búsqueda enviado al backend
            {
                replace: true, // Reemplaza la URL actual sin agregar al historial
                preserveScroll: true, // Mantiene la posición de desplazamiento
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

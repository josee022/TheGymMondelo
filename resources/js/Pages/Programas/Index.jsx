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
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Inicializa Stripe con la clave pública
const stripePromise = loadStripe(
    "pk_test_51QNXpKEJzO4kuy9zOXZXYML8FDTkpqKxXWbBlj4ep3yqQow14nzLCtbdc6X3Pk78zkGMWIMQvKYQKUTQaM1bL6EK00A6v5vnA9"
);

export default function Programas({
    auth, // Información del usuario autenticado
    programas, // Lista de programas disponibles
    search, // Término de búsqueda inicial
    usuarioTienePrograma, // Indica si el usuario ya tiene un programa activo
}) {
    const { flash } = usePage().props; // Obtiene mensajes flash del backend
    const [searchTerm, setSearchTerm] = useState(search || ""); // Estado para el término de búsqueda
    const searchInputRef = useRef(null); // Referencia para el campo de búsqueda

    // Muestra notificaciones basadas en los mensajes flash recibidos
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success); // Muestra un mensaje de éxito
        }
        if (flash?.error) {
            toast.error(flash.error); // Muestra un mensaje de error
        }
    }, [flash]); // Se ejecuta cuando `flash` cambia

    // Focaliza automáticamente el campo de búsqueda al cargar o cambiar los programas
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus(); // Coloca el foco en el input de búsqueda
        }
    }, [programas]); // Se ejecuta cuando cambia la lista de programas

    // Maneja el cambio en el campo de búsqueda
    const handleSearchChange = (e) => {
        const value = e.target.value; // Obtiene el valor ingresado
        setSearchTerm(value); // Actualiza el estado del término de búsqueda

        // Realiza una consulta al servidor para filtrar los programas
        router.get(
            route("programas.index"), // Ruta del listado de programas
            { search: value }, // Parámetros de búsqueda
            {
                replace: true, // Reemplaza la URL actual sin agregarla al historial
                preserveScroll: true, // Mantiene la posición de desplazamiento
            }
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Programas de Entrenamiento" />
            <ToastContainer />

            <div className="py-12 bg-gradient-to-b from-black via-green-800 to-lime-600 text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ProgHeader />

                    <input
                        type="text"
                        placeholder="Buscar programas..."
                        className="w-full p-3 mb-6 rounded-lg border border-gray-300 text-black"
                        value={searchTerm}
                        ref={searchInputRef}
                        onChange={handleSearchChange}
                    />

                    <ProgTips />

                    {usuarioTienePrograma ? (
                        <div className="p-4 mb-6 bg-lime-300 bg-opacity-90 text-lime-900 rounded-lg border-l-4 border-lime-700 shadow-lg text-center font-semibold">
                            <span className="block text-lg">
                                ⚠️ Ya tienes un programa en curso.
                            </span>
                            <span className="block">
                                No puedes adquirir otro en este momento.
                            </span>
                        </div>
                    ) : null}

                    <Elements stripe={stripePromise}>
                        <ProgLista
                            programas={programas.data}
                            usuarioTienePrograma={usuarioTienePrograma}
                        />
                    </Elements>

                    <Pagination className="mt-6" links={programas.links} />

                    <ProgIconos />

                    <ProgBeneficios />
                </div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

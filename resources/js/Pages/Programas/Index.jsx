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
    auth,
    programas,
    search,
    usuarioTienePrograma,
}) {
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
            searchInputRef.current.focus();
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

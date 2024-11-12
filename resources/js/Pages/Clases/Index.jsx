import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import ListaClases from "@/Components/Clases/ListaClases";
import Beneficios from "@/Components/Clases/Beneficios";
import Testimonios from "@/Components/Clases/Testimonios";
import MensajeFinal from "@/Components/Clases/MensajeFinal";
import Pagination from "@/Components/Pagination";

export default function Index({ clases, user }) {
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

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
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

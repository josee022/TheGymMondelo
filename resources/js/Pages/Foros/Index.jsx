import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import FormForo from "@/Components/Foros/FormForo";
import ListaForo from "@/Components/Foros/ListaForo";
import Pagination from "@/Components/Pagination";

export default function CrearForo({ auth, foros }) {
    const [editingForoId, setEditingForoId] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);

    const handleEdit = (foro) => {
        setEditingForoId(foro.id);
    };

    const handleCancelEdit = () => {
        setEditingForoId(null);
    };

    const formatFechaForo = (timestamp) => {
        const fecha = new Date(timestamp);
        const opciones = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return `Publicado el ${fecha.toLocaleDateString("es-ES", opciones)}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-3xl text-center text-lime-600 mt-4">
                    Foros TheGymMondelo 🗣️
                </h2>
            }
        >
            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-green-800 to-lime-600 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    {/* Formulario de creación de foros */}
                    <FormForo />
                </div>

                <div className="w-full max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 relative">
                        <span className="relative inline-block">
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-400"></span>
                            <span className="relative">Foros Recientes</span>
                        </span>
                    </h2>

                    {/* Lista de foros */}
                    <ListaForo
                        foros={foros.data}
                        auth={auth}
                        editingForoId={editingForoId}
                        editingCommentId={editingCommentId}
                        handleEdit={handleEdit}
                        handleCancelEdit={handleCancelEdit}
                        formatFechaForo={formatFechaForo}
                    />

                    {/* Paginación */}
                    <Pagination class="mt-6" links={foros.links} />
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

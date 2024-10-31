import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import ClasesList from "@/Components/Admin/ClasesList";
import CrearClase from "@/Components/Admin/CrearClase";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

const ClasesGestion = ({ clases, entrenadores }) => {
    const [selectedClase, setSelectedClase] = useState(null);
    const [clasesList, setClasesList] = useState(clases);

    const handleEdit = (clase) => setSelectedClase(clase);

    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la clase.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.clases.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "Eliminada!",
                            "La clase ha sido eliminada exitosamente.",
                            "success"
                        ).then(() => {
                            setClasesList(
                                clasesList.filter((clase) => clase.id !== id)
                            );
                        });
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Hubo un problema al eliminar la clase.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Gestión De Clases
                        </span>
                    </span>
                </h1>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <CrearClase
                    entrenadores={entrenadores}
                    selectedClase={selectedClase}
                />
                <ClasesList
                    clases={clasesList}
                    onEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
        </AdminLayout>
    );
};

export default ClasesGestion;

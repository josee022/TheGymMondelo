import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Swal from "sweetalert2";
import ProgramasList from "@/Components/Admin/ProgramasList";
import CrearPrograma from "@/Components/Admin/CrearPrograma";
import { router } from "@inertiajs/react";

const ProgramasGestion = ({ programas }) => {
    const [selectedPrograma, setSelectedPrograma] = useState(null);
    const [programasList, setProgramasList] = useState(programas);

    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro? 💥",
            text: "Esta acción eliminará el programa.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.programas.destroy", id), {
                    onSuccess: () => {
                        setProgramasList((prevList) =>
                            prevList.filter((p) => p.id !== id)
                        );
                        Swal.fire(
                            "Eliminado!",
                            "El programa ha sido eliminado.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    const handleSubmit = (data, isEditing) => {
        if (isEditing) {
            router.put(route("admin.programas.update", data.id), data, {
                onSuccess: () => {
                    setProgramasList((prevList) =>
                        prevList.map((p) => (p.id === data.id ? data : p))
                    );
                    Swal.fire(
                        "Actualizado!",
                        "El programa ha sido actualizado correctamente.",
                        "success"
                    );
                    setSelectedPrograma(null);
                },
            });
        } else {
            router.post(route("admin.programas.store"), data, {
                onSuccess: ({ props }) => {
                    if (props && props.newPrograma) {
                        setProgramasList((prevList) => [
                            ...prevList,
                            props.newPrograma,
                        ]);
                        Swal.fire(
                            "Creado!",
                            "El programa ha sido creado correctamente.",
                            "success"
                        );
                    } else {
                        // Si `newPrograma` no está en `props`, añadimos `data` directamente
                        setProgramasList((prevList) => [...prevList, data]);
                        Swal.fire(
                            "Creado!",
                            "El programa ha sido creado correctamente.",
                            "success"
                        );
                    }
                },
            });
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Gestión De Programas
                        </span>
                    </span>
                </h1>
            </div>
            <div className="bg-gradient-to-r from-gray-100 to-gray-300 p-10 rounded-xl shadow-2xl max-w-7xl mx-auto mt-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProgramasList
                        programas={programasList}
                        onEdit={(programa) => setSelectedPrograma(programa)}
                        handleDelete={handleDelete}
                    />
                    <CrearPrograma
                        selectedPrograma={selectedPrograma}
                        setSelectedPrograma={setSelectedPrograma}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default ProgramasGestion;

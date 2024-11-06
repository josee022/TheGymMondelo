import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import ClasesList from "@/Components/Admin/ClasesList";
import CrearClase from "@/Components/Admin/CrearClase";
import Swal from "sweetalert2";
import { router, usePage } from "@inertiajs/react";

const ClasesGestion = ({ clases, entrenadores }) => {
    const [selectedClase, setSelectedClase] = useState(null);
    const [clasesList, setClasesList] = useState(clases);

    // Accede a los mensajes de flash desde la sesión
    const { flash } = usePage().props;

    // Muestra un alert con los mensajes de éxito o error si existen en la sesión
    useEffect(() => {
        if (flash.error) {
            Swal.fire("Error", flash.error, "error");
        }
        if (flash.success) {
            Swal.fire("Éxito", flash.success, "success");
        }
    }, [flash]);

    const handleEdit = (clase) => setSelectedClase(clase);

    const handleSubmit = (form) => {
        if (selectedClase && selectedClase.id) {
            // Actualizar clase existente
            router.put(route("admin.clases.update", selectedClase.id), form, {
                onSuccess: () => {
                    Swal.fire(
                        "Actualizado!",
                        "La clase ha sido actualizada.",
                        "success"
                    );
                    setClasesList((prevClases) =>
                        prevClases.map((c) =>
                            c.id === selectedClase.id ? { ...c, ...form } : c
                        )
                    );
                    setSelectedClase(null); // Limpiar la clase seleccionada después de editar
                },
                onError: (errors) => {
                    if (errors.error) {
                        Swal.fire("Error", errors.error, "error");
                    } else {
                        Swal.fire(
                            "Error",
                            "Hubo un problema al procesar la solicitud.",
                            "error"
                        );
                    }
                },
            });
        } else {
            // Crear una nueva clase
            router.post(route("admin.clases.store"), form, {
                onSuccess: (page) => {
                    Swal.fire(
                        "Creado!",
                        "La clase ha sido creada exitosamente.",
                        "success"
                    );
                    const newClase = page.props.newClase || form; // Usa los datos de la clase nueva
                    setClasesList((prevClases) => [...prevClases, newClase]);
                },
                onError: (errors) => {
                    if (errors.error) {
                        Swal.fire("Error", errors.error, "error");
                    } else {
                        Swal.fire(
                            "Error",
                            "Hubo un problema al procesar la solicitud.",
                            "error"
                        );
                    }
                },
            });
        }
    };

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
                        );
                        setClasesList((prevClases) =>
                            prevClases.filter((clase) => clase.id !== id)
                        );
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
                    onSubmit={handleSubmit}
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

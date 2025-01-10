import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import ClasesList from "@/Components/Admin/ClasesList";
import CrearClase from "@/Components/Admin/CrearClase";
import Swal from "sweetalert2";
import { router, usePage } from "@inertiajs/react";

const ClasesGestion = ({ clases, entrenadores }) => {
    // Estado para almacenar la clase seleccionada para edición
    const [selectedClase, setSelectedClase] = useState(null);

    // Estado para manejar la lista de clases, inicializada con las clases pasadas como prop
    const [clasesList, setClasesList] = useState(clases);

    // Accede a los mensajes de flash desde la sesión
    const { flash } = usePage().props;

    // Muestra alertas con mensajes de éxito o error si existen en la sesión
    useEffect(() => {
        if (flash.error) {
            Swal.fire("Error", flash.error, "error"); // Muestra un mensaje de error
        }
        if (flash.success) {
            Swal.fire("Éxito", flash.success, "success"); // Muestra un mensaje de éxito
        }
    }, [flash]);

    // Maneja la selección de una clase para editar
    const handleEdit = (clase) => setSelectedClase(clase);

    const handleSubmit = (form) => {
        if (selectedClase && selectedClase.id) {
            // Caso: Actualizar clase existente
            router.put(route("admin.clases.update", selectedClase.id), form, {
                onSuccess: () => {
                    // Notificación de éxito
                    Swal.fire(
                        "Actualizado!",
                        "La clase ha sido actualizada.",
                        "success"
                    );

                    // Actualiza la lista de clases en el estado local
                    setClasesList((prevClases) =>
                        prevClases.map((c) =>
                            c.id === selectedClase.id ? { ...c, ...form } : c
                        )
                    );

                    // Limpia la clase seleccionada después de la edición
                    setSelectedClase(null);
                },
                onError: (errors) => {
                    // Manejo de errores
                    if (errors.error) {
                        Swal.fire("Error", errors.error, "error"); // Error específico
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
            // Caso: Crear una nueva clase
            router.post(route("admin.clases.store"), form, {
                onSuccess: (page) => {
                    // Notificación de éxito
                    Swal.fire(
                        "Creado!",
                        "La clase ha sido creada exitosamente.",
                        "success"
                    );

                    // Obtén los datos de la nueva clase desde la respuesta o usa el formulario
                    const newClase = page.props.newClase || form;

                    // Agrega la nueva clase a la lista de clases
                    setClasesList((prevClases) => [...prevClases, newClase]);
                },
                onError: (errors) => {
                    // Manejo de errores
                    if (errors.error) {
                        Swal.fire("Error", errors.error, "error"); // Error específico
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
        // Muestra una alerta de confirmación al usuario
        Swal.fire({
            title: "¿Estás seguro?", // Título del modal
            text: "Esta acción eliminará la clase.", // Mensaje de advertencia
            icon: "warning", // Icono de advertencia
            showCancelButton: true, // Muestra un botón de cancelar
            confirmButtonColor: "#3085d6", // Color del botón de confirmación
            cancelButtonColor: "#d33", // Color del botón de cancelar
            confirmButtonText: "Sí, eliminar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, se realiza la solicitud de eliminación
                router.delete(route("admin.clases.destroy", id), {
                    onSuccess: () => {
                        // Al eliminar con éxito, muestra un mensaje de éxito
                        Swal.fire(
                            "Eliminada!",
                            "La clase ha sido eliminada exitosamente.",
                            "success"
                        );
                        // Actualiza la lista de clases eliminando la clase con el ID correspondiente
                        setClasesList((prevClases) =>
                            prevClases.filter((clase) => clase.id !== id)
                        );
                    },
                    onError: () => {
                        // Muestra un mensaje de error si la eliminación falla
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

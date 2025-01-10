import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Swal from "sweetalert2";
import ProgramasList from "@/Components/Admin/ProgramasList";
import CrearPrograma from "@/Components/Admin/CrearPrograma";
import { router } from "@inertiajs/react";

const ProgramasGestion = ({ programas }) => {
    // Estado para manejar el programa actualmente seleccionado
    const [selectedPrograma, setSelectedPrograma] = useState(null);

    // Estado para la lista de programas, inicializada con los datos proporcionados
    const [programasList, setProgramasList] = useState(programas);

    // Función para manejar la eliminación de un programa
    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro? 💥", // Título del modal de confirmación
            text: "Esta acción eliminará el programa.", // Mensaje descriptivo
            icon: "warning", // Icono de advertencia
            showCancelButton: true, // Botón de cancelar
            confirmButtonText: "Sí, eliminar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la acción, realiza la solicitud de eliminación
                router.delete(route("admin.programas.destroy", id), {
                    onSuccess: () => {
                        // Actualiza la lista de programas eliminando el que coincide con el ID
                        setProgramasList((prevList) =>
                            prevList.filter((p) => p.id !== id)
                        );
                        Swal.fire(
                            "Eliminado!",
                            "El programa ha sido eliminado.",
                            "success"
                        ); // Mensaje de éxito
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Hubo un problema al eliminar el programa.",
                            "error"
                        ); // Mensaje de error si la solicitud falla
                    },
                });
            }
        });
    };

    const handleSubmit = (data, isEditing) => {
        if (isEditing) {
            // Caso: Actualizar un programa existente
            router.put(route("admin.programas.update", data.id), data, {
                onSuccess: () => {
                    // Actualiza la lista de programas con los datos actualizados
                    setProgramasList((prevList) =>
                        prevList.map((p) => (p.id === data.id ? data : p))
                    );

                    // Muestra un mensaje de éxito
                    Swal.fire(
                        "Actualizado!",
                        "El programa ha sido actualizado correctamente.",
                        "success"
                    );

                    // Limpia la selección de programa
                    setSelectedPrograma(null);
                },
            });
        } else {
            // Caso: Crear un nuevo programa
            router.post(route("admin.programas.store"), data, {
                onSuccess: ({ props }) => {
                    // Si el backend devuelve `newPrograma`, úsalo para actualizar la lista
                    if (props && props.newPrograma) {
                        setProgramasList((prevList) => [
                            ...prevList,
                            props.newPrograma,
                        ]);
                    } else {
                        // Si no hay `newPrograma`, usa directamente los datos enviados
                        setProgramasList((prevList) => [...prevList, data]);
                    }

                    // Muestra un mensaje de éxito
                    Swal.fire(
                        "Creado!",
                        "El programa ha sido creado correctamente.",
                        "success"
                    );
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

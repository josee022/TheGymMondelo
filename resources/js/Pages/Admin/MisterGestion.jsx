import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import EntrenadoresList from "@/Components/Admin/EntrenadoresList";
import UsuariosList from "@/Components/Admin/UsuariosList";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

const MisterGestion = ({ entrenadores, usuarios }) => {
    // Maneja la conversión de un usuario a entrenador
    const handleConvertir = (userId, especialidad, tarifa) => {
        // Muestra un modal de confirmación con SweetAlert
        Swal.fire({
            title: "¿Convertir a Mister?", // Título del modal
            text: "¿Estás seguro de que deseas convertir a este usuario en entrenador?", // Texto de advertencia
            icon: "question", // Icono de pregunta
            showCancelButton: true, // Muestra un botón de cancelar
            confirmButtonColor: "#3085d6", // Color del botón de confirmación (azul)
            cancelButtonColor: "#d33", // Color del botón de cancelar (rojo)
            confirmButtonText: "Sí, convertir", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la acción
                router.post(`/admin/mister/convertir-a-entrenador/${userId}`, {
                    especialidad, // Enviar la especialidad del entrenador
                    tarifa, // Enviar la tarifa del entrenador
                    onSuccess: () => {
                        // Acción tras un éxito en la conversión
                        Swal.fire(
                            "¡Convertido!", // Título del modal de éxito
                            "El usuario ahora es entrenador.", // Mensaje del modal de éxito
                            "success" // Icono de éxito
                        );
                    },
                });
            }
        });
    };

    const handleDeshabilitar = (userId) => {
        // Muestra un modal de confirmación con SweetAlert
        Swal.fire({
            title: "¿Deshabilitar Mister?", // Título del modal
            text: "¿Estás seguro de que quieres deshabilitar a este entrenador?", // Mensaje de advertencia
            icon: "warning", // Icono de advertencia
            showCancelButton: true, // Muestra un botón de cancelar
            confirmButtonColor: "#3085d6", // Color del botón de confirmación (azul)
            cancelButtonColor: "#d33", // Color del botón de cancelar (rojo)
            confirmButtonText: "Sí, deshabilitar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la acción
                router.delete(
                    `/admin/mister/deshabilitar-entrenador/${userId}`, // Ruta de deshabilitación
                    {
                        onSuccess: () => {
                            // Acción tras éxito
                            Swal.fire(
                                "Deshabilitado", // Título del modal de éxito
                                "El entrenador ha sido deshabilitado correctamente.", // Mensaje de éxito
                                "success" // Icono de éxito
                            );
                        },
                    }
                );
            }
        });
    };

    const handleEditar = (entrenadorId, especialidad, tarifa) => {
        // Muestra un modal de confirmación con SweetAlert
        Swal.fire({
            title: "¿Guardar cambios?", // Título del modal
            text: "¿Estás seguro de que deseas actualizar las preferencias de este entrenador?", // Mensaje de confirmación
            icon: "info", // Icono de información
            showCancelButton: true, // Muestra un botón de cancelar
            confirmButtonColor: "#3085d6", // Color del botón de confirmación (azul)
            cancelButtonColor: "#d33", // Color del botón de cancelar (rojo)
            confirmButtonText: "Sí, actualizar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la acción
                router.post(
                    `/admin/mister/editar-entrenador/${entrenadorId}`, // Ruta de edición
                    {
                        especialidad, // Nueva especialidad del entrenador
                        tarifa, // Nueva tarifa del entrenador
                        onSuccess: () => {
                            // Acción tras éxito
                            Swal.fire(
                                "¡Actualizado!", // Título del modal de éxito
                                "Las preferencias del entrenador han sido actualizadas correctamente.", // Mensaje de éxito
                                "success" // Icono de éxito
                            );
                        },
                    }
                );
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
                            Gestión De Entrenadores
                        </span>
                    </span>
                </h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <EntrenadoresList
                    entrenadores={entrenadores}
                    onDeshabilitar={handleDeshabilitar}
                    onEditar={handleEditar}
                />
                <UsuariosList
                    usuarios={usuarios}
                    onConvertir={handleConvertir}
                />
            </div>
        </AdminLayout>
    );
};

export default MisterGestion;

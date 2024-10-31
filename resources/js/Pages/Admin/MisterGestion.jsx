import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import EntrenadoresList from "@/Components/Admin/EntrenadoresList";
import UsuariosList from "@/Components/Admin/UsuariosList";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

const MisterGestion = ({ entrenadores, usuarios }) => {
    const handleConvertir = (userId, especialidad, tarifa) => {
        Swal.fire({
            title: "¿Convertir a Mister?",
            text: "¿Estás seguro de que deseas convertir a este usuario en entrenador?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, convertir",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(`/admin/mister/convertir-a-entrenador/${userId}`, {
                    especialidad,
                    tarifa,
                    onSuccess: () => {
                        Swal.fire(
                            "¡Convertido!",
                            "El usuario ahora es entrenador.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    const handleDeshabilitar = (userId) => {
        Swal.fire({
            title: "¿Deshabilitar Mister?",
            text: "¿Estás seguro de que quieres deshabilitar a este entrenador?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, deshabilitar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    `/admin/mister/deshabilitar-entrenador/${userId}`,
                    {
                        onSuccess: () => {
                            Swal.fire(
                                "Deshabilitado",
                                "El entrenador ha sido deshabilitado correctamente.",
                                "success"
                            );
                        },
                    }
                );
            }
        });
    };

    const handleEditar = (entrenadorId, especialidad, tarifa) => {
        Swal.fire({
            title: "¿Guardar cambios?",
            text: "¿Estás seguro de que deseas actualizar las preferencias de este entrenador?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, actualizar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(`/admin/mister/editar-entrenador/${entrenadorId}`, {
                    especialidad,
                    tarifa,
                    onSuccess: () => {
                        Swal.fire(
                            "¡Actualizado!",
                            "Las preferencias del entrenador han sido actualizadas correctamente.",
                            "success"
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

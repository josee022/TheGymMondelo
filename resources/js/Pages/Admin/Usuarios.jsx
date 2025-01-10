import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function Usuarios({ usuarios, search }) {
    // Estado para manejar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState(search || ""); // Inicializa con un valor predeterminado o vacío

    // Función para manejar el cambio en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualiza el término de búsqueda en el estado
        router.get(
            route("admin.usuarios"), // Ruta para buscar usuarios
            { search: e.target.value }, // Envía el término de búsqueda como parámetro
            {
                preserveState: true, // Mantiene el estado actual
                preserveScroll: true, // Evita que el scroll vuelva al inicio al filtrar
            }
        );
    };

    // Función para eliminar un usuario
    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro?", // Título del modal
            text: "Esta acción eliminará al usuario de forma permanente.", // Advertencia
            icon: "warning", // Icono de advertencia
            showCancelButton: true, // Muestra un botón de cancelar
            confirmButtonColor: "#d33", // Color del botón de confirmación (rojo)
            cancelButtonColor: "#3085d6", // Color del botón de cancelar (azul)
            confirmButtonText: "Sí, eliminar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelar
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la eliminación
                router.delete(route("admin.usuarios.destroy", id), {
                    onSuccess: () => {
                        // Muestra un mensaje de éxito tras la eliminación
                        Swal.fire(
                            "¡Eliminado!",
                            "El usuario ha sido eliminado correctamente.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    // Función para suspender o reactivar un usuario
    const handleSuspend = (id, suspendido) => {
        Swal.fire({
            title: suspendido ? "¿Reactivar Usuario?" : "¿Suspender Usuario?", // Título según la acción
            text: suspendido
                ? "El usuario podrá volver a acceder al sistema." // Texto si se reactiva
                : "El usuario no podrá acceder al sistema.", // Texto si se suspende
            icon: "warning", // Icono de advertencia
            showCancelButton: true, // Muestra un botón de cancelar
            confirmButtonColor: suspendido ? "#4CAF50" : "#d33", // Verde para reactivar, rojo para suspender
            cancelButtonColor: "#3085d6", // Azul para cancelar
            confirmButtonText: suspendido ? "Sí, reactivar" : "Sí, suspender", // Texto del botón según la acción
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la acción
                router.post(
                    route("admin.usuarios.suspend", id), // Ruta para suspender o reactivar
                    {}, // Sin datos adicionales
                    {
                        onSuccess: () => {
                            // Muestra un mensaje de éxito tras la acción
                            Swal.fire(
                                suspendido ? "Reactivado" : "Suspendido",
                                `El usuario ha sido ${
                                    suspendido ? "reactivado" : "suspendido"
                                } correctamente.`,
                                "success"
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
                            Gestión De Usuarios
                        </span>
                    </span>
                </h1>
            </div>
            <input
                type="text"
                placeholder="Buscar usuario..."
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Nombre</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">
                            Fecha de Registro
                        </th>
                        <th className="py-3 px-4 text-left">Rol</th>
                        <th className="py-3 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.data.map((usuario) => (
                        <tr
                            key={usuario.id}
                            className="border-b hover:bg-gray-100 transition duration-150"
                        >
                            <td className="py-3 px-4">{usuario.id}</td>
                            <td className="py-3 px-4">{usuario.name}</td>
                            <td className="py-3 px-4">{usuario.email}</td>
                            <td className="py-3 px-4">
                                {new Date(
                                    usuario.created_at
                                ).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4">{usuario.rol}</td>
                            <td className="py-3 px-4 flex space-x-2">
                                <Link
                                    href={`/admin/usuarios/${usuario.id}`}
                                    className="bg-lime-500 text-white py-1 px-3 rounded hover:bg-lime-700"
                                >
                                    Ver Perfil
                                </Link>
                                <button
                                    onClick={() =>
                                        handleSuspend(
                                            usuario.id,
                                            usuario.suspendido
                                        )
                                    }
                                    className={`${
                                        usuario.suspendido
                                            ? "bg-violet-500 hover:bg-violet-700"
                                            : "bg-yellow-500 hover:bg-yellow-700"
                                    } text-white py-1 px-3 rounded`}
                                >
                                    {usuario.suspendido
                                        ? "Reactivar"
                                        : "Suspender"}
                                </button>
                                <button
                                    onClick={() => handleDelete(usuario.id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-6">
                <Pagination links={usuarios.links} />
            </div>
        </AdminLayout>
    );
}

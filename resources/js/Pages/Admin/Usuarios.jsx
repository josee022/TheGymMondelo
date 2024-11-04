import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";

export default function Usuarios({ usuarios }) {
    const [usuariosList, setUsuariosList] = useState([]);

    useEffect(() => {
        setUsuariosList(usuarios.data);
    }, [usuarios]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará al usuario de forma permanente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.usuarios.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "¡Eliminado!",
                            "El usuario ha sido eliminado correctamente.",
                            "success"
                        );
                        setUsuariosList((prev) =>
                            prev.filter((user) => user.id !== id)
                        );
                    },
                });
            }
        });
    };

    const handleSuspend = (id, suspendido) => {
        Swal.fire({
            title: suspendido ? "¿Reactivar Usuario?" : "¿Suspender Usuario?",
            text: suspendido
                ? "El usuario podrá volver a acceder al sistema."
                : "El usuario no podrá acceder al sistema.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: suspendido ? "#4CAF50" : "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: suspendido ? "Sí, reactivar" : "Sí, suspender",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(
                    route("admin.usuarios.suspend", id),
                    {},
                    {
                        onSuccess: () => {
                            Swal.fire(
                                suspendido ? "Reactivado" : "Suspendido",
                                `El usuario ha sido ${
                                    suspendido ? "reactivado" : "suspendido"
                                } correctamente.`,
                                "success"
                            );
                            setUsuariosList((prev) =>
                                prev.map((user) =>
                                    user.id === id
                                        ? { ...user, suspendido: !suspendido }
                                        : user
                                )
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
            </div>{" "}
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
                    {usuariosList.map((usuario) => (
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
                                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                                >
                                    Ver Perfil
                                </Link>
                                <Link
                                    href={`/admin/usuarios/${usuario.id}/edit`}
                                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                                >
                                    Editar
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

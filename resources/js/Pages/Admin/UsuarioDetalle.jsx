import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function UsuarioDetalle({ usuario }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    Detalles del Usuario
                </h1>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-black bg-gray-200 rounded-md py-2 px-4">
                    Información General
                </h2>
                <div className="text-gray-700 space-y-2 pl-4 text-lg">
                    <img
                        src={
                            usuario.foto_perfil
                                ? `/fotos_perfil/${usuario.foto_perfil}`
                                : "/images/default-avatar.png"
                        }
                        alt="Foto de perfil"
                        className="w-20 h-20 rounded-full"
                    />
                    <p>
                        <strong className="text-gray-800">Nombre:</strong>{" "}
                        {usuario.name}
                    </p>
                    <p>
                        <strong className="text-gray-800">Email:</strong>{" "}
                        {usuario.email}
                    </p>
                    <p>
                        <strong className="text-gray-800">Rol:</strong>{" "}
                        {usuario.rol}
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            Fecha de Registro:
                        </strong>{" "}
                        {formatDate(usuario.created_at)}
                    </p>
                    <p>
                        <strong className="text-gray-800">Biografía:</strong>{" "}
                        {usuario.biografia || "No disponible"}
                    </p>
                </div>

                <h2 className="text-2xl font-bold text-black bg-gray-200 rounded-md py-2 px-4">
                    Información Personal
                </h2>
                <div className="text-gray-700 space-y-2 pl-4 text-lg">
                    <p>
                        <strong className="text-gray-800">
                            Fecha de Nacimiento:
                        </strong>{" "}
                        {usuario.fecha_nacimiento
                            ? formatDate(usuario.fecha_nacimiento)
                            : "No especificado"}
                    </p>
                    <p>
                        <strong className="text-gray-800">Sexo:</strong>{" "}
                        {usuario.sexo || "No especificado"}
                    </p>
                    <p>
                        <strong className="text-gray-800">Altura:</strong>{" "}
                        {usuario.altura
                            ? `${usuario.altura} cm`
                            : "No especificado"}
                    </p>
                    <p>
                        <strong className="text-gray-800">Peso:</strong>{" "}
                        {usuario.peso
                            ? `${usuario.peso} kg`
                            : "No especificado"}
                    </p>
                    <p>
                        <strong className="text-gray-800">
                            Nivel de Actividad:
                        </strong>{" "}
                        {usuario.nivel_actividad || "No especificado"}
                    </p>
                </div>

                <h2 className="text-2xl font-bold text-black bg-gray-200 rounded-md py-2 px-4">
                    Estadísticas
                </h2>
                <div className="text-gray-700 space-y-2 pl-4 text-lg">
                    <p>
                        <strong className="text-gray-800">Puntos:</strong>{" "}
                        {usuario.puntos}
                    </p>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                    <Link
                        href={`/admin/usuarios/${usuario.id}/edit`}
                        className="bg-green-500 text-white py-2 px-5 rounded hover:bg-green-600 text-base"
                    >
                        Editar
                    </Link>
                    <Link
                        href={route("admin.usuarios")}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-5 rounded text-base"
                    >
                        Volver a Usuarios
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}

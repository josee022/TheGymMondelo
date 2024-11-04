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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-gray-800">
                    Detalles del Usuario
                </h1>
                <Link
                    href={route("admin.usuarios")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow transition duration-200"
                >
                    Volver a Usuarios
                </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto space-y-6">
                <h2 className="text-3xl font-semibold text-gray-600 border-b pb-3">
                    Información General
                </h2>
                <div className="text-gray-700 space-y-4 pl-6 text-2xl">
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

                <h2 className="text-3xl font-semibold text-gray-600 border-b pb-3">
                    Información Personal
                </h2>
                <div className="text-gray-700 space-y-4 pl-6 text-2xl">
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

                <h2 className="text-3xl font-semibold text-gray-600 border-b pb-3">
                    Estadísticas
                </h2>
                <div className="text-gray-700 space-y-4 pl-6 text-2xl">
                    <p>
                        <strong className="text-gray-800">Puntos:</strong>{" "}
                        {usuario.puntos}
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";

export default function Usuarios({ usuarios }) {
    return (
        <AdminLayout>
            <h1 className="text-4xl font-bold mb-8">Gestión de Usuarios</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-gray-200 text-gray-700 font-semibold uppercase text-lg">
                                Nombre
                            </th>
                            <th className="py-4 px-6 bg-gray-200 text-gray-700 font-semibold uppercase text-lg">
                                Email
                            </th>
                            <th className="py-4 px-6 bg-gray-200 text-gray-700 font-semibold uppercase text-lg">
                                Fecha de Registro
                            </th>
                            <th className="py-4 px-6 bg-gray-200 text-gray-700 font-semibold uppercase text-lg">
                                Rol
                            </th>
                            <th className="py-4 px-6 bg-gray-200 text-gray-700 font-semibold uppercase text-lg">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.data.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
                            >
                                <td className="py-4 px-6 text-gray-800 text-lg">
                                    {user.name}
                                </td>
                                <td className="py-4 px-6 text-gray-800 text-lg">
                                    {user.email}
                                </td>
                                <td className="py-4 px-6 text-gray-800 text-lg">
                                    {new Date(
                                        user.created_at
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-6 text-gray-800 text-lg capitalize">
                                    {user.rol}
                                </td>
                                <td className="py-4 px-6">
                                    <button className="text-blue-600 hover:text-blue-800 font-semibold mr-4">
                                        Ver
                                    </button>
                                    <button className="text-green-600 hover:text-green-800 font-semibold mr-4">
                                        Editar
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 font-semibold">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Componente de paginación */}
            <div className="mt-6">
                <Pagination links={usuarios.links} />
            </div>
        </AdminLayout>
    );
}

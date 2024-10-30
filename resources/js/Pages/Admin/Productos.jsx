import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";

export default function Productos({ productos }) {
    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará el producto de forma permanente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.productos.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "¡Eliminado!",
                            "El producto ha sido eliminado correctamente.",
                            "success"
                        );
                    },
                });
            }
        });
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">Gestión de Productos</h1>

            <Link
                href={route("admin.productos.create")}
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block hover:bg-blue-700 transition"
            >
                Nuevo Producto
            </Link>

            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Nombre</th>
                        <th className="py-3 px-4 text-left">Descripción</th>
                        <th className="py-3 px-4 text-left">Precio</th>
                        <th className="py-3 px-4 text-left">Stock</th>
                        <th className="py-3 px-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.data.map((producto) => (
                        <tr key={producto.id} className="border-b hover:bg-gray-100">
                            <td className="py-3 px-4">{producto.id}</td>
                            <td className="py-3 px-4">{producto.nombre}</td>
                            <td className="py-3 px-4">{producto.descripcion}</td>
                            <td className="py-3 px-4">{producto.precio} €</td>
                            <td className="py-3 px-4">{producto.stock} ud</td>
                            <td className="py-3 px-4 flex space-x-2">
                                <Link
                                    href={route("admin.productos.edit", producto.id)}
                                    className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(producto.id)}
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
                <Pagination links={productos.links} />
            </div>
        </AdminLayout>
    );
}

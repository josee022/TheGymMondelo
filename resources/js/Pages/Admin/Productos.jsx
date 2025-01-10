import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Swal from "sweetalert2";

export default function Productos({ productos, search }) {
    const [searchTerm, setSearchTerm] = useState(search || ""); // Estado para manejar el término de búsqueda

    // Función para manejar el cambio en el campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualiza el estado con el término de búsqueda

        // Realiza la búsqueda mediante una solicitud GET con el término de búsqueda
        router.get(
            route("admin.productos"), // La ruta para la lista de productos
            { search: e.target.value }, // Enviar el término de búsqueda como parámetro
            {
                preserveState: true, // Mantiene el estado actual de la página
                preserveScroll: true, // Evita que el scroll se mueva al principio
            }
        );
    };

    // Función para manejar la eliminación de un producto
    const handleDelete = (id) => {
        // Muestra un modal de confirmación antes de eliminar
        Swal.fire({
            title: "¿Estás seguro?", // Título del modal de confirmación
            text: "Esta acción eliminará el producto de forma permanente.", // Mensaje de advertencia
            icon: "warning", // Icono de advertencia
            showCancelButton: true, // Muestra el botón de cancelación
            confirmButtonColor: "#d33", // Color para el botón de confirmación
            cancelButtonColor: "#3085d6", // Color para el botón de cancelación
            confirmButtonText: "Sí, eliminar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelación
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la eliminación
                // Realiza una solicitud DELETE para eliminar el producto
                router.delete(route("admin.productos.destroy", id), {
                    onSuccess: () => {
                        // Muestra un mensaje de éxito al eliminar el producto
                        Swal.fire(
                            "¡Eliminado!", // Título del mensaje de éxito
                            "El producto ha sido eliminado correctamente.", // Mensaje de éxito
                            "success" // Icono de éxito
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
                            Gestión De Productos
                        </span>
                    </span>
                </h1>
            </div>

            {/* Campo de búsqueda */}
            <input
                type="text"
                placeholder="Buscar producto..."
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={searchTerm}
                onChange={handleSearchChange}
            />

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
                        <tr
                            key={producto.id}
                            className="border-b hover:bg-gray-100"
                        >
                            <td className="py-3 px-4">{producto.id}</td>
                            <td className="py-3 px-4">{producto.nombre}</td>
                            <td className="py-3 px-4">
                                {producto.descripcion}
                            </td>
                            <td className="py-3 px-4">{producto.precio} €</td>
                            <td className="py-3 px-4">{producto.stock} ud</td>
                            <td className="py-3 px-4 flex space-x-2">
                                <Link
                                    href={route(
                                        "admin.productos.edit",
                                        producto.id
                                    )}
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

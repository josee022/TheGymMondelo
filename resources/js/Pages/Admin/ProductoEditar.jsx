import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ProductoEditar({ producto }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        precio: producto.precio || "",
        stock: producto.stock || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.productos.update", producto.id), {
            onSuccess: () => {
                Swal.fire(
                    "¡Actualizado!",
                    "El producto ha sido actualizado correctamente.",
                    "success"
                );
            },
        });
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Editar producto
                        </span>
                    </span>
                </h1>
            </div>{" "}
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData("nombre", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-sm">
                                {errors.nombre}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            value={data.descripcion}
                            onChange={(e) =>
                                setData("descripcion", e.target.value)
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.descripcion && (
                            <p className="text-red-500 text-sm">
                                {errors.descripcion}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700">
                            Precio (€)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.precio}
                            onChange={(e) => setData("precio", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.precio && (
                            <p className="text-red-500 text-sm">
                                {errors.precio}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700">Stock</label>
                        <input
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.stock && (
                            <p className="text-red-500 text-sm">
                                {errors.stock}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
                            disabled={processing}
                        >
                            {processing ? "Guardando..." : "Guardar Cambios"}
                        </button>
                        <button
                            type="button"
                            onClick={() => history.back()}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

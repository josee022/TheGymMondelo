import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ProductoEditar({ producto }) {
    const [formData, setFormData] = useState({
        nombre: producto.nombre || "",
        descripcion: producto.descripcion || "",
        precio: producto.precio || "",
        stock: producto.stock || "",
        imagen: null,
    });

    const [preview, setPreview] = useState(
        producto.imagen ? `/images/${producto.imagen}` : null
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, imagen: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("nombre", formData.nombre);
        form.append("descripcion", formData.descripcion);
        form.append("precio", formData.precio);
        form.append("stock", formData.stock);

        if (formData.imagen) {
            form.append("imagen", formData.imagen);
        }

        // Incluye el método PUT explícitamente
        form.append("_method", "PUT");

        try {
            const response = await fetch(
                route("admin.productos.update", producto.id),
                {
                    method: "POST", // Laravel convertirá esto a PUT gracias a `_method`
                    body: form,
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al actualizar el producto.");
            }

            Swal.fire({
                title: "Producto Actualizado",
                text: "El producto ha sido actualizado exitosamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                router.visit(route("admin.productos"));
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar el producto. Por favor, inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide text-center">
                    Editar Producto
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
                encType="multipart/form-data"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Foto
                    </label>
                    <div className="mb-4">
                        {preview && (
                            <img
                                src={preview}
                                alt="Vista previa"
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                        )}
                    </div>
                    <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Precio (€)
                    </label>
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Guardar Cambios
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
        </AdminLayout>
    );
}

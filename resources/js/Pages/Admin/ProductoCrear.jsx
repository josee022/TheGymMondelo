import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ProductoCrear() {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, imagen: file });
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

        try {
            const response = await fetch(route("admin.productos.store"), {
                method: "POST",
                body: form,
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"),
                },
            });

            if (!response.ok) {
                const data = await response.json();
                setErrors(data.errors || {});
                throw new Error("Error al guardar el producto.");
            }

            Swal.fire({
                title: "Producto Creado",
                text: "El producto ha sido creado exitosamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                router.visit(route("admin.productos"));
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al crear el producto. Por favor, inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide text-center">
                    Crear Nuevo Producto
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
                    <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.imagen && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.imagen}
                        </p>
                    )}
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
                    {errors.nombre && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.nombre}
                        </p>
                    )}
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
                    {errors.descripcion && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.descripcion}
                        </p>
                    )}
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
                    {errors.precio && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.precio}
                        </p>
                    )}
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
                    {errors.stock && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.stock}
                        </p>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Crear Producto
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

import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function UsuarioEditar({ usuario }) {
    const [formData, setFormData] = useState({
        name: usuario.name || "",
        email: usuario.email || "",
        rol: usuario.rol || "cliente",
        biografia: usuario.biografia || "",
        fecha_nacimiento: usuario.fecha_nacimiento || "",
        sexo: usuario.sexo || "Otro",
        altura: usuario.altura || "",
        peso: usuario.peso || "",
        nivel_actividad: usuario.nivel_actividad || "Sedentario",
        puntos: usuario.puntos || 0,
        password: "",
        password_confirmation: "",
        foto_perfil: null,
    });

    const [preview, setPreview] = useState(
        usuario.foto_perfil ? `/fotos_perfil/${usuario.foto_perfil}` : null
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setFormData({ ...formData, foto_perfil: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("rol", formData.rol);
        form.append("biografia", formData.biografia);
        form.append("fecha_nacimiento", formData.fecha_nacimiento);
        form.append("sexo", formData.sexo);
        form.append("altura", formData.altura);
        form.append("peso", formData.peso);
        form.append("nivel_actividad", formData.nivel_actividad);
        form.append("puntos", formData.puntos);
        if (formData.password) {
            form.append("password", formData.password);
            form.append(
                "password_confirmation",
                formData.password_confirmation
            );
        }
        if (formData.foto_perfil) {
            form.append("foto_perfil", formData.foto_perfil);
        }

        // Incluye el método PUT explícitamente
        form.append("_method", "PUT");

        try {
            const response = await fetch(
                route("admin.usuarios.update", usuario.id),
                {
                    method: "POST",
                    body: form,
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Error al actualizar el usuario.");
            }

            Swal.fire({
                title: "Usuario Actualizado",
                text: "El usuario ha sido actualizado exitosamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                router.visit(route("admin.usuarios"));
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar el usuario. Por favor, inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide text-center">
                    Editar Usuario
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
                encType="multipart/form-data"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Foto de Perfil
                    </label>
                    <input
                        type="file"
                        name="foto_perfil"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Vista previa"
                            className="mt-4 w-32 h-32 rounded-full object-cover"
                        />
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
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

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

    const validateFields = () => {
        if (!formData.name.trim()) {
            Swal.fire("Error", "El nombre es obligatorio.", "error");
            return false;
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            Swal.fire("Error", "El email no es válido.", "error");
            return false;
        }
        if (formData.password && formData.password.length < 6) {
            Swal.fire(
                "Error",
                "La contraseña debe tener al menos 6 caracteres.",
                "error"
            );
            return false;
        }
        if (
            formData.password &&
            formData.password !== formData.password_confirmation
        ) {
            Swal.fire("Error", "Las contraseñas no coinciden.", "error");
            return false;
        }
        if (
            formData.altura &&
            (formData.altura <= 0 || formData.altura > 250)
        ) {
            Swal.fire(
                "Error",
                "La altura debe estar entre 1 y 250 cm.",
                "error"
            );
            return false;
        }
        if (formData.peso && (formData.peso <= 0 || formData.peso > 300)) {
            Swal.fire("Error", "El peso debe estar entre 1 y 300 kg.", "error");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) return;

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
            <div className="bg-gray-100 shadow-lg rounded-lg p-4 mb-4">
                <h1 className="text-2xl font-extrabold text-gray-800 text-center">
                    Editar Usuario
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto grid grid-cols-2 gap-4"
                encType="multipart/form-data"
            >
                {/* Foto de Perfil */}
                <div className="col-span-2 flex flex-col items-center">
                    <label className="text-gray-700 font-semibold mb-2">
                        Foto de Perfil
                    </label>
                    <input
                        type="file"
                        name="foto_perfil"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Vista previa"
                            className="mt-4 w-32 h-32 rounded-full object-cover"
                        />
                    )}
                </div>

                {/* Campos Básicos */}
                <div>
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
                <div>
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

                {/* Información Adicional */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Sexo
                    </label>
                    <select
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Altura (cm)
                    </label>
                    <input
                        type="number"
                        name="altura"
                        value={formData.altura}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        step="0.01"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Peso (kg)
                    </label>
                    <input
                        type="number"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        step="0.01"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Biografía
                    </label>
                    <textarea
                        name="biografia"
                        value={formData.biografia}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Escribe algo sobre ti"
                    />
                </div>

                {/* Contraseña */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Dejar en blanco si no deseas cambiarla"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Dejar en blanco si no deseas cambiarla"
                    />
                </div>

                {/* Botones */}
                <div className="col-span-2 flex justify-between mt-4">
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

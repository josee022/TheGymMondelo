import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function UsuarioEditar({ usuario }) {
    const { data, setData, post, processing, errors } = useForm({
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
        foto_perfil: null, // Para la foto de perfil
    });

    const [validationError, setValidationError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("admin.usuarios.update", usuario.id), {
            data: {
                ...data,
                _method: "PUT", // Esto simula el método PUT
            },
            forceFormData: true, // Necesario para manejar archivos
        });
    };

    return (
        <AdminLayout>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto space-y-4"
                encType="multipart/form-data"
            >
                {/* Foto de perfil */}
                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Foto de Perfil
                    </label>
                    <input
                        type="file"
                        onChange={(e) =>
                            setData("foto_perfil", e.target.files[0])
                        }
                        className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.foto_perfil && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.foto_perfil}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="text-xl font-bold text-black bg-gray-200 rounded-md py-1 px-3 mb-2">
                    Seguridad
                </div>

                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                        placeholder="Introduce una nueva contraseña si deseas cambiarla"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Confirmar Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.password_confirmation && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password_confirmation}
                        </p>
                    )}
                </div>

                {validationError && (
                    <p className="text-red-500 text-sm">{validationError}</p>
                )}

                <div className="text-xl font-bold text-black bg-gray-200 rounded-md py-1 px-3 mb-2">
                    Información Personal
                </div>

                <div>
                    <label className="block text-md font-medium text-gray-700">
                        Rol
                    </label>
                    <select
                        value={data.rol}
                        onChange={(e) => setData("rol", e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="cliente">Cliente</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.rol && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.rol}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-md font-medium text-gray-700">
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            value={data.fecha_nacimiento}
                            onChange={(e) =>
                                setData("fecha_nacimiento", e.target.value)
                            }
                            className="w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.fecha_nacimiento && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fecha_nacimiento}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-md font-medium text-gray-700">
                            Sexo
                        </label>
                        <select
                            value={data.sexo}
                            onChange={(e) => setData("sexo", e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                        </select>
                        {errors.sexo && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.sexo}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow font-semibold"
                        disabled={processing}
                    >
                        Guardar Cambios
                    </button>
                    <Link
                        href={route("admin.usuarios")}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow"
                    >
                        Volver a Usuarios
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}

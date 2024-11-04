// resources/js/Pages/Admin/UsuarioEditar.jsx
import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function UsuarioEditar({ usuario }) {
    const { data, setData, put, processing, errors } = useForm({
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
        password: "", // Nueva contraseña
        password_confirmation: "", // Confirmación de la nueva contraseña
    });

    const [validationError, setValidationError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationError("");

        // Validación de contraseñas
        if (data.password && data.password !== data.password_confirmation) {
            setValidationError("Las nuevas contraseñas no coinciden.");
            return;
        }

        // Enviar el formulario si todas las validaciones están correctas
        put(route("admin.usuarios.update", usuario.id));
    };

    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Editar Usuario</h1>
                <Link
                    href={route("admin.usuarios")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
                >
                    Volver a Usuarios
                </Link>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto space-y-6"
            >
                {/* Nombre */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">
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

                {/* Email */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">
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

                {/* Nueva Contraseña */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">
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

                {/* Confirmar Nueva Contraseña */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">
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

                {/* Error de validación personalizado */}
                {validationError && (
                    <p className="text-red-500 text-sm">{validationError}</p>
                )}

                {/* Rol */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">
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

                {/* Biografía */}
                <div>
                    <label className="block text-lg font-medium text-gray-700">
                        Biografía
                    </label>
                    <textarea
                        value={data.biografia}
                        onChange={(e) => setData("biografia", e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.biografia && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.biografia}
                        </p>
                    )}
                </div>

                {/* Otros Campos (Fecha de Nacimiento, Sexo, etc.) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-lg font-medium text-gray-700">
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
                        <label className="block text-lg font-medium text-gray-700">
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

                    {/* Campos de altura, peso y nivel de actividad */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700">
                            Altura
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.altura}
                            onChange={(e) => setData("altura", e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.altura && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.altura}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">
                            Peso
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.peso}
                            onChange={(e) => setData("peso", e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.peso && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.peso}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-gray-700">
                            Nivel de Actividad
                        </label>
                        <select
                            value={data.nivel_actividad}
                            onChange={(e) =>
                                setData("nivel_actividad", e.target.value)
                            }
                            className="w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="Sedentario">Sedentario</option>
                            <option value="Ligero">Ligero</option>
                            <option value="Moderado">Moderado</option>
                            <option value="Activo">Activo</option>
                            <option value="Muy Activo">Muy Activo</option>
                        </select>
                        {errors.nivel_actividad && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.nivel_actividad}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md shadow font-semibold"
                    disabled={processing}
                >
                    Guardar Cambios
                </button>
            </form>
        </AdminLayout>
    );
}

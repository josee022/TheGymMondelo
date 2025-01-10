import React from "react";
import { useForm } from "@inertiajs/react";

export default function FormBlog() {
    // Inicializa el formulario con datos iniciales y funciones auxiliares
    const { data, setData, post, reset, errors } = useForm({
        titulo: "", // Campo para el título del blog
        contenido: "", // Campo para el contenido del blog
    });

    // Maneja el envío del formulario para crear un nuevo blog
    const handleCreateSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario

        // Envía los datos del formulario al backend usando la ruta `blogs.store`
        post(route("blogs.store"), {
            onSuccess: () => reset(), // Resetea el formulario si la solicitud es exitosa
        });
    };

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4 relative">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500"></span>
                        <span className="relative">Crear un nuevo Blog</span>
                    </span>
                </h1>
                <p className="text-gray-600 text-sm">
                    Entrenadores compartirán sus conocimientos y experiencias
                    con la comunidad
                </p>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-8">
                <div className="relative">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Título
                    </label>
                    <input
                        type="text"
                        value={data.titulo}
                        onChange={(e) => setData("titulo", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder="Escribe el título de tu blog"
                    />
                    {errors.titulo && (
                        <span className="text-red-500 text-xs mt-1">
                            {errors.titulo}
                        </span>
                    )}
                </div>

                <div className="relative">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Contenido
                    </label>
                    <textarea
                        value={data.contenido}
                        onChange={(e) => setData("contenido", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent h-40"
                        placeholder="Escribe el contenido del blog"
                    />
                    {errors.contenido && (
                        <span className="text-red-500 text-xs mt-1">
                            {errors.contenido}
                        </span>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"
                    >
                        Publicar Blog
                    </button>
                </div>
            </form>
        </>
    );
}

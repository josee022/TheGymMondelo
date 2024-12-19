import React from "react";
import { useForm } from "@inertiajs/react";

export default function FormForo() {
    // Inicializa el formulario para crear un nuevo foro
    const { data, setData, post, reset, errors } = useForm({
        titulo: "", // Campo para el título del foro
        contenido: "", // Campo para el contenido del foro
    });

    // Maneja el envío del formulario para crear un nuevo foro
    const handleCreateSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (evita recargar la página)

        // Realiza una solicitud POST al servidor para crear el foro
        post(route("foros.store"), {
            onSuccess: () => reset(), // Si se crea con éxito, limpia los campos del formulario
        });
    };

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4 relative">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500"></span>
                        <span className="relative">Crear un nuevo Foro</span>
                    </span>
                </h1>
                <p className="text-gray-600 text-sm">
                    Comparte tus ideas, preguntas o recomendaciones con la
                    comunidad del gimnasio
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
                        placeholder="Escribe el título de tu foro"
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
                        placeholder="Escribe el contenido del foro"
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
                        Publicar Foro
                    </button>
                </div>
            </form>
        </>
    );
}

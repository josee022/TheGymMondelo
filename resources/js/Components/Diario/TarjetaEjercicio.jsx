import React from "react";

export default function TarjetaEjercicio({
    ejercicio,
    editarEjercicio,
    eliminarEjercicio,
}) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out">
            <h3 className="text-2xl font-bold text-teal-600 flex items-center space-x-2">
                {ejercicio.ejercicio} 🏋️
            </h3>
            <p className="text-gray-500 mt-2">
                <span className="font-semibold">📅 Fecha:</span>{" "}
                {new Date(ejercicio.fecha).toLocaleDateString()}
            </p>
            <p className="text-gray-500 mt-2">
                <span className="font-semibold">🔄 Series:</span>{" "}
                {ejercicio.series}
            </p>
            <p className="text-gray-500 mt-2">
                <span className="font-semibold">🔢 Repeticiones:</span>{" "}
                {ejercicio.repeticiones}
            </p>
            {ejercicio.peso && (
                <p className="text-gray-500 mt-2">
                    <span className="font-semibold">⚖️ Peso:</span>{" "}
                    {ejercicio.peso} kg
                </p>
            )}
            {ejercicio.notas && (
                <p className="text-gray-500 mt-2 italic">
                    <span className="font-semibold">📝 Notas:</span>{" "}
                    {ejercicio.notas}
                </p>
            )}
            <div className="flex justify-end space-x-3 mt-4">
                <button
                    onClick={() => editarEjercicio(ejercicio)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
                >
                    ✏️ Editar
                </button>
                <button
                    onClick={() => eliminarEjercicio(ejercicio.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
                >
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    );
}

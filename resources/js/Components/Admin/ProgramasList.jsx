import React, { useState } from "react";

const ProgramasList = ({ programas, onEdit, handleDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProgramas = programas.filter(
        (programa) =>
            programa &&
            programa.nombre &&
            programa.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="bg-white p-8 rounded-3xl shadow-lg overflow-y-auto"
            style={{ maxHeight: "70vh" }}
        >
            <h2 className="text-3xl font-bold text-black-500 mb-6 text-center">
                📜 Lista de Programas
            </h2>
            <input
                type="text"
                placeholder="🔍 Buscar programa..."
                className="w-full p-3 mb-5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="space-y-6">
                {filteredProgramas.map((programa) => (
                    <li
                        key={programa.id}
                        className="p-5 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl shadow-xl hover:shadow-2xl"
                    >
                        <div>
                            <h3 className="text-xl font-extrabold text-black-800 flex items-center gap-2">
                                {programa.nombre} 🎓
                            </h3>
                            <p className="text-gray-700 mt-2">
                                {programa.descripcion}
                            </p>
                            <p className="text-gray-600 mt-1">
                                Nivel: {programa.nivel} | Duración:{" "}
                                {programa.duracion} semanas
                            </p>
                            <p className="text-gray-600 mt-1">
                                Precio: {programa.precio} €
                            </p>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                onClick={() => onEdit(programa)}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                            >
                                ✏️ Editar
                            </button>
                            <button
                                onClick={() => handleDelete(programa.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                            >
                                🗑️ Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgramasList;

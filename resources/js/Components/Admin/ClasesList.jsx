import React, { useState } from "react";

const ClasesList = ({ clases, onEdit, handleDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClases = clases.filter((clase) =>
        clase.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="bg-white p-4 rounded-lg shadow-md overflow-y-auto"
            style={{ maxHeight: "70vh" }}
        >
            <h2 className="text-xl font-bold mb-2">Lista de Clases</h2>
            <div className="h-1 bg-lime-500 rounded mb-3"></div>
            <input
                type="text"
                placeholder="Buscar clase..."
                className="w-full p-2 mb-3 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="space-y-2">
                {filteredClases.map((clase) => (
                    <li
                        key={clase.id}
                        className="flex items-center justify-between bg-gray-100 rounded-lg p-2 shadow-sm"
                    >
                        <div>
                            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                📅 {clase.nombre}
                            </p>
                            <p className="text-xs text-gray-500">
                                {clase.fecha} | {clase.hora_inicio} -{" "}
                                {clase.hora_fin}
                            </p>
                        </div>
                        <div className="flex gap-1">
                            <button
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-sm"
                                onClick={() => onEdit(clase)}
                            >
                                ✏️ Editar
                            </button>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                                onClick={() => {
                                    if (confirm("¿Eliminar esta clase?")) {
                                        handleDelete(clase.id);
                                    }
                                }}
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

export default ClasesList;

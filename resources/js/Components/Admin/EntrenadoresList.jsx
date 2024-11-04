import React, { useState } from "react";
import EditarEntrenador from "./EditarEntrenador";

const EntrenadoresList = ({ entrenadores, onDeshabilitar, onEditar }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedEntrenador, setSelectedEntrenador] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleEditarClick = (entrenador) => {
        setSelectedEntrenador(entrenador);
        setShowModal(true);
    };

    const handleEditar = (entrenadorId, especialidad, tarifa) => {
        onEditar(entrenadorId, especialidad, tarifa);
        setShowModal(false);
    };

    const filteredEntrenadores = entrenadores.filter((entrenador) =>
        entrenador.usuario.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="bg-white p-6 rounded-lg shadow-md overflow-y-auto"
            style={{ maxHeight: "80vh" }}
        >
            <h2 className="text-2xl font-bold mb-2">Lista de Entrenadores</h2>
            <div className="h-1 bg-lime-500 rounded mb-4"></div>
            <input
                type="text"
                placeholder="Buscar entrenador..."
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="space-y-3">
                {filteredEntrenadores.map((entrenador) => (
                    <li
                        key={entrenador.id}
                        className="flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow-sm"
                    >
                        <span className="flex items-center gap-2">
                            🏋️‍♂️ {entrenador.usuario.name}
                        </span>
                        <div className="flex gap-2">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                                onClick={() => handleEditarClick(entrenador)}
                            >
                                ✏️ Editar
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                onClick={() =>
                                    onDeshabilitar(entrenador.usuario.id)
                                }
                            >
                                🗑️ Deshabilitar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {showModal && (
                <EditarEntrenador
                    entrenador={selectedEntrenador}
                    onClose={() => setShowModal(false)}
                    onEditar={handleEditar}
                />
            )}
        </div>
    );
};

export default EntrenadoresList;

import React, { useState } from "react";
import EditarEntrenador from "./EditarEntrenador";

const EntrenadoresList = ({ entrenadores, onDeshabilitar, onEditar }) => {
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);

    // Estado para guardar el entrenador seleccionado para editar
    const [selectedEntrenador, setSelectedEntrenador] = useState(null);

    // Estado para manejar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    // Maneja el clic en "Editar" de un entrenador específico
    const handleEditarClick = (entrenador) => {
        setSelectedEntrenador(entrenador); // Guarda el entrenador seleccionado
        setShowModal(true); // Muestra el modal
    };

    // Llama a la función `onEditar` con los datos proporcionados y cierra el modal
    const handleEditar = (entrenadorId, especialidad, tarifa) => {
        onEditar(entrenadorId, especialidad, tarifa); // Ejecuta la función de edición
        setShowModal(false); // Oculta el modal
    };

    // Filtra los entrenadores según el término de búsqueda
    const filteredEntrenadores = entrenadores.filter(
        (entrenador) =>
            entrenador.usuario.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) // Coincidencia insensible a mayúsculas
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

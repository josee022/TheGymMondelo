import React, { useState } from "react";

const EditarEntrenador = ({ entrenador, onClose, onEditar }) => {
    // Estados locales para manejar los valores de especialidad y tarifa
    const [especialidad, setEspecialidad] = useState(entrenador.especialidad); // Inicializa con la especialidad actual del entrenador
    const [tarifa, setTarifa] = useState(entrenador.tarifa); // Inicializa con la tarifa actual del entrenador

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        onEditar(entrenador.id, especialidad, tarifa); // Llama a la función de edición con los valores actualizados
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-xl font-bold mb-4">Editar Preferencias</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Especialidad
                        </label>
                        <input
                            type="text"
                            value={especialidad}
                            onChange={(e) => setEspecialidad(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Tarifa
                        </label>
                        <input
                            type="number"
                            value={tarifa}
                            onChange={(e) => setTarifa(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded w-full"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-red-400 text-white px-4 py-2 rounded mr-2"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarEntrenador;

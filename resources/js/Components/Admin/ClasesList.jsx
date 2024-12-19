import React, { useState } from "react";
import Swal from "sweetalert2";

const ClasesList = ({ clases, onEdit, handleDelete }) => {
    // Estado para manejar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    // Filtrar las clases según el término de búsqueda ingresado por el usuario
    const filteredClases = clases.filter(
        (clase) =>
            clase?.nombre
                ? clase.nombre.toLowerCase().includes(searchTerm.toLowerCase())
                : false // Verifica que `nombre` exista para evitar errores
    );

    // Función para formatear la hora a HH:mm:ss
    const formatTimeWithSeconds = (time) => {
        return time.length === 5 ? `${time}:00` : time; // Añade ":00" si no tiene segundos
    };

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
                {filteredClases.map((clase) =>
                    clase.id ? (
                        <li
                            key={clase.id}
                            className="flex items-center justify-between bg-gray-100 rounded-lg p-2 shadow-sm"
                        >
                            <div>
                                <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    📅 {clase.nombre}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {clase.fecha} |{" "}
                                    {formatTimeWithSeconds(clase.hora_inicio)} -{" "}
                                    {formatTimeWithSeconds(clase.hora_fin)}
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
                                        Swal.fire({
                                            title: "¿Estás seguro?",
                                            text: "Esta acción eliminará la clase.",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Sí, eliminar",
                                            cancelButtonText: "Cancelar",
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                handleDelete(clase.id);
                                            }
                                        });
                                    }}
                                >
                                    🗑️ Eliminar
                                </button>
                            </div>
                        </li>
                    ) : null
                )}
            </ul>
        </div>
    );
};

export default ClasesList;

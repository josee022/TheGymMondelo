import React, { useState } from "react";
import ConvertirMister from "./ConvertirMister";

const UsuariosList = ({ usuarios, onConvertir }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleConvertirClick = (userId) => {
        setSelectedUserId(userId);
        setShowModal(true);
    };

    const handleConvertir = (userId, especialidad, tarifa) => {
        onConvertir(userId, especialidad, tarifa);
        setShowModal(false);
    };

    const filteredUsuarios = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="bg-white p-6 rounded-lg shadow-md overflow-y-auto"
            style={{ maxHeight: "80vh" }}
        >
            <h2 className="text-2xl font-bold mb-2">Lista de Usuarios</h2>
            <div className="h-1 bg-lime-500 rounded mb-4"></div>
            <input
                type="text"
                placeholder="Buscar usuario..."
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="space-y-3">
                {filteredUsuarios.map((usuario) => (
                    <li
                        key={usuario.id}
                        className="flex items-center justify-between bg-gray-100 rounded-lg p-3 shadow-sm"
                    >
                        <span className="flex items-center gap-2">
                            👤 {usuario.name}
                        </span>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            onClick={() => handleConvertirClick(usuario.id)}
                        >
                            ⚙️ Convertir a Mister
                        </button>
                    </li>
                ))}
            </ul>
            {showModal && (
                <ConvertirMister
                    userId={selectedUserId}
                    onClose={() => setShowModal(false)}
                    onConvertir={handleConvertir}
                />
            )}
        </div>
    );
};

export default UsuariosList;

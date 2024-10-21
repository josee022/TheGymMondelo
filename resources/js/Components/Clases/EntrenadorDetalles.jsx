import React from 'react';
import { FaUserTie } from 'react-icons/fa';

export default function EntrenadorDetalles({ entrenador }) {
    return (
        <div className="mt-10">
            <h2 className="text-3xl font-semibold mb-4">Conoce a tu Entrenador 🤝</h2>
            <p className="mb-4 text-lg text-gray-700"><FaUserTie className="inline mr-2 text-lime-600" /> <strong>Nombre:</strong> {entrenador.usuario.name || 'No disponible'}</p>
            <p className="mb-4 text-lg text-gray-700"><strong>Especialidad:</strong> {entrenador.especialidad || 'No disponible'}</p>
            <p className="mb-4 text-lg text-gray-700"><strong>Tarifa:</strong> {entrenador.tarifa ? `${entrenador.tarifa} €/h` : 'No disponible'}</p>
        </div>
    );
}

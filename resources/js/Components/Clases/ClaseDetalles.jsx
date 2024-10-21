import React from 'react';
import { FaCalendarAlt, FaClock, FaUsers, FaStar } from 'react-icons/fa';

export default function ClaseDetalles({ clase, plazasDisponibles }) {

    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <div>
            <h1 className="text-5xl font-bold text-gray-800 mb-6">{clase.nombre} 🏋️‍♂️</h1>
            <p className="mb-4 text-lg text-gray-700"><FaCalendarAlt className="inline mr-2 text-lime-600" /> <strong>Fecha:</strong> {formatFechaClase(clase.fecha)}</p>
            <p className="mb-4 text-lg text-gray-700"><FaClock className="inline mr-2 text-lime-600" /> <strong>Hora:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
            <p className="mb-4 text-lg text-gray-700"><FaUsers className="inline mr-2 text-lime-600" /> <strong>Capacidad:</strong> {clase.capacidad} personas</p>
            <p className="mb-4 text-lg text-gray-700"><FaStar className="inline mr-2 text-lime-600" /> <strong>Descripción:</strong> {clase.descripcion || 'No disponible'}</p>

            {plazasDisponibles > 0 ? (
                <p className="mb-4 text-lg text-gray-700"><FaUsers className="inline mr-2 text-lime-600" /> <strong>Plazas disponibles:</strong> {plazasDisponibles}</p>
            ) : (
                <p className="mb-4 text-lg text-red-600"><strong>Clase completa</strong></p>
            )}
        </div>
    );
}

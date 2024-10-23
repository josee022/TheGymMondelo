import React from 'react';
import TarjetaEntrenador from './TarjetaEntrenador';

export default function SeccionTarjetas({ entrenadores }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-900 animate-fade-in">
            {entrenadores.map((entrenador) => (
                <TarjetaEntrenador key={entrenador.id} entrenador={entrenador} />
            ))}
        </div>
    );
}

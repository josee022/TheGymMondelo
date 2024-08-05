
import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function ClasesShow({ clase }) {
    const [reserva, setReserva] = useState(null);

    const { data, post, processing } = useForm({
        clase_id: clase.id,
    });

    const handleReserve = (e) => {
        e.preventDefault();
        post('/reservas', { data });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{clase.nombre}</h1>
            <p><strong>Descripción:</strong> {clase.descripcion}</p>
            <p><strong>Fecha:</strong> {clase.fecha}</p>
            <p><strong>Hora:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
            <p><strong>Entrenador:</strong> {clase.entrenador.nombre} - {clase.entrenador.especialidad}, {clase.entrenador.tarifa} </p>

            <button
                onClick={handleReserve}
                className="bg-green-500 text-white px-4 py-2 rounded"
                disabled={processing}
            >
                Reservar Clase
            </button>
        </div>
    );
}

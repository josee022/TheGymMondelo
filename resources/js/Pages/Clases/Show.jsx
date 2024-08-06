import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Show({ auth, clase, entrenador }) {
    const { post } = useForm({
        clase_id: clase.id,
    });

    const handleReserve = (e) => {
        e.preventDefault();
        post(route('reservas.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Clase: ${clase.nombre}`} />

            <div className="relative min-h-screen flex flex-col items-center bg-gray-700 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">{clase.nombre}</h1>
                    <p className="mb-2"><strong className="text-gray-700">Descripción:</strong> {clase.descripcion || 'No disponible'}</p>
                    <p className="mb-2"><strong className="text-gray-700">Fecha:</strong> {clase.fecha}</p>
                    <p className="mb-2"><strong className="text-gray-700">Hora:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
                    <p className="mb-2"><strong className="text-gray-700">Capacidad:</strong> {clase.capacidad}</p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">Entrenador</h2>
                    <p className="mb-2"><strong className="text-gray-700">Nombre:</strong> {entrenador.usuario.name || 'Nombre no disponible'}</p>
                    <p className="mb-2"><strong className="text-gray-700">Especialidad:</strong> {entrenador.especialidad || 'No disponible'}</p>
                    <p className="mb-2"><strong className="text-gray-700">Tarifa:</strong> {entrenador.tarifa || 'No disponible'} €/h</p>

                    <div className="flex justify-end gap-4 mt-6">
                        <Link
                            href="/clases"
                            className="bg-red-500 text-white py-2 px-4 rounded"
                        >
                            Volver
                        </Link>

                        <button
                            onClick={handleReserve}
                            className="bg-green-500 text-white py-2 px-4 rounded"
                        >
                            Reservar Clase
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

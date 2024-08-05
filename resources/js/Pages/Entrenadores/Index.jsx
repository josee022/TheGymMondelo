import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, entrenadores }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Entrenadores" />

            <div className="relative min-h-screen flex flex-col items-center bg-gray-700 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">Entrenadores</span>
                            </span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-900">
                        {entrenadores.map((entrenador) => (
                            <div key={entrenador.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-2">{entrenador.usuario.name}</h2>
                                <p className="mb-2"><strong className="text-gray-700">Especialidad:</strong> {entrenador.especialidad}</p>
                                <p className="mb-2"><strong className="text-gray-700">Tarifa:</strong> {entrenador.tarifa} €/Mes</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

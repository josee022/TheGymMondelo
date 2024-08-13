import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/Footer';


export default function Index({ clases, user }) {

    // Función para formatear la fecha de la clase
    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }); // Formato: dd-mm-yyyy
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nuestras Distintas Clases : </h2>}
        >
            <Head title="Clases Disponibles" />

            <div className="relative min-h-screen flex flex-col items-center bg-gray-700 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">Clases Disponibles</span>
                            </span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-900">
                        {clases.map((clase) => (
                            <div key={clase.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-2">{clase.nombre}</h2>
                                <p className="mb-2"><strong className="text-gray-700">Fecha:</strong> {formatFechaClase(clase.fecha)}</p>
                                <p className="mb-2"><strong className="text-gray-700">Hora:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
                                <Link href={`/clases/${clase.id}`} className="text-blue-500">Ver detalles</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

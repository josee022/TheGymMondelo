import React from 'react'; // Importa React para poder utilizar JSX
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importa el diseño de la página autenticada
import { Head, Link } from '@inertiajs/react'; // Importa componentes de Inertia para manejar el título de la página y enlaces
import Footer from '@/Components/Footer'; // Importa el componente de pie de página

export default function Index({ clases, user }) {

    // Función para formatear la fecha de la clase en formato dd-mm-yyyy
    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha); // Crea un objeto Date a partir de la cadena de fecha
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit', // Muestra el día con dos dígitos
            month: '2-digit', // Muestra el mes con dos dígitos
            year: 'numeric' // Muestra el año en formato numérico
        });
    };

    return (
        <AuthenticatedLayout
            user={user} // Pasa el usuario autenticado al diseño de la página
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nuestras Distintas Clases :</h2>} // Encabezado de la página
        >
            <Head title="Clases Disponibles" /> {/* Establece el título de la página */}

            <div className="relative min-h-screen flex flex-col items-center bg-gray-700 py-12">
                {/* Contenedor principal con fondo gris y espacio para el contenido */}
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {/* Contenedor para el encabezado de la sección */}
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">Clases Disponibles</span>
                            </span>
                        </h1>
                    </div>

                    {/* Contenedor de las clases, usando un grid para la disposición */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-900">
                        {/* Mapea cada clase a un bloque de información */}
                        {clases.map((clase) => (
                            <div key={clase.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-2">{clase.nombre}</h2>
                                {/* Muestra la fecha formateada y la hora de inicio y fin de la clase */}
                                <p className="mb-2"><strong className="text-gray-700">Fecha:</strong> {formatFechaClase(clase.fecha)}</p>
                                <p className="mb-2"><strong className="text-gray-700">Hora:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
                                {/* Enlace a los detalles de la clase */}
                                <Link href={`/clases/${clase.id}`} className="text-blue-500">Ver detalles</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer /> {/* Incluye el componente del pie de página */}
        </AuthenticatedLayout>
    );
}

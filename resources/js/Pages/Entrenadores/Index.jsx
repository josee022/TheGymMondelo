import React from 'react'; // Importa React para utilizar JSX y crear componentes
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importa el diseño de autenticación para envolver el contenido
import { Head, Link } from '@inertiajs/react'; // Importa los componentes de InertiaJS para manejar el título y enlaces
import Footer from '@/Components/Footer'; // Importa el componente Footer para el pie de página

export default function Index({ auth, entrenadores }) {
    return (
        <AuthenticatedLayout
            user={auth.user} // Pasa el usuario autenticado al diseño de autenticación
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nuestros Entrenadores :</h2>}
            // Establece el encabezado del diseño de autenticación
        >
            <Head title="Entrenadores" />
            {/* Establece el título de la página */}

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
                {/* Contenedor principal con fondo gris y espaciado vertical */}
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {/* Contenedor principal del contenido */}
                    <div className="text-center mb-6">
                        {/* Encabezado de la sección */}
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            {/* Título principal */}
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                {/* Línea de color verde debajo del título */}
                                <span className="relative">Entrenadores</span>
                            </span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-900">
                        {/* Grid para mostrar la lista de entrenadores */}
                        {entrenadores.map((entrenador) => (
                            <div key={entrenador.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                {/* Tarjeta de cada entrenador */}
                                <h2 className="text-2xl font-semibold mb-2">{entrenador.usuario.name}</h2>
                                {/* Nombre del entrenador */}
                                <p className="mb-2"><strong className="text-gray-700">Especialidad:</strong> {entrenador.especialidad}</p>
                                {/* Especialidad del entrenador */}
                                <p className="mb-2"><strong className="text-gray-700">Tarifa:</strong> {entrenador.tarifa} €/h</p>
                                {/* Tarifa del entrenador por hora */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
            {/* Componente Footer al final de la página */}
        </AuthenticatedLayout>
    );
}

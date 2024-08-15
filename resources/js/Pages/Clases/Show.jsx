import React from 'react'; // Importa React para poder utilizar JSX
import { Head, useForm } from '@inertiajs/react'; // Importa componentes y hooks de InertiaJS
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importa el diseño para usuarios autenticados
import { Link } from '@inertiajs/react'; // Importa el componente Link para navegación
import Footer from '@/Components/Footer'; // Importa el componente Footer

export default function Show({ auth, clase, entrenador }) {

    // Función para formatear la fecha de la clase en formato dd-mm-yyyy
    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha); // Crea un objeto Date a partir de la cadena de fecha
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit', // Muestra el día con dos dígitos
            month: '2-digit', // Muestra el mes con dos dígitos
            year: 'numeric' // Muestra el año en formato numérico
        });
    };

    // Usa el hook useForm para manejar el estado del formulario
    const { post } = useForm({
        clase_id: clase.id, // Inicializa el formulario con el ID de la clase
    });

    // Maneja el evento de reserva de la clase
    const handleReserve = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        post(route('reservas.store')); // Envía una solicitud POST a la ruta de reservas
    };

    return (
        <AuthenticatedLayout
            user={auth.user} // Pasa el usuario autenticado al diseño de la página
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Información sobre nuestra clase seleccionada :</h2>} // Encabezado de la página
        >
            <Head title={`Clase: ${clase.nombre}`} /> {/* Establece el título de la página con el nombre de la clase */}

            <div className="relative min-h-screen flex flex-col items-center bg-gray-700 py-12">
                {/* Contenedor principal con fondo gris y espacio para el contenido */}
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">{clase.nombre}</h1>
                    {/* Muestra información sobre la clase */}
                    <p className="mb-2"><strong className="text-gray-700">Descripción:</strong> {clase.descripcion || 'No disponible'}</p>
                    <p className="mb-2"><strong className="text-gray-700">Fecha:</strong> {formatFechaClase(clase.fecha)}</p>
                    <p className="mb-2"><strong className="text-gray-700">Hora:</strong> {clase.hora_inicio} - {clase.hora_fin}</p>
                    <p className="mb-2"><strong className="text-gray-700">Capacidad:</strong> {clase.capacidad}</p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">Entrenador</h2>
                    {/* Muestra información sobre el entrenador */}
                    <p className="mb-2"><strong className="text-gray-700">Nombre:</strong> {entrenador.usuario.name || 'Nombre no disponible'}</p>
                    <p className="mb-2"><strong className="text-gray-700">Especialidad:</strong> {entrenador.especialidad || 'No disponible'}</p>
                    <p className="mb-2"><strong className="text-gray-700">Tarifa:</strong> {entrenador.tarifa || 'No disponible'} €/h</p>

                    {/* Botones de acción */}
                    <div className="flex justify-end gap-4 mt-6">
                        {/* Botón para volver a la lista de clases */}
                        <Link
                            href="/clases"
                            className="bg-red-500 text-white py-2 px-4 rounded"
                        >
                            Volver
                        </Link>

                        {/* Botón para reservar la clase */}
                        <button
                            onClick={handleReserve}
                            className="bg-green-500 text-white py-2 px-4 rounded"
                        >
                            Reservar Clase
                        </button>
                    </div>
                </div>
            </div>
            <Footer /> {/* Incluye el componente Footer */}
        </AuthenticatedLayout>
    );
}

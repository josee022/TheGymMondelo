import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, isEntrenador, reservas }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel de control del usuario :</h2>}
        >
            <Head title="Panel de control" />

            <div className="relative min-h-screen flex flex-col items-center bg-gray-700 py-12">
                {/* Contenedor principal */}
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {/* Encabezado */}
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">Información del Perfil</span>
                            </span>
                        </h1>
                    </div>

                    {/* Información del perfil */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-900">
                        <div>
                            <p className="mb-4"><strong className="text-gray-700">Nombre:</strong> {user.name}</p>
                            <p className="mb-4"><strong className="text-gray-700">Correo electrónico:</strong> {user.email}</p>
                            <p className="mb-4"><strong className="text-gray-700">Fecha de nacimiento:</strong> {user.fecha_nacimiento}</p>
                            <p className="mb-4"><strong className="text-gray-700">Sexo:</strong> {user.sexo}</p>
                        </div>
                        <div>
                            <p className="mb-4"><strong className="text-gray-700">Altura:</strong> {user.altura} cm</p>
                            <p className="mb-4"><strong className="text-gray-700">Peso:</strong> {user.peso} kg</p>
                            <p className="mb-4"><strong className="text-gray-700">Nivel de actividad:</strong> {user.nivel_actividad}</p>
                            <p className="mb-4"><strong className="text-gray-700">Biografía:</strong> {user.biografia}</p>
                        </div>
                    </div>

                    {/* Mensaje si el usuario es entrenador */}
                    {isEntrenador && (
                        <div className="bg-green-100 text-green-800 p-4 rounded-md mt-6">
                            <h3 className="text-xl font-semibold">Licencia de Entrenador en TheGymMondelo</h3>
                            <p>¡Felicidades! Eres un entrenador certificado.</p>
                        </div>
                    )}

                    {/* Botón de editar perfil */}
                    <div className="mt-6 text-center">
                        <a href="/profile/edit" className="bg-[#a3e635] text-black px-4 py-2 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#a3e635]">
                            Editar perfil
                        </a>
                    </div>

                    {/* Sección de reservas */}
                    <div className="mt-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Mis Reservas</h2>
                        {reservas.length === 0 ? (
                            <p className="text-gray-600">No tienes reservas realizadas.</p>
                        ) : (
                            reservas.map((reserva) => (
                                <div key={reserva.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                                    <h3 className="text-xl font-semibold mb-2">Clase de {reserva.clase.nombre}</h3>
                                    <p className="mb-2"><strong className="text-gray-700">Fecha:</strong> {reserva.clase.fecha}</p>
                                    <p className="mb-2"><strong className="text-gray-700">Hora:</strong> {reserva.clase.hora_inicio} - {reserva.clase.hora_fin}</p>
                                    <p className="mb-2"><strong className="text-gray-700">Estado:</strong> {reserva.estado}</p>
                                    {reserva.estado === 'Pendiente' && (
                                        <div className="mt-4">
                                            <Link
                                                href={`/reservas/${reserva.id}/confirm`}
                                                method="POST"
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                                            >
                                                Confirmar Reserva
                                            </Link>
                                            <Link
                                                href={`/reservas/${reserva.id}/cancel`}
                                                method="POST"
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Cancelar Reserva
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

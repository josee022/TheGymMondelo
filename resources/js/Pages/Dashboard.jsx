import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel de control del usuario :</h2>}
        >
            <Head title="Panel de control" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold">Informacion del perfil.</h3>
                            <p><strong>Nombre:</strong> {user.name}</p>
                            <p><strong>Correo electrónico:</strong> {user.email}</p>
                            <p><strong>Fecha de nacimiento:</strong> {user.fecha_nacimiento}</p>
                            <p><strong>Sexo:</strong> {user.sexo}</p>
                            <p><strong>Altura :</strong> {user.altura} cm</p>
                            <p><strong>Peso:</strong> {user.peso} kg</p>
                            <p><strong>Nivel de actividad:</strong> {user.nivel_actividad}</p>

                            <div className="flex mt-4">
                            <a href="/profile/edit" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                            Editar perfil </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

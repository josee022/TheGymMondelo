import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Components/Footer';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Pagination from '@/Components/Pagination';

export default function CreateForo({ auth, foros }) {
    const { data, setData, post, reset, errors } = useForm({
        titulo: '',
        contenido: '',
    });

    const [editingForoId, setEditingForoId] = useState(null);
    const { data: editFormData, setData: setEditFormData, patch, clearErrors } = useForm({
        titulo: '',
        contenido: '',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post(route('foros.store'), {
            onSuccess: () => reset(),
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        patch(route('foros.update', editingForoId), {
            onSuccess: () => {
                setEditingForoId(null);
                clearErrors();
            },
            onError: () => {
                // Manejo de errores si es necesario
            },
        });
    };

    const handleEdit = (foro) => {
        setEditingForoId(foro.id);
        setEditFormData({
            titulo: foro.titulo,
            contenido: foro.contenido,
        });
    };

    const handleCancelEdit = () => {
        setEditingForoId(null);
        clearErrors();
    };

    const handleDelete = (foroId) => {
        if (confirm('¿Estás seguro de que quieres eliminar este foro?')) {
            Inertia.delete(route('foros.destroy', foroId), {
                onSuccess: () => {
                    console.log('Foro eliminado con éxito');
                },
                onError: (error) => {
                    console.error('Error al eliminar el foro:', error);
                },
            });
        }
    };

    const formatFechaForo = (timestamp) => {
        const fecha = new Date(timestamp);
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return `Creado el ${fecha.toLocaleDateString('es-ES', opciones)}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Foros TheGymMondelo :</h2>}
        >
            <div className="relative min-h-screen flex flex-col items-center bg-gray-700 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-400"></span>
                                <span className="relative">Crear un nuevo Foro</span>
                            </span>
                        </h1>
                    </div>

                    <form onSubmit={handleCreateSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
                            <input
                                type="text"
                                value={data.titulo}
                                onChange={(e) => setData('titulo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                            />
                            {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo}</span>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Contenido</label>
                            <textarea
                                value={data.contenido}
                                onChange={(e) => setData('contenido', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-32"
                            />
                            {errors.contenido && <span className="text-red-500 text-sm">{errors.contenido}</span>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Crear
                            </button>
                        </div>
                    </form>
                </div>

                <div className="w-full max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 relative">
                        <span className="relative inline-block">
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-400"></span>
                            <span className="relative">Foros Recientes</span>
                        </span>
                    </h2>
                    <div className="space-y-4">
                        {foros.data.map((foro) => (
                            <div
                                key={foro.id}
                                className="relative bg-[#d9f99d] p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                            >
                                {editingForoId === foro.id ? (
                                    <form onSubmit={handleEditSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
                                            <input
                                                type="text"
                                                value={editFormData.titulo}
                                                onChange={(e) => setEditFormData('titulo', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                                            />
                                            {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Contenido</label>
                                            <textarea
                                                value={editFormData.contenido}
                                                onChange={(e) => setEditFormData('contenido', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-32"
                                            />
                                            {errors.contenido && <span className="text-red-500 text-sm">{errors.contenido}</span>}
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                type="button"
                                                className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="relative p-4">
                                            <div className="absolute top-0 left-0 p-2">
                                                <p className="text-gray-600 text-sm font-semibold">
                                                    Autor del Foro: {foro.usuario?.name || 'Desconocido'}
                                                </p>
                                            </div>
                                            <div className="absolute top-0 right-0 p-2 text-right">
                                                <p className="text-gray-500 text-sm">
                                                    {formatFechaForo(foro.fecha_publicacion)}
                                                </p>
                                            </div>
                                            <div className="mt-10">
                                                <h3 className="text-2xl font-semibold text-gray-800">{foro.titulo}</h3>
                                                <p className="text-gray-600 text-base break-words">
                                                    {foro.contenido}
                                                </p>
                                            </div>

                                            {/* Verificación para mostrar los botones solo al creador */}
                                            {auth.user.id === foro.usuario_id && (
                                                <div className="flex justify-end space-x-2 mt-4">
                                                    <button
                                                        onClick={() => handleEdit(foro)}
                                                        className="bg-lime-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(foro.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <Pagination className="mt-6" links={foros.links} />
                </div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

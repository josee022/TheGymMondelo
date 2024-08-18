import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Components/Footer';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Pagination from '@/Components/Pagination';

export default function CreateForo({ auth, foros }) {
    const { data: createForoData, setData: setCreateForoData, post, reset, errors } = useForm({
        titulo: '',
        contenido: '',
    });

    const [editingForoId, setEditingForoId] = useState(null);
    const { data: editForoData, setData: setEditForoData, patch, clearErrors } = useForm({
        titulo: '',
        contenido: '',
    });

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [responses, setResponses] = useState({});
    const [commentData, setCommentData] = useState(''); // Estado para manejar los comentarios

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
        });
    };

    const handleEdit = (foro) => {
        setEditingForoId(foro.id);
        setEditForoData({
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

    const handleCommentSubmit = (e, foroId) => {
        e.preventDefault();
        if (!commentData.trim()) return;

        Inertia.post(route('comentarios.store', foroId), {
            contenido: commentData,
            onSuccess: () => setCommentData(''),
            onError: (error) => {
                console.error('Error al agregar comentario:', error);
            },
        });
    };

    const handleResponseSubmit = (e, foroId, comentarioId) => {
        e.preventDefault();
        const responseContent = responses[comentarioId] || '';
        if (!responseContent.trim()) return;

        Inertia.post(route('comentarios.store', foroId), {
            contenido: responseContent,
            comentario_id: comentarioId,
            onSuccess: () => {
                setResponses(prev => ({ ...prev, [comentarioId]: '' }));
            },
            onError: (error) => {
                console.error('Error al agregar respuesta:', error);
            },
        });
    };

    const handleCommentChange = (e, comentarioId) => {
        setResponses(prev => ({
            ...prev,
            [comentarioId]: e.target.value,
        }));
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
    };

    const handleEditCommentSubmit = (e, commentId) => {
        e.preventDefault();
        Inertia.patch(route('comentarios.update', commentId), {
            contenido: responses[commentId],
            onSuccess: () => {
                setEditingCommentId(null);
                setResponses(prev => ({ ...prev, [commentId]: '' }));
            },
            onError: (error) => {
                console.error('Error al editar el comentario:', error);
            },
        });
    };

    const handleCancelCommentEdit = () => {
        setEditingCommentId(null);
    };

    const handleDeleteComment = (commentId) => {
        if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            Inertia.delete(route('comentarios.destroy', commentId), {
                onSuccess: () => {
                    console.log('Comentario eliminado con éxito');
                },
                onError: (error) => {
                    console.error('Error al eliminar el comentario:', error);
                },
            });
        }
    };

    const formatFechaForo = (timestamp) => {
        const fecha = new Date(timestamp);
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return `Publicado el ${fecha.toLocaleDateString('es-ES', opciones)}`;
    };

    const formatFechaComentario = (timestamp) => {
        const fecha = new Date(timestamp);
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return `Publicado el ${fecha.toLocaleDateString('es-ES', opciones)}`;
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
                                value={createForoData.titulo}
                                onChange={(e) => setCreateForoData('titulo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                            />
                            {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo}</span>}
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Contenido</label>
                            <textarea
                                value={createForoData.contenido}
                                onChange={(e) => setCreateForoData('contenido', e.target.value)}
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
                    <br />
                    <div className="space-y-4">
                        {foros.data.map((foro) => (
                            <div
                                key={foro.id}
                                className="relative bg-[#d9f99d] p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                            >
                                {editingForoId === foro.id ? (
                                    <form onSubmit={handleEditSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
                                            <input
                                                type="text"
                                                value={editForoData.titulo}
                                                onChange={(e) => setEditForoData('titulo', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                                            />
                                            {errors.titulo && <span className="text-red-500 text-sm">{errors.titulo}</span>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2">Contenido</label>
                                            <textarea
                                                value={editForoData.contenido}
                                                onChange={(e) => setEditForoData('contenido', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-32"
                                            />
                                            {errors.contenido && <span className="text-red-500 text-sm">{errors.contenido}</span>}
                                        </div>

                                        <div className="flex justify-between">
                                            <button
                                                type="submit"
                                                className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Actualizar
                                            </button>
                                            <button
                                                type="button"
                                                onClick={handleCancelEdit}
                                                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <>
                                        <div className="flex justify-between mb-2">
                                            <div className="text-gray-600 text-sm">Autor: {foro.usuario?.name || 'Desconocido'}</div>
                                            <div className="text-gray-600 text-sm">{formatFechaForo(foro.created_at)}</div>
                                        </div>
                                        <div className="text-lg font-semibold">{foro.titulo}</div>
                                        <div className="text-gray-800 mb-2 whitespace-pre-wrap break-words">{foro.contenido}</div>
                                        {auth.user.id === foro.usuario_id && (
                                            <div className="flex justify-between mt-4">
                                                <button
                                                    onClick={() => handleEdit(foro)}
                                                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(foro.id)}
                                                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        )}

                                        <div className="mt-6">
                                            <form onSubmit={(e) => handleCommentSubmit(e, foro.id)} className="flex flex-col space-y-4">
                                                <textarea
                                                    value={commentData}
                                                    onChange={(e) => setCommentData(e.target.value)}
                                                    placeholder="Escribe un comentario..."
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-20"
                                                />
                                                <button
                                                    type="submit"
                                                    className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Agregar Comentario
                                                </button>
                                            </form>

                                            <div className="mt-6 space-y-4">
                                                {foro.comentarios.map((comentario) => (
                                                    <div key={comentario.id} className="relative bg-[#f0f4c3] p-4 rounded-lg shadow-md">
                                                        {editingCommentId === comentario.id ? (
                                                            <form onSubmit={(e) => handleEditCommentSubmit(e, comentario.id)} className="space-y-4">
                                                                <div>
                                                                    <label className="block text-gray-700 text-sm font-bold mb-2">Contenido</label>
                                                                    <textarea
                                                                        value={responses[comentario.id] || comentario.contenido}
                                                                        onChange={(e) => handleCommentChange(e, comentario.id)}
                                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-32"
                                                                    />
                                                                    {errors.contenido && <span className="text-red-500 text-sm">{errors.contenido}</span>}
                                                                </div>

                                                                <div className="flex justify-between">
                                                                    <button
                                                                        type="submit"
                                                                        className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                    >
                                                                        Actualizar Comentario
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={handleCancelCommentEdit}
                                                                        className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                    >
                                                                        Cancelar
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        ) : (
                                                            <>
                                                                <div className="flex justify-between mb-2">
                                                                    <div className="text-gray-600 text-sm">Autor: {comentario.usuario?.name || 'Desconocido'}</div>
                                                                    <div className="text-gray-600 text-sm">{formatFechaComentario(comentario.created_at)}</div>
                                                                </div>
                                                                <p className="text-gray-800 whitespace-pre-wrap break-words">{comentario.contenido}</p>

                                                                {auth.user.id === comentario.usuario_id && (
                                                                    <div className="flex justify-between mt-4">
                                                                        <button
                                                                            onClick={() => handleEditComment(comentario)}
                                                                            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                        >
                                                                            Editar
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteComment(comentario.id)}
                                                                            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                        >
                                                                            Eliminar
                                                                        </button>
                                                                    </div>
                                                                )}

                                                                <div className="mt-4">
                                                                    <form onSubmit={(e) => handleResponseSubmit(e, foro.id, comentario.id)} className="flex flex-col space-y-4">
                                                                        <textarea
                                                                            value={responses[comentario.id] || ''}
                                                                            onChange={(e) => handleCommentChange(e, comentario.id)}
                                                                            placeholder="Escribe una respuesta..."
                                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-20"
                                                                        />
                                                                        <button
                                                                            type="submit"
                                                                            className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                        >
                                                                            Agregar Respuesta
                                                                        </button>
                                                                    </form>
                                                                </div>
                                                            </>
                                                        )}
                                                        {/* Mostrar respuestas aquí */}
                                                        <div className="mt-4">
                                                            {comentario.respuestas && comentario.respuestas.map((respuesta) => (
                                                                <div key={respuesta.id} className="relative bg-[#e2e8f0] p-4 rounded-lg shadow-md mt-2">
                                                                    <div className="flex justify-between mb-2">
                                                                        <div className="text-gray-600 text-sm">Autor: {respuesta.usuario?.name || 'Desconocido'}</div>
                                                                        <div className="text-gray-600 text-sm">{formatFechaComentario(respuesta.created_at)}</div>
                                                                    </div>
                                                                    <p className="text-gray-800 whitespace-pre-wrap break-words">{respuesta.contenido}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <Pagination links={foros.links} />
                    </div>
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

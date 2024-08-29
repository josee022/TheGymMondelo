import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Components/Footer';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Pagination from '@/Components/Pagination';
import { router } from '@inertiajs/react';

export default function CreateForo({ auth, foros }) {
    // Maneja el estado y las funciones de formulario para crear un foro
    const { data: createForoData, setData: setCreateForoData, post, reset, errors } = useForm({
        titulo: '',
        contenido: '',
    });

    // Estado para manejar el ID del foro que se está editando
    const [editingForoId, setEditingForoId] = useState(null);
    // Maneja el estado y las funciones de formulario para editar un foro
    const { data: editForoData, setData: setEditForoData, patch, clearErrors } = useForm({
        titulo: '',
        contenido: '',
    });

    // Estado para manejar el ID del comentario que se está editando
    const [editingCommentId, setEditingCommentId] = useState(null);
    // Estado para manejar las respuestas a los comentarios
    const [responses, setResponses] = useState({});
    // Estado para manejar el contenido del comentario que se está escribiendo
    const [commentData, setCommentData] = useState('');

    // Función para manejar el envío del formulario de creación de foro
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        // Envia los datos del formulario al servidor para crear un nuevo foro
        post(route('foros.store'), {
            onSuccess: () => reset(), // Resetea el formulario en caso de éxito
        });
    };

    // Función para manejar el envío del formulario de edición de foro
    const handleEditSubmit = (e) => {
        e.preventDefault();
        // Envía los datos del formulario al servidor para actualizar el foro existente
        patch(route('foros.update', editingForoId), {
            onSuccess: () => {
                setEditingForoId(null); // Limpia el estado de edición al completar con éxito
                clearErrors(); // Limpia los errores de validación
            },
        });
    };

    // Función para preparar un foro para la edición
    const handleEdit = (foro) => {
        setEditingForoId(foro.id); // Establece el ID del foro en edición
        setEditForoData({
            titulo: foro.titulo,
            contenido: foro.contenido,
        });
    };

    // Función para cancelar la edición del foro
    const handleCancelEdit = () => {
        setEditingForoId(null); // Limpia el estado de edición
        clearErrors(); // Limpia los errores de validación
    };

    // Función para eliminar un foro
    const handleDelete = (foroId) => {
        if (confirm('¿Estás seguro de que quieres eliminar este foro?')) {
            router.delete(route('foros.destroy', foroId), {
                onSuccess: () => {
                    console.log('Foro eliminado con éxito');
                },
                onError: (error) => {
                    console.error('Error al eliminar el foro:', error);
                },
            });
        }
    };

    // Función para manejar el envío de un comentario
    const handleCommentSubmit = (e, foroId) => {
        e.preventDefault();

        if (!commentData.trim()) return; // No hace nada si el comentario está vacío

        router.post(route('comentarios.store', foroId), {
            contenido: commentData,
        }, {
            onFinish: () => {
                setCommentData(''); // Limpia el estado del comentario
            },
        })
        .catch((error) => {
            console.error('Error al agregar comentario:', error);
        });
    };



    // Función para manejar el envío de una respuesta a un comentario
    const handleResponseSubmit = (e, foroId, comentarioId) => {
        e.preventDefault();
        const responseContent = responses[comentarioId] || '';
        if (!responseContent.trim()) return; // No hace nada si la respuesta está vacía

        router.post(route('comentarios.store', foroId), {
            contenido: responseContent,
            comentario_id: comentarioId,
            onSuccess: () => {
                setResponses(prev => ({ ...prev, [comentarioId]: '' })); // Limpia la respuesta en caso de éxito
            },
            onError: (error) => {
                console.error('Error al agregar respuesta:', error);
            },
        });
    };

    // Función para manejar los cambios en el campo de respuesta a un comentario
    const handleCommentChange = (e, comentarioId) => {
        setResponses(prev => ({
            ...prev,
            [comentarioId]: e.target.value,
        }));
    };

    // Función para preparar un comentario para la edición
    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id);
    };

    // Función para manejar el envío de la edición de un comentario
    const handleEditCommentSubmit = (e, commentId) => {
        e.preventDefault();
        router.patch(route('comentarios.update', commentId), {
            contenido: responses[commentId],
            onSuccess: () => {
                setEditingCommentId(null); // Limpia el estado de edición del comentario en caso de éxito
                setResponses(prev => ({ ...prev, [commentId]: '' }));
            },
            onError: (error) => {
                console.error('Error al editar el comentario:', error);
            },
        });
    };

    // Función para cancelar la edición de un comentario
    const handleCancelCommentEdit = () => {
        setEditingCommentId(null);
    };

    // Función para eliminar un comentario
    const handleDeleteComment = (commentId) => {
        if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            router.delete(route('comentarios.destroy', commentId), {
                onSuccess: () => {
                    console.log('Comentario eliminado con éxito');
                },
                onError: (error) => {
                    console.error('Error al eliminar el comentario:', error);
                },
            });
        }
    };

    // Función para preparar una respuesta para la edición
    const handleEditResponse = (respuesta) => {
        setEditingCommentId(respuesta.id);
        setResponses((prev) => ({
            ...prev,
            [respuesta.id]: respuesta.contenido,
        }));
    };

    // Función para manejar el envío de la edición de una respuesta
    const handleEditResponseSubmit = (e, respuestaId) => {
        e.preventDefault();
        router.patch(route('comentarios.update', respuestaId), {
            contenido: responses[respuestaId],
            onSuccess: () => {
                setEditingCommentId(null); // Limpia el estado de edición de la respuesta en caso de éxito
                setResponses((prev) => ({ ...prev, [respuestaId]: '' }));
            },
            onError: (error) => {
                console.error('Error al editar la respuesta:', error);
            },
        });
    };

    // Función para cancelar la edición de una respuesta
    const handleCancelResponseEdit = () => {
        setEditingCommentId(null);
    };

    // Función para eliminar una respuesta
    const handleDeleteResponse = (respuestaId) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta respuesta?')) {
            router.delete(route('comentarios.destroy', respuestaId), {
                onSuccess: () => {
                    console.log('Respuesta eliminada con éxito');
                },
                onError: (error) => {
                    console.error('Error al eliminar la respuesta:', error);
                },
            });
        }
    };

    // Función para formatear la fecha de publicación del foro
    const formatFechaForo = (timestamp) => {
        const fecha = new Date(timestamp);
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return `Publicado el ${fecha.toLocaleDateString('es-ES', opciones)}`;
    };

    // Función para formatear la fecha de publicación del comentario
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
            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
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
                                                        {comentario.respuestas && comentario.respuestas.map((respuesta) => (
                                                            <div key={respuesta.id} className="relative bg-[#e2e8f0] p-4 rounded-lg shadow-md mt-2">
                                                                <div className="flex justify-between mb-2">
                                                                    <div className="text-gray-600 text-sm">Autor: {respuesta.usuario?.name || 'Desconocido'}</div>
                                                                    <div className="text-gray-600 text-sm">{formatFechaComentario(respuesta.created_at)}</div>
                                                                </div>
                                                                {editingCommentId === respuesta.id ? (
                                                                    <form onSubmit={(e) => handleEditResponseSubmit(e, respuesta.id)} className="space-y-4">
                                                                        <div>
                                                                            <textarea
                                                                                value={responses[respuesta.id] || ''}
                                                                                onChange={(e) => handleCommentChange(e, respuesta.id)}
                                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-20"
                                                                            />
                                                                            {errors.contenido && <span className="text-red-500 text-sm">{errors.contenido}</span>}
                                                                        </div>

                                                                        <div className="flex justify-between">
                                                                            <button
                                                                                type="submit"
                                                                                className="bg-lime-400 hover:bg-lime-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                            >
                                                                                Actualizar Respuesta
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={handleCancelResponseEdit}
                                                                                className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                            >
                                                                                Cancelar
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                ) : (
                                                                    <>
                                                                        <p className="text-gray-800 whitespace-pre-wrap break-words">{respuesta.contenido}</p>
                                                                        {auth.user.id === respuesta.usuario_id && (
                                                                            <div className="flex justify-between mt-4">
                                                                                <button
                                                                                    onClick={() => handleEditResponse(respuesta)}
                                                                                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                                >
                                                                                    Editar
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => handleDeleteResponse(respuesta.id)}
                                                                                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                                                >
                                                                                    Eliminar
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                        <br />
                    <div className="mt-6">
                        <Pagination links={foros.links} />
                    </div>
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

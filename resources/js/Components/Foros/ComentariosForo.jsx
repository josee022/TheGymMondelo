import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function ComentariosForo({
    foro, // Foro actual
    auth, // Información del usuario autenticado
    commentData, // Contenido del nuevo comentario
    setCommentData, // Función para actualizar el contenido del nuevo comentario
    handleCommentSubmit, // Función para manejar el envío de un nuevo comentario
    hideForms, // Indicador para ocultar formularios de edición si es necesario
}) {
    // Estados para gestionar respuestas y edición de comentarios o respuestas
    const [responses, setResponses] = useState({}); // Almacena las respuestas asociadas a cada comentario
    const [editingCommentId, setEditingCommentId] = useState(null); // ID del comentario que se está editando
    const [editingResponseId, setEditingResponseId] = useState(null); // ID de la respuesta que se está editando

    // Maneja el envío de una respuesta a un comentario
    const handleResponseSubmit = (e, foroId, comentarioId) => {
        e.preventDefault();
        const responseContent = responses[comentarioId] || ""; // Obtiene el contenido de la respuesta
        if (!responseContent.trim()) return; // Evita enviar respuestas vacías

        router.post(
            route("comentarios.store", foroId), // Ruta para guardar la respuesta
            {
                contenido: responseContent, // Contenido de la respuesta
                comentario_id: comentarioId, // ID del comentario al que responde
            },
            {
                onSuccess: () => {
                    setResponses((prev) => ({ ...prev, [comentarioId]: "" })); // Limpia el campo de respuesta
                },
                onError: (error) => {
                    console.error("Error al agregar respuesta:", error); // Muestra errores en consola
                },
            }
        );
    };

    // Activa el modo de edición para un comentario
    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id); // Establece el ID del comentario en edición
        setResponses((prev) => ({ ...prev, [comment.id]: comment.contenido })); // Carga el contenido actual en el campo
    };

    // Maneja el envío del formulario de edición de un comentario
    const handleEditCommentSubmit = async (e, commentId) => {
        e.preventDefault();
        const updatedContent = responses[commentId]; // Contenido actualizado
        try {
            await router.patch(route("comentarios.update", commentId), {
                contenido: updatedContent, // Envía el contenido actualizado
            });
            setEditingCommentId(null); // Sale del modo de edición
            setResponses((prev) => ({ ...prev, [commentId]: "" })); // Limpia el campo de respuesta
        } catch (error) {
            console.error("Error al editar el comentario:", error); // Muestra errores
        }
    };

    // Cancela el modo de edición de un comentario
    const handleCancelCommentEdit = () => {
        setEditingCommentId(null); // Restablece el estado
        setResponses((prev) => {
            const newResponses = { ...prev };
            delete newResponses[editingCommentId]; // Elimina el contenido editado temporal
            return newResponses;
        });
    };

    // Elimina un comentario
    const handleDeleteComment = (commentId) => {
        if (confirm("¿Estás seguro de que quieres eliminar este comentario?")) {
            router.delete(route("comentarios.destroy", commentId)); // Envía una solicitud DELETE
        }
    };

    // Activa el modo de edición para una respuesta
    const handleEditResponse = (response) => {
        setEditingResponseId(response.id); // Establece el ID de la respuesta en edición
        setResponses((prev) => ({
            ...prev,
            [response.id]: response.contenido, // Carga el contenido actual en el campo
        }));
    };

    // Maneja el envío del formulario de edición de una respuesta
    const handleEditResponseSubmit = async (e, responseId) => {
        e.preventDefault();
        const updatedContent = responses[responseId]; // Contenido actualizado
        try {
            await router.patch(route("comentarios.update", responseId), {
                contenido: updatedContent, // Envía el contenido actualizado
            });
            setEditingResponseId(null); // Sale del modo de edición
            setResponses((prev) => ({ ...prev, [responseId]: "" })); // Limpia el campo
        } catch (error) {
            console.error("Error al editar la respuesta:", error); // Muestra errores
        }
    };

    // Cancela el modo de edición de una respuesta
    const handleCancelResponseEdit = () => {
        setEditingResponseId(null); // Restablece el estado
        setResponses((prev) => {
            const newResponses = { ...prev };
            delete newResponses[editingResponseId]; // Elimina el contenido editado temporal
            return newResponses;
        });
    };

    // Elimina una respuesta
    const handleDeleteResponse = (responseId) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta respuesta?")) {
            router.delete(route("comentarios.destroy", responseId)); // Envía una solicitud DELETE
        }
    };

    // Formatea la fecha del foro
    const formatFechaForo = (timestamp) => {
        const fecha = new Date(timestamp); // Convierte el timestamp en un objeto Date
        const opciones = {
            year: "numeric", // Año completo
            month: "long", // Nombre completo del mes
            day: "numeric", // Día del mes
            hour: "2-digit", // Hora
            minute: "2-digit", // Minutos
        };
        return `Publicado el ${fecha.toLocaleDateString("es-ES", opciones)}`; // Devuelve la fecha formateada
    };

    return (
        <div className="mt-6">
            {/* Ocultamos el formulario de agregar comentario si `hideForms` o `editingCommentId` o `editingResponseId` está activado */}
            {!hideForms && !editingCommentId && !editingResponseId && (
                <form
                    onSubmit={(e) => handleCommentSubmit(e, foro.id)}
                    className="flex flex-col space-y-4"
                >
                    <textarea
                        value={commentData}
                        onChange={(e) => setCommentData(e.target.value)}
                        placeholder="Escribe un comentario..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-20"
                    />
                    <button
                        type="submit"
                        className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Agregar Comentario
                    </button>
                </form>
            )}

            <div className="mt-6 space-y-4">
                {foro.comentarios.map((comentario) => (
                    <div
                        key={comentario.id}
                        className="relative bg-[#f0f4c3] p-4 rounded-lg shadow-md"
                    >
                        {editingCommentId === comentario.id ? (
                            <form
                                onSubmit={(e) =>
                                    handleEditCommentSubmit(e, comentario.id)
                                }
                                className="space-y-4"
                            >
                                <textarea
                                    value={responses[comentario.id] || ""}
                                    onChange={(e) =>
                                        setResponses((prev) => ({
                                            ...prev,
                                            [comentario.id]: e.target.value,
                                        }))
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-32"
                                />
                                <div className="flex justify-between">
                                    <button
                                        type="submit"
                                        className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Actualizar Comentario
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancelCommentEdit}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="flex justify-between mb-2">
                                    <div className="text-gray-600 text-sm">
                                        Autor:{" "}
                                        {comentario.usuario?.name ||
                                            "Desconocido"}
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                        {formatFechaForo(comentario.created_at)}{" "}
                                    </div>
                                </div>
                                <p className="text-gray-800 whitespace-pre-wrap break-words">
                                    {comentario.contenido}
                                </p>
                                {auth.user.id === comentario.usuario_id && (
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button
                                            onClick={() =>
                                                handleEditComment(comentario)
                                            }
                                            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteComment(
                                                    comentario.id
                                                )
                                            }
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Respuestas */}
                        <div className="mt-4">
                            {/* Ocultamos el formulario de agregar respuesta si `hideForms`, `editingCommentId`, o `editingResponseId` está activado */}
                            {!hideForms &&
                                !editingCommentId &&
                                !editingResponseId && (
                                    <form
                                        onSubmit={(e) =>
                                            handleResponseSubmit(
                                                e,
                                                foro.id,
                                                comentario.id
                                            )
                                        }
                                        className="flex flex-col space-y-4"
                                    >
                                        <textarea
                                            value={
                                                responses[comentario.id] || ""
                                            }
                                            onChange={(e) =>
                                                setResponses((prev) => ({
                                                    ...prev,
                                                    [comentario.id]:
                                                        e.target.value,
                                                }))
                                            }
                                            placeholder="Escribe una respuesta..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-20"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Agregar Respuesta
                                        </button>
                                    </form>
                                )}

                            {comentario.respuestas &&
                                comentario.respuestas.map((respuesta) => (
                                    <div
                                        key={respuesta.id}
                                        className="relative bg-[#e2e8f0] p-4 rounded-lg shadow-md mt-2"
                                    >
                                        {editingResponseId === respuesta.id ? (
                                            <form
                                                onSubmit={(e) =>
                                                    handleEditResponseSubmit(
                                                        e,
                                                        respuesta.id
                                                    )
                                                }
                                                className="space-y-4"
                                            >
                                                <textarea
                                                    value={
                                                        responses[
                                                            respuesta.id
                                                        ] || ""
                                                    }
                                                    onChange={(e) =>
                                                        setResponses(
                                                            (prev) => ({
                                                                ...prev,
                                                                [respuesta.id]:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-20"
                                                />
                                                <div className="flex justify-between">
                                                    <button
                                                        type="submit"
                                                        className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Actualizar Respuesta
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            handleCancelResponseEdit
                                                        }
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <>
                                                <div className="flex justify-between mb-2">
                                                    <div className="text-gray-600 text-sm">
                                                        Autor:{" "}
                                                        {respuesta.usuario
                                                            ?.name ||
                                                            "Desconocido"}
                                                    </div>
                                                    <div className="text-gray-600 text-sm">
                                                        {formatFechaForo(
                                                            respuesta.created_at
                                                        )}{" "}
                                                    </div>
                                                </div>
                                                <p className="text-gray-800 whitespace-pre-wrap break-words">
                                                    {respuesta.contenido}
                                                </p>
                                                {auth.user.id ===
                                                    respuesta.usuario_id && (
                                                    <div className="flex justify-end space-x-2 mt-4">
                                                        <button
                                                            onClick={() =>
                                                                handleEditResponse(
                                                                    respuesta
                                                                )
                                                            }
                                                            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteResponse(
                                                                    respuesta.id
                                                                )
                                                            }
                                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
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
                    </div>
                ))}
            </div>
        </div>
    );
}

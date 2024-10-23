import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import ComentariosForo from "@/Components/Foros/ComentariosForo";

export default function ListaForo({
    foros,
    auth,
    editingForoId,
    handleEdit,
    handleCancelEdit,
    formatFechaForo,
}) {
    const {
        data: editFormData,
        setData: setEditFormData,
        patch,
        errors,
    } = useForm({
        titulo: "",
        contenido: "",
    });
    const [commentData, setCommentData] = useState("");

    const handleEditSubmit = (e) => {
        e.preventDefault();
        patch(route("foros.update", editingForoId), {
            onSuccess: () => handleCancelEdit(),
        });
    };

    const handleEditClick = (foro) => {
        setEditFormData({
            titulo: foro.titulo,
            contenido: foro.contenido,
        });
        handleEdit(foro);
    };

    const handleDelete = (foroId) => {
        if (confirm("¿Estás seguro de que quieres eliminar este foro?")) {
            router.delete(route("foros.destroy", foroId));
        }
    };

    const handleCommentSubmit = (e, foroId) => {
        e.preventDefault();
        if (!commentData.trim()) return;
        router.post(
            route("comentarios.store", foroId),
            { contenido: commentData },
            {
                onSuccess: () => setCommentData(""),
            }
        );
    };

    return (
        <div className="space-y-4">
            {foros.map((foro) => (
                <div
                    key={foro.id}
                    className="relative bg-[#d9f99d] p-4 rounded-lg shadow-md"
                >
                    {/* Muestra el formulario de edición del foro, pero ocultamos los formularios de agregar comentarios y respuestas */}
                    {editingForoId === foro.id ? (
                        <>
                            {/* Formulario de edición del foro */}
                            <form
                                onSubmit={handleEditSubmit}
                                className="space-y-6 mb-6"
                            >
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        value={editFormData.titulo}
                                        onChange={(e) =>
                                            setEditFormData(
                                                "titulo",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
                                    />
                                    {errors.titulo && (
                                        <span className="text-red-500 text-sm">
                                            {errors.titulo}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Contenido
                                    </label>
                                    <textarea
                                        value={editFormData.contenido}
                                        onChange={(e) =>
                                            setEditFormData(
                                                "contenido",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400 h-32"
                                    />
                                    {errors.contenido && (
                                        <span className="text-red-500 text-sm">
                                            {errors.contenido}
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Actualizar Foro
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

                            {/* Mantenemos los comentarios visibles, pero ocultamos los formularios de agregar comentario y respuesta */}
                            <ComentariosForo
                                foro={foro}
                                auth={auth}
                                commentData={commentData}
                                setCommentData={setCommentData}
                                handleCommentSubmit={handleCommentSubmit}
                                hideForms={true} // Ocultar formularios de agregar comentario y respuesta
                            />
                        </>
                    ) : (
                        <>
                            {/* Información del foro */}
                            <div className="relative p-4">
                                <div className="absolute top-0 left-0 p-2">
                                    <p className="text-gray-600 text-sm font-semibold">
                                        Autor del Post:{" "}
                                        {foro.usuario?.name || "Desconocido"}
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 p-2 text-right">
                                    <p className="text-gray-500 text-sm">
                                        {formatFechaForo(foro.created_at)}
                                    </p>
                                </div>
                                <div className="mt-10">
                                    <h3 className="text-2xl font-semibold text-gray-800">
                                        {foro.titulo}
                                    </h3>
                                    <p className="text-gray-600 text-base break-words">
                                        {foro.contenido}
                                    </p>
                                </div>

                                {/* Botones para editar y eliminar si es el autor */}
                                {auth.user.id === foro.usuario_id && (
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button
                                            onClick={() =>
                                                handleEditClick(foro)
                                            }
                                            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(foro.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}

                                {/* Comentarios */}
                                <ComentariosForo
                                    foro={foro}
                                    auth={auth}
                                    commentData={commentData}
                                    setCommentData={setCommentData}
                                    handleCommentSubmit={handleCommentSubmit}
                                    hideForms={false} // Mostrar los formularios de agregar comentario y respuesta
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

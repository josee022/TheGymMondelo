import React from 'react';
import { useForm } from '@inertiajs/react'; // Asegúrate de importar useForm
import { router } from '@inertiajs/react';

export default function ListaBlog({ blogs, isEntrenador, auth, editingBlogId, handleEdit, handleCancelEdit, formatFechaBlog }) {
    const { data: editFormData, setData: setEditFormData, patch, errors } = useForm({
        titulo: '',
        contenido: '',
    });

    // Maneja el envío del formulario de edición
    const handleEditSubmit = (e) => {
        e.preventDefault();
        patch(route('blogs.update', editingBlogId), {
            onSuccess: () => handleCancelEdit(), // Cierra el formulario al guardar
        });
    };

    // Cargar los datos del blog en el formulario cuando se edita
    const handleEditClick = (blog) => {
        setEditFormData({
            titulo: blog.titulo,   // Establece los valores actuales del blog en el formulario
            contenido: blog.contenido,
        });
        handleEdit(blog);  // Abre el formulario de edición
    };

    const handleDelete = (blogId) => {
        if (confirm('¿Estás seguro de que quieres eliminar este blog?')) {
            router.delete(route('blogs.destroy', blogId));
        }
    };

    return (
        <div className="space-y-4">
            {blogs.map((blog) => (
                <div
                    key={blog.id}
                    className="relative bg-[#d9f99d] p-4 rounded-lg shadow-md"
                >
                    {editingBlogId === blog.id ? (
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
                                        Autor del Post: {blog.autor?.name || 'Desconocido'}
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 p-2 text-right">
                                    <p className="text-gray-500 text-sm">
                                        {formatFechaBlog(blog.fecha_publicacion)}
                                    </p>
                                </div>
                                <div className="mt-10">
                                    <h3 className="text-2xl font-semibold text-gray-800">{blog.titulo}</h3>
                                    <p className="text-gray-600 text-base break-words">
                                        {blog.contenido}
                                    </p>
                                </div>
                                {isEntrenador && auth.user.id === blog.autor_id && (
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button
                                            onClick={() => handleEditClick(blog)}  // Al hacer clic, carga los datos en el formulario
                                            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
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
    );
}

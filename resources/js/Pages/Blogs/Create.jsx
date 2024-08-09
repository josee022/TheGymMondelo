import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Components/Footer';
import { useForm } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import '../../../css/create-blog.css';

export default function CreateBlog({ auth, isEntrenador, blogs }) {
    const { data, setData, post, reset, errors } = useForm({
        titulo: '',
        contenido: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('blogs.store'), {
            onSuccess: () => reset(),
        });
    };

    const formatFechaBlog = (timestamp) => {
        const fecha = new Date(timestamp);
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return `Blog creado el ${fecha.toLocaleDateString('es-ES', opciones)}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs</h2>}
        >
            <div className="relative min-h-screen flex flex-col items-center bg-gray-700 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {/* Mostrar formulario si el usuario es entrenador */}
                    {isEntrenador ? (
                        <>
                            <div className="text-center mb-6">
                                <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                                    <span className="relative inline-block">
                                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-400"></span>
                                        <span className="relative">Crear un nuevo Blog</span>
                                    </span>
                                </h1>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                        </>
                    ) : (
                        // Mensaje si no es entrenador
                        <div className="bg-custom animate-fade-in">
                            <h2 className="text-2xl font-semibold mb-2">Aquí tienes los Blogs creados por los entrenadores de nuestra empresa TheGymMondelo</h2>
                            <p>Entérate de todo con ellos y sigue aprendiendo e informándote.</p>
                        </div>
                    )}
                </div>

                {/* Listado de Blogs */}
                <div className="w-full max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 relative">
                        <span className="relative inline-block">
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-400"></span>
                            <span className="relative">Blogs Recientes</span>
                        </span>
                    </h2>
                    <div className="space-y-4">
                        {blogs.data.map((blog) => (
                            <div
                                key={blog.id}
                                className="bg-[#d9f99d] p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <div className="text-gray-700 font-semibold">
                                        <span className="font-bold">Autor del Blog:</span> {blog.autor.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {formatFechaBlog(blog.created_at)}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800"><span className="font-bold">Título:</span> {blog.titulo}</h3>
                                <p className="text-gray-700 mt-2"><span className="font-bold">Contenido:</span> {blog.contenido}</p>
                            </div>
                        ))}
                    </div>

                    {/* Paginación */}
                    <Pagination links={blogs.links} />
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

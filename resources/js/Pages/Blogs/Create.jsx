import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Components/Footer';
import FormBlog from '@/Components/Blogs/FormBlog';
import ListaBlog from '@/Components/Blogs/ListaBlog';
import Pagination from '@/Components/Pagination';
import '../../../css/create-blog.css';

export default function CreateBlog({ auth, isEntrenador, blogs }) {
    const [editingBlogId, setEditingBlogId] = useState(null);

    // Maneja la edición
    const handleEdit = (blog) => {
        setEditingBlogId(blog.id);
    };

    const handleCancelEdit = () => {
        setEditingBlogId(null);
    };

    // Formatea la fecha
    const formatFechaBlog = (timestamp) => {
        const fecha = new Date(timestamp);
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return `Creado el ${fecha.toLocaleDateString('es-ES', opciones)}`;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs TheGymMondelo :</h2>}
        >
            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    {/* Formulario de creación de blogs (solo visible para entrenadores) */}
                    {isEntrenador ? (
                        <FormBlog />
                    ) : (
                        <div className="text-center bg-red-100 text-red-600 font-bold p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold">No eres entrenador 😕</h2>
                            <p className="text-gray-600 text-base mt-2">
                                Lo sentimos, solo los entrenadores pueden crear blogs. Pero puedes explorar los blogs de nuestros profesionales
                                para obtener inspiración y consejos útiles, ánimo, el cambio es HOY.
                            </p>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 relative">
                        <span className="relative inline-block">
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-400"></span>
                            <span className="relative">Blogs Recientes</span>
                        </span>
                    </h2>

                    {/* Lista de blogs */}
                    <ListaBlog
                        blogs={blogs.data}
                        isEntrenador={isEntrenador}
                        auth={auth}
                        editingBlogId={editingBlogId}
                        handleEdit={handleEdit}
                        handleCancelEdit={handleCancelEdit}
                        formatFechaBlog={formatFechaBlog}
                    />

                    {/* Componente de paginación */}
                    <Pagination class="mt-6" links={blogs.links} />
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

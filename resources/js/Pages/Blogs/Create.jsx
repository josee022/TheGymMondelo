import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import FormBlog from "@/Components/Blogs/FormBlog";
import ListaBlog from "@/Components/Blogs/ListaBlog";
import Pagination from "@/Components/Pagination";
import "../../../css/create-blog.css";
import { router } from "@inertiajs/react";

export default function CreateBlog({ auth, isEntrenador, blogs, search }) {
    // Estado para manejar el término de búsqueda inicial
    const [searchTerm, setSearchTerm] = useState(search || ""); // Inicializa con el valor `search` o vacío si no existe

    // Manejar el cambio del campo de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Actualiza el estado del término de búsqueda con el valor ingresado
        router.get(
            route("blogs.create"), // Ruta para realizar la búsqueda en blogs
            { search: e.target.value }, // Parámetro de búsqueda enviado al backend
            {
                preserveState: true, // Mantiene el estado actual (por ejemplo, paginación)
                preserveScroll: true, // Evita que el scroll se reinicie
            }
        );
    };

    // Estado para manejar el blog en edición
    const [editingBlogId, setEditingBlogId] = useState(null); // Almacena el ID del blog que se está editando o `null`

    // Manejar la edición de un blog
    const handleEdit = (blog) => {
        setEditingBlogId(blog.id); // Establece el ID del blog en edición
    };

    // Cancelar la edición
    const handleCancelEdit = () => {
        setEditingBlogId(null); // Restablece el estado, saliendo del modo de edición
    };

    // Formatear la fecha del blog
    const formatFechaBlog = (timestamp) => {
        const fecha = new Date(timestamp); // Convierte el timestamp en un objeto Date
        const opciones = {
            year: "numeric", // Año completo (ejemplo: 2024)
            month: "long", // Nombre completo del mes (ejemplo: diciembre)
            day: "numeric", // Día del mes
            hour: "2-digit", // Hora con dos dígitos
            minute: "2-digit", // Minutos con dos dígitos
        };
        return `Creado el ${fecha.toLocaleDateString("es-ES", opciones)}`; // Devuelve la fecha formateada en español
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-3xl text-center text-lime-600 mt-4">
                    Blogs TheGymMondelo 📝
                </h2>
            }
        >
            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-green-800 to-lime-600 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    {/* Formulario de creación de blogs (solo visible para entrenadores) */}
                    {isEntrenador ? (
                        <FormBlog />
                    ) : (
                        <div className="text-center bg-red-100 text-red-600 font-bold p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold">
                                No eres entrenador 😕
                            </h2>
                            <p className="text-gray-600 text-base mt-2">
                                Lo sentimos, solo los entrenadores pueden crear
                                blogs. Pero puedes explorar los blogs de
                                nuestros profesionales para obtener inspiración
                                y consejos útiles. ¡El cambio es HOY!
                            </p>
                        </div>
                    )}
                </div>

                <div className="w-full max-w-4xl mx-auto mt-4 bg-white shadow-md rounded-lg p-6">
                    {/* Campo de búsqueda */}
                    <div className="mb-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Buscar blogs por título..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-lime-500"
                        />
                    </div>

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

import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ProductoEditar({ producto }) {
    const [formData, setFormData] = useState({
        nombre: producto.nombre || "", // El nombre del producto, con valor predeterminado si existe
        descripcion: producto.descripcion || "", // Descripción del producto
        precio: producto.precio || "", // Precio del producto
        stock: producto.stock || "", // Cantidad de stock disponible
        imagen: null, // Imagen del producto, inicialmente en null
    });

    const [preview, setPreview] = useState(
        producto.imagen ? `/images/${producto.imagen}` : null // Vista previa de la imagen si ya existe
    );

    const [errors, setErrors] = useState({}); // Estado para manejar los errores de validación

    // Maneja los cambios en los campos del formulario (nombre, descripción, precio, etc.)
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre y el valor del campo
        setFormData({ ...formData, [name]: value }); // Actualiza el estado de formData con el nuevo valor
    };

    // Maneja el cambio en el campo de imagen (archivo)
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            // Verifica que el archivo sea una imagen válida
            if (!file.type.startsWith("image/")) {
                setErrors({
                    ...errors,
                    imagen: "El archivo debe ser una imagen válida.", // Mensaje de error si no es una imagen
                });
                return; // Detiene la ejecución si no es una imagen válida
            }

            // Si el archivo es una imagen válida, actualiza el estado de la imagen
            setFormData({ ...formData, imagen: file });
            setPreview(URL.createObjectURL(file)); // Muestra una vista previa de la imagen
            setErrors({ ...errors, imagen: null }); // Limpia cualquier error previo relacionado con la imagen
        }
    };

    const validateForm = () => {
        const { nombre, descripcion, precio, stock } = formData; // Extraemos los datos del formulario
        const newErrors = {}; // Creamos un objeto para almacenar los errores

        // Validación del nombre
        if (!nombre.trim()) {
            newErrors.nombre = "El nombre del producto es obligatorio."; // Error si el nombre está vacío
        } else if (nombre.length < 3) {
            newErrors.nombre = "El nombre debe tener al menos 3 caracteres."; // Error si el nombre tiene menos de 3 caracteres
        }

        // Validación de la descripción
        if (!descripcion.trim()) {
            newErrors.descripcion =
                "La descripción del producto es obligatoria."; // Error si la descripción está vacía
        } else if (descripcion.length < 10) {
            newErrors.descripcion =
                "La descripción debe tener al menos 10 caracteres."; // Error si la descripción tiene menos de 10 caracteres
        }

        // Validación del precio
        if (!precio || isNaN(precio) || precio < 0) {
            newErrors.precio =
                "El precio debe ser un número mayor o igual a 0."; // Error si el precio no es válido
        }

        // Validación del stock
        if (!stock || isNaN(stock) || stock < 0) {
            newErrors.stock =
                "El stock debe ser un número entero mayor o igual a 0."; // Error si el stock no es un número válido o menor que 0
        }

        // Establecemos los errores en el estado
        setErrors(newErrors);

        // Si no hay errores, la función retorna true, lo que indica que el formulario es válido
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la acción predeterminada del formulario (recarga de página)

        if (!validateForm()) return; // Si la validación del formulario falla, no continúa

        // Crear un nuevo objeto FormData para enviar datos al servidor
        const form = new FormData();
        form.append("nombre", formData.nombre); // Nombre del producto
        form.append("descripcion", formData.descripcion); // Descripción del producto
        form.append("precio", formData.precio); // Precio del producto
        form.append("stock", formData.stock); // Stock del producto

        // Si hay una imagen seleccionada, la agregamos al FormData
        if (formData.imagen) {
            form.append("imagen", formData.imagen);
        }

        // Incluimos el método PUT explícitamente para indicar que estamos actualizando
        form.append("_method", "PUT");

        try {
            // Realizamos la solicitud al servidor para actualizar el producto
            const response = await fetch(
                route("admin.productos.update", producto.id), // URL para actualizar el producto
                {
                    method: "POST", // Usamos el método POST con un formulario
                    body: form, // Enviamos los datos del formulario como el cuerpo de la solicitud
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"), // Token CSRF para proteger la solicitud
                    },
                }
            );

            // Si la respuesta no es exitosa, lanzamos un error
            if (!response.ok) {
                throw new Error("Error al actualizar el producto.");
            }

            // Si la actualización es exitosa, mostramos un mensaje de éxito
            Swal.fire({
                title: "Producto Actualizado", // Título del mensaje
                text: "El producto ha sido actualizado exitosamente.", // Texto del mensaje
                icon: "success", // Icono de éxito
                confirmButtonText: "Aceptar", // Texto del botón de confirmación
            }).then(() => {
                router.visit(route("admin.productos")); // Redirige a la lista de productos
            });
        } catch (error) {
            // Si ocurre un error, mostramos un mensaje de error
            console.error(error); // Muestra el error en la consola
            Swal.fire({
                title: "Error", // Título del mensaje de error
                text: "Hubo un problema al actualizar el producto. Por favor, inténtalo de nuevo.", // Texto del mensaje
                icon: "error", // Icono de error
                confirmButtonText: "Aceptar", // Texto del botón de confirmación
            });
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Editar Producto
                        </span>
                    </span>
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
                encType="multipart/form-data"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Foto
                    </label>
                    <div className="mb-4">
                        {preview && (
                            <img
                                src={preview}
                                alt="Vista previa"
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                        )}
                    </div>
                    <input
                        type="file"
                        name="imagen"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.imagen && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.imagen}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                    {errors.nombre && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.nombre}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    {errors.descripcion && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.descripcion}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Precio (€)
                    </label>
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                    {errors.precio && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.precio}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                    {errors.stock && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.stock}
                        </p>
                    )}
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Guardar Cambios
                    </button>
                    <button
                        type="button"
                        onClick={() => history.back()}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

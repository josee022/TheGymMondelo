import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ProductoCrear() {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: null,
    });

    const [errors, setErrors] = useState({}); // Estado para los errores de validación

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Actualiza el estado del formulario
    };

    // Maneja los cambios en el campo de imagen (archivo)
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            // Verifica que el archivo sea una imagen válida
            if (!file.type.startsWith("image/")) {
                setErrors({
                    ...errors,
                    imagen: "El archivo debe ser una imagen válida.", // Establece un mensaje de error si no es una imagen
                });
                return; // Detiene la ejecución si no es una imagen válida
            }

            // Si es una imagen válida, actualiza el estado de la imagen y limpia el error
            setFormData({ ...formData, imagen: file });
            setErrors({ ...errors, imagen: null }); // Limpia el error de la imagen
        }
    };

    const validateForm = () => {
        // Extraemos los campos de formulario
        const { nombre, descripcion, precio, stock } = formData;

        // Creamos un objeto para almacenar los errores
        const newErrors = {};

        // Validación del campo nombre
        if (!nombre.trim()) {
            newErrors.nombre = "El nombre del producto es obligatorio."; // Si el nombre está vacío
        } else if (nombre.length < 3) {
            newErrors.nombre = "El nombre debe tener al menos 3 caracteres."; // Si el nombre tiene menos de 3 caracteres
        }

        // Validación del campo descripción
        if (!descripcion.trim()) {
            newErrors.descripcion =
                "La descripción del producto es obligatoria."; // Si la descripción está vacía
        } else if (descripcion.length < 10) {
            newErrors.descripcion =
                "La descripción debe tener al menos 10 caracteres."; // Si la descripción tiene menos de 10 caracteres
        }

        // Validación del campo precio
        if (!precio || isNaN(precio) || precio < 0) {
            newErrors.precio =
                "El precio debe ser un número mayor o igual a 0."; // Si el precio no es válido
        }

        // Validación del campo stock
        if (!stock || isNaN(stock) || stock < 0) {
            newErrors.stock =
                "El stock debe ser un número entero mayor o igual a 0."; // Si el stock no es un número válido o es menor que 0
        }

        // Establece los errores en el estado
        setErrors(newErrors);

        // Si no hay errores, retorna `true`, de lo contrario, `false`
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recarga de la página)

        if (!validateForm()) return; // Si la validación falla, no continúa con el envío

        const form = new FormData(); // Crea un nuevo objeto FormData para manejar archivos y datos del formulario
        form.append("nombre", formData.nombre); // Agrega el nombre del producto al formulario
        form.append("descripcion", formData.descripcion); // Agrega la descripción del producto al formulario
        form.append("precio", formData.precio); // Agrega el precio del producto al formulario
        form.append("stock", formData.stock); // Agrega el stock del producto al formulario

        // Si hay una imagen seleccionada, la agrega al formulario
        if (formData.imagen) {
            form.append("imagen", formData.imagen);
        }

        try {
            // Enviar los datos al servidor utilizando fetch
            const response = await fetch(route("admin.productos.store"), {
                method: "POST", // Método HTTP POST para crear un nuevo producto
                body: form, // El cuerpo de la solicitud contiene los datos del formulario
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute("content"), // Obtiene y agrega el token CSRF para protección
                },
            });

            // Si la respuesta no es exitosa, muestra los errores y lanza una excepción
            if (!response.ok) {
                const data = await response.json(); // Convierte la respuesta en JSON
                setErrors(data.errors || {}); // Establece los errores en el estado
                throw new Error("Error al guardar el producto.");
            }

            // Si el producto se guarda correctamente, muestra un mensaje de éxito
            Swal.fire({
                title: "Producto Creado", // Título del mensaje de éxito
                text: "El producto ha sido creado exitosamente.", // Texto del mensaje
                icon: "success", // Icono de éxito
                confirmButtonText: "Aceptar", // Texto del botón de confirmación
            }).then(() => {
                router.visit(route("admin.productos")); // Redirige a la lista de productos
            });
        } catch (error) {
            console.error(error); // Si ocurre un error, lo muestra en la consola

            // Muestra un mensaje de error con SweetAlert
            Swal.fire({
                title: "Error", // Título del mensaje de error
                text: "Hubo un problema al crear el producto. Por favor, inténtalo de nuevo.", // Texto del mensaje
                icon: "error", // Icono de error
                confirmButtonText: "Aceptar", // Texto del botón de confirmación
            });
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide text-center">
                    Crear Nuevo Producto
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
                        Crear Producto
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

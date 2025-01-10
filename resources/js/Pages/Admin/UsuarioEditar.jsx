import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function UsuarioEditar({ usuario }) {
    // Estado inicial del formulario, basado en los datos del usuario recibido
    const [formData, setFormData] = useState({
        name: usuario.name || "", // Nombre del usuario, vacío si no está disponible
        email: usuario.email || "", // Email del usuario
        rol: usuario.rol || "cliente", // Rol del usuario (por defecto, "cliente")
        biografia: usuario.biografia || "", // Biografía del usuario
        fecha_nacimiento: usuario.fecha_nacimiento || "", // Fecha de nacimiento
        sexo: usuario.sexo || "Otro", // Sexo del usuario (por defecto, "Otro")
        altura: usuario.altura || "", // Altura en cm
        peso: usuario.peso || "", // Peso en kg
        nivel_actividad: usuario.nivel_actividad || "Sedentario", // Nivel de actividad (por defecto, "Sedentario")
        puntos: usuario.puntos || 0, // Puntos del usuario (por defecto, 0)
        password: "", // Contraseña (vacía por seguridad)
        password_confirmation: "", // Confirmación de contraseña
        foto_perfil: null, // Foto de perfil (inicialmente nula)
    });

    // Estado para la vista previa de la foto de perfil seleccionada
    const [preview, setPreview] = useState(
        usuario.foto_perfil ? `/fotos_perfil/${usuario.foto_perfil}` : null // URL de la foto de perfil existente, o nulo si no hay foto
    );

    // Maneja los cambios en los campos del formulario (texto, select, etc.)
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre y valor del campo que cambió
        setFormData({ ...formData, [name]: value }); // Actualiza el estado con el nuevo valor
    };

    // Maneja la selección de una nueva foto de perfil
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
            setPreview(URL.createObjectURL(file)); // Genera una URL temporal para la vista previa
            setFormData({ ...formData, foto_perfil: file }); // Actualiza el estado con el archivo de la imagen
        }
    };

    // Función para validar los campos del formulario
    const validateFields = () => {
        // Validar que el nombre no esté vacío
        if (!formData.name.trim()) {
            Swal.fire("Error", "El nombre es obligatorio.", "error"); // Muestra una alerta de error
            return false; // Detiene el proceso de validación
        }

        // Validar que el email no esté vacío y tenga un formato válido
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            Swal.fire("Error", "El email no es válido.", "error");
            return false;
        }

        // Validar que la contraseña, si se proporciona, tenga al menos 6 caracteres
        if (formData.password && formData.password.length < 6) {
            Swal.fire(
                "Error",
                "La contraseña debe tener al menos 6 caracteres.",
                "error"
            );
            return false;
        }

        // Validar que las contraseñas coincidan, si se proporciona una
        if (
            formData.password &&
            formData.password !== formData.password_confirmation
        ) {
            Swal.fire("Error", "Las contraseñas no coinciden.", "error");
            return false;
        }

        // Validar que la altura esté dentro del rango permitido (1 a 250 cm)
        if (
            formData.altura &&
            (formData.altura <= 0 || formData.altura > 250)
        ) {
            Swal.fire(
                "Error",
                "La altura debe estar entre 1 y 250 cm.",
                "error"
            );
            return false;
        }

        // Validar que el peso esté dentro del rango permitido (1 a 300 kg)
        if (formData.peso && (formData.peso <= 0 || formData.peso > 300)) {
            Swal.fire("Error", "El peso debe estar entre 1 y 300 kg.", "error");
            return false;
        }

        // Si todas las validaciones pasan, retorna true
        return true;
    };

    // Maneja el envío del formulario para actualizar un usuario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Valida los campos del formulario antes de enviarlo
        if (!validateFields()) return; // Si la validación falla, detiene la ejecución

        // Crea un objeto FormData para enviar los datos del formulario
        const form = new FormData();
        form.append("name", formData.name); // Nombre del usuario
        form.append("email", formData.email); // Email del usuario
        form.append("rol", formData.rol); // Rol del usuario
        form.append("biografia", formData.biografia); // Biografía del usuario
        form.append("fecha_nacimiento", formData.fecha_nacimiento); // Fecha de nacimiento
        form.append("sexo", formData.sexo); // Sexo del usuario
        form.append("altura", formData.altura); // Altura en cm
        form.append("peso", formData.peso); // Peso en kg
        form.append("nivel_actividad", formData.nivel_actividad); // Nivel de actividad
        form.append("puntos", formData.puntos); // Puntos acumulados del usuario

        // Si se proporciona una contraseña, inclúyela junto con su confirmación
        if (formData.password) {
            form.append("password", formData.password);
            form.append(
                "password_confirmation",
                formData.password_confirmation
            );
        }

        // Si se selecciona una nueva foto de perfil, agrégala al formulario
        if (formData.foto_perfil) {
            form.append("foto_perfil", formData.foto_perfil);
        }

        // Agrega el método HTTP `PUT` para realizar una actualización
        form.append("_method", "PUT");

        try {
            // Realiza una solicitud POST al servidor para actualizar el usuario
            const response = await fetch(
                route("admin.usuarios.update", usuario.id), // Ruta de actualización con el ID del usuario
                {
                    method: "POST", // Enviar como POST
                    body: form, // Cuerpo de la solicitud con los datos del formulario
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"), // Token CSRF para seguridad
                    },
                }
            );

            // Si la respuesta no es exitosa, lanza un error
            if (!response.ok) {
                throw new Error("Error al actualizar el usuario.");
            }

            // Muestra un mensaje de éxito y redirige a la lista de usuarios
            Swal.fire({
                title: "Usuario Actualizado",
                text: "El usuario ha sido actualizado exitosamente.",
                icon: "success",
                confirmButtonText: "Aceptar",
            }).then(() => {
                router.visit(route("admin.usuarios")); // Redirige al listado de usuarios
            });
        } catch (error) {
            // Muestra un mensaje de error si algo sale mal
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al actualizar el usuario. Por favor, inténtalo de nuevo.",
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-4 mb-4">
                <h1 className="text-2xl font-extrabold text-gray-800 text-center">
                    Editar Usuario
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto grid grid-cols-2 gap-4"
                encType="multipart/form-data"
            >
                {/* Foto de Perfil */}
                <div className="col-span-2 flex flex-col items-center">
                    <label className="text-gray-700 font-semibold mb-2">
                        Foto de Perfil
                    </label>
                    <input
                        type="file"
                        name="foto_perfil"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="border border-gray-300 rounded px-3 py-2"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Vista previa"
                            className="mt-4 w-32 h-32 rounded-full object-cover"
                        />
                    )}
                </div>

                {/* Campos Básicos */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Información Adicional */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Fecha de Nacimiento
                    </label>
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Sexo
                    </label>
                    <select
                        name="sexo"
                        value={formData.sexo}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Altura (cm)
                    </label>
                    <input
                        type="number"
                        name="altura"
                        value={formData.altura}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        step="0.01"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Peso (kg)
                    </label>
                    <input
                        type="number"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        step="0.01"
                    />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Biografía
                    </label>
                    <textarea
                        name="biografia"
                        value={formData.biografia}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Escribe algo sobre ti"
                    />
                </div>

                {/* Contraseña */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Dejar en blanco si no deseas cambiarla"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Confirmar Contraseña
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                        placeholder="Dejar en blanco si no deseas cambiarla"
                    />
                </div>

                {/* Botones */}
                <div className="col-span-2 flex justify-between mt-4">
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

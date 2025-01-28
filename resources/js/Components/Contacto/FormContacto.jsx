import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function FormularioContacto() {
    // Estado inicial para manejar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: "", // Nombre del remitente
        email: "", // Correo electrónico
        asunto: "", // Asunto del mensaje
        telefono: "", // Número de teléfono
        mensaje: "", // Contenido del mensaje
    });

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData, // Copia el estado actual
            [e.target.name]: e.target.value, // Actualiza el campo correspondiente usando el atributo `name`
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (evita recargar la página)

        // Expresiones regulares para validar el email y el número de teléfono
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato de correo electrónico
        const telefonoRegex = /^\d{9}$/; // Exactamente 9 dígitos para el número de teléfono

        // Validaciones de campos
        if (!formData.nombre) {
            return toast.error("El campo 'Nombre' es obligatorio."); // Valida que el nombre no esté vacío
        }

        if (!emailRegex.test(formData.email)) {
            return toast.error(
                "Por favor, introduce un email válido (ej: jose@jose.com)."
            ); // Valida el formato del email
        }

        if (!formData.asunto) {
            return toast.error("El campo 'Asunto' es obligatorio."); // Valida que el asunto no esté vacío
        }

        if (formData.mensaje.length > 200) {
            return toast.error(
                "El mensaje no puede exceder los 200 caracteres."
            ); // Valida la longitud del mensaje
        }

        if (!telefonoRegex.test(formData.telefono)) {
            return toast.error(
                "El número de teléfono debe contener exactamente 9 dígitos."
            ); // Valida el formato del teléfono
        }

        try {
            // Envía los datos del formulario a la API mediante una solicitud POST
            await axios.post("/api/contacto", formData);

            // Muestra un mensaje de éxito al usuario
            toast.success(
                "Mensaje enviado con éxito. ¡Gracias por contactarnos!"
            );

            // Resetea el formulario después de un envío exitoso
            setFormData({
                nombre: "",
                email: "",
                asunto: "",
                telefono: "",
                mensaje: "",
            });
        } catch (error) {
            // Muestra un mensaje de error si ocurre un problema en la solicitud
            toast.error(
                "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo."
            );
        }
    };

    return (
        <div className="bg-gray-800 p-10 rounded-lg shadow-xl">
            <h2 className="text-3xl font-semibold mb-6 text-center text-lime-500">
                Formulario de Contacto
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-white">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Tu Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full rounded-lg bg-gray-700 text-white shadow-sm focus:ring-lime-500 focus:border-lime-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Tu Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full rounded-lg bg-gray-700 text-white shadow-sm focus:ring-lime-500 focus:border-lime-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white">
                        Asunto
                    </label>
                    <input
                        type="text"
                        name="asunto"
                        placeholder="Asunto del mensaje"
                        value={formData.asunto}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full rounded-lg bg-gray-700 text-white shadow-sm focus:ring-lime-500 focus:border-lime-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white">
                        Teléfono
                    </label>
                    <input
                        type="text"
                        name="telefono"
                        placeholder="Número de Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full rounded-lg bg-gray-700 text-white shadow-sm focus:ring-lime-500 focus:border-lime-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-white">
                        Mensaje
                    </label>
                    <textarea
                        name="mensaje"
                        placeholder="Tu Mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full rounded-lg bg-gray-700 text-white shadow-sm focus:ring-lime-500 focus:border-lime-500"
                        rows="5"
                        maxLength="200" // Limita a 200 caracteres
                        required
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full bg-lime-500 text-black py-3 px-6 rounded-lg text-lg font-bold hover:bg-lime-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-400"
                    >
                        Enviar Mensaje
                    </button>
                </div>
            </form>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

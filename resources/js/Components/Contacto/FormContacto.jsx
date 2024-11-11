import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function FormularioContacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        telefono: "",
        mensaje: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Para verificar el formato del email
        const telefonoRegex = /^\d{9}$/; // Para verificar 9 dígitos exactos en el número de teléfono

        if (!formData.nombre) {
            return toast.error("El campo 'Nombre' es obligatorio.");
        }

        if (!emailRegex.test(formData.email)) {
            return toast.error(
                "Por favor, introduce un email válido (ej: jose@jose.com)."
            );
        }

        if (!formData.asunto) {
            return toast.error("El campo 'Asunto' es obligatorio.");
        }

        if (formData.mensaje.length > 200) {
            return toast.error(
                "El mensaje no puede exceder los 200 caracteres."
            );
        }

        if (!telefonoRegex.test(formData.telefono)) {
            return toast.error(
                "El número de teléfono debe contener exactamente 9 dígitos."
            );
        }

        try {
            await axios.post("/api/contacto", formData); // Enviar los datos a la API

            toast.success(
                "Mensaje enviado con éxito. ¡Gracias por contactarnos!"
            );
            setFormData({
                nombre: "",
                email: "",
                asunto: "",
                telefono: "",
                mensaje: "",
            });
        } catch (error) {
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

            {/* Contenedor de Toast */}
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

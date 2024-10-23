import React, { useState } from "react";
import { toast } from "react-toastify";

export default function FormularioContacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
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
        try {
            toast.success(
                "Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto."
            );
        } catch (error) {
            toast.error(
                "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo más tarde."
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
                        Mensaje
                    </label>
                    <textarea
                        name="mensaje"
                        placeholder="Tu Mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        className="mt-1 p-3 block w-full rounded-lg bg-gray-700 text-white shadow-sm focus:ring-lime-500 focus:border-lime-500"
                        rows="5"
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
        </div>
    );
}

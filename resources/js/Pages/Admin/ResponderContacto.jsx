import React, { useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ResponderContacto({ contacto }) {
    const { flash } = usePage().props; // Captura los mensajes flash, que pueden ser de éxito o error.
    const { data, setData, post, processing, reset } = useForm({
        respuesta: "", // Estado del formulario, en este caso solo se tiene el campo "respuesta".
    });

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe de la manera tradicional y recargue la página
        post(route("admin.respuestas.store", contacto.id), {
            onSuccess: () => {
                reset("respuesta"); // Resetea el campo de respuesta después de enviar correctamente.
            },
        });
    };

    const handleBack = () => {
        window.history.back(); // Regresa a la página anterior en el historial del navegador
    };

    // Mostrar SweetAlert si hay un mensaje de éxito
    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                icon: "success", // Icono de éxito
                title: "Respuesta enviada", // Título del mensaje
                text: flash.success, // Texto del mensaje de éxito
                confirmButtonColor: "#3085d6", // Color del botón de confirmación
            }).then(() => {
                window.location.href = route("admin.contactos.index"); // Redirige después de cerrar el SweetAlert
            });
        }
    }, [flash.success]); // Solo se ejecuta cuando flash.success cambia

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                <h2 className="text-4xl font-bold mb-10 text-center text-green-600">
                    Responder a Mensaje de Contacto
                </h2>

                {/* Contenedor del mensaje original */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-6 rounded-lg mb-8 shadow-md border-l-4 border-lime-400">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Detalles del Contacto
                    </h3>
                    <p className="text-lg text-gray-700 mb-2">
                        <strong className="text-gray-800">Nombre:</strong>{" "}
                        {contacto.nombre}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        <strong className="text-gray-800">Email:</strong>{" "}
                        {contacto.email}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        <strong className="text-gray-800">Asunto:</strong>{" "}
                        {contacto.asunto || "Sin asunto"}
                    </p>
                    <div className="text-lg text-gray-700 mt-4 whitespace-pre-wrap break-words leading-relaxed max-w-full">
                        <strong className="text-gray-800">Mensaje:</strong>
                        <p className="mt-2 p-4 bg-white rounded-lg border border-gray-300 shadow-inner max-h-40 overflow-y-auto">
                            {contacto.mensaje}
                        </p>
                    </div>
                </div>

                {/* Formulario de respuesta */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xl font-semibold text-gray-700 mb-2">
                            Respuesta
                        </label>
                        <textarea
                            name="respuesta"
                            value={data.respuesta}
                            onChange={(e) =>
                                setData("respuesta", e.target.value)
                            }
                            rows="5"
                            className="w-full border-2 border-lime-400 rounded-lg p-4 text-gray-700 shadow-sm focus:ring-2 focus:ring-lime-500 focus:outline-none resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Contenedor de botones */}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-6 rounded-lg text-lg font-bold hover:opacity-90 transition duration-200"
                        >
                            Volver Atrás
                        </button>

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-lime-500 to-green-600 text-white py-3 px-6 rounded-lg text-lg font-bold hover:bg-lime-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-lime-400"
                            disabled={processing}
                        >
                            Enviar Respuesta
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

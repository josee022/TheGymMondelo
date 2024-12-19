import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function VerRespuesta({ contacto, respuesta }) {
    // Regreso a la página anterior
    const handleBack = () => {
        window.history.back();
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1">
                <h2 className="text-4xl font-bold mb-10 text-center text-green-600">
                    Ver Respuesta del Contacto
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

                {/* Contenedor de la respuesta */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 p-6 rounded-lg mb-8 shadow-md border-l-4 border-green-500">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Respuesta Enviada
                    </h3>
                    <div className="text-lg text-gray-700 mt-4 whitespace-pre-wrap break-words leading-relaxed max-w-full">
                        <p className="mt-2 p-4 bg-white rounded-lg border border-gray-300 shadow-inner max-h-40 overflow-y-auto">
                            {respuesta.respuesta ||
                                "No hay respuesta registrada"}
                        </p>
                    </div>
                </div>

                {/* Botón para volver atrás */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-6 rounded-lg text-lg font-bold hover:opacity-90 transition duration-200"
                    >
                        Volver Atrás
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}

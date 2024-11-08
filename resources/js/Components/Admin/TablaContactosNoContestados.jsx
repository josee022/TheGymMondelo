import React from "react";

export default function TablaContactosNoContestados({ contactos }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg mb-10">
            <h2 className="text-2xl font-semibold text-center text-lime-500 mb-4">
                Mensajes No Contestados
            </h2>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-lime-400 to-green-500 text-white">
                    <tr>
                        <th className="px-6 py-3 font-semibold text-left">
                            Email
                        </th>
                        <th className="px-6 py-3 font-semibold text-left">
                            Asunto
                        </th>
                        <th className="px-6 py-3 font-semibold text-center">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contactos.data.length > 0 ? (
                        contactos.data.map((contacto) => (
                            <tr
                                key={contacto.id}
                                className="hover:bg-gray-100 transition-colors"
                            >
                                <td className="px-4 py-3 border-b text-gray-600 text-left">
                                    {contacto.email}
                                </td>
                                <td className="px-4 py-3 border-b text-gray-800 text-left">
                                    {contacto.asunto || "N/A"}
                                </td>
                                <td className="px-4 py-3 border-b text-center">
                                    <a
                                        href={`/admin/contactos/${contacto.id}/responder`}
                                        className="text-blue-500 hover:text-blue-700 font-semibold"
                                    >
                                        Responder
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                className="text-center px-4 py-6 text-gray-600"
                            >
                                No hay contactos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

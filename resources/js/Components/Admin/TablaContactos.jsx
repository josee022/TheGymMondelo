// resources/js/Components/Contactos/TablaContactos.jsx

import React from "react";
import FilaContacto from "./FilaContacto";

export default function TablaContactos({ contactos }) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-lime-400 to-green-500 text-white">
                    <tr>
                        <th className="px-6 py-3 font-semibold text-center">
                            ID
                        </th>
                        <th className="px-6 py-3 font-semibold">Nombre</th>
                        <th className="px-6 py-3 font-semibold">Email</th>
                        <th className="px-6 py-3 font-semibold">Asunto</th>
                        <th className="px-6 py-3 font-semibold">Teléfono</th>
                        <th className="px-6 py-3 font-semibold">Mensaje</th>
                        <th className="px-6 py-3 font-semibold text-center">
                            Fecha
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {contactos.data.length > 0 ? (
                        contactos.data.map((contacto) => (
                            <FilaContacto
                                key={contacto.id}
                                contacto={contacto}
                            />
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="7"
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

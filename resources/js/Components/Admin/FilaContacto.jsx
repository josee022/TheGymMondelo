// resources/js/Components/Contactos/FilaContacto.jsx

import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa"; // Añadimos iconos para email y teléfono

export default function FilaContacto({ contacto }) {
    return (
        <tr className="bg-white hover:bg-gray-100 transition-colors shadow-sm rounded-lg">
            <td className="px-4 py-4 border-b text-center text-gray-700 font-semibold">
                #{contacto.id}
            </td>
            <td className="px-4 py-4 border-b font-medium text-gray-800">
                {contacto.nombre}
            </td>
            <td className="px-4 py-4 border-b flex items-center text-gray-600 space-x-2">
                <FaEnvelope className="text-blue-500" />
                <span>{contacto.email}</span>
            </td>
            <td className="px-4 py-4 border-b text-gray-800">
                {contacto.asunto || "N/A"}
            </td>
            <td className="px-4 py-4 border-b flex items-center text-gray-600 space-x-2">
                <FaPhone className="text-green-500" />
                <span>{contacto.telefono || "N/A"}</span>
            </td>
            <td className="px-4 py-4 border-b text-gray-600">
                {contacto.mensaje.length > 50
                    ? `${contacto.mensaje.substring(0, 50)}...`
                    : contacto.mensaje}
            </td>
            <td className="px-4 py-4 border-b text-center text-gray-500">
                {new Date(contacto.created_at).toLocaleDateString()}
            </td>
        </tr>
    );
}

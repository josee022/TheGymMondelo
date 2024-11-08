// resources/js/Pages/Admin/ContactosIndex.jsx

import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";
import TablaContactosNoContestados from "@/Components/Admin/TablaContactosNoContestados";
import TablaContactosContestados from "@/Components/Admin/TablaContactosContestados";

export default function ContactosIndex({
    contactosNoContestados,
    contactosContestados,
}) {
    return (
        <AdminLayout>
            <div className="max-w-7xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
                <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                        <span className="relative inline-block">
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                            <span className="relative text-shadow-lg">
                                Gestión De Mensajes De Contacto
                            </span>
                        </span>
                    </h1>
                </div>

                {/* Tabla de Mensajes No Contestados */}
                <TablaContactosNoContestados
                    contactos={contactosNoContestados}
                />
                {/* Paginación para No Contestados */}
                <div className="mt-6">
                    <Pagination links={contactosNoContestados.links} />
                </div>

                <br />
                <br />
                <br />

                {/* Tabla de Mensajes Contestados */}
                <TablaContactosContestados contactos={contactosContestados} />
                {/* Paginación para Contestados */}
                <div className="mt-6">
                    <Pagination links={contactosContestados.links} />
                </div>
            </div>
        </AdminLayout>
    );
}

import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";
import TablaContactosNoContestados from "@/Components/Admin/TablaContactosNoContestados";
import TablaContactosContestados from "@/Components/Admin/TablaContactosContestados";
import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ContactosIndex({
    contactosNoContestados,
    contactosContestados,
    emailsDistintos,
    searchAsunto,
    searchEmail,
}) {
    const { flash } = usePage().props;
    const [searchTermAsunto, setSearchTermAsunto] = useState(
        searchAsunto || ""
    );
    const [selectedEmail, setSelectedEmail] = useState(searchEmail || "");

    // Mostrar mensaje flash de éxito
    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: flash.success,
                confirmButtonColor: "#3085d6",
            });
        }
    }, [flash.success]);

    // Manejar búsqueda por asunto
    const handleSearchAsuntoChange = (e) => {
        setSearchTermAsunto(e.target.value);
        router.get(
            route("admin.contactos.index"),
            { search_asunto: e.target.value, search_email: selectedEmail },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    // Manejar selección de correo
    const handleEmailChange = (e) => {
        setSelectedEmail(e.target.value);
        router.get(
            route("admin.contactos.index"),
            { search_asunto: searchTermAsunto, search_email: e.target.value },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

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

                {/* Campo de búsqueda por asunto */}
                <input
                    type="text"
                    placeholder="Buscar por asunto..."
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    value={searchTermAsunto}
                    onChange={handleSearchAsuntoChange}
                />

                {/* Menú desplegable para seleccionar correos */}
                <select
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                    value={selectedEmail}
                    onChange={handleEmailChange}
                >
                    <option value="">Filtrar por correo...</option>
                    {emailsDistintos.map((emailObj, index) => (
                        <option key={index} value={emailObj.email}>
                            {emailObj.email}
                        </option>
                    ))}
                </select>

                {/* Tabla de Mensajes No Contestados */}
                {contactosNoContestados && contactosNoContestados.data && (
                    <>
                        <TablaContactosNoContestados
                            contactos={contactosNoContestados}
                        />
                        <div className="mt-6">
                            <Pagination
                                links={contactosNoContestados.links}
                                params={{
                                    search_asunto: searchTermAsunto,
                                    search_email: selectedEmail,
                                }}
                            />
                        </div>
                    </>
                )}
                <br />
                {/* Tabla de Mensajes Contestados */}
                {contactosContestados && contactosContestados.data && (
                    <>
                        <TablaContactosContestados
                            contactos={contactosContestados}
                        />
                        <div className="mt-6">
                            <Pagination
                                links={contactosContestados.links}
                                params={{
                                    search_asunto: searchTermAsunto,
                                    search_email: selectedEmail,
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}

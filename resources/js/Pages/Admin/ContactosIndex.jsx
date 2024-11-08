import React, { useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Pagination from "@/Components/Pagination";
import TablaContactosNoContestados from "@/Components/Admin/TablaContactosNoContestados";
import TablaContactosContestados from "@/Components/Admin/TablaContactosContestados";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function ContactosIndex({
    contactosNoContestados,
    contactosContestados,
}) {
    const { flash } = usePage().props; // Accede a los mensajes flash

    // Mostrar SweetAlert si hay un mensaje de éxito
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
                {contactosNoContestados && contactosNoContestados.data && (
                    <>
                        <TablaContactosNoContestados
                            contactos={contactosNoContestados}
                        />
                        <div className="mt-6">
                            <Pagination links={contactosNoContestados.links} />
                        </div>
                    </>
                )}

                <br />
                <br />
                <br />

                {/* Tabla de Mensajes Contestados */}
                {contactosContestados && contactosContestados.data && (
                    <>
                        <TablaContactosContestados
                            contactos={contactosContestados}
                        />
                        <div className="mt-6">
                            <Pagination links={contactosContestados.links} />
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InfoPerfil from "@/Components/Perfil/InfoPerfil";
import Reservas from "@/Components/Perfil/Reservas";
import SuscripcionesProgramas from "@/Components/Perfil/SuscripcionesProgramas";
import Dietas from "@/Components/Perfil/Dietas";
import Facturas from "@/Components/Perfil/Facturas";
import Footer from "@/Components/Footer";
import { getDietaInfo } from "@/Utils/dietaInfo";

export default function Dashboard({
    // Props recibidas por el componente
    auth, // Información del usuario autenticado
    isEntrenador, // Indica si el usuario es un entrenador
    reservas = { data: [] }, // Reservas realizadas, inicializado como un objeto vacío
    suscripciones = [], // Lista de suscripciones activas
    dieta, // Información sobre la dieta actual del usuario
    adquisiciones = [], // Lista de adquisiciones realizadas
    pedidos = { data: [] }, // Pedidos realizados, inicializado como un objeto vacío
}) {
    const user = auth.user; // Información del usuario autenticado

    // Si hay una dieta, se obtiene la información asociada al objetivo
    const dietaInfo = dieta ? getDietaInfo(dieta.objetivo) : null;

    // Obtiene las fechas de búsqueda iniciales de las reservas y facturas desde las props
    const { searchDateReservas, searchDateFacturas } = usePage().props;

    // Estados para manejar las fechas seleccionadas para filtrar reservas y facturas
    const [selectedDateReservas, setSelectedDateReservas] = useState(
        searchDateReservas || "" // Inicializa con la fecha de búsqueda o vacío
    );
    const [selectedDateFacturas, setSelectedDateFacturas] = useState(
        searchDateFacturas || "" // Inicializa con la fecha de búsqueda o vacío
    );

    // Maneja el cambio de la fecha seleccionada para reservas
    const handleDateChangeReservas = (e) => {
        setSelectedDateReservas(e.target.value); // Actualiza el estado con la fecha seleccionada
        router.get(
            route("dashboard"), // Realiza una solicitud GET a la ruta del dashboard
            { fecha_reservas: e.target.value }, // Envía la fecha seleccionada como parámetro
            {
                preserveState: true, // Mantiene el estado actual del dashboard
                preserveScroll: true, // Evita que el scroll regrese al inicio
            }
        );
    };

    // Maneja el cambio de la fecha seleccionada para facturas
    const handleDateChangeFacturas = (e) => {
        setSelectedDateFacturas(e.target.value); // Actualiza el estado con la fecha seleccionada
        router.get(
            route("dashboard"), // Realiza una solicitud GET a la ruta del dashboard
            { fecha_facturas: e.target.value }, // Envía la fecha seleccionada como parámetro
            {
                preserveState: true, // Mantiene el estado actual del dashboard
                preserveScroll: true, // Evita que el scroll regrese al inicio
            }
        );
    };

    // Reinicia el filtro de fecha para reservas
    const resetDateFilterReservas = () => {
        setSelectedDateReservas(""); // Limpia la fecha seleccionada
        router.get(
            route("dashboard"), // Realiza una solicitud GET para actualizar el dashboard
            { fecha_reservas: "" }, // Envía un valor vacío para eliminar el filtro
            {
                preserveState: true, // Mantiene el estado actual
                preserveScroll: true, // Evita que el scroll regrese al inicio
            }
        );
    };

    // Reinicia el filtro de fecha para facturas
    const resetDateFilterFacturas = () => {
        setSelectedDateFacturas(""); // Limpia la fecha seleccionada
        router.get(
            route("dashboard"), // Realiza una solicitud GET para actualizar el dashboard
            { fecha_facturas: "" }, // Envía un valor vacío para eliminar el filtro
            {
                preserveState: true, // Mantiene el estado actual
                preserveScroll: true, // Evita que el scroll regrese al inicio
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <header className="flex justify-center items-center mt-4">
                    <h2 className="font-semibold text-3xl text-center text-lime-600 mr-6">
                        Panel de Control del Usuario 🔒
                    </h2>
                    <div className="flex items-center space-x-2 bg-lime-200 text-lime-800 px-4 py-2 rounded-full shadow-lg">
                        <span className="font-medium">Puntos totales:</span>
                        <span className="font-bold text-2xl">
                            {user.puntos}
                        </span>
                    </div>
                </header>
            }
        >
            {/* Información del Perfil y Reservas */}
            <div className="flex flex-col lg:flex-row gap-0">
                <InfoPerfil user={user} isEntrenador={isEntrenador} />
                <Reservas
                    reservas={reservas}
                    selectedDateReservas={selectedDateReservas}
                    handleDateChange={handleDateChangeReservas}
                    resetDateFilter={resetDateFilterReservas}
                />
            </div>

            {/* Suscripciones y Programas */}
            <SuscripcionesProgramas
                suscripciones={suscripciones}
                adquisiciones={adquisiciones}
            />

            {/* Dietas */}
            <Dietas dieta={dieta} dietaInfo={dietaInfo} />

            {/* Facturas */}
            <Facturas
                pedidos={pedidos}
                selectedDateFacturas={selectedDateFacturas}
                handleDateChange={handleDateChangeFacturas}
                resetDateFilter={resetDateFilterFacturas}
            />

            <Footer />
        </AuthenticatedLayout>
    );
}

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
    auth,
    isEntrenador,
    reservas = { data: [] },
    suscripciones = [],
    dieta,
    adquisiciones = [],
    pedidos = { data: [] },
}) {
    const user = auth.user;

    const dietaInfo = dieta ? getDietaInfo(dieta.objetivo) : null;

    const { searchDateReservas, searchDateFacturas } = usePage().props;
    const [selectedDateReservas, setSelectedDateReservas] = useState(
        searchDateReservas || ""
    );
    const [selectedDateFacturas, setSelectedDateFacturas] = useState(
        searchDateFacturas || ""
    );

    const handleDateChangeReservas = (e) => {
        setSelectedDateReservas(e.target.value);
        router.get(
            route("dashboard"),
            { fecha_reservas: e.target.value },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleDateChangeFacturas = (e) => {
        setSelectedDateFacturas(e.target.value);
        router.get(
            route("dashboard"),
            { fecha_facturas: e.target.value },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const resetDateFilterReservas = () => {
        setSelectedDateReservas("");
        router.get(
            route("dashboard"),
            { fecha_reservas: "" },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const resetDateFilterFacturas = () => {
        setSelectedDateFacturas("");
        router.get(
            route("dashboard"),
            { fecha_facturas: "" },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-3xl text-center text-lime-600 mt-4">
                    Panel de Control del Usuario 🔒
                </h2>
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

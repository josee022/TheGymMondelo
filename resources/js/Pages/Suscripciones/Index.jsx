import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuscripcionHero from "@/Components/Suscripciones/SuscripcionHero";
import PlanesSuscripcion from "@/Components/Suscripciones/PlanesSuscripcion";

export default function Suscripciones({ auth, usuarioTieneSuscripcion }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const precioMensual = 25;
    const descuentoSemestral = 0.15;
    const descuentoAnual = 0.4;
    const precioSemestral = (precioMensual * (1 - descuentoSemestral)).toFixed(
        2
    );
    const pagoSemestral = (precioSemestral * 6).toFixed(2);
    const precioAnual = (precioMensual * (1 - descuentoAnual)).toFixed(2);
    const pagoAnual = (precioAnual * 12).toFixed(2);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-3xl text-center text-lime-600 mt-4">
                    Nuestras Suscripciones 📋
                </h2>
            }
        >
            <Head title="Suscripciones" />

            <div className="relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 text-white py-8">
                <SuscripcionHero />
            </div>

            <PlanesSuscripcion
                precioMensual={precioMensual}
                precioSemestral={precioSemestral}
                pagoSemestral={pagoSemestral}
                precioAnual={precioAnual}
                pagoAnual={pagoAnual}
                usuarioTieneSuscripcion={usuarioTieneSuscripcion}
            />

            <Footer />
            <ToastContainer />
        </AuthenticatedLayout>
    );
}

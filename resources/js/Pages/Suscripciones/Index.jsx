import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuscripcionHero from "@/Components/Suscripciones/SuscripcionHero";
import PlanesSuscripcion from "@/Components/Suscripciones/PlanesSuscripcion";

export default function Suscripciones({ auth, usuarioTieneSuscripcion }) {
    // Obtiene mensajes flash del backend para mostrar notificaciones
    const { flash } = usePage().props;

    // Efecto para manejar notificaciones basadas en mensajes flash
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success); // Muestra mensaje de éxito
        }
        if (flash?.error) {
            toast.error(flash.error); // Muestra mensaje de error
        }
    }, [flash]); // Se ejecuta cuando `flash` cambia

    // Precios base y descuentos para las suscripciones
    const precioMensual = 25; // Precio mensual base en moneda local
    const descuentoSemestral = 0.15; // Descuento del 15% para el pago semestral
    const descuentoAnual = 0.4; // Descuento del 40% para el pago anual

    // Cálculos para los planes de pago
    const precioSemestral = (precioMensual * (1 - descuentoSemestral)).toFixed(
        2
    ); // Precio mensual con descuento semestral
    const pagoSemestral = (precioSemestral * 6).toFixed(2); // Pago total semestral (6 meses)

    const precioAnual = (precioMensual * (1 - descuentoAnual)).toFixed(2); // Precio mensual con descuento anual
    const pagoAnual = (precioAnual * 12).toFixed(2); // Pago total anual (12 meses)

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

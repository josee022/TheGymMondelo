import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import DiarioForm from "@/Components/Diario/DiarioForm";
import BotonHistorial from "@/Components/Diario/BotonHistorial";
import EncabezadoEntrenamiento from "@/Components/Diario/EncabezadoEntrenamiento";

export default function DiarioIndex({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-3xl font-extrabold text-center text-lime-600 mt-4">
                    🏋️ Diario de Ejercicio 🏋️
                </h2>
            }
        >
            <Head title="Registro de Ejercicio" />

            {/* Botón flotante para acceder al historial */}
            <BotonHistorial />

            {/* Contenedor de fondo con menor padding vertical */}
            <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-lime-100 via-green-100 to-green-200 py-4">
                <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 animated fadeIn faster">
                    {/* Encabezado de entrenamiento */}
                    <EncabezadoEntrenamiento />

                    {/* Formulario de diario de ejercicio */}
                    <DiarioForm />
                </div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

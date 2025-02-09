// resources/js/Pages/Admin/Dashboard.jsx
import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import CardsResumen from "@/Components/Admin/CardsResumen";
import TablesResumen from "@/Components/Admin/TablesResumen";
import GraficaResumen from "@/Components/Admin/GraficaResumen";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const {
        totalUsuarios, // Número total de usuarios registrados en la plataforma
        totalProductos, // Número total de productos disponibles en la plataforma
        ingresosMensuales, // Total de ingresos mensuales en la plataforma
        ultimosUsuarios, // Lista de los usuarios más recientes que se han registrado
        ultimosPedidos, // Lista de los pedidos más recientes realizados
        usuariosPorMes = [], // Datos de usuarios registrados por mes (por defecto, un array vacío si no está disponible)
    } = usePage().props;

    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Resúmen General
                        </span>
                    </span>
                </h1>
            </div>
            {/* Resumenes */}
            <CardsResumen
                totalUsuarios={totalUsuarios}
                totalProductos={totalProductos}
                ingresosMensuales={ingresosMensuales}
            />

            {/* Tablas Recientes */}
            <TablesResumen
                ultimosUsuarios={ultimosUsuarios}
                ultimosPedidos={ultimosPedidos}
            />

            {/* Gráfico de Tendencias */}
            <GraficaResumen usuariosPorMes={usuariosPorMes} />
        </AdminLayout>
    );
}

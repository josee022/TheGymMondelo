// resources/js/Pages/Admin/Dashboard.jsx
import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import CardsResumen from "@/Components/Admin/CardsResumen";
import TablesResumen from "@/Components/Admin/TablesResumen";
import GraficaResumen from "@/Components/Admin/GraficaResumen";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { totalUsuarios, totalProductos, ingresosMensuales, ultimosUsuarios, ultimosPedidos, usuariosPorMes = [] } = usePage().props;

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">Resumen General</h1>

            {/* Resumenes */}
            <CardsResumen
                totalUsuarios={totalUsuarios}
                totalProductos={totalProductos}
                ingresosMensuales={ingresosMensuales}
            />

            {/* Tablas Recientes */}
            <TablesResumen ultimosUsuarios={ultimosUsuarios} ultimosPedidos={ultimosPedidos} />

            {/* Gráfico de Tendencias */}
            <GraficaResumen usuariosPorMes={usuariosPorMes} />
        </AdminLayout>
    );
}

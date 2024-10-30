import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import IngresosChart from "@/Components/Admin/IngresosChart";
import PedidosRecientes from "@/Components/Admin/PedidosRecientes";

export default function ReportesAnalisis({ pedidos }) {
    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Reportes y Análisis
                        </span>
                    </span>
                </h1>
            </div>
            <PedidosRecientes pedidos={pedidos} />
            <IngresosChart />
        </AdminLayout>
    );
}

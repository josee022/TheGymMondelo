import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import IngresosChart from "@/Components/Admin/IngresosChart";
import PedidosRecientes from "@/Components/Admin/PedidosRecientes";

export default function ReportesAnalisis({ pedidos, estados, filtroEstado }) {
    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Reportes De facturación
                        </span>
                    </span>
                </h1>
            </div>

            <a
                href="/admin/reportes/pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lime-600 text-white px-4 py-2 rounded-md hover:bg-lime-600 transition mb-6 inline-block"
            >
                Descargar Reportes en PDF
            </a>

            <PedidosRecientes
                pedidos={pedidos}
                estados={estados}
                filtroEstado={filtroEstado}
            />

            <br /><br /><br />

            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Análisis Sobre Nuestros Ingresos
                        </span>
                    </span>
                </h2>
            </div>

            <IngresosChart />
        </AdminLayout>
    );
}

import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import ClasesGrafica from "@/Components/Admin/ClasesGrafica";
import ProductosGrafica from "@/Components/Admin/ProductosGrafica";
import ProgramasGrafica from "@/Components/Admin/ProgramasGrafica";
import SuscripcionesGrafica from "@/Components/Admin/SuscripcionesGrafica";

const Graficas = () => {
    return (
        <AdminLayout>
            <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                        <span className="relative text-shadow-lg">
                            Gráficas informativas y de seguimiento de datos
                        </span>
                    </span>
                </h1>
            </div>{" "}
            <div className="grid grid-cols-2 gap-6">
                <ProductosGrafica />

                <SuscripcionesGrafica />

                <ClasesGrafica />

                <ProgramasGrafica />
            </div>
        </AdminLayout>
    );
};

export default Graficas;

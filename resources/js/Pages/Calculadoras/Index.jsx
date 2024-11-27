import React from "react";
import CalculadoraAgua from "@/Components/CalculadoraAgua";
import CalculadoraCardiaca from "@/Components/CalculadoraCardiaca";
import CalculadoraGrasaCorporal from "@/Components/CalculadoraGrasaCorporal";
import CalculadoraIMC from "@/Components/CalculadoraIMC";
import CalculadoraKcal from "@/Components/CalculadoraKcal";
import CalculadoraTMB from "@/Components/CalculadoraTMB";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import { Head, usePage } from "@inertiajs/react";

const CalculadoraIndex = () => {
    const { user } = usePage().props;

    return (
        <AuthenticatedLayout user={user}>
            <Head title="Calculadoras de Salud" />
            <div className="bg-gradient-to-b from-black via-green-800 to-lime-600 text-white py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center text-lime-400 mb-8">
                        Calculadoras de información sobre la salud para nuestros
                        clientes
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <CalculadoraGrasaCorporal />
                        <CalculadoraKcal />
                        <CalculadoraTMB />
                        <CalculadoraAgua />
                        <CalculadoraCardiaca />
                        <CalculadoraIMC />
                    </div>
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
};

export default CalculadoraIndex;

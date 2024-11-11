import React from "react";
import { motion } from "framer-motion";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import Acordeon from "@/Components/Acordeon";
import InfoContacto from "@/Components/Contacto/InfoContacto";
import FormContacto from "@/Components/Contacto/FormContacto";
import Mapa from "@/Components/Contacto/Mapa";
import { Head } from "@inertiajs/react";

export default function Contacto({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-3xl text-center text-lime-600 mt-4">
                    Contacto Cliente/Empresa 📞
                </h2>
            }
        >
            <Head title="Contacto - TheGymMondelo" />
            <motion.div
                className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-5xl font-extrabold mb-8 text-center">
                    ¡Contáctanos en{" "}
                    <span className="text-lime-500">TheGymMondelo</span>!
                </h1>

                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <InfoContacto />
                    <FormContacto />
                </div>

                <div className="w-full max-w-6xl mb-12 flex flex-col items-center">
                    <Mapa />
                    <motion.div
                        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-4xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Acordeon />
                    </motion.div>
                </div>
            </motion.div>

            <Footer />
        </AuthenticatedLayout>
    );
}

import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Footer from '@/Components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePage } from '@inertiajs/react';
import HeroDieta from '@/Components/Dietas/HeroDieta';
import ResumenInformativo from '@/Components/Dietas/ResumenInformativo';
import PlanesDieta from '@/Components/Dietas/PlanesDieta';
import CalculadorasDieta from '@/Components/Dietas/CalculadorasDieta';
import { router } from '@inertiajs/react';

export default function Dietas({ auth }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleDieta = (objetivo, descripcion) => {
        router.post(route('dietas.store'), { objetivo, descripcion });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            {/* Hero de la dieta */}
            <HeroDieta />

            {/* Sección de resúmenes informativos */}
            <ResumenInformativo />

            {/* Sección de planes de dieta */}
            <PlanesDieta handleDieta={handleDieta} />

            {/* Sección de calculadoras */}
            <CalculadorasDieta />

            <Footer />
            <ToastContainer />
        </AuthenticatedLayout>
    );
}

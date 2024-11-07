import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import ListaClases from '@/Components/Clases/ListaClases';
import Beneficios from '@/Components/Clases/Beneficios';
import Testimonios from '@/Components/Clases/Testimonios';
import MensajeFinal from '@/Components/Clases/MensajeFinal';

export default function Index({ clases, user }) {

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Nuestras Distintas Clases 🏋️‍♂️:</h2>}
        >
            <Head title="Clases Disponibles" />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
                <ListaClases clases={clases} />
                <Beneficios />
                <Testimonios />
                <MensajeFinal />
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

import React from 'react';
import { FaHeartbeat, FaDumbbell } from 'react-icons/fa';
import CalculadoraIMC from '@/Components/CalculadoraIMC';
import CalculadoraKcal from '@/Components/CalculadoraKcal';

export default function CalculadorasDieta() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-lime-600 via-lime-400 to-lime-600 flex flex-col justify-center items-center py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
                <CalculadoraCard title="Calculadora IMC" icon={<FaHeartbeat className="text-red-500 text-4xl" />} component={<CalculadoraIMC />} />
                <CalculadoraCard title="Calculadora de Calorías" icon={<FaDumbbell className="text-green-500 text-4xl" />} component={<CalculadoraKcal />} />
            </div>
        </div>
    );
}

function CalculadoraCard({ title, icon, component }) {
    return (
        <div className="bg-gradient-to-br from-lime-50 via-lime-100 to-lime-300 shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl flex flex-col justify-center items-center">
            <div className="flex items-center justify-center mb-4">{icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">{title}</h2>
            {component}
        </div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiActivity, FiHeart, FiTrendingUp } from 'react-icons/fi';

export default function PlanesDieta({ handleDieta }) {
    const plans = [
        {
            title: 'Pérdida de Peso',
            icon: <FiHeart className="text-green-500" size={32} />,
            description: 'Plan diseñado para perder peso de forma saludable, sin comprometer tu salud.',
            details: [
                'Proporción óptima de macronutrientes.',
                'Comidas deliciosas y balanceadas.',
                'Plan de ejercicio complementario.',
                'Asesoría personalizada semanal.',
            ],
            color: 'green-500', // Color principal
            bgColor: 'bg-green-50', // Color de fondo
            objetivo: 'Pérdida de peso',
        },
        {
            title: 'Ganancia Muscular',
            icon: <FiActivity className="text-blue-500" size={32} />,
            description: 'Plan ideal para ganar masa muscular y mejorar la fuerza.',
            details: [
                'Alto contenido proteico.',
                'Carbohidratos de absorción lenta.',
                'Planes de comidas post-entrenamiento.',
                'Asesoría en suplementos.',
            ],
            color: 'blue-500',
            bgColor: 'bg-blue-50',
            objetivo: 'Ganancia muscular',
        },
        {
            title: 'Mejor Rendimiento',
            icon: <FiTrendingUp className="text-red-500" size={32} />,
            description: 'Plan diseñado para maximizar el rendimiento deportivo y la resistencia física.',
            details: [
                'Plan alimenticio para deportes de alta intensidad.',
                'Mejora en resistencia y recuperación.',
                'Vitaminas y minerales esenciales.',
                'Diseñado para atletas.',
            ],
            color: 'red-500',
            bgColor: 'bg-red-50',
            objetivo: 'Mantenimiento',
        },
    ];


    return (
        <div className="py-16 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-5xl font-bold text-center text-gray-800 mb-12 underline underline-offset-8 decoration-slate-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Nuestros Planes De Dietas Personalizados
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {plans.map((plan, index) => (
                        <PlanCard key={index} plan={plan} handleDieta={handleDieta} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PlanCard({ plan, handleDieta }) {
    return (
        <motion.div className={`p-8 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-500 ${plan.bgColor}`}>
            <div className="flex items-center justify-center mb-4">{plan.icon}</div>
            <h3 className="text-3xl font-semibold text-center text-gray-800 mb-2">{plan.title}</h3>
            <p className="text-gray-600 text-center mb-4">{plan.description}</p>
            <ul className="text-gray-500 mb-6">
                {plan.details.map((detail, i) => (
                    <li key={i} className="flex items-center mb-2">
                        <FiCheckCircle className={`mr-2 text-${plan.color}`} />
                        {detail}
                    </li>
                ))}
            </ul>
            <div className="text-center">
                <button
                    onClick={() => handleDieta(plan.objetivo, plan.description)}
                    className={`py-3 px-6 rounded-full text-white bg-${plan.color}`}
                >
                    ¡Adquiere Aquí!
                </button>
            </div>
        </motion.div>
    );
}

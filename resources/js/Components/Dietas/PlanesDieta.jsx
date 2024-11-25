import React from "react";
import { motion } from "framer-motion";
import {
    FiCheckCircle,
    FiActivity,
    FiHeart,
    FiTrendingUp,
} from "react-icons/fi";

export default function PlanesDieta({ handleDieta, usuarioTieneDieta }) {
    const plans = [
        {
            title: "Pérdida de Peso",
            icon: <FiHeart className="text-green-500" size={48} />,
            description:
                "Plan diseñado para perder peso de forma saludable, sin comprometer tu salud.",
            details: [
                "Proporción óptima de macronutrientes.",
                "Comidas deliciosas y balanceadas.",
                "Plan de ejercicio complementario.",
                "Asesoría personalizada semanal.",
            ],
            color: "green-500",
            bgColor: "bg-green-100",
            objetivo: "Pérdida de peso",
            precio: 29.99, // Precio en euros
        },
        {
            title: "Ganancia Muscular",
            icon: <FiActivity className="text-blue-500" size={48} />,
            description:
                "Plan ideal para ganar masa muscular y mejorar la fuerza.",
            details: [
                "Alto contenido proteico.",
                "Carbohidratos de absorción lenta.",
                "Planes de comidas post-entrenamiento.",
                "Asesoría en suplementos.",
            ],
            color: "blue-500",
            bgColor: "bg-blue-100",
            objetivo: "Ganancia muscular",
            precio: 34.99, // Precio en euros
        },
        {
            title: "Mejor Rendimiento",
            icon: <FiTrendingUp className="text-red-500" size={48} />,
            description:
                "Plan diseñado para maximizar el rendimiento deportivo y la resistencia física.",
            details: [
                "Plan alimenticio para deportes de alta intensidad.",
                "Mejora en resistencia y recuperación.",
                "Vitaminas y minerales esenciales.",
                "Diseñado para atletas.",
            ],
            color: "red-500",
            bgColor: "bg-red-100",
            objetivo: "Mantenimiento",
            precio: 39.99, // Precio en euros
        },
    ];

    return (
        <div className="py-16 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 relative">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-5xl font-bold text-center text-gray-800 mb-12 underline underline-offset-8 decoration-slate-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Nuestros Planes De Dietas Personalizados
                </motion.h2>

                {usuarioTieneDieta && (
                    <div className="absolute top-0 right-0 mt-4 mr-6 p-4 w-56 h-24 bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-lg shadow-md flex items-center justify-center text-center font-medium">
                        <span className="text-sm">
                            🔒 Dieta en curso. <br />
                            Deshabilítala en tu perfil <br />
                            para adquirir una nueva.
                        </span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {plans.map((plan, index) => (
                        <PlanCard
                            key={index}
                            plan={plan}
                            handleDieta={handleDieta}
                            usuarioTieneDieta={usuarioTieneDieta}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PlanCard({ plan, handleDieta, usuarioTieneDieta }) {
    return (
        <motion.div
            className={`p-8 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-500 ${plan.bgColor}`}
        >
            <div className="flex items-center justify-center mb-4">
                {plan.icon}
            </div>
            <h3 className="text-3xl font-semibold text-center text-gray-800 mb-2">
                {plan.title}
            </h3>
            <p className="text-gray-600 text-center mb-4">{plan.description}</p>
            <div className="flex items-center justify-center mb-6 text-lg font-semibold text-gray-700">
                <span>Precio:</span>
                <span className={`ml-2 text-${plan.color} text-2xl font-bold`}>
                    €{plan.precio.toFixed(2)}
                </span>
            </div>
            <ul className="text-gray-500 mb-6">
                {plan.details.map((detail, i) => (
                    <li key={i} className="flex items-center mb-2">
                        <FiCheckCircle className={`mr-2 text-${plan.color}`} />
                        {detail}
                    </li>
                ))}
            </ul>
            <div className="text-center">
                {!usuarioTieneDieta && (
                    <button
                        onClick={() =>
                            handleDieta(plan.objetivo, plan.description)
                        }
                        className={`py-3 px-6 rounded-full text-white bg-${plan.color} hover:bg-opacity-80 transition duration-300`}
                    >
                        ¡Adquiere Aquí!
                    </button>
                )}
            </div>
        </motion.div>
    );
}

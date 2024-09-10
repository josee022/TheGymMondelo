import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Acordeon = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "¿Qué es Fuertafit?",
            answer: "Fuertafit es un innovador programa de entrenamiento diseñado para ayudarte a alcanzar tus objetivos de fitness de manera efectiva y divertida. Ofrecemos entrenamientos personalizados, planes de alimentación balanceados y acceso a una comunidad de apoyo para que tu viaje fitness sea lo más exitoso posible."
        },
        {
            question: "¿Qué tiene de diferente a otras opciones?",
            answer: "A diferencia de otros programas, Fuertafit combina tecnología avanzada con un enfoque personalizado. Utilizamos aplicaciones móviles para seguimiento y ajustes en tiempo real, mientras que nuestros entrenadores ofrecen soporte continuo y planes de ejercicio que se adaptan a tus necesidades específicas."
        },
        {
            question: "¿Es una suscripción? ¿Cómo funciona?",
            answer: "Sí, Fuertafit funciona bajo un modelo de suscripción. Puedes elegir entre varios planes que ofrecen diferentes niveles de acceso y soporte. Una vez suscrito, tendrás acceso completo a todos los recursos del programa, incluyendo entrenamientos, planes de alimentación y soporte de la comunidad."
        },
        {
            question: "¿Cuál es el tiempo de permanencia?",
            answer: "El tiempo de permanencia depende del plan que elijas. Ofrecemos opciones mensuales y anuales, así que puedes seleccionar el que mejor se adapte a tus necesidades y compromisos. Siempre tienes la opción de cancelar al final de tu ciclo de facturación sin penalización."
        },
        {
            question: "¿Puedo cancelar en cualquier momento?",
            answer: "Sí, puedes cancelar tu suscripción en cualquier momento. Si eliges cancelar, tu acceso continuará hasta el final de tu período de facturación actual. No hay cargos adicionales ni penalizaciones por cancelar tu suscripción."
        },
        {
            question: "¿Cómo selecciono qué plan de entrenamiento quiero?",
            answer: "Puedes seleccionar tu plan de entrenamiento basándote en tus objetivos personales y nivel de fitness. Ofrecemos asesoramiento personalizado para ayudarte a elegir el mejor plan que se ajuste a tus metas, ya sea perder peso, ganar músculo o mejorar tu condición física general."
        },
        {
            question: "¿Una aplicación? ¿Para qué sirve?",
            answer: "Nuestra aplicación te permite hacer un seguimiento de tus entrenamientos, monitorear tu progreso, ajustar tu plan de ejercicio y recibir soporte continuo de nuestros entrenadores. También puedes interactuar con la comunidad y acceder a recursos adicionales directamente desde la app."
        },
        {
            question: "Yo ya estoy en forma, ¿esto es para mí?",
            answer: "Sí, Fuertafit está diseñado para todos los niveles de fitness, incluyendo aquellos que ya están en forma. Nuestros entrenamientos son personalizables y desafiantes, ideales para mantener y mejorar tu nivel actual de condición física."
        },
        {
            question: "Todavía no tengo el cuerpo que quiero, ¿esto es para mí?",
            answer: "Absolutamente. Fuertafit está diseñado para ayudarte a alcanzar tus objetivos de forma progresiva y efectiva. Ofrecemos planes de ejercicio adaptados a tus necesidades específicas y soporte constante para ayudarte a lograr el cuerpo que deseas."
        },
        {
            question: "¿Durante cuánto tiempo estaré disfrutando el precio de la oferta?",
            answer: "El precio de la oferta es válido durante el período de suscripción inicial. Al renovar, el precio puede variar dependiendo de las promociones y ajustes de tarifa vigentes en ese momento."
        },
        {
            question: "¿Qué es el Aviso Médico?",
            answer: "El Aviso Médico es una recomendación para que consultes con un médico antes de comenzar cualquier programa de ejercicio, especialmente si tienes condiciones de salud preexistentes. Queremos asegurarnos de que todos nuestros usuarios estén en condiciones óptimas para comenzar su entrenamiento."
        }
    ];

    return (
        <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-3xl mx-auto mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-semibold mb-6 text-center text-lime-500">💬 Preguntas Frecuentes</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
                        <button
                            onClick={() => handleToggle(index)}
                            className="w-full text-left flex items-center justify-between text-xl font-semibold text-white focus:outline-none"
                        >
                            <span>{faq.question}</span>
                            {openIndex === index ? (
                                <FaChevronUp className="text-lime-500 text-xl" />
                            ) : (
                                <FaChevronDown className="text-lime-500 text-xl" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="mt-4 text-lg text-lime-500">
                                <p>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Acordeon;

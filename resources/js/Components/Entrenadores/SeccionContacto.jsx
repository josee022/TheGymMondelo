import React from 'react';

export default function SeccionContacto() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center mt-12 bg-lime-100 rounded-lg shadow-lg p-8">
            <div className="text-center lg:text-left space-y-4">
                <h3 className="text-3xl font-bold text-gray-800">¿Listo para mejorar tu físico?</h3>
                <p className="text-lg text-gray-700">Nuestros entrenadores certificados están aquí para ayudarte a alcanzar tus objetivos.</p>
            </div>
            <div className="mt-6 lg:mt-0">
                <a href="/contacto" className="px-6 py-3 bg-lime-500 text-white rounded-full shadow-lg hover:bg-lime-600 transition duration-300 transform hover:scale-105">
                    Contáctanos
                </a>
            </div>
        </div>
    );
}

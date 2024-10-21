import React from 'react';

export default function SeccionSuscripcion() {
    return (
        <div className="mt-12 text-center bg-gradient-to-r from-indigo-400 to-purple-400 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">¡Tus Resultados Son Nuestra Motivación! 🎉</h2>
            <p className="text-lg text-gray-700 mb-6">
                Nuestros entrenadores están aquí para motivarte en cada paso de tu transformación. ¡Comienza hoy y siente la diferencia! 🙌
            </p>
            <a
                href={route('suscripciones.index')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
            >
                ¡Suscríbete Ahora! 📈
            </a>
        </div>
    );
}

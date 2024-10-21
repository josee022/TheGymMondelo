import React from 'react';

export default function SeccionDestacada({ titulo, descripcion, ruta, bgColor, botonColor, emoji }) {
    return (
        <div className={`relative ${bgColor} p-8 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-110`}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black py-2 px-4 rounded-full shadow-md text-5xl">
                {emoji}
            </div>
            <p className="text-center text-xl font-bold mt-12">{titulo}</p>
            <p className="text-center text-md text-gray-600 mt-4 mb-6">
                {descripcion}
            </p>
            <a
                href={ruta}
                className={`relative w-full ${botonColor} text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 font-bold tracking-wide`}
            >
                ¡Descubre Más!
                <div className="absolute inset-0 bg-white opacity-10 rounded-lg blur-md animate-blink"></div>
            </a>
        </div>
    );
}

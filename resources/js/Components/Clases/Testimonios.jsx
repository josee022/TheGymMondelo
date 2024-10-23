import React from 'react';

export default function Testimonios() {
    return (
        <div className="mt-12 p-8 bg-white rounded-lg shadow-md w-full max-w-4xl">
            <h3 className="text-4xl font-bold text-center text-gray-800 mb-6">Testimonios 🗣️</h3>
            <div className="flex flex-col space-y-6">
                <div className="text-center">
                    <p className="text-xl text-gray-700 italic">"TheGymMondelo ha transformado mi vida, estoy en la mejor forma física de mi vida!"</p>
                    <p className="text-lg text-gray-800 font-semibold mt-2">- Juan Pérez</p>
                </div>
                <div className="text-center">
                    <p className="text-xl text-gray-700 italic">"¡Los entrenadores y clases son increíbles! Mi rendimiento deportivo ha mejorado muchísimo."</p>
                    <p className="text-lg text-gray-800 font-semibold mt-2">- Laura Gómez</p>
                </div>
            </div>
        </div>
    );
}

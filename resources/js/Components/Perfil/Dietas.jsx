import React from "react";
import { FaWeight, FaDumbbell, FaHeartbeat } from "react-icons/fa";
import { Link } from "@inertiajs/react";

export default function Dietas({ dieta, dietaInfo }) {
    const getDietaIcon = (objetivo) => {
        switch (objetivo) {
            case "Pérdida de peso":
                return <FaWeight className="text-red-400 text-4xl" />;
            case "Ganancia muscular":
                return <FaDumbbell className="text-blue-400 text-4xl" />;
            case "Mantenimiento":
                return <FaHeartbeat className="text-green-400 text-4xl" />;
            default:
                return <FaHeartbeat className="text-gray-400 text-4xl" />;
        }
    };

    return (
        <div className="w-full bg-gradient-to-b from-slate-200 via-lime-300 to-lime-400 shadow-lg p-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-10">
                <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
                    Información De Su Dieta Adquirida
                </h1>

                <div className="p-8 bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 text-gray-800 rounded-lg shadow-lg mb-6">
                    {dieta && dietaInfo ? (
                        <>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-2xl font-bold text-green-700">{`Dieta: ${dieta.objetivo}`}</div>
                                <div className="text-green-700 text-2xl">
                                    {getDietaIcon(dieta.objetivo)}
                                </div>
                            </div>
                            <p className="mb-6 text-gray-700 font-semibold leading-relaxed">
                                {dietaInfo.descripcion}
                            </p>

                            {/* Desayuno */}
                            <h3 className="text-xl font-bold mb-4 text-green-600 border-b-2 border-green-200 pb-2">
                                Desayuno:
                            </h3>
                            <ul className="list-disc pl-6 space-y-2">
                                {dietaInfo.comidas.desayuno.map(
                                    (comida, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 font-semibold"
                                        >
                                            {comida}
                                        </li>
                                    )
                                )}
                            </ul>

                            {/* Almuerzo */}
                            <h3 className="text-xl font-bold mt-6 mb-4 text-yellow-600 border-b-2 border-yellow-200 pb-2">
                                Almuerzo:
                            </h3>
                            <ul className="list-disc pl-6 space-y-2">
                                {dietaInfo.comidas.almuerzo.map(
                                    (comida, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 font-semibold"
                                        >
                                            {comida}
                                        </li>
                                    )
                                )}
                            </ul>

                            {/* Merienda */}
                            <h3 className="text-xl font-bold mt-6 mb-4 text-orange-600 border-b-2 border-orange-200 pb-2">
                                Merienda:
                            </h3>
                            <ul className="list-disc pl-6 space-y-2">
                                {dietaInfo.comidas.merienda.map(
                                    (comida, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 font-semibold"
                                        >
                                            {comida}
                                        </li>
                                    )
                                )}
                            </ul>

                            {/* Cena */}
                            <h3 className="text-xl font-bold mt-6 mb-4 text-red-600 border-b-2 border-red-200 pb-2">
                                Cena:
                            </h3>
                            <ul className="list-disc pl-6 space-y-2">
                                {dietaInfo.comidas.cena.map((comida, index) => (
                                    <li
                                        key={index}
                                        className="text-gray-700 font-semibold"
                                    >
                                        {comida}
                                    </li>
                                ))}
                            </ul>

                            {/* Botón para eliminar dieta */}
                            <div className="text-right mt-6">
                                <Link
                                    href={`/dietas/${dieta.id}/delete`}
                                    method="POST"
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Eliminar Dieta
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center text-gray-600 font-semibold text-xl">
                            No tienes ninguna dieta adquirida.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiClock, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import { router } from "@inertiajs/react";

const getEmojiForLevel = (nivel) => {
    switch (nivel) {
        case "Avanzado":
            return "🔥";
        case "Intermedio":
            return "🏋️";
        case "Principiante":
            return "🌱";
        default:
            return "";
    }
};

const handleInscribir = async (programaId) => {
    await router.post("/inscribir-programa", { programa_id: programaId });
};

export default function ProgLista({ programas }) {
    const [sortedProgramas, setSortedProgramas] = useState(programas);
    const [sortType, setSortType] = useState(null);

    const sortProgramsByPriceAsc = () => {
        const sorted = [...sortedProgramas].sort(
            (a, b) => parseFloat(a.precio) - parseFloat(b.precio)
        );
        setSortedProgramas(sorted);
        setSortType("asc");
    };

    const sortProgramsByPriceDesc = () => {
        const sorted = [...sortedProgramas].sort(
            (a, b) => parseFloat(b.precio) - parseFloat(a.precio)
        );
        setSortedProgramas(sorted);
        setSortType("desc");
    };

    const resetSort = () => {
        setSortedProgramas(programas);
        setSortType(null);
    };

    return (
        <div>
            {/* Controles de ordenación */}
            <div className="flex justify-end mb-6 space-x-4">
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        sortType === "asc"
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={sortProgramsByPriceAsc}
                    disabled={sortType === "asc"}
                >
                    Ordenar por Precio (Más Barato)
                </button>
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        sortType === "desc"
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={sortProgramsByPriceDesc}
                    disabled={sortType === "desc"}
                >
                    Ordenar por Precio (Más Caro)
                </button>
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        !sortType
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={resetSort}
                    disabled={!sortType}
                >
                    Restablecer Orden
                </button>
            </div>

            {/* Lista de Programas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProgramas.map((programa, index) => (
                    <motion.div
                        key={programa.id}
                        className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-lime-400 mb-4">
                            {programa.nombre} {getEmojiForLevel(programa.nivel)}
                        </h3>
                        <p className="text-gray-400 mb-4">
                            {programa.descripcion}
                        </p>
                        <div className="text-lime-400 flex items-center mb-2">
                            <FiClock className="mr-2" />
                            <p>Duración : {programa.duracion} semanas</p>
                        </div>
                        <div className="text-lime-400 flex items-center mb-2">
                            <FiTrendingUp className="mr-2" />
                            <p>Nivel : {programa.nivel}</p>
                        </div>
                        <div className="text-lime-400 flex items-center mb-4">
                            <FiDollarSign className="mr-2" />
                            <p>
                                Precio :{" "}
                                {typeof programa.precio === "number"
                                    ? programa.precio.toFixed(2)
                                    : parseFloat(programa.precio).toFixed(
                                          2
                                      )}{" "}
                                €
                            </p>
                        </div>
                        <button
                            className="bg-lime-500 text-black py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                            onClick={() => handleInscribir(programa.id)}
                        >
                            Inscribirse 💪
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

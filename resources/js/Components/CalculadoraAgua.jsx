import React, { useState } from "react";

const CalculadoraAguaCorporal = () => {
    // Estados para los datos de entrada y resultados
    const [peso, setPeso] = useState("");
    const [actividad, setActividad] = useState("sedentario");
    const [aguaRecomendada, setAguaRecomendada] = useState(null);
    const [error, setError] = useState("");

    // Factores de actividad para ajustar la cantidad de agua recomendada
    const factoresActividad = {
        sedentario: 0.033,
        ligero: 0.04,
        moderado: 0.045,
        intenso: 0.05,
    };

    // Función para calcular la cantidad de agua recomendada
    const calcularAgua = () => {
        setError(""); // Limpiar cualquier error previo

        if (!peso || peso <= 0) {
            setError("Por favor ingresa un peso válido.");
            return;
        }

        const cantidadAgua = peso * factoresActividad[actividad]; // En litros
        setAguaRecomendada(cantidadAgua.toFixed(2)); // Redondear a dos decimales
    };

    // Función para vaciar los campos y resultados
    const vaciarCampos = () => {
        setPeso("");
        setActividad("sedentario");
        setAguaRecomendada(null);
        setError("");
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h2 className="text-xl font-bold text-center text-lime-400 mb-4">
                Cantidad Agua Recomendada
            </h2>
            <div className="space-y-3">
                {/* Campo para ingresar el peso en kg */}
                <div>
                    <label className="block text-lime-400">Peso (kg)</label>
                    <input
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        aria-label="Peso corporal"
                        placeholder="Ingrese su peso en kg"
                    />
                </div>
                {/* Campo para seleccionar el nivel de actividad */}
                <div>
                    <label className="block text-lime-400">
                        Nivel de Actividad
                    </label>
                    <select
                        value={actividad}
                        onChange={(e) => setActividad(e.target.value)}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        aria-label="Nivel de actividad"
                    >
                        <option value="sedentario">Sedentario</option>
                        <option value="ligero">Ligero</option>
                        <option value="moderado">Moderado</option>
                        <option value="intenso">Intenso</option>
                    </select>
                </div>
            </div>
            {/* Mensaje de error si el peso es inválido */}
            {error && (
                <div className="mt-2 text-red-500 text-center">{error}</div>
            )}
            {/* Botones para calcular y vaciar */}
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={calcularAgua}
                    className="bg-lime-400 text-gray-900 py-2 px-4 rounded"
                >
                    Calcular
                </button>
                <button
                    onClick={vaciarCampos}
                    className="bg-red-500 text-black py-2 px-4 rounded"
                >
                    Vaciar
                </button>
            </div>
            {/* Mostrar la cantidad de agua recomendada */}
            {aguaRecomendada && (
                <div className="mt-6 text-center text-lime-400 text-lg font-semibold">
                    <p>
                        Deberías beber {aguaRecomendada} litros al día para
                        mantenerte bien hidratado.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CalculadoraAguaCorporal;

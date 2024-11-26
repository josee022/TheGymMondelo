import React, { useState } from "react";

const CalculadoraFrecuenciaCardiacaObjetivo = () => {
    // Estados para los datos de entrada y el resultado
    const [edad, setEdad] = useState("");
    const [sexo, setSexo] = useState("masculino");
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState("");

    // Función para calcular la frecuencia cardíaca objetivo
    const calcularFCObjetivo = () => {
        setError(""); // Limpiar cualquier error previo

        if (!edad || edad <= 0) {
            setError("Por favor ingresa una edad válida.");
            return;
        }

        // Fórmula de Karvonen para la frecuencia cardíaca máxima (FCM)
        const fcm = 220 - edad;

        // Calculando el rango de la frecuencia cardíaca objetivo (50% - 85% de la FCM)
        const fcrInferior = fcm * 0.5;
        const fcrSuperior = fcm * 0.85;

        setResultado({ fcrInferior, fcrSuperior });
    };

    // Función para vaciar los campos
    const vaciarCampos = () => {
        setEdad("");
        setSexo("masculino");
        setResultado(null);
        setError("");
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h2 className="text-xl font-bold text-center text-lime-400 mb-4">
                Calculadora de Frecuencia Cardíaca Objetivo
            </h2>
            <div className="space-y-3">
                {/* Campo para la edad */}
                <div>
                    <label className="block text-lime-400">Edad (años)</label>
                    <input
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        placeholder="Ingrese su edad"
                        aria-label="Edad"
                    />
                </div>
                {/* Selección de sexo */}
                <div>
                    <label className="block text-lime-400">Sexo</label>
                    <select
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        aria-label="Sexo"
                    >
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                </div>
            </div>
            {/* Mensaje de error si la entrada no es válida */}
            {error && (
                <div className="mt-2 text-red-500 text-center">{error}</div>
            )}
            {/* Botones para calcular y vaciar */}
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={calcularFCObjetivo}
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
            {/* Mostrar el resultado */}
            {resultado && (
                <div className="mt-6 text-center text-lime-400 text-lg font-semibold">
                    <p>
                        Tu rango de frecuencia cardíaca debería estar entre{" "}
                        {resultado.fcrInferior.toFixed(0)} y{" "}
                        {resultado.fcrSuperior.toFixed(0)} latidos por minuto
                    </p>
                </div>
            )}
        </div>
    );
};

export default CalculadoraFrecuenciaCardiacaObjetivo;

import React, { useState } from "react";

// Componente para calcular la cantidad diaria recomendada de agua corporal
const CalculadoraAguaCorporal = () => {
    // Estados para las entradas del usuario y resultados
    const [peso, setPeso] = useState(""); // Peso en kilogramos
    const [actividad, setActividad] = useState("sedentario"); // Nivel de actividad física
    const [aguaRecomendada, setAguaRecomendada] = useState(null); // Cantidad de agua recomendada en litros
    const [error, setError] = useState(""); // Mensajes de error para validaciones

    // Factores de actividad que ajustan la cantidad de agua según el nivel físico
    const factoresActividad = {
        sedentario: 0.033, // Sedentario: 33 ml por kg
        ligero: 0.04, // Actividad ligera: 40 ml por kg
        moderado: 0.045, // Actividad moderada: 45 ml por kg
        intenso: 0.05, // Actividad intensa: 50 ml por kg
    };

    // Función para calcular la cantidad de agua recomendada
    const calcularAgua = () => {
        setError(""); // Limpia errores previos

        // Validación del peso ingresado
        if (!peso || peso <= 0) {
            setError("Por favor ingresa un peso válido."); // Mensaje de error si el peso es inválido
            return;
        }

        // Cálculo de agua: peso * factor de actividad
        const cantidadAgua = peso * factoresActividad[actividad];
        setAguaRecomendada(cantidadAgua.toFixed(2)); // Redondea el resultado a dos decimales
    };

    // Función para limpiar los campos de entrada y resultados
    const vaciarCampos = () => {
        setPeso(""); // Limpia el peso
        setActividad("sedentario"); // Reinicia al nivel de actividad predeterminado
        setAguaRecomendada(null); // Limpia el resultado de agua
        setError(""); // Limpia mensajes de error
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
                        Deberías beber como mínimo {aguaRecomendada} litros al
                        día para mantenerte bien hidratado.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CalculadoraAguaCorporal;

import React, { useState } from "react";

// Componente para calcular el Gasto Calórico Basal (TMB)
const CalculadoraTMB = () => {
    // Estados para los datos de entrada y el resultado
    const [edad, setEdad] = useState(""); // Edad del usuario
    const [peso, setPeso] = useState(""); // Peso en kilogramos
    const [altura, setAltura] = useState(""); // Altura en centímetros
    const [genero, setGenero] = useState("hombre"); // Género (hombre o mujer)
    const [tmb, setTmb] = useState(null); // Resultado del cálculo del TMB

    // Función para calcular el Gasto Calórico Basal (TMB)
    const calcularTMB = () => {
        let tmbCalculado;

        // Fórmulas de Harris-Benedict para el TMB según el género
        if (genero === "hombre") {
            tmbCalculado = 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * edad;
        } else {
            tmbCalculado = 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * edad;
        }

        setTmb(tmbCalculado.toFixed(2)); // Guarda el resultado redondeado a dos decimales
    };

    // Función para limpiar los campos de entrada y reiniciar el resultado
    const vaciarCampos = () => {
        setEdad(""); // Reinicia la edad
        setPeso(""); // Reinicia el peso
        setAltura(""); // Reinicia la altura
        setGenero("hombre"); // Vuelve al valor predeterminado del género
        setTmb(null); // Limpia el resultado del TMB
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h2 className="text-xl font-bold text-center text-lime-400 mb-4">
                Gasto Calórico Basal
            </h2>
            <div className="space-y-4">
                {/* Campo para seleccionar el género */}
                <div>
                    <label className="block text-lime-400">Género</label>
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                    >
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                    </select>
                </div>
                {/* Campo para ingresar la edad */}
                <div>
                    <label className="block text-lime-400">Edad</label>
                    <input
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(e.target.value)}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        placeholder="Ingrese su edad"
                    />
                </div>
                {/* Campo para ingresar el peso en kg */}
                <div>
                    <label className="block text-lime-400">Peso (kg)</label>
                    <input
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        placeholder="Ingrese su peso en kg"
                    />
                </div>
                {/* Campo para ingresar la altura en cm */}
                <div>
                    <label className="block text-lime-400">Altura (cm)</label>
                    <input
                        type="number"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        placeholder="Ingrese su altura en cm"
                    />
                </div>
            </div>
            {/* Botones para calcular y vaciar */}
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={calcularTMB}
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
            {/* Mostrar el TMB calculado */}
            {tmb && (
                <div className="mt-4 text-center text-lime-400 text-lg font-semibold">
                    Tu Gasto Calórico Basal (TMB) es de: {tmb} kcal/día
                </div>
            )}
        </div>
    );
};

export default CalculadoraTMB;

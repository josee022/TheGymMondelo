import React, { useState } from "react";

// Componente para calcular el IMC (Índice de Masa Corporal)
const CalculadoraIMC = () => {
    // Estados para los datos de entrada y resultados
    const [peso, setPeso] = useState(""); // Peso en kilogramos
    const [altura, setAltura] = useState(""); // Altura en centímetros
    const [imc, setImc] = useState(null); // Resultado del IMC
    const [interpretacionImc, setInterpretacionImc] = useState(""); // Interpretación del IMC

    // Función para calcular el IMC
    const calcularIMC = () => {
        if (peso && altura) {
            // Verifica que ambos campos estén completos
            const alturaEnMetros = altura / 100; // Convierte la altura a metros
            const imcCalculado = peso / (alturaEnMetros * alturaEnMetros); // Fórmula del IMC
            setImc(imcCalculado.toFixed(2)); // Redondea el resultado a dos decimales

            // Clasificación del IMC según los valores calculados
            let interpretacion = "";
            if (imcCalculado < 16) {
                interpretacion = "Desnutrición severa";
            } else if (imcCalculado >= 16 && imcCalculado < 17) {
                interpretacion = "Desnutrición moderada";
            } else if (imcCalculado >= 17 && imcCalculado < 18.5) {
                interpretacion = "Desnutrición leve";
            } else if (imcCalculado >= 18.5 && imcCalculado < 25) {
                interpretacion = "Peso saludable";
            } else if (imcCalculado >= 25 && imcCalculado < 30) {
                interpretacion = "Sobrepeso";
            } else if (imcCalculado >= 30 && imcCalculado < 35) {
                interpretacion = "Obesidad clase 1 (moderada)";
            } else if (imcCalculado >= 35 && imcCalculado < 40) {
                interpretacion = "Obesidad clase 2 (severa)";
            } else {
                interpretacion = "Obesidad clase 3 (muy severa o mórbida)";
            }

            setInterpretacionImc(interpretacion); // Guarda la interpretación en el estado
        }
    };

    // Función para limpiar los campos y resultados
    const vaciarCampos = () => {
        setPeso(""); // Limpia el peso
        setAltura(""); // Limpia la altura
        setImc(null); // Limpia el resultado del IMC
        setInterpretacionImc(""); // Limpia la interpretación
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs transform translate-x-4">
            <h2 className="text-xl font-bold text-center text-lime-400 mb-4 ">
                Índice de Masa Corporal
            </h2>
            <div className="space-y-3">
                {/* Campo para ingresar el peso en kg */}
                <div>
                    <label className="block text-lime-400">Peso (kg)</label>
                    <input
                        type="number"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        className="w-full mt-1 p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
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
                        className="w-full mt-1 p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        placeholder="Ingrese su altura en cm"
                    />
                </div>
            </div>
            {/* Botones para calcular y vaciar */}
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={calcularIMC}
                    className="bg-lime-400 text-gray-900 py-1 px-3 rounded "
                >
                    Calcular
                </button>
                <button
                    onClick={vaciarCampos}
                    className="bg-red-500 text-black py-1 px-3 rounded "
                >
                    Vaciar
                </button>
            </div>
            {/* Mostrar el IMC calculado y su interpretación */}
            {imc && (
                <div className="mt-4 text-center text-lime-400 text-lg ">
                    Tu IMC es de: {imc}
                </div>
            )}
            {imc && (
                <div className="mt-2 text-center text-lime-400 text-sm">
                    {interpretacionImc}
                </div>
            )}
        </div>
    );
};

export default CalculadoraIMC;

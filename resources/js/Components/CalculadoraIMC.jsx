import React, { useState } from 'react';

const CalculadoraIMC = () => {
    // Estados para los datos de entrada y resultados
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [imc, setImc] = useState(null);
    const [interpretacionImc, setInterpretacionImc] = useState('');

    // Función para calcular el IMC (Índice de Masa Corporal)
    const calcularIMC = () => {
        if (peso && altura) {
            const alturaEnMetros = altura / 100;
            const imcCalculado = peso / (alturaEnMetros * alturaEnMetros);
            setImc(imcCalculado.toFixed(2)); // Redondear el IMC a dos decimales

            let interpretacion = '';
            if (imcCalculado < 16) {
                interpretacion = 'Desnutrición severa';
            } else if (imcCalculado >= 16 && imcCalculado < 17) {
                interpretacion = 'Desnutrición moderada';
            } else if (imcCalculado >= 17 && imcCalculado < 18.5) {
                interpretacion = 'Desnutrición leve';
            } else if (imcCalculado >= 18.5 && imcCalculado < 25) {
                interpretacion = 'Peso saludable';
            } else if (imcCalculado >= 25 && imcCalculado < 30) {
                interpretacion = 'Sobrepeso';
            } else if (imcCalculado >= 30 && imcCalculado < 35) {
                interpretacion = 'Obesidad clase 1 (moderada)';
            } else if (imcCalculado >= 35 && imcCalculado < 40) {
                interpretacion = 'Obesidad clase 2 (severa)';
            } else {
                interpretacion = 'Obesidad clase 3 (muy severa o mórbida)';
            }

            setInterpretacionImc(interpretacion);
        }
    };

    // Función para vaciar los campos y limpiar resultados
    const vaciarCampos = () => {
        setPeso('');
        setAltura('');
        setImc(null);
        setInterpretacionImc('');
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs transform translate-x-4">
            <h2 className="text-xl font-bold text-center text-lime-400 mb-4 animate-bounce">
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
                    />
                </div>
            </div>
            {/* Botones para calcular y vaciar */}
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={calcularIMC}
                    className="bg-lime-400 text-gray-900 py-1 px-3 rounded hover:bg-lime-500 transition transform hover:-translate-y-1 hover:scale-105"
                >
                    Calcular IMC
                </button>
                <button
                    onClick={vaciarCampos}
                    className="bg-red-500 text-black py-1 px-3 rounded hover:bg-red-500 transition transform hover:-translate-y-1 hover:scale-105"
                >
                    Vaciar
                </button>
            </div>
            {/* Mostrar el IMC calculado y su interpretación */}
            {imc && (
                <div className="mt-4 text-center text-lime-400 text-lg animate-pulse">
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

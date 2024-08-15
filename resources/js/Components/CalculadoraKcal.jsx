import React, { useState } from 'react';

const CalculadoraKcal = () => {
    // Estados para los datos de entrada y resultados
    const [edad, setEdad] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [genero, setGenero] = useState('hombre');
    const [actividad, setActividad] = useState('1.2');
    const [objetivo, setObjetivo] = useState('mantenimiento');
    const [calorias, setCalorias] = useState(null);
    const [proteinas, setProteinas] = useState(null);
    const [grasas, setGrasas] = useState(null);
    const [carbohidratos, setCarbohidratos] = useState(null);

    // Función para calcular las calorías y macronutrientes
    const calcularCalorias = () => {
        let tmb;

        // Cálculo del TMB (Tasa Metabólica Basal) según el género
        if (genero === 'hombre') {
            tmb = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * edad);
        } else {
            tmb = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * edad);
        }

        // Ajuste del TMB según el nivel de actividad
        let caloriasDiarias = tmb * parseFloat(actividad);

        // Ajuste de las calorías según el objetivo
        switch (objetivo) {
            case 'perdida':
                caloriasDiarias *= 0.8; // Reducción de calorías para pérdida de grasa
                break;
            case 'ganancia':
                caloriasDiarias *= 1.2; // Aumento de calorías para ganancia muscular
                break;
            default:
                break;
        }

        // Cálculo de macronutrientes
        const proteinasGramos = peso * (objetivo === 'ganancia' ? 2.2 : 1.6);
        const grasasCalorias = caloriasDiarias * 0.25; // 25% de las calorías para grasas
        const grasasGramos = grasasCalorias / 9; // 1 gramo de grasa = 9 calorías
        const carbohidratosCalorias = caloriasDiarias - (proteinasGramos * 4) - (grasasGramos * 9);
        const carbohidratosGramos = carbohidratosCalorias / 4; // 1 gramo de carbohidrato = 4 calorías

        // Actualización del estado con los resultados
        setCalorias(Math.round(caloriasDiarias));
        setProteinas(Math.round(proteinasGramos));
        setGrasas(Math.round(grasasGramos));
        setCarbohidratos(Math.round(carbohidratosGramos));
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs transform -translate-x-4">
            <h2 className="text-xl font-bold text-center text-lime-400 mb-4 animate-bounce">
                Calculadora Kcal Diarias
            </h2>
            <div className="space-y-3">
                {/* Campo para seleccionar el género */}
                <div>
                    <label className="block text-lime-400">Género</label>
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="w-full mt-1 p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
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
                        className="w-full mt-1 p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                </div>
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
                {/* Campo para seleccionar el nivel de actividad */}
                <div>
                    <label className="block text-lime-400">Actividad</label>
                    <select
                        value={actividad}
                        onChange={(e) => setActividad(e.target.value)}
                        className="w-full mt-1 p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                    >
                        <option value="1.2">Sedentario</option>
                        <option value="1.375">Ligera</option>
                        <option value="1.55">Moderado</option>
                        <option value="1.725">Muy Activo</option>
                        <option value="1.9">Super Activo</option>
                    </select>
                </div>
                {/* Campo para seleccionar el objetivo */}
                <div>
                    <label className="block text-lime-400">Objetivo</label>
                    <select
                        value={objetivo}
                        onChange={(e) => setObjetivo(e.target.value)}
                        className="w-full mt-1 p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                    >
                        <option value="mantenimiento">Mantenimiento</option>
                        <option value="perdida">Pérdida de grasa</option>
                        <option value="ganancia">Ganancia muscular</option>
                    </select>
                </div>
            </div>
            {/* Botón para calcular las calorías */}
            <div className="mt-4 text-center">
                <button
                    onClick={calcularCalorias}
                    className="bg-lime-400 text-gray-900 py-1 px-3 rounded hover:bg-lime-500 transition transform hover:-translate-y-1 hover:scale-105"
                >
                    Calcular
                </button>
            </div>
            {/* Mostrar los resultados */}
            {calorias && (
                <div className="mt-4">
                    <div className="text-lime-400 text-lg text-center mb-2">
                        Calorías Diarias: {calorias} kcal
                    </div>
                    <div className="text-lime-400 text-lg">
                        <ul className="list-disc list-inside ml-4">
                            <li>Proteínas: {proteinas} g</li>
                            <li>Grasas: {grasas} g</li>
                            <li>Carbohidratos: {carbohidratos} g</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalculadoraKcal;

import React, { useState } from "react";

// Componente para calcular calorías y macronutrientes
const CalculadoraKcal = () => {
    // Estados para entradas del usuario y resultados
    const [edad, setEdad] = useState(""); // Edad en años
    const [peso, setPeso] = useState(""); // Peso en kilogramos
    const [altura, setAltura] = useState(""); // Altura en centímetros
    const [genero, setGenero] = useState("hombre"); // Género (hombre o mujer)
    const [actividad, setActividad] = useState("1.2"); // Factor de actividad física
    const [objetivo, setObjetivo] = useState("mantenimiento"); // Objetivo (mantenimiento, pérdida, ganancia)
    const [calorias, setCalorias] = useState(null); // Calorías calculadas
    const [proteinas, setProteinas] = useState(null); // Gramos de proteína
    const [grasas, setGrasas] = useState(null); // Gramos de grasa
    const [carbohidratos, setCarbohidratos] = useState(null); // Gramos de carbohidratos

    // Función para calcular calorías y macronutrientes
    const calcularCalorias = () => {
        let tmb; // Tasa Metabólica Basal

        // Cálculo del TMB basado en el género
        if (genero === "hombre") {
            tmb = 88.36 + 13.4 * peso + 4.8 * altura - 5.7 * edad;
        } else {
            tmb = 447.6 + 9.2 * peso + 3.1 * altura - 4.3 * edad;
        }

        // Ajustar TMB según el nivel de actividad física
        let caloriasDiarias = tmb * parseFloat(actividad);

        // Ajustar calorías según el objetivo del usuario
        switch (objetivo) {
            case "perdida": // Reducir calorías para pérdida de grasa
                caloriasDiarias *= 0.8;
                break;
            case "ganancia": // Aumentar calorías para ganancia muscular
                caloriasDiarias *= 1.2;
                break;
            default: // Mantenimiento (sin ajuste)
                break;
        }

        // Cálculo de macronutrientes
        const proteinasGramos = peso * (objetivo === "ganancia" ? 2.2 : 1.6); // Gramos de proteína por kg de peso
        const grasasCalorias = caloriasDiarias * 0.25; // 25% de calorías para grasas
        const grasasGramos = grasasCalorias / 9; // Calorías de grasa convertidas a gramos
        const carbohidratosCalorias =
            caloriasDiarias - proteinasGramos * 4 - grasasGramos * 9; // Resto para carbohidratos
        const carbohidratosGramos = carbohidratosCalorias / 4; // Calorías de carbohidratos convertidas a gramos

        // Guardar resultados en el estado
        setCalorias(Math.round(caloriasDiarias));
        setProteinas(Math.round(proteinasGramos));
        setGrasas(Math.round(grasasGramos));
        setCarbohidratos(Math.round(carbohidratosGramos));
    };

    // Función para limpiar los campos y reiniciar los resultados
    const vaciarCampos = () => {
        setEdad("");
        setPeso("");
        setAltura("");
        setGenero("hombre");
        setActividad("1.2");
        setObjetivo("mantenimiento");
        setCalorias(null);
        setProteinas(null);
        setGrasas(null);
        setCarbohidratos(null);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs transform -translate-x-4">
            <h2 className="text-xl font-bold text-center text-lime-400 mb-4 ">
                Kcal Totales Diarias
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
            {/* Botones para calcular y vaciar */}
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={calcularCalorias}
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

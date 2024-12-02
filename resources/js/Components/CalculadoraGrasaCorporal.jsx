import React, { useState } from "react";

const CalculadoraGrasaCorporal = () => {
    // Estados para los datos de entrada y resultados
    const [edad, setEdad] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [circunferenciaCuello, setCircunferenciaCuello] = useState("");
    const [circunferenciaCintura, setCircunferenciaCintura] = useState("");
    const [genero, setGenero] = useState("hombre");
    const [grasaCorporal, setGrasaCorporal] = useState(null);

    // Función para calcular el porcentaje de grasa corporal
    const calcularGrasaCorporal = () => {
        let grasaCalculada;

        if (genero === "hombre") {
            // Fórmula de la grasa corporal para hombres
            grasaCalculada =
                86.01 *
                    Math.log10(circunferenciaCintura - circunferenciaCuello) -
                70.041 * Math.log10(altura) +
                36.76;
        } else {
            // Fórmula de la grasa corporal para mujeres
            grasaCalculada =
                163.205 *
                    Math.log10(circunferenciaCintura - circunferenciaCuello) -
                97.684 * Math.log10(altura) -
                78.387;
        }

        setGrasaCorporal(grasaCalculada.toFixed(2)); // Redondear el resultado a dos decimales
    };

    // Función para vaciar los campos y limpiar resultados
    const vaciarCampos = () => {
        setEdad("");
        setPeso("");
        setAltura("");
        setCircunferenciaCuello("");
        setCircunferenciaCintura("");
        setGenero("hombre");
        setGrasaCorporal(null);
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs">
            <h2 className="text-xl font-semibold text-center text-lime-400 mb-4">
                Porcentaje Grasa Corporal
            </h2>
            <div className="space-y-4">
                {/* Selección de género */}
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
                {/* Edad */}
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
                {/* Peso */}
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
                {/* Altura */}
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
                {/* Circunferencia del cuello */}
                <div>
                    <label className="block text-lime-400">
                        Circunferencia Cuello (cm)
                    </label>
                    <input
                        type="number"
                        value={circunferenciaCuello}
                        onChange={(e) =>
                            setCircunferenciaCuello(e.target.value)
                        }
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        placeholder="Ingrese su cuello en cm"
                    />
                </div>
                {/* Circunferencia de la cintura */}
                <div>
                    <label className="block text-lime-400">
                        Circunferencia Cintura (cm)
                    </label>
                    <input
                        type="number"
                        value={circunferenciaCintura}
                        onChange={(e) =>
                            setCircunferenciaCintura(e.target.value)
                        }
                        className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                        placeholder="Ingrese su cintura en cm"
                    />
                </div>
            </div>
            {/* Botones para calcular y vaciar */}
            <div className="mt-4 flex justify-center space-x-4">
                <button
                    onClick={calcularGrasaCorporal}
                    className="bg-lime-400 text-gray-900 py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-lime-400"
                >
                    Calcular
                </button>
                <button
                    onClick={vaciarCampos}
                    className="bg-red-500 text-black py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Vaciar
                </button>
            </div>
            {/* Mostrar el porcentaje de grasa corporal calculado */}
            {grasaCorporal && (
                <div className="mt-4 text-center text-lime-400 text-xl">
                    <p>
                        Tu porcentaje de grasa corporal es:{" "}
                        <strong>{grasaCorporal}%</strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default CalculadoraGrasaCorporal;
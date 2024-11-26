import React from "react";
import CalculadoraAgua from "@/Components/CalculadoraAgua";
import CalculadoraCardiaca from "@/Components/CalculadoraCardiaca";
import CalculadoraGrasaCorporal from "@/Components/CalculadoraGrasaCorporal";
import CalculadoraIMC from "@/Components/CalculadoraIMC";
import CalculadoraKcal from "@/Components/CalculadoraKcal";
import CalculadoraTMB from "@/Components/CalculadoraTMB";

const CalculadoraIndex = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center text-lime-400 mb-8">
                Calculadoras de Salud
            </h1>
            <div className="space-y-8">
                <CalculadoraAgua />
                <CalculadoraCardiaca />
                <CalculadoraGrasaCorporal />
                <CalculadoraIMC />
                <CalculadoraKcal />
                <CalculadoraTMB />
            </div>
        </div>
    );
};

export default CalculadoraIndex;

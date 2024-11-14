import React from "react";
import PreguntasFrecuentes from "@/Components/Ayuda/PreguntasFrecuentes";
import PoliticasCookies from "@/Components/Ayuda/PoliticasCookies";
import PoliticasPrivacidad from "@/Components/Ayuda/PoliticasPrivacidad";
import AvisoLegal from "@/Components/Ayuda/AvisoLegal";
import "./Ayuda.css";

const Ayuda = () => {
    return (
        <div className="ayuda-container">
            <h1 className="ayuda-title">Centro de Ayuda - TheGymMondelo</h1>

            {/* Preguntas Frecuentes */}
            <PreguntasFrecuentes />

            {/* Políticas de Privacidad */}
            <PoliticasPrivacidad />

            {/* Políticas de Cookies */}
            <PoliticasCookies />

            {/* Aviso Legal */}
            <AvisoLegal />
        </div>
    );
};

export default Ayuda;

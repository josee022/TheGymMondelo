import React from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function TarjetaEntrenador({ entrenador }) {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-green-100">
            <h2 className="text-3xl font-bold mb-3 text-green-800">
                {entrenador.usuario.name}
            </h2>
            <p className="text-lg mb-2">
                <strong className="text-gray-700">Especialidad:</strong>{" "}
                {entrenador.especialidad}
            </p>
            <p className="text-lg mb-2">
                <strong className="text-gray-700">Tarifa:</strong>{" "}
                {entrenador.tarifa} €/h
            </p>
            <div className="flex justify-center space-x-6 text-3xl mt-4">
                <a
                    href="https://www.facebook.com/TheGymMondelo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                >
                    <FaFacebook />
                </a>
                <a
                    href="https://www.instagram.com/TheGymMondelo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700"
                >
                    <FaInstagram />
                </a>
                <a
                    href="https://twitter.com/TheGymMondelo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-600"
                >
                    <FaTwitter />
                </a>
                <a
                    href="https://www.linkedin.com/company/thegymmondelo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900"
                >
                    <FaLinkedin />
                </a>
            </div>
        </div>
    );
}

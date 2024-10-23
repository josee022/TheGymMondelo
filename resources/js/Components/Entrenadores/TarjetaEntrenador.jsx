import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function TarjetaEntrenador({ entrenador }) {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:bg-green-100">
            <h2 className="text-3xl font-bold mb-3 text-green-800">{entrenador.usuario.name}</h2>
            <p className="text-lg mb-2"><strong className="text-gray-700">Especialidad:</strong> {entrenador.especialidad}</p>
            <p className="text-lg mb-2"><strong className="text-gray-700">Tarifa:</strong> {entrenador.tarifa} €/h</p>
            <div className="flex space-x-4 mt-4">
                <a href="#" className="text-green-500 hover:text-green-700"><FaInstagram size={24} /></a>
                <a href="#" className="text-blue-500 hover:text-blue-700"><FaFacebook size={24} /></a>
                <a href="#" className="text-blue-400 hover:text-blue-600"><FaTwitter size={24} /></a>
                <a href="#" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={24} /></a>
            </div>
        </div>
    );
}

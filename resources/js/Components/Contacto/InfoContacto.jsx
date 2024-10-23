import React from "react";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function InfoContacto() {
    return (
        <motion.div
            className="bg-gray-800 p-10 rounded-lg shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl font-semibold mb-6 text-center">
                Información de Contacto
            </h2>
            <div className="grid grid-cols-1 gap-8">
                <div className="flex items-center text-lg">
                    <FaPhone className="text-lime-500 text-3xl mr-4" />
                    <span>Llámanos: +34 622 33 18 27</span>
                </div>
                <div className="flex items-center text-lg">
                    <FaEnvelope className="text-lime-500 text-3xl mr-4" />
                    <span>Email: thegymmondelo@gmail.com</span>
                </div>
                <div className="flex items-center text-lg">
                    <FaMapMarkerAlt className="text-lime-500 text-3xl mr-4" />
                    <span>Dirección: Calle Fitness 123, Madrid</span>
                </div>
                <div className="flex items-center text-lg">
                    <FaClock className="text-lime-500 text-3xl mr-4" />
                    <span>Horarios: Lunes a Viernes 7:00 - 22:00</span>
                </div>
            </div>

            <motion.div
                className="bg-gray-800 p-6 rounded-lg shadow-xl mt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-3xl font-bold mb-4 text-lime-500">
                    🏋️ Facilidades Disponibles
                </h3>
                <ul className="list-disc list-inside text-lg">
                    <li>Área de entrenamiento de última generación</li>
                    <li>Zona de estiramiento y recuperación</li>
                    <li>Sauna y spa para miembros</li>
                    <li>Cafetería con opciones saludables</li>
                </ul>
            </motion.div>

            <div className="text-center mt-8">
                <h3 className="text-2xl font-semibold mb-4">
                    Síguenos en Redes Sociales
                </h3>
                <div className="flex justify-center space-x-6 text-3xl text-lime-500">
                    <a
                        href="https://www.facebook.com/TheGymMondelo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebook />
                    </a>
                    <a
                        href="https://www.instagram.com/TheGymMondelo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://twitter.com/TheGymMondelo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaTwitter />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/thegymmondelo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

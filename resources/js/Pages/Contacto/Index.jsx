import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/Components/Footer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Acordeon from '@/Components/Acordeon';
import { Head } from '@inertiajs/react';

export default function Contacto({ auth }) {

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí manejarías el envío del formulario
            toast.success('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
        } catch (error) {
            toast.error('Hubo un problema al enviar tu mensaje. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Contacto - TheGymMondelo" />
            <motion.div
                className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-5xl font-extrabold mb-8 text-center">
                    ¡Contáctanos en <span className="text-lime-500">TheGymMondelo</span>!
                </h1>

                <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Información de Contacto */}
                    <motion.div
                        className="bg-gray-800 p-10 rounded-lg shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-semibold mb-6 text-center">Información de Contacto</h2>
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

                        {/* Facilidades Disponibles */}
                        <motion.div
                            className="bg-gray-800 p-6 rounded-lg shadow-xl mt-8"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-3xl font-bold mb-4 text-lime-500">🏋️ Facilidades Disponibles</h3>
                            <ul className="list-disc list-inside text-lg">
                                <li>Área de entrenamiento de última generación</li>
                                <li>Zona de estiramiento y recuperación</li>
                                <li>Sauna y spa para miembros</li>
                                <li>Cafetería con opciones saludables</li>
                            </ul>
                        </motion.div>

                        {/* Redes Sociales */}
                        <div className="text-center mt-8">
                            <h3 className="text-2xl font-semibold mb-4">Síguenos en Redes Sociales</h3>
                            <div className="flex justify-center space-x-6 text-3xl text-lime-500">
                                <a href="https://www.facebook.com/TheGymMondelo" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook />
                                </a>
                                <a href="https://www.instagram.com/TheGymMondelo" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram />
                                </a>
                                <a href="https://twitter.com/TheGymMondelo" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter />
                                </a>
                                <a href="https://www.linkedin.com/company/thegymmondelo" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Formulario de Contacto */}
                    <motion.div
                        className="bg-gray-800 p-10 rounded-lg shadow-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-semibold mb-6 text-center">Formulario de Contacto</h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Tu Nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Tu Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                                required
                            />
                            <textarea
                                name="mensaje"
                                placeholder="Tu Mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                                rows="5"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="bg-lime-500 text-black py-3 px-6 rounded-lg text-lg hover:bg-lime-700 transition-transform transform hover:scale-105"
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </motion.div>
                </div>

                {/* Mapa y Acordeon */}
                <div className="w-full max-w-6xl mb-12 flex flex-col items-center">
                    <motion.div
                        className="w-full bg-gray-800 rounded-lg shadow-xl mb-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <iframe
                            title="Mapa de TheGymMondelo"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24143.617167017943!2d-3.7035827!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287a542fa2c7%3A0x371de53695c6a1e0!2sCalle%20Fitness%20123%2C%20Madrid!5e0!3m2!1ses!2ses!4v1633528857386!5m2!1ses!2ses"
                            width="100%"
                            height="400"
                            className="rounded-lg shadow-lg"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </motion.div>

                    <motion.div
                        className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-4xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Acordeon />
                    </motion.div>
                </div>
            </motion.div>

            <Footer />
        </AuthenticatedLayout>
    );
}

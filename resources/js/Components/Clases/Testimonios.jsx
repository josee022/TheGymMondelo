import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function Testimonios() {
    return (
        <div className="w-full max-w-7xl mx-auto mt-20 p-12 bg-gradient-to-r from-green-400 via-lime-500 to-green-600 rounded-3xl shadow-2xl text-white">
            <motion.h3
                className="text-5xl font-extrabold text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Testimonios 🗣️
            </motion.h3>

            <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                <motion.div
                    className="w-full lg:w-1/2 bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="text-center text-white relative">
                        <FaQuoteLeft className="text-lime-300 text-3xl absolute top-0 left-2" />
                        <p className="text-2xl italic font-light mt-6 mb-4">
                            "TheGymMondelo ha transformado mi cuerpo, estoy en la
                            mejor forma física de mi vida! <br />
                            Sus pautas me ayudaron a conseguirlo"
                        </p>
                        <FaQuoteRight className="text-lime-300 text-3xl absolute bottom-0 right-2" />
                        <p className="text-lg font-semibold mt-4">
                            - Juan Pérez
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full lg:w-1/2 bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-lg transition-transform duration-500 hover:scale-105 hover:shadow-2xl"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="text-center text-white relative">
                        <FaQuoteLeft className="text-lime-300 text-3xl absolute top-0 left-2" />
                        <p className="text-2xl italic font-light mt-6 mb-4">
                            "¡Los entrenadores y clases son increíbles! <br />
                            Mi rendimiento deportivo ha mejorado muchísimo en el último año."
                        </p>
                        <FaQuoteRight className="text-lime-300 text-3xl absolute bottom-0 right-2" />
                        <p className="text-lg font-semibold mt-4">
                            - Laura Gómez
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

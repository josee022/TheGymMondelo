import React from 'react';
import { motion } from 'framer-motion';
import { FiActivity, FiTarget, FiTrendingUp, FiCheckCircle, FiHeart, FiAlertCircle } from 'react-icons/fi';

export default function ResumenInformativo() {
    return (
        <div className="bg-gradient-to-r from-green-100 to-green-200 py-16"> {/* Aumenta ligeramente la altura */}
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-5xl font-bold text-center text-gray-800 mb-12 underline underline-offset-8 decoration-slate-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Todo Lo Que Necesitas Saber
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <InfoCard
                        title="Macronutrientes"
                        description={
                            <>
                                Los <span className="text-green-800 font-semibold">macronutrientes</span> son esenciales para el cuerpo y se dividen en <span className="text-green-800 font-semibold">proteínas</span>, <span className="text-green-800 font-semibold">carbohidratos</span> y <span className="text-green-800 font-semibold">grasas</span>.
                            </>
                        }
                        icon={<FiActivity className="h-8 w-8 text-green-700 mr-2" />}
                        bgColor="bg-green-200" // Fondo verde más fuerte
                    />
                    <InfoCard
                        title="Tipos de Dietas"
                        description={
                            <>
                                Las dietas de <span className="text-blue-800 font-semibold">déficit calórico</span> son ideales para la <span className="text-blue-800 font-semibold">pérdida de peso</span>, mientras que un <span className="text-blue-800 font-semibold">superávit calórico</span> favorece la <span className="text-blue-800 font-semibold">ganancia muscular</span>.
                            </>
                        }
                        icon={<FiTarget className="h-8 w-8 text-blue-700 mr-2" />}
                        bgColor="bg-blue-200" // Fondo azul más fuerte
                    />
                    <InfoCard
                        title="Resultados en Intervalos"
                        description={
                            <>
                                Dependiendo de la <span className="text-yellow-800 font-semibold">consistencia</span> y la adherencia al plan, puedes comenzar a ver resultados en <span className="text-yellow-800 font-semibold">4-8 semanas</span>.
                            </>
                        }
                        icon={<FiTrendingUp className="h-8 w-8 text-yellow-700 mr-2" />}
                        bgColor="bg-yellow-200" // Fondo amarillo más fuerte
                    />
                    <InfoCard
                        title="Entrenamiento y Dietas"
                        description={
                            <>
                                La combinación de <span className="text-red-800 font-semibold">dieta</span> y <span className="text-red-800 font-semibold">entrenamiento</span> es clave.
                            </>
                        }
                        icon={<FiCheckCircle className="h-8 w-8 text-red-700 mr-2" />}
                        bgColor="bg-red-200" // Fondo rojo más fuerte
                    />
                    <InfoCard
                        title="Alimentos Clave"
                        description={
                            <>
                                Alimentos ricos en <span className="text-purple-800 font-semibold">proteínas magras</span> como el pollo, el pescado, y los huevos son fundamentales para el <span className="text-purple-800 font-semibold">crecimiento muscular</span>.
                            </>
                        }
                        icon={<FiHeart className="h-8 w-8 text-purple-700 mr-2" />}
                        bgColor="bg-purple-200" // Fondo morado más fuerte
                    />
                    <InfoCard
                        title="Suplementación"
                        description={
                            <>
                                Los suplementos como el <span className="text-pink-800 font-semibold">whey protein</span> y la <span className="text-pink-800 font-semibold">creatina</span> pueden complementar la dieta para mejorar el <span className="text-pink-800 font-semibold">rendimiento</span>.
                            </>
                        }
                        icon={<FiAlertCircle className="h-8 w-8 text-pink-700 mr-2" />}
                        bgColor="bg-pink-200" // Fondo rosa más fuerte
                    />
                </div>
            </div>
        </div>
    );
}

function InfoCard({ title, description, icon, bgColor }) {
    return (
        <motion.div
            className={`p-8 ${bgColor} rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center mb-4">
                {icon}
                <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
            </div>
            <p className="text-gray-700">{description}</p> {/* Cambié el color del texto a gris más oscuro para mejor visibilidad */}
        </motion.div>
    );
}

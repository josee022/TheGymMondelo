import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import './Inicio.css'; // Importa el archivo CSS

export default function Inicio({ auth }) {
    return (
        <AuthenticatedLayout user={auth}>
            <div className="contenedor-principal">
                {/* Contenedor de la imagen */}
                <div className="contenedor-imagen">
                    <img
                        src="/imagenes/index/3-fotoPortada.jpg"
                        alt="Portada"
                        className="imagen-fondo"
                    />
                    <div className="contenedor-rectangulo-imagen">
                        <div className="rectangulo-imagen">
                            <h1 className="titulo-imagen">The Gym Mondelo</h1>
                        </div>
                    </div>
                </div>

                {/* Contenedor gris */}
                <div className="contenedor-gris">
                    <div className="contenedor-rectangulo-gris">
                        <div className="rectangulo-gris">
                            <h1 className="titulo-gris">Bienvenido a nuestra fábrica de atletas</h1>
                        </div>
                        <div className="descripcion">
                        <svg
                                className="estrella"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25a.75.75 0 01.66.408l2.46 5.04 5.58.812a.75.75 0 01.418 1.28l-4.02 3.94.95 5.56a.75.75 0 01-1.09.79L12 17.25l-4.94 2.6a.75.75 0 01-1.09-.79l.95-5.56-4.02-3.94a.75.75 0 01.418-1.28l5.58-.812 2.46-5.04A.75.75 0 0112 2.25z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className='aumentoTamaño'>Consigue ese físico que tanto deseaste algún día en TheGymMondelo, donde tus metas se hacen realidad con esfuerzo y constancia.</p>
                            <svg
                                className="estrella"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25a.75.75 0 01.66.408l2.46 5.04 5.58.812a.75.75 0 01.418 1.28l-4.02 3.94.95 5.56a.75.75 0 01-1.09.79L12 17.25l-4.94 2.6a.75.75 0 01-1.09-.79l.95-5.56-4.02-3.94a.75.75 0 01.418-1.28l5.58-.812 2.46-5.04A.75.75 0 0112 2.25z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <h2 className="titulo-tips">TIPS PARA CONSEGUIR TU ANSIADO CAMBIO FÍSICO</h2>
                    </div>

                    {/* Contenedores de información */}
                    <div className="contenedor-info">
                        <div className="info-item">
                            <h3>EJERCICIO</h3>
                            <p className="tamañoFuente">
                                "Mantén una rutina de ejercicio variada y constante para fortalecer tu cuerpo y mejorar tu salud cardiovascular."
                            </p>
                        </div>
                        <div className="info-item">
                            <h3>ALIMENTACION</h3>
                            <p className="tamañoFuente">
                                "Nutre tu cuerpo con alimentos balanceados y adecuados para tus objetivos de fitness. La alimentación es clave para el rendimiento y la recuperación."
                            </p>
                        </div>
                        <div className="info-item">
                            <h3>MOTIVACIÓN</h3>
                            <p className="tamañoFuente">
                                "Mantén una mentalidad positiva y enfocada. Encuentra tu motivación interna y establece metas alcanzables para mantener el impulso."
                            </p>
                        </div>
                        <div className="info-item">
                            <h3>DESCANSO</h3>
                            <p className="tamañoFuente">
                                "Permite que tu cuerpo se recupere adecuadamente. El descanso es esencial para la reparación muscular y el bienestar general."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

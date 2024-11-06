import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

import ContenedorFooter from "@/Components/Inicio/ContenedorFooter";
import ContenedorMensaje from "@/Components/Inicio/ContenedorMensaje";
import ContenedorColor from "@/Components/Inicio/ContenedorColor";
import ContenedorResultado from "@/Components/Inicio/ContenedorResultado";
import ContenedorMensajeAdicional from "@/Components/Inicio/ContenedorMensajeAdicional";
import ContenedorPost from "@/Components/Inicio/ContenedorPost";
import { usePage } from "@inertiajs/react";
import "./Inicio.css";

export default function Inicio({ auth }) {
    const { blogs } = usePage().props;

    // Ordena los blogs de más reciente a más antiguo
    const sortedBlogs = [...blogs].sort(
        (a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    const formatFechaBlog = (fecha_publicacion) => {
        const date = new Date(fecha_publicacion);
        return (
            date.toLocaleDateString("es-ES") +
            " " +
            date.toLocaleTimeString("es-ES")
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, blogs.length - 1)
        );
    };

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
                            <h1 className="titulo-gris">
                                Bienvenido a nuestra fábrica de atletas
                            </h1>
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
                            <p className="aumentoTamaño">
                                Consigue ese físico que tanto deseaste algún día
                                en TheGymMondelo, donde tus metas se hacen
                                realidad con esfuerzo y constancia.
                            </p>
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
                        <h2 className="titulo-tips">
                            TIPS PARA CONSEGUIR TU ANSIADO CAMBIO FÍSICO
                        </h2>
                    </div>

                    {/* Contenedores de información */}
                    <div className="contenedor-info">
                        <div className="info-item">
                            <h3>EJERCICIO</h3>
                            <p className="tamañoFuente">
                                "Mantén una rutina de ejercicio variada y
                                constante para fortalecer tu cuerpo y mejorar tu
                                salud cardiovascular."
                            </p>
                        </div>
                        <div className="info-item">
                            <h3>ALIMENTACION</h3>
                            <p className="tamañoFuente">
                                "Nutre tu cuerpo con alimentos balanceados y
                                adecuados para tus objetivos de fitness. La
                                alimentación es clave para el rendimiento y la
                                recuperación."
                            </p>
                        </div>
                        <div className="info-item">
                            <h3>MOTIVACIÓN</h3>
                            <p className="tamañoFuente">
                                "Mantén una mentalidad positiva y enfocada.
                                Encuentra tu motivación interna y establece
                                metas alcanzables para mantener el impulso."
                            </p>
                        </div>
                        <div className="info-item">
                            <h3>DESCANSO</h3>
                            <p className="tamañoFuente">
                                "Permite que tu cuerpo se recupere
                                adecuadamente. El descanso es esencial para la
                                reparación muscular y el bienestar general."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ContenedorFooter />
            <ContenedorMensaje />
            <ContenedorColor />
            <ContenedorResultado />
            <ContenedorMensajeAdicional />

            {/* Nuevo contenedor para el título y las imágenes */}
            <div className="contenedor-gris-oscuro">
                <div className="contenedor-cuadrado">
                    <h1 className="titulo-principal">
                        {" "}
                        <strong>
                            ÚNETE A LA REVOLUCIÓN DEL MOVIMIENTO
                        </strong>{" "}
                    </h1>
                    <div className="contenido-flex">
                        <div className="texto">
                            <p>
                                Transforma tu cuerpo y tu vida con nuestros{" "}
                                <br />
                                <strong>PLANES DE ENTRENAMIENTO</strong>{" "}
                                diseñados para <br />
                                <strong>
                                    PERDER PESO, TONIFICAR y GANAR MÚSCULO.
                                </strong>
                            </p>
                            <p>
                                Entrena donde quieras, cuando quieras, <br />
                                sin necesidad de equipo. Cada plan incluye{" "}
                                <br />
                                <strong>GUÍAS DE NUTRICIÓN</strong> adaptadas a
                                tus <br />
                                objetivos específicos.
                            </p>
                            <p>
                                Además, disfruta de nuestros <br />
                                <strong>PROGRAMAS</strong> con más de 1000
                                rutinas: <br />
                                entrenamiento de fuerza, cardio, glúteos, yoga,{" "}
                                <br />
                                pilates, combate, cross house, ejercicios para
                                niños, <br />
                                rutinas rápidas, entrenamientos en vivo diarios{" "}
                                <br />y mucho más.
                            </p>
                            <p>
                                Independientemente de tu nivel de <br />
                                experiencia, nuestros ejercicios están diseñados{" "}
                                <br />
                                para que puedas progresar desde el nivel más
                                básico <br />
                                hasta el más avanzado.
                            </p>
                        </div>
                        <div className="imagen-derecha">
                            <img
                                src="/imagenes/index/4-fotoCardio.jpg"
                                alt="Cardio"
                                className="imagen-media"
                            />
                        </div>
                    </div>
                    <div className="imagen-ancha">
                        <img
                            src="/imagenes/index/5-sala.jpg"
                            alt="Sala"
                            className="imagen-pequeña"
                        />
                    </div>
                </div>
                <h2 className="titulo-seccion">
                    PLANES DE EJERCICIO Y ALIMENTACIÓN
                </h2>
                <div className="contenedor-imagenes">
                    <div className="imagen-alineada">
                        <img
                            src="/imagenes/index/6-adelgazar.jpg"
                            alt="Adelgazar"
                        />
                        <div className="texto-imagen">ADELGAZAR</div>
                    </div>
                    <div className="imagen-alineada">
                        <img
                            src="/imagenes/index/7-musculacion.jpg"
                            alt="Musculación"
                        />
                        <div className="texto-imagen">MUSCULACIÓN</div>
                    </div>
                    <div className="imagen-alineada">
                        <img
                            src="/imagenes/index/8-definicion.jpg"
                            alt="Definición"
                        />
                        <div className="texto-imagen">DEFINICIÓN</div>
                    </div>
                    <div className="imagen-alineada">
                        <img
                            src="/imagenes/index/9-muchoMas.jpg"
                            alt="Mucho Más"
                        />
                        <div className="texto-imagen">MUCHO MÁS</div>
                    </div>
                </div>
            </div>

            {/* Contenedor blanco con los posts */}
            <div className="contenedor-blanco">
            <h1 className="masGrande">💡  💡  💡  💡  💡  💡</h1> <br />
            <h1 className="masGrande2">
                    <strong>
                        {" "}
                        NOTICIAS Y CONSEJOS DE NUESTROS ENTRENADORES{" "}
                    </strong>
                </h1>
                <br />
                <h2 className="masGrande">
                    <strong>
                        Descubre las últimas publicaciones de nuestros
                        entrenadores,
                        <br />
                        con recomendaciones, consejos prácticos y
                        actualizaciones.
                        <br />
                        Nuestro equipo comparte sus conocimientos para ayudarte
                        <br />
                        a mejorar tu rendimiento, cuidar tu salud y alcanzar tus
                        metas.
                        <br />
                        Únete a nuestra comunidad y mantente informado.
                    </strong>
                </h2>
                <ContenedorPost
                    blogs={sortedBlogs}
                    currentIndex={currentIndex}
                    formatFechaBlog={formatFechaBlog}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

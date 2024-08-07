// Inicio.jsx
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

            {/* Contenedor comienza ya */}
            <div className="contenedor-footer">
                <a href="/clases/index" className="boton-comienza">
                    Comienza hoy con tu cambio →
                </a>
                <p className="mensaje-footer">
                    Únete a +10.000 usuarios con las mismas ganas y objetivos que TÚ.
                </p>
            </div>

            {/* Contenedor de mensaje adicional */}
            <div className="contenedor-mensaje">
                <p className="mensaje-adicional">
                    Te queremos explicar la diferencia entre trabajar por tu cuenta y contar con <br /> un equipo profesional como <span className="highlight">TheGymMondelo</span> para que sepas lo <br /> importante que es el soporte deportivo en tu rutina →
                </p>
            </div>

            {/* Contenedores con fondo color */}
            <div className="contenedores-color">
                <div className="contenedor-rosado">
                    <h3 className="titulo-rosado">Preparación propia  ❌</h3>
                    <div className="contenido-rosado">
                        <p>❌ Planificacion: El echo de crear tus propias rutinas y planes de entrenamiento sin conocimiento previo puede afectar a tu progreso. Podría llegar un punto en el que quedes atrapado en esa misma rutina permanente y no avances como se debe, al no tener nadie que te plantee un entreno efectivo y adecuado para tu propósito.</p>
                        <hr />
                        <p>❌ Ejercicios: Mantener la efectividad y la variedad en tus entrenamientos es crucial. Sin una orientación adecuada, es probable que tus rutinas se vuelvan monótonas e ineficaces, lo cual puede llevarte al desinterés y la falta de motivación. Además, ejecutar ejercicios con técnica incorrecta aumenta el riesgo de lesiones. La ausencia de progresión adecuada puede resultar en estancamiento y frustración en tus objetivos físicos.</p>
                        <hr />
                        <p>❌ Alimentos: Adoptar dietas encontradas en internet sin asegurarte de su calidad y sostenibilidad puede resultar en restricciones excesivas y planes poco saludables. Esto podría llevar a una relación negativa con la comida, generando ansiedad y frustración debido a la falta de nutrientes esenciales.</p>
                        <hr />
                        <p>❌ Motivación: Enfrentarás un gran desafío sin el respaldo de una comunidad o metas claras, lo que puede llevar a la pérdida de constancia y motivación. Después de la primera semana, es probable que te desanimes y consideres abandonar.</p>
                        <hr />
                        <p>❌ Hábitos: El mayor error es intentar cambios drásticos de un día para otro. El cerebro necesita tiempo para adaptarse, por lo que estos cambios suelen ser insostenibles a largo plazo. Cada intento fallido reduce las posibilidades de éxito y puede llevar a recaídas, comprometiendo tus avances alcanzados.</p>
                    </div>
                </div>
                <div className="contenedor-verde">
                    <h3 className="titulo-verde">Preparación profesional  ✅</h3>
                    <div className="contenido-verde">
                        <p>✅ Planificacion: Te daremos un plan y rutina de entrenamiento específica para tu cuerpo y lo que necesites ya que disponemos de varios planes diferentes según el objetivo del cliente Y lo más importante, todo pautado por profesionales que llevan muchos años dando resultados positivos en varios de nuestros clientes.</p>
                        <hr />
                        <p>✅ Ejercicios: Disfruta de rutinas guiadas por expertos que aseguran la técnica correcta para optimizar resultados y reducir el riesgo de lesiones. Puedes elegir entre sesiones adaptadas a todos los niveles y entornos, como hogar, aire libre o gimnasio. Con una amplia gama de más de 100 entrenamientos que abarcan cardio, fuerza, yoga y pilates, siempre tendrás opciones variadas y contenido nuevo semanalmente.</p>
                        <hr />
                        <p>✅ Alimentos: Disfruta de un menú fácil, saludable y sabroso diseñado específicamente para tus objetivos. Acompañado de educación nutricional gradual y basada en evidencia científica, aprenderás cómo hacer cambios sostenibles y realistas en tu alimentación con herramientas prácticas integradas.</p>
                        <hr />
                        <p>✅ Motivación: Estarás rodeado de personas con metas similares, lo cual aumenta significativamente tus probabilidades de éxito según la investigación. La comunidad ofrece un ambiente de apoyo y camaradería crucial para mantener tu motivación y consistencia. Además, participarás en desafíos, sorteos y eventos sorpresa que mantendrán vivo tu interés y compromiso.</p>
                        <hr />
                        <p>✅ Hábitos:  Los planes están diseñados utilizando principios científicos de hábitos, lo que te permite adoptar un estilo de vida saludable de manera gradual y constante, sin depender solo de la motivación. Esto previene el abandono y evita el efecto rebote, asegurando un cambio duradero tanto mental como físico, que mantendrás a lo largo de tu vida en lugar de ser algo temporal con recaídas.</p>
                    </div>
                </div>
            </div>
            {/* Contenedor mensaje */}
            <div className="contenedor-resultado">
                <p className="mensaje-resultado">
                    Resultados = Esfuerzo, dedicación y constancia, recuérdalo siempre. 💭
                </p>
            </div>
            {/* Contenedor flechas hacia debajo */}
            <div className="contenedor-mensaje-adicional">
                <span className="emoticono izquierda">⭣</span>
                <p className="mensaje-adicional">
                    !! Esto puedes conseguir si te apuntas a realizar tu <br />
                    cambio de físico y vida con nosotros !!
                </p>
                <span className="emoticono derecha">⭣</span>
            </div>

        </AuthenticatedLayout>
    );
}

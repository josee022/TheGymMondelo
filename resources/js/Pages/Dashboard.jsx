import React from "react";
import { motion } from "framer-motion";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Footer from "@/Components/Footer";
import { FiClock, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import { FaWeight, FaDumbbell, FaHeartbeat, FaCrown } from "react-icons/fa";

export default function Dashboard({
    auth,
    isEntrenador,
    reservas = { data: [] },
    suscripciones = [],
    dieta,
    adquisiciones = [],
    pedidos = { data: [] },
}) {
    const user = auth.user;

    console.log("Suscripciones:", suscripciones);

    const getReservaBackgroundColor = (estado) => {
        switch (estado) {
            case "Confirmada":
                return "bg-lime-200";
            case "Cancelada":
                return "bg-red-300";
            default:
                return "bg-gray-100";
        }
    };

    const formatFechaReserva = (timestamp) => {
        const fecha = new Date(timestamp);
        const fechaFormateada = fecha.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
        const horaFormateada = fecha.toLocaleTimeString("es-ES", {
            hour12: false,
        });
        return `La reserva se creó el ${fechaFormateada} a las ${horaFormateada}`;
    };

    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const reservasOrdenadas = Array.isArray(reservas.data)
        ? reservas.data.sort(
              (a, b) => new Date(b.fecha_reserva) - new Date(a.fecha_reserva)
          )
        : [];
    const suscripcionesOrdenadas = Array.isArray(suscripciones)
        ? suscripciones.sort(
              (a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio)
          )
        : [];

    const formatFechaSuscripcion = (fecha) => {
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const getDietaIcon = (objetivo) => {
        switch (objetivo) {
            case "Pérdida de peso":
                return <FaWeight className="text-red-400 text-4xl" />;
            case "Ganancia muscular":
                return <FaDumbbell className="text-blue-400 text-4xl" />;
            case "Mantenimiento":
                return <FaHeartbeat className="text-green-400 text-4xl" />;
            default:
                return <FaHeartbeat className="text-gray-400 text-4xl" />;
        }
    };

    // Función para obtener los detalles de la dieta según el objetivo
    const getDietaInfo = (objetivo) => {
        switch (objetivo) {
            case "Pérdida de peso":
                return {
                    descripcion: `Esta dieta está diseñada para reducir la ingesta calórica diaria mientras te proporciona los nutrientes necesarios para mantener un nivel de energía saludable.

                                Se basa en alimentos bajos en grasa y ricos en fibra, como las verduras de hoja verde, proteínas magras y fuentes limitadas de carbohidratos complejos.

                                Se recomienda beber mucha agua, evitar azúcares añadidos y comer porciones controladas.

                                Las comidas son simples pero efectivas, con un enfoque en alimentos frescos, no procesados, y evitando el exceso de grasas saturadas o carbohidratos refinados.

                                El ejercicio cardiovascular complementa esta dieta para acelerar el proceso de pérdida de peso y mantener la masa muscular.`,
                    comidas: {
                        desayuno: [
                            "Batido verde detox con espinacas, apio y manzana",
                            "Omelette de claras de huevo con champiñones y espinacas",
                            "Yogur griego bajo en grasa con moras y nueces",
                            "Tostadas de pan integral con aguacate y tomate",
                            "Té verde sin azúcar",
                        ],
                        almuerzo: [
                            "Ensalada de espinacas con pollo y vinagreta ligera",
                            "Sopa de verduras sin crema",
                            "Pollo a la plancha con brócoli al vapor",
                            "Atún a la parrilla con ensalada verde",
                            "Quinoa con verduras al vapor",
                        ],
                        merienda: [
                            "Zanahorias baby con hummus de garbanzos",
                            "Té verde sin azúcar y rodajas de pepino",
                            "Frutas variadas como manzanas, peras y uvas",
                            "Palitos de apio con mantequilla de almendras",
                            "Pepino con queso cottage",
                        ],
                        cena: [
                            "Pescado blanco con limón y ensalada de pepino",
                            "Tofu a la parrilla con ensalada de col rizada",
                            "Sopa de lentejas con espinacas y zanahorias",
                            "Pechuga de pavo al horno con espárragos",
                            "Ensalada de garbanzos con aceite de oliva y limón",
                        ],
                    },
                };

            case "Ganancia muscular":
                return {
                    descripcion: `Este plan de dieta está centrado en la ingesta de alimentos ricos en proteínas y carbohidratos complejos para ayudar a la construcción y reparación muscular.

                                El consumo adecuado de calorías es esencial, aumentando gradualmente las porciones de carbohidratos y proteínas para proporcionar la energía necesaria durante los entrenamientos intensivos.

                                Es recomendable incluir fuentes de proteínas de alta calidad, como pechuga de pollo, carne magra y huevos, junto con carbohidratos de bajo índice glucémico como la quinoa y el arroz integral.

                                No se deben olvidar las grasas saludables, como las del aguacate, para asegurar una recuperación muscular adecuada y mejorar el rendimiento.

                                La hidratación constante y los suplementos de proteínas pueden ser necesarios en esta etapa de ganancia muscular.`,
                    comidas: {
                        desayuno: [
                            "Huevos revueltos con avena y un plátano",
                            "Batido de proteínas con leche de almendra, mantequilla de maní y avena",
                            "Tostadas de pan integral con aguacate y huevo poché",
                            "Yogur griego con frutos secos y miel",
                            "Smoothie de frutas con proteína de suero",
                        ],
                        almuerzo: [
                            "Pechuga de pollo a la plancha con arroz integral y espinacas",
                            "Salmón al horno con quinoa y espárragos",
                            "Carne magra con batata y brócoli",
                            "Atún con arroz integral y aguacate",
                            "Tacos de pollo con tortillas integrales y vegetales",
                        ],
                        merienda: [
                            "Batido post-entrenamiento con proteínas, avena y arándanos",
                            "Frutas variadas como manzanas, peras y uvas",
                            "Yogur griego con miel, nueces y frutas frescas",
                            "Almendras y nueces",
                            "Barrita de proteína casera",
                        ],
                        cena: [
                            "Filete de ternera con puré de patatas y verduras asadas",
                            "Pollo a la parrilla con aguacate y arroz integral",
                            "Ensalada de atún con aguacate, tomate y aceite de oliva",
                            "Salmón a la parrilla con ensalada de espinacas",
                            "Tortilla de claras de huevo con espinacas y champiñones",
                        ],
                    },
                };

            case "Mantenimiento":
                return {
                    descripcion: `La dieta de mantenimiento tiene como objetivo preservar el peso actual mientras se sigue un patrón alimenticio saludable y equilibrado.

                                Este enfoque incluye una combinación de proteínas magras, carbohidratos complejos y grasas saludables para asegurar que el cuerpo reciba todos los macronutrientes necesarios sin exceder en calorías.

                                Es clave mantener porciones adecuadas y evitar alimentos procesados o con azúcares añadidos.

                                La actividad física regular, como el entrenamiento de fuerza y el cardio moderado, debe mantenerse para apoyar el equilibrio entre las calorías consumidas y las gastadas.

                                Esta dieta es flexible y permite disfrutar de una variedad de alimentos nutritivos y frescos mientras se promueve un estilo de vida saludable.`,
                    comidas: {
                        desayuno: [
                            "Tostadas de pan integral con aguacate y huevo poché",
                            "Yogur griego con miel, nueces y frutas frescas",
                            "Batido de proteínas con frutas y avena",
                            "Cereales integrales con leche desnatada y frutas",
                            "Smoothie de espinacas, plátano y semillas de chía",
                        ],
                        almuerzo: [
                            "Salmón a la parrilla con ensalada de espinacas y quinoa",
                            "Pollo al horno con batata y judías verdes",
                            "Sándwich integral de pavo con aguacate y tomate",
                            "Ensalada de garbanzos con vegetales frescos",
                            "Arroz integral con pollo y verduras",
                        ],
                        merienda: [
                            "Frutas variadas como manzanas, peras y uvas",
                            "Almendras y nueces como snack saludable",
                            "Palitos de zanahoria con hummus",
                            "Yogur griego con frutas y granola",
                            "Batido de proteínas con leche de almendra",
                        ],
                        cena: [
                            "Ensalada de garbanzos con verduras frescas y aderezo de limón",
                            "Arroz integral con verduras salteadas y tofu",
                            "Sopa de lentejas con espinacas y zanahorias",
                            "Pollo al horno con ensalada de col rizada",
                            "Pescado a la parrilla con espárragos y quinoa",
                        ],
                    },
                };

            default:
                return {
                    comidas: {
                        desayuno: [],
                        almuerzo: [],
                        merienda: [],
                        cena: [],
                    },
                    descripcion:
                        "No hay detalles disponibles para este objetivo.",
                };
        }
    };

    // Obtener detalles de la dieta según el objetivo del usuario
    const dietaInfo = dieta ? getDietaInfo(dieta.objetivo) : null;

    return (
        <AuthenticatedLayout
            user={user} // Pasa el usuario al layout autenticado
            header={
                <h2 className="font-semibold text-3xl text-center text-lime-600 mt-4">
                    Panel de Control del Usuario 🔒
                </h2>
            }
        >
            <Head title="Panel de control" />{" "}
            {/* Establece el título de la página */}
            {/* Contenedor para hacer flex horizontal */}
            <div className="flex flex-col lg:flex-row lg:space-x-0 gap-0">
                {/* Primer contenedor (Información del perfil) */}
                <div className="w-full lg:w-1/2">
                    <div className="w-full bg-gradient-to-r from-gray-400 to-lime-500 shadow-lg rounded-xl p-8 h-full">
                        {/* Encabezado de la sección */}
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-extrabold text-gray-800 mb-3 relative">
                                <span className="relative inline-block">
                                    <span className="absolute inset-x-0 bottom-0 h-1 bg-[#405f0f]"></span>
                                    <span className="relative">
                                        Información del Perfil
                                    </span>
                                </span>
                            </h1>
                        </div>

                        {/* Información del perfil del usuario */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-900">
                            {/* Datos del perfil */}
                            <div>
                                <div className="mb-6 p-6 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                                    <p>
                                        <strong className="text-gray-300">
                                            Nombre:
                                        </strong>{" "}
                                        {user.name}
                                    </p>
                                </div>
                                <div className="mb-6 p-6 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                                    <p>
                                        <strong className="text-gray-300">
                                            Correo electrónico:
                                        </strong>{" "}
                                        {user.email}
                                    </p>
                                </div>
                                <div className="mb-6 p-6 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                                    <p>
                                        <strong className="text-gray-300">
                                            Fecha de nacimiento:
                                        </strong>{" "}
                                        {formatFechaClase(
                                            user.fecha_nacimiento
                                        )}
                                    </p>
                                </div>
                                <div className="mb-6 p-6 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                                    <p>
                                        <strong className="text-gray-300">
                                            Sexo:
                                        </strong>{" "}
                                        {user.sexo}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="mb-6 p-6 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                                    <p>
                                        <strong className="text-gray-300">
                                            Altura:
                                        </strong>{" "}
                                        {user.altura} cm
                                    </p>
                                </div>
                                <div className="mb-6 p-6 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                                    <p>
                                        <strong className="text-gray-300">
                                            Peso:
                                        </strong>{" "}
                                        {user.peso} kg
                                    </p>
                                </div>
                                <div className="mb-6 p-6 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                                    <p>
                                        <strong className="text-gray-300">
                                            Nivel de actividad:
                                        </strong>{" "}
                                        {user.nivel_actividad}
                                    </p>
                                </div>
                                <div className="mb-6 p-6 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                                    <p>
                                        <strong className="text-gray-300">
                                            Biografía:
                                        </strong>{" "}
                                        {user.biografia}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mensaje si el usuario es entrenador */}
                        {isEntrenador && (
                            <div className="bg-lime-200 text-green-900 p-6 rounded-md mt-8 transition-transform transform hover:scale-105 hover:bg-lime-200 shadow-lg">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <span role="img" aria-label="Trophy">
                                        🏆
                                    </span>{" "}
                                    Licencia de Entrenador en TheGymMondelo
                                </h3>
                                <p>
                                    ¡Felicidades! Eres un entrenador
                                    certificado.
                                </p>
                            </div>
                        )}

                        {/* Botón para editar el perfil del usuario */}
                        <div className="mt-8 text-center">
                            <a
                                href="/profile/edit"
                                className="bg-[#a3e635] text-black px-6 py-3 rounded-lg text-lg hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-[#a3e635] transition-transform transform hover:scale-110"
                            >
                                Editar perfil
                            </a>
                        </div>
                    </div>
                </div>

                {/* Segundo contenedor (Mis Reservas) */}
                <div className="w-full lg:w-1/2">
                    <div className="w-full bg-gradient-to-r from-gray-400 to-lime-500 shadow-lg rounded-xl p-8 h-full">
                        {/* Sección de reservas */}
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-extrabold text-gray-800 mb-3 relative">
                                <span className="relative inline-block">
                                    <span className="absolute inset-x-0 bottom-0 h-1 bg-[#405f0f]"></span>
                                    <span className="relative">
                                        Mis Reservas
                                    </span>
                                </span>
                            </h1>
                        </div>
                        {reservasOrdenadas.length > 0 ? (
                            reservasOrdenadas.map((reserva) => (
                                <div
                                    key={reserva.id}
                                    className={`${getReservaBackgroundColor(
                                        reserva.estado
                                    )} p-6 rounded-lg shadow-md mb-6 transition-transform transform hover:scale-105`}
                                >
                                    <h3 className="text-2xl font-semibold mb-2">
                                        Clase de {reserva.clase.nombre}
                                    </h3>
                                    <p className="mb-3">
                                        <strong className="text-gray-700">
                                            Fecha:
                                        </strong>{" "}
                                        {formatFechaClase(reserva.clase.fecha)}
                                    </p>
                                    <p className="mb-3">
                                        <strong className="text-gray-700">
                                            Hora:
                                        </strong>{" "}
                                        {reserva.clase.hora_inicio} -{" "}
                                        {reserva.clase.hora_fin}
                                    </p>
                                    <p className="mb-3">
                                        <strong className="text-gray-700">
                                            Estado:
                                        </strong>{" "}
                                        {reserva.estado}
                                    </p>
                                    <p className="mb-3">
                                        <strong className="text-gray-700">
                                            Fecha/Hora de la reserva:
                                        </strong>{" "}
                                        {formatFechaReserva(
                                            reserva.fecha_reserva
                                        )}
                                    </p>

                                    {reserva.estado === "Pendiente" && (
                                        <div className="mt-6">
                                            <Link
                                                href={`/reservas/${reserva.id}/confirm`}
                                                method="POST"
                                                className="bg-lime-500 text-white px-6 py-3 rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-transform transform hover:scale-105 mr-2"
                                            >
                                                Confirmar Reserva
                                            </Link>
                                            <Link
                                                href={`/reservas/${reserva.id}/cancel`}
                                                method="POST"
                                                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-transform transform hover:scale-105"
                                            >
                                                Cancelar Reserva
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-black rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    No tienes reservas
                                </h2>
                                <p className="text-gray-300">
                                    Todavía no has adquirido ninguna reserva.
                                    Cuando reserves una clase, aparecerá aquí.
                                </p>
                            </div>
                        )}
                        {reservasOrdenadas.length > 0 && (
                            <Pagination links={reservas.links} />
                        )}
                    </div>
                </div>
            </div>
            {/* Sección de Suscripciones */}
            <div className="bg-gradient-to-r from-black via-gray-900 to-green-800 p-8 rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-green-400 mb-2 relative">
                        <span className="relative inline-block">
                            <span className="relative">
                                🌟 Mi Suscripción En TheGymMondelo 🌟
                            </span>
                        </span>
                    </h1>
                </div>

                {suscripcionesOrdenadas.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                    >
                        <p className="text-2xl font-semibold text-white text-center">
                            No tienes ninguna suscripción activa en estos
                            momentos.
                        </p>
                    </motion.div>
                ) : (
                    suscripcionesOrdenadas.map((suscripcion) => (
                        <div
                            key={suscripcion.id}
                            className="max-w-4xl mx-auto bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                        >
                            <h3 className="text-3xl font-semibold mb-6 text-center text-white">
                                Suscripción {suscripcion.tipo}
                            </h3>
                            <p className="mb-2">
                                <strong className="text-white text-xl">
                                    Fecha de inicio:{" "}
                                    {formatFechaSuscripcion(
                                        suscripcion.fecha_inicio
                                    )}
                                </strong>
                            </p>
                            <p className="mb-2">
                                <strong className="text-white text-xl">
                                    Fecha de fin:{" "}
                                    {formatFechaSuscripcion(
                                        suscripcion.fecha_fin
                                    )}
                                </strong>
                            </p>
                            <p className="mb-2">
                                <strong className="text-white text-xl">
                                    Estado: {suscripcion.estado}
                                </strong>
                            </p>

                            {suscripcion.estado === "Activa" && (
                                <div className="text-right mt-6">
                                    <Link
                                        href={`/suscripciones/${suscripcion.id}/disable`}
                                        method="POST"
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Deshabilitar
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))
                )}
                <br />
                <br />
                <br />
                <h2 className="text-4xl font-extrabold text-center mb-10 text-green-400">
                    🌟 Tu Programa Adquirido 🌟
                </h2>
                <div className="max-w-4xl mx-auto hover:shadow-3xl transition-all duration-500  transform">
                    {adquisiciones.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="max-w-4xl mx-auto bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                        >
                            <p className="text-2xl font-semibold text-white text-center">
                                No tienes ningún programa adquirido aún. <br />
                                ¡Empieza ahora y alcanza tus metas!
                            </p>
                        </motion.div>
                    ) : (
                        adquisiciones.map((adquisicion, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.2,
                                }}
                                className="bg-gradient-to-r from-green-700 via-gray-900 to-black p-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 transform mb-6"
                            >
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold mb-6 text-white flex justify-center items-center">
                                        {adquisicion.programa.nombre}{" "}
                                        <FaCrown className="ml-3 text-green-400 text-4xl" />
                                    </h3>
                                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                        {adquisicion.programa.descripcion}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center justify-center text-white">
                                        <FiClock className="text-3xl mr-4" />
                                        <p className="text-xl">
                                            Duración:{" "}
                                            {adquisicion.programa.duracion}{" "}
                                            semanas
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center text-white">
                                        <FiTrendingUp className="text-3xl mr-4" />
                                        <p className="text-xl">
                                            Nivel: {adquisicion.programa.nivel}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-center text-white">
                                        <FiDollarSign className="text-3xl mr-4" />
                                        <p className="text-xl">
                                            Precio:{" "}
                                            {parseFloat(
                                                adquisicion.programa.precio
                                            ).toFixed(2)}{" "}
                                            €
                                        </p>
                                    </div>
                                </div>

                                {/* Botón para eliminar programa */}
                                <div className="text-right mt-6">
                                    <Link
                                        href={`/programas/${adquisicion.programa.id}/delete`}
                                        method="POST"
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Eliminar Programa
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
            <div className="w-full px-4 bg-gradient-to-b from-lime-400 via-lime-300 to-slate-200 shadow-lg rounded-xl p-8 overflow-hidden">
                {/* Contenedor principal */}
                <div className="w-4/5 max-w-7xl mx-auto bg-gradient-to-b from-slate-200 via-lime-300 to-lime-400 shadow-lg rounded-lg p-8">
                    {/* Encabezado de la sección */}
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span
                                    className="absolute inset-x-0 bottom-0 h-1"
                                    style={{ backgroundColor: "#a3e635" }}
                                ></span>
                                <span className="relative">
                                    Información De Su Dieta Adquirida
                                </span>
                            </span>
                        </h1>
                    </div>
                    <br />

                    <div className="p-8 bg-gradient-to-br from-green-100 via-yellow-100 to-orange-100 text-gray-800 rounded-lg shadow-lg mb-6">
                        {dieta && dietaInfo ? (
                            <>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-2xl font-bold text-green-700">{`Dieta: ${dieta.objetivo}`}</div>
                                    <div className="text-green-700 text-2xl">
                                        {getDietaIcon(dieta.objetivo)}
                                    </div>
                                </div>
                                <p className="mb-6 text-gray-700 font-semibold leading-relaxed">
                                    {dietaInfo.descripcion}
                                </p>

                                {/* Desayuno */}
                                <h3 className="text-xl font-bold mb-4 text-green-600 border-b-2 border-green-200 pb-2">
                                    Desayuno:
                                </h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    {dietaInfo.comidas.desayuno.map(
                                        (comida, index) => (
                                            <li
                                                key={index}
                                                className="text-gray-700 font-semibold"
                                            >
                                                {comida}
                                            </li>
                                        )
                                    )}
                                </ul>

                                {/* Almuerzo */}
                                <h3 className="text-xl font-bold mt-6 mb-4 text-yellow-600 border-b-2 border-yellow-200 pb-2">
                                    Almuerzo:
                                </h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    {dietaInfo.comidas.almuerzo.map(
                                        (comida, index) => (
                                            <li
                                                key={index}
                                                className="text-gray-700 font-semibold"
                                            >
                                                {comida}
                                            </li>
                                        )
                                    )}
                                </ul>

                                {/* Merienda */}
                                <h3 className="text-xl font-bold mt-6 mb-4 text-orange-600 border-b-2 border-orange-200 pb-2">
                                    Merienda:
                                </h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    {dietaInfo.comidas.merienda.map(
                                        (comida, index) => (
                                            <li
                                                key={index}
                                                className="text-gray-700 font-semibold"
                                            >
                                                {comida}
                                            </li>
                                        )
                                    )}
                                </ul>

                                {/* Cena */}
                                <h3 className="text-xl font-bold mt-6 mb-4 text-red-600 border-b-2 border-red-200 pb-2">
                                    Cena:
                                </h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    {dietaInfo.comidas.cena.map(
                                        (comida, index) => (
                                            <li
                                                key={index}
                                                className="text-gray-700 font-semibold"
                                            >
                                                {comida}
                                            </li>
                                        )
                                    )}
                                </ul>

                                {/* Botón para eliminar dieta */}
                                <div className="text-right mt-6">
                                    <Link
                                        href={`/dietas/${dieta.id}/delete`}
                                        method="POST"
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Eliminar Dieta
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-600 font-semibold text-xl">
                                No tienes ninguna dieta adquirida.
                            </div>
                        )}
                    </div>
                </div>
                <br />
                <br />
                <br />

                {/* Sección de Facturas */}
                <div className="w-full px-4 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 shadow-lg rounded-xl p-8 mt-10">
                    <div className="w-4/5 max-w-7xl mx-auto bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 shadow-lg rounded-lg p-8">
                        <div className="text-center mb-6">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                                <span className="relative inline-block">
                                    <span
                                        className="absolute inset-x-0 bottom-0 h-1"
                                        style={{ backgroundColor: "#a3e635" }}
                                    ></span>
                                    <span className="relative">
                                        Facturas de Pedidos
                                    </span>
                                </span>
                            </h1>
                        </div>
                        {/* Contenedor de Facturas en formato de 2x2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between">
                            {pedidos.data.length === 0 ? (
                                <div className="w-full flex justify-center items-center text-center p-6 bg-gray-200 rounded-lg shadow-md mt-8">
                                    <p className="text-2xl font-semibold text-gray-600">
                                        No tienes facturas generadas. Visita
                                        nuestra tienda para poder adquirir
                                        nuestro material de más alta calidad,
                                        que te ayudará a seguir progresando en
                                        ti.
                                    </p>
                                </div>
                            ) : (
                                pedidos.data.map((pedido) => (
                                    <div
                                        key={pedido.id}
                                        className="max-w-xl bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                    >
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-3xl font-bold text-gray-700">
                                                Factura #{pedido.id}
                                            </h3>
                                            <span
                                                className={`text-xl font-bold ${
                                                    pedido.estado ===
                                                    "Pendiente"
                                                        ? "text-yellow-500"
                                                        : pedido.estado ===
                                                          "Enviado"
                                                        ? "text-blue-500"
                                                        : pedido.estado ===
                                                          "Entregado"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {pedido.estado}
                                            </span>
                                        </div>
                                        <p className="text-xl text-gray-600 mb-4">
                                            <strong>Fecha:</strong>{" "}
                                            {pedido.fecha_pedido}
                                        </p>
                                        <p className="text-xl text-gray-600 mb-4">
                                            <strong>Total:</strong>{" "}
                                            {parseFloat(pedido.total).toFixed(
                                                2
                                            )}{" "}
                                            €
                                        </p>
                                        <div className="text-right mt-6">
                                            <a
                                                href={`/pedidos/${pedido.id}/show`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700"
                                            >
                                                Ver Detalles
                                            </a>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {pedidos.data.length > 0 && (
                            <Pagination links={pedidos.links} />
                        )}
                    </div>
                </div>
            </div>
            <Footer /> {/* Pie de página */}
        </AuthenticatedLayout>
    );
}

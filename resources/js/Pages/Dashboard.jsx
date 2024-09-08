import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importa el layout que envuelve la página
import { Head, Link } from '@inertiajs/react'; // Importa componentes de InertiaJS para manejo de estado y enlaces
import Pagination from '@/Components/Pagination'; // Importa el componente de paginación
import Footer from '@/Components/Footer'; // Importa el componente de pie de página
import { FaWeight, FaDumbbell, FaHeartbeat } from 'react-icons/fa'; // Iconos representativos

export default function Dashboard({ auth, isEntrenador, reservas, suscripciones, dieta }) {
    const user = auth.user; // Extrae el usuario autenticado del objeto auth

    // Función para determinar el color de fondo de la reserva según su estado
    const getReservaBackgroundColor = (estado) => {
        switch (estado) {
            case 'Confirmada':
                return 'bg-green-100'; // Verde claro para reservas confirmadas
            case 'Cancelada':
                return 'bg-red-100'; // Rojo claro para reservas canceladas
            default:
                return 'bg-gray-100'; // Gris claro para otros estados
        }
    };

    // Función para formatear la fecha y hora de la reserva
    const formatFechaReserva = (timestamp) => {
        const fecha = new Date(timestamp); // Convierte el timestamp en un objeto Date
        const fechaFormateada = fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }); // Formatea la fecha como dd-mm-yyyy
        const horaFormateada = fecha.toLocaleTimeString('es-ES', { hour12: false }); // Formatea la hora en formato HH:mm:ss
        return `La reserva se creó el ${fechaFormateada} a las ${horaFormateada}`; // Devuelve la fecha y hora en un formato legible
    };

    // Función para formatear la fecha de la clase
    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha); // Convierte la fecha en un objeto Date
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }); // Formatea la fecha como dd-mm-yyyy
    };

    // Ordena las reservas de la más reciente a la más antigua
    const reservasOrdenadas = reservas.data.sort((a, b) => new Date(b.fecha_reserva) - new Date(a.fecha_reserva));

    // Función para determinar el color de fondo de la suscripción según su estado
    const getSuscripcionBackgroundColor = (estado) => {
        switch (estado) {
            case 'Activa':
                return 'bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 text-white'; // Azul claro para suscripciones activas
            case 'Caducada':
                return 'bg-gray-100'; // Gris claro para suscripciones caducadas
            default:
                return 'bg-gray-200'; // Gris más claro para otros estados
        }
    };

    // Función para formatear la fecha de la suscripción
    const formatFechaSuscripcion = (fecha) => {
        const fechaObj = new Date(fecha); // Convierte la fecha en un objeto Date
        return fechaObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }); // Formatea la fecha como dd-mm-yyyy
    };

    // Ordena las suscripciones de la más reciente a la más antigua
    const suscripcionesOrdenadas = suscripciones.data.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));

    // Función para obtener icono según el objetivo de la dieta
    const getDietaIcon = (objetivo) => {
        switch (objetivo) {
            case 'Pérdida de peso':
                return <FaWeight className="text-red-400 text-4xl" />;
            case 'Ganancia muscular':
                return <FaDumbbell className="text-blue-400 text-4xl" />;
            case 'Mantenimiento':
                return <FaHeartbeat className="text-green-400 text-4xl" />;
            default:
                return <FaHeartbeat className="text-gray-400 text-4xl" />;
        }
    };

    // Función para obtener los detalles de la dieta según el objetivo
    const getDietaInfo = (objetivo) => {
        switch (objetivo) {
            case 'Pérdida de peso':
                return {
                    descripcion: `Esta dieta está diseñada para reducir la ingesta calórica diaria mientras te proporciona los nutrientes necesarios para mantener un nivel de energía saludable.

                                Se basa en alimentos bajos en grasa y ricos en fibra, como las verduras de hoja verde, proteínas magras y fuentes limitadas de carbohidratos complejos.

                                Se recomienda beber mucha agua, evitar azúcares añadidos y comer porciones controladas.

                                Las comidas son simples pero efectivas, con un enfoque en alimentos frescos, no procesados, y evitando el exceso de grasas saturadas o carbohidratos refinados.

                                El ejercicio cardiovascular complementa esta dieta para acelerar el proceso de pérdida de peso y mantener la masa muscular.`,
                    comidas: {
                        desayuno: [
                            'Batido verde detox con espinacas, apio y manzana',
                            'Omelette de claras de huevo con champiñones y espinacas',
                            'Yogur griego bajo en grasa con moras y nueces',
                            'Tostadas de pan integral con aguacate y tomate',
                            'Té verde sin azúcar'
                        ],
                        almuerzo: [
                            'Ensalada de espinacas con pollo y vinagreta ligera',
                            'Sopa de verduras sin crema',
                            'Pollo a la plancha con brócoli al vapor',
                            'Atún a la parrilla con ensalada verde',
                            'Quinoa con verduras al vapor'
                        ],
                        merienda: [
                            'Zanahorias baby con hummus de garbanzos',
                            'Té verde sin azúcar y rodajas de pepino',
                            'Frutas variadas como manzanas, peras y uvas',
                            'Palitos de apio con mantequilla de almendras',
                            'Pepino con queso cottage'
                        ],
                        cena: [
                            'Pescado blanco con limón y ensalada de pepino',
                            'Tofu a la parrilla con ensalada de col rizada',
                            'Sopa de lentejas con espinacas y zanahorias',
                            'Pechuga de pavo al horno con espárragos',
                            'Ensalada de garbanzos con aceite de oliva y limón'
                        ]
                    }
                };

            case 'Ganancia muscular':
                return {
                    descripcion: `Este plan de dieta está centrado en la ingesta de alimentos ricos en proteínas y carbohidratos complejos para ayudar a la construcción y reparación muscular.

                                El consumo adecuado de calorías es esencial, aumentando gradualmente las porciones de carbohidratos y proteínas para proporcionar la energía necesaria durante los entrenamientos intensivos.

                                Es recomendable incluir fuentes de proteínas de alta calidad, como pechuga de pollo, carne magra y huevos, junto con carbohidratos de bajo índice glucémico como la quinoa y el arroz integral.

                                No se deben olvidar las grasas saludables, como las del aguacate, para asegurar una recuperación muscular adecuada y mejorar el rendimiento.

                                La hidratación constante y los suplementos de proteínas pueden ser necesarios en esta etapa de ganancia muscular.`,
                    comidas: {
                        desayuno: [
                            'Huevos revueltos con avena y un plátano',
                            'Batido de proteínas con leche de almendra, mantequilla de maní y avena',
                            'Tostadas de pan integral con aguacate y huevo poché',
                            'Yogur griego con frutos secos y miel',
                            'Smoothie de frutas con proteína de suero'
                        ],
                        almuerzo: [
                            'Pechuga de pollo a la plancha con arroz integral y espinacas',
                            'Salmón al horno con quinoa y espárragos',
                            'Carne magra con batata y brócoli',
                            'Atún con arroz integral y aguacate',
                            'Tacos de pollo con tortillas integrales y vegetales'
                        ],
                        merienda: [
                            'Batido post-entrenamiento con proteínas, avena y arándanos',
                            'Frutas variadas como manzanas, peras y uvas',
                            'Yogur griego con miel, nueces y frutas frescas',
                            'Almendras y nueces',
                            'Barrita de proteína casera'
                        ],
                        cena: [
                            'Filete de ternera con puré de patatas y verduras asadas',
                            'Pollo a la parrilla con aguacate y arroz integral',
                            'Ensalada de atún con aguacate, tomate y aceite de oliva',
                            'Salmón a la parrilla con ensalada de espinacas',
                            'Tortilla de claras de huevo con espinacas y champiñones'
                        ]
                    }
                };

            case 'Mantenimiento':
                return {
                    descripcion: `La dieta de mantenimiento tiene como objetivo preservar el peso actual mientras se sigue un patrón alimenticio saludable y equilibrado.

                                Este enfoque incluye una combinación de proteínas magras, carbohidratos complejos y grasas saludables para asegurar que el cuerpo reciba todos los macronutrientes necesarios sin exceder en calorías.

                                Es clave mantener porciones adecuadas y evitar alimentos procesados o con azúcares añadidos.

                                La actividad física regular, como el entrenamiento de fuerza y el cardio moderado, debe mantenerse para apoyar el equilibrio entre las calorías consumidas y las gastadas.

                                Esta dieta es flexible y permite disfrutar de una variedad de alimentos nutritivos y frescos mientras se promueve un estilo de vida saludable.`,
                    comidas: {
                        desayuno: [
                            'Tostadas de pan integral con aguacate y huevo poché',
                            'Yogur griego con miel, nueces y frutas frescas',
                            'Batido de proteínas con frutas y avena',
                            'Cereales integrales con leche desnatada y frutas',
                            'Smoothie de espinacas, plátano y semillas de chía'
                        ],
                        almuerzo: [
                            'Salmón a la parrilla con ensalada de espinacas y quinoa',
                            'Pollo al horno con batata y judías verdes',
                            'Sándwich integral de pavo con aguacate y tomate',
                            'Ensalada de garbanzos con vegetales frescos',
                            'Arroz integral con pollo y verduras'
                        ],
                        merienda: [
                            'Frutas variadas como manzanas, peras y uvas',
                            'Almendras y nueces como snack saludable',
                            'Palitos de zanahoria con hummus',
                            'Yogur griego con frutas y granola',
                            'Batido de proteínas con leche de almendra'
                        ],
                        cena: [
                            'Ensalada de garbanzos con verduras frescas y aderezo de limón',
                            'Arroz integral con verduras salteadas y tofu',
                            'Sopa de lentejas con espinacas y zanahorias',
                            'Pollo al horno con ensalada de col rizada',
                            'Pescado a la parrilla con espárragos y quinoa'
                        ]
                    }
                };

            default:
                return {
                    comidas: {
                        desayuno: [],
                        almuerzo: [],
                        merienda: [],
                        cena: []
                    },
                    descripcion: 'No hay detalles disponibles para este objetivo.'
                };
        }
    };




    // Obtener detalles de la dieta según el objetivo del usuario
    const dietaInfo = getDietaInfo(dieta.objetivo);

    return (
        <AuthenticatedLayout
            user={user} // Pasa el usuario al layout autenticado
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel de control del usuario :</h2>} // Encabezado del panel de control
        >
            <Head title="Panel de control" /> {/* Establece el título de la página */}

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
                {/* Contenedor principal */}
                <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-gray-100 to-slate-300 shadow-md rounded-lg p-6">
                    {/* Encabezado de la sección */}
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">Información del Perfil</span>
                            </span>
                        </h1>
                    </div>

                    {/* Información del perfil del usuario */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-900">
                        <div>
                            <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105">
                                <p><strong className="text-gray-300">Nombre:</strong> {user.name}</p>
                            </div>
                            <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105">
                                <p><strong className="text-gray-300">Correo electrónico:</strong> {user.email}</p>
                            </div>
                            <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105">
                                <p><strong className="text-gray-300">Fecha de nacimiento:</strong> {formatFechaClase(user.fecha_nacimiento)}</p>
                            </div>
                            <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105">
                                <p><strong className="text-gray-300">Sexo:</strong> {user.sexo}</p>
                            </div>
                        </div>
                        <div>
                            <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105">
                                <p><strong className="text-gray-300">Altura:</strong> {user.altura} cm</p>
                            </div>
                            <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105">
                                <p><strong className="text-gray-300">Peso:</strong> {user.peso} kg</p>
                            </div>
                            <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105">
                                <p><strong className="text-gray-300">Nivel de actividad:</strong> {user.nivel_actividad}</p>
                            </div>
                            <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105">
                                <p><strong className="text-gray-300">Biografía:</strong> {user.biografia}</p>
                            </div>
                        </div>
                    </div>



                    {/* Mensaje si el usuario es entrenador */}
                    {isEntrenador && (
                        <div className="bg-green-200 text-green-800 p-4 rounded-md mt-6 transition-transform transform hover:scale-105 hover:bg-green-200">
                            <h3 className="text-xl font-semibold">Licencia de Entrenador en TheGymMondelo</h3>
                            <p>¡Felicidades! Eres un entrenador certificado.</p>
                        </div>
                    )}



                    {/* Botón para editar el perfil del usuario */}
                    <div className="mt-6 text-center">
                        <a href="/profile/edit" className="bg-[#a3e635] text-black px-4 py-2 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#a3e635]">
                            Editar perfil
                        </a>
                    </div>
                </div>
                <br />

                <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-gray-100 to-slate-300 shadow-md rounded-lg p-6">
                    {/* Sección de reservas */}
                    <div className="mt-12">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">Mis Reservas</span>
                            </span>
                        </h1>
                    </div>
                        {reservasOrdenadas.length === 0 ? (
                            <p className="text-gray-600">No tienes reservas realizadas.</p>
                        ) : (
                            reservasOrdenadas.map((reserva) => (
                                <div
                                    key={reserva.id}
                                    className={`${getReservaBackgroundColor(reserva.estado)} p-4 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105`}
                                >
                                    <h3 className="text-xl font-semibold mb-2">Clase de {reserva.clase.nombre}</h3>
                                    <p className="mb-2"><strong className="text-gray-700">Fecha:</strong> {formatFechaClase(reserva.clase.fecha)}</p>
                                    <p className="mb-2"><strong className="text-gray-700">Hora:</strong> {reserva.clase.hora_inicio} - {reserva.clase.hora_fin}</p>
                                    <p className="mb-2"><strong className="text-gray-700">Estado:</strong> {reserva.estado}</p>
                                    <p className="mb-2"><strong className="text-gray-700">Fecha/Hora de la reserva:</strong> {formatFechaReserva(reserva.fecha_reserva)}</p>
                                    {reserva.estado === 'Pendiente' && (
                                        <div className="mt-4">
                                            <Link
                                                href={`/reservas/${reserva.id}/confirm`}
                                                method="POST"
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                                            >
                                                Confirmar Reserva
                                            </Link>
                                            <Link
                                                href={`/reservas/${reserva.id}/cancel`}
                                                method="POST"
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Cancelar Reserva
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}

                        <Pagination links={reservas.links} /> {/* Componente de paginación para las reservas */}
                    </div>
                </div>
                <br />

                <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-gray-100 to-slate-300 shadow-md rounded-lg p-6">
                    {/* Sección de suscripciones */}
                    <div className="mt-12">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">Mi Suscripción En TheGymMondelo</span>
                            </span>
                        </h1>
                    </div>                        {suscripcionesOrdenadas.length === 0 ? (
                            <div className="text-center p-6 rounded-md bg-gradient-to-r from-gray-700 via-gray-800 to-black shadow-lg animate-pulse">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m-1-4h.01M12 4v.01M6 8h.01M18 8h.01M6 16h.01M18 16h.01M9 12h6" />
                                </svg>
                                <p className="text-2xl font-semibold text-white">No tienes ninguna suscripción activa en estos momentos.</p>
                                <p className="text-lg text-gray-300 mt-2">¡Es el momento perfecto para unirte a nuestras clases y mejorar tu salud!</p>
                            </div>
                        ) : (
                            suscripcionesOrdenadas.map((suscripcion) => (
                                <div key={suscripcion.id} className={`${getSuscripcionBackgroundColor(suscripcion.estado)} p-4 rounded-lg shadow-md mb-4`}>
                                    <h3 className="text-3xl font-semibold mb-2 text-center">
                                        Suscripción {suscripcion.tipo}
                                    </h3>
                                    <p className="mb-2"><strong className="text-white text-xl">Fecha de inicio:</strong> {formatFechaSuscripcion(suscripcion.fecha_inicio)}</p>
                                    <p className="mb-2"><strong className="text-white text-xl">Fecha de fin:</strong> {formatFechaSuscripcion(suscripcion.fecha_fin)}</p>
                                    <p className="mb-2"><strong className="text-white text-xl">Estado:</strong> {suscripcion.estado}</p>

                                    {/* Botón para deshabilitar la suscripción */}
                                    {suscripcion.estado === 'Activa' && (
                                        <div className="text-right mt-4">
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
                    </div>
                </div>

                <br />

                {/* Contenedor principal */}
                <div className="w-4/5 max-w-7xl mx-auto bg-gradient-to-r from-gray-100 to-slate-300 shadow-lg rounded-lg p-8">

                    {/* Encabezado de la sección */}
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">Información De La Dieta</span>
                            </span>
                        </h1>
                    </div>
                    <br />

                    {/* Sección de la dieta del usuario */}
                    <div className="p-8 bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-700 rounded-lg shadow-lg mb-6 transition-transform transform hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-2xl font-semibold">Dieta: {dieta.objetivo}</div>
                            {/* Icono según el objetivo */}
                            <div>{getDietaIcon(dieta.objetivo)}</div>
                        </div>
                        <p className="mb-6 text-gray-600 leading-relaxed">{dietaInfo.descripcion}</p>

                        {/* Desayuno */}
                        <h3 className="text-xl font-bold mb-4">Desayuno:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            {dietaInfo.comidas.desayuno.map((comida, index) => (
                                <li key={index} className="text-gray-600">{comida}</li>
                            ))}
                        </ul>

                        {/* Almuerzo */}
                        <h3 className="text-xl font-bold mt-6 mb-4">Almuerzo:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            {dietaInfo.comidas.almuerzo.map((comida, index) => (
                                <li key={index} className="text-gray-600">{comida}</li>
                            ))}
                        </ul>

                        {/* Merienda */}
                        <h3 className="text-xl font-bold mt-6 mb-4">Merienda:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            {dietaInfo.comidas.merienda.map((comida, index) => (
                                <li key={index} className="text-gray-600">{comida}</li>
                            ))}
                        </ul>

                        {/* Cena */}
                        <h3 className="text-xl font-bold mt-6 mb-4">Cena:</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            {dietaInfo.comidas.cena.map((comida, index) => (
                                <li key={index} className="text-gray-600">{comida}</li>
                            ))}
                        </ul>
                    </div>
                </div>


            </div>
            <Footer /> {/* Pie de página */}
        </AuthenticatedLayout>
    );
}

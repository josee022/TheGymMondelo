import React from "react";

export default function InfoPerfil({ user, isEntrenador }) {
    const formatFechaClase = (fecha) => {
        if (!fecha) return "No disponible";
        const fechaObj = new Date(fecha);
        return fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="w-full lg:w-1/2 min-h-[700px] bg-gradient-to-r from-gray-400 to-lime-500 shadow-lg rounded-xl p-8 flex flex-col justify-between relative">
            {/* Contenedor superior para imagen y título */}
            <div className="flex items-center gap-8 mb-6">
                {/* Imagen del perfil */}
                <div className="flex-shrink-0">
                    <img
                        src={
                            user.foto_perfil
                                ? `/fotos_perfil/${user.foto_perfil}`
                                : "/images/default-avatar.png"
                        }
                        alt="Foto de perfil"
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-gray-700 shadow-md"
                    />
                </div>
                {/* Título */}
                <h1 className="text-6xl font-extrabold text-gray-800">
                    <span className="relative inline-block">
                        <span className="absolute inset-x-0 bottom-0 h-1 bg-[#405f0f]"></span>
                        <span className="relative">Información del Perfil</span>
                    </span>
                </h1>
            </div>

            {/* Información del perfil */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-900 mb-6">
                <div>
                    <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                        <p>
                            <strong className="text-gray-300">Nombre:</strong>{" "}
                            {user.name}
                        </p>
                    </div>
                    <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                        <p>
                            <strong className="text-gray-300">
                                Correo electrónico:
                            </strong>{" "}
                            {user.email}
                        </p>
                    </div>
                    <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                        <p>
                            <strong className="text-gray-300">
                                Fecha de nacimiento:
                            </strong>{" "}
                            {formatFechaClase(user.fecha_nacimiento)}
                        </p>
                    </div>
                    <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                        <p>
                            <strong className="text-gray-300">Sexo:</strong>{" "}
                            {user.sexo}
                        </p>
                    </div>
                </div>
                <div>
                    <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                        <p>
                            <strong className="text-gray-300">Altura:</strong>{" "}
                            {user.altura} cm
                        </p>
                    </div>
                    <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                        <p>
                            <strong className="text-gray-300">Peso:</strong>{" "}
                            {user.peso} kg
                        </p>
                    </div>
                    <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                        <p>
                            <strong className="text-gray-300">
                                Nivel de actividad:
                            </strong>{" "}
                            {user.nivel_actividad}
                        </p>
                    </div>
                    <div className="mb-4 p-4 bg-slate-800 text-white rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-900">
                        <p>
                            <strong className="text-gray-300">
                                Biografía:
                            </strong>{" "}
                            {user.biografia}
                        </p>
                    </div>
                </div>
            </div>

            {/* Mensaje de entrenador */}
            {isEntrenador && (
                <div className="bg-lime-200 text-green-900 p-6 rounded-md mb-6 shadow-lg">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <span role="img" aria-label="Trophy">
                            🏆
                        </span>{" "}
                        Licencia de Entrenador en TheGymMondelo
                    </h3>
                    <p>¡Felicidades! Eres un entrenador certificado.</p>
                </div>
            )}

            {/* Botón de editar */}
            <div className="mt-auto text-center">
                <a
                    href="/profile/edit"
                    className="bg-[#a3e635] text-black px-6 py-3 rounded-lg text-lg hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-[#a3e635] transition-transform transform hover:scale-110"
                >
                    Editar perfil
                </a>
            </div>
        </div>
    );
}

import React from "react";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";

export default function Reservas({
    reservas, // Lista de reservas realizadas
    selectedDateReservas, // Fecha seleccionada para filtrar las reservas
    handleDateChange, // Función para manejar cambios en la fecha seleccionada
    resetDateFilter, // Función para reiniciar el filtro de fecha
}) {
    // Devuelve el color de fondo según el estado de la reserva
    const getReservaBackgroundColor = (estado) => {
        switch (estado) {
            case "Confirmada":
                return "bg-lime-200"; // Fondo verde claro para reservas confirmadas
            case "Cancelada":
                return "bg-red-300"; // Fondo rojo claro para reservas canceladas
            default:
                return "bg-gray-100"; // Fondo gris claro para otros estados
        }
    };

    // Formatea la fecha de creación de la reserva
    const formatFechaReserva = (timestamp) => {
        const fecha = new Date(timestamp); // Convierte el timestamp en un objeto Date
        return `La reserva se creó el ${fecha.toLocaleDateString("es-ES", {
            day: "2-digit", // Día en formato de 2 dígitos
            month: "2-digit", // Mes en formato de 2 dígitos
            year: "numeric", // Año completo
        })} a las ${fecha.toLocaleTimeString("es-ES", { hour12: false })}`; // Hora en formato 24 horas
    };

    // Formatea la fecha de la clase asociada a la reserva
    const formatFechaClase = (fecha) => {
        const fechaObj = new Date(fecha); // Convierte la fecha en un objeto Date
        return fechaObj.toLocaleDateString("es-ES", {
            day: "2-digit", // Día en formato de 2 dígitos
            month: "2-digit", // Mes en formato de 2 dígitos
            year: "numeric", // Año completo
        });
    };

    return (
        <div className="w-full lg:w-1/2 min-h-[700px] max-h-[700px] bg-gradient-to-r from-gray-400 to-lime-500 shadow-lg rounded-xl p-8 flex flex-col justify-between">
            <div className="flex-grow">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-3 relative">
                        <span className="relative inline-block">
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-[#405f0f]"></span>
                            <span className="relative">Mis Reservas</span>
                        </span>
                    </h1>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <input
                        type="date"
                        value={selectedDateReservas}
                        onChange={handleDateChange}
                        className="p-2 rounded border border-gray-300"
                    />
                    <button
                        onClick={resetDateFilter}
                        className="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Mostrar Todas
                    </button>
                </div>

                {reservas.data.length > 0 ? (
                    <div className="space-y-4 overflow-auto max-h-[450px] pr-2">
                        {reservas.data.map((reserva) => (
                            <div
                                key={reserva.id}
                                className={`${getReservaBackgroundColor(
                                    reserva.estado
                                )} p-4 rounded-lg shadow-md`}
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    Clase de {reserva.clase.nombre}
                                </h3>
                                <p className="mb-2">
                                    <strong className="text-gray-700">
                                        Fecha:
                                    </strong>{" "}
                                    {formatFechaClase(reserva.clase.fecha)}
                                </p>
                                <p className="mb-2">
                                    <strong className="text-gray-700">
                                        Hora:
                                    </strong>{" "}
                                    {reserva.clase.hora_inicio} -{" "}
                                    {reserva.clase.hora_fin}
                                </p>
                                <p className="mb-2">
                                    <strong className="text-gray-700">
                                        Estado:
                                    </strong>{" "}
                                    {reserva.estado}
                                </p>
                                <p className="mb-2">
                                    <strong className="text-gray-700">
                                        Fecha/Hora de la reserva:
                                    </strong>{" "}
                                    {formatFechaReserva(reserva.fecha_reserva)}
                                </p>

                                {reserva.estado === "Pendiente" && (
                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            href={`/reservas/${reserva.id}/confirm`}
                                            method="POST"
                                            className="bg-lime-500 text-white px-4 py-2 rounded-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                                        >
                                            Confirmar
                                        </Link>
                                        <Link
                                            href={`/reservas/${reserva.id}/cancel`}
                                            method="POST"
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                                        >
                                            Cancelar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-black rounded-lg shadow-lg min-h-[300px] flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            No tienes reservas
                        </h2>
                        <p className="text-gray-300">
                            Todavía no has adquirido ninguna reserva. Cuando
                            reserves una clase, aparecerá aquí.
                        </p>
                    </div>
                )}
            </div>

            {/* Paginación dentro del contenedor */}
            <div className="mt-4">
                {reservas.data.length > 0 && (
                    <Pagination links={reservas.links} />
                )}
            </div>
        </div>
    );
}

import React from "react";
import Pagination from "@/Components/Pagination";
import dayjs from "dayjs";
import "dayjs/locale/es";

export default function Facturas({
    pedidos,
    selectedDateFacturas,
    handleDateChange,
    resetDateFilter,
}) {
    return (
        <div className="w-full bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 shadow-lg rounded-xl p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
                Facturas de Pedidos
            </h1>
            <div className="flex justify-between items-center mb-6">
                <input
                    type="date"
                    value={selectedDateFacturas}
                    onChange={handleDateChange}
                    className="p-2 rounded border border-gray-300"
                />
                <button
                    onClick={resetDateFilter}
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Mostrar Todas
                </button>
            </div>

            {/* Contenedor de Facturas en formato 2x2 centrado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pedidos.data.length === 0 ? (
                    <div className="col-span-full flex justify-center items-center text-center p-6 bg-gray-200 rounded-lg shadow-md mt-8">
                        <p className="text-2xl font-semibold text-gray-600">
                            No tienes facturas generadas. Visita nuestra tienda
                            para adquirir productos que te ayudarán a progresar.
                        </p>
                    </div>
                ) : (
                    pedidos.data.map((pedido) => (
                        <div
                            key={pedido.id}
                            className="bg-white p-6 rounded-lg shadow-md"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-gray-700">
                                    Factura #{pedido.id}
                                </h3>
                                <span
                                    className={`text-lg font-semibold ${
                                        pedido.estado === "Pendiente"
                                            ? "text-yellow-500"
                                            : pedido.estado === "Enviado"
                                            ? "text-blue-500"
                                            : pedido.estado === "Entregado"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {pedido.estado}
                                </span>
                            </div>
                            <p className="text-lg text-gray-600 mb-2">
                                <strong>Fecha:</strong>{" "}
                                {dayjs(pedido.fecha_pedido).format(
                                    "DD/MM/YYYY"
                                )}
                            </p>
                            <p className="text-lg text-gray-600 mb-2">
                                <strong>Horario:</strong>{" "}
                                {dayjs(pedido.fecha_pedido).format("HH:mm")}
                            </p>

                            <p className="text-lg text-gray-600 mb-4">
                                <strong>Total:</strong>{" "}
                                {parseFloat(pedido.total).toFixed(2)} €
                            </p>
                            <div className="text-right">
                                <a
                                    href={`/pedidos/${pedido.id}/show`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    Ver Detalles
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Paginación centrada debajo de la cuadrícula */}
            {pedidos.data.length > 0 && (
                <div className="mt-8">
                    <Pagination links={pedidos.links} />
                </div>
            )}
        </div>
    );
}

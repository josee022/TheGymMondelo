import React from "react";
import { Head } from "@inertiajs/react";
import { FiCheckCircle, FiXCircle, FiPackage } from "react-icons/fi";
import { motion } from "framer-motion";

export default function PedidoShow({ pedido }) {
    const estadoIcon = (estado) => {
        switch (estado) {
            case "Pendiente":
                return <FiPackage className="text-yellow-500 text-4xl" />;
            case "Enviado":
                return <FiCheckCircle className="text-blue-500 text-4xl" />;
            case "Entregado":
                return <FiCheckCircle className="text-green-500 text-4xl" />;
            case "Cancelado":
                return <FiXCircle className="text-red-500 text-4xl" />;
            default:
                return <FiPackage className="text-gray-500 text-4xl" />;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4">
            <Head title={`Detalles de la Factura #${pedido.id}`} />
            <div className="w-full max-w-7xl mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-gray-300">
                <motion.h1
                    className="text-6xl font-extrabold text-gray-800 mb-12 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Factura #{pedido.id}
                </motion.h1>

                <motion.div
                    className="bg-white p-12 rounded-2xl shadow-lg mb-12 transition-transform hover:scale-105 border-2 border-lime-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-700 flex items-center mb-4 md:mb-0">
                            Información del Pedido {estadoIcon(pedido.estado)}
                        </h2>
                        <p className="text-3xl font-bold text-lime-600">
                            {pedido.total
                                ? Number(pedido.total).toFixed(2)
                                : "No disponible"}{" "}
                            €
                        </p>
                    </div>

                    {/* Información del usuario */}
                    <p className="text-2xl text-gray-600">
                        <strong>Cliente:</strong> {pedido.usuario?.name || "N/A"}
                    </p>

                    <p className="text-2xl text-gray-600">
                        <strong>Fecha del pedido:</strong>{" "}
                        {new Date(pedido.fecha_pedido).toLocaleDateString()}
                    </p>
                    <p className="text-2xl text-gray-600">
                        <strong>Estado:</strong> {pedido.estado}
                    </p>
                </motion.div>

                <motion.div
                    className="bg-white p-12 rounded-2xl shadow-lg transition-transform hover:scale-105 border-2 border-lime-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9 }}
                >
                    <h2 className="text-5xl font-bold mb-8 text-gray-700 text-center">
                        Productos en la Factura
                    </h2>
                    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                        <thead className="bg-gray-200 text-xl font-semibold text-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left">Producto</th>
                                <th className="px-6 py-4 text-left">Cantidad</th>
                                <th className="px-6 py-4 text-left">
                                    Precio Unitario
                                </th>
                                <th className="px-6 py-4 text-left">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="text-2xl text-gray-700">
                            {pedido.detalles.map((detalle, index) => (
                                <motion.tr
                                    key={detalle.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }`}
                                >
                                    <td className="border px-6 py-4">
                                        {detalle.producto.nombre}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {detalle.cantidad}
                                    </td>
                                    <td className="border px-6 py-4">
                                        {detalle.precio_unitario
                                            ? Number(
                                                  detalle.precio_unitario
                                              ).toFixed(2)
                                            : "No disponible"}{" "}
                                        €
                                    </td>
                                    <td className="border px-6 py-4">
                                        {(
                                            detalle.cantidad *
                                            Number(
                                                detalle.precio_unitario
                                            ).toFixed(2)
                                        ).toFixed(2)}{" "}
                                        €
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </div>
    );
}

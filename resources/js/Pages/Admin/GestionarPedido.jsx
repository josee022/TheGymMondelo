import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function GestionarPedido({ pedido, estados }) {
    const [estadoActual, setEstadoActual] = useState(pedido.estado);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(pedido.estado);

    const handleChangeEstado = (e) => {
        setEstadoSeleccionado(e.target.value);
    };

    const handleActualizarEstado = () => {
        router.post(
            `/admin/pedidos/${pedido.id}/actualizar-estado`,
            { estado: estadoSeleccionado },
            {
                onSuccess: () => {
                    setEstadoActual(estadoSeleccionado);
                    Swal.fire(
                        "¡Actualizado!",
                        "El estado ha sido actualizado correctamente.",
                        "success"
                    );
                    router.get("/admin/reportes");
                },
                preserveScroll: true,
            }
        );
    };

    const formatFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <AdminLayout>
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-10">
                <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide relative text-center">
                        <span className="relative inline-block">
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-lime-500 rounded-lg"></span>
                            <span className="relative text-shadow-lg">
                                Factura #{pedido.id}
                            </span>
                        </span>
                    </h1>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg mb-8">
                    <p className="text-xl font-semibold text-gray-700">
                        <strong>Total:</strong> {pedido.total} €
                    </p>
                    <p className="text-xl font-semibold text-gray-700">
                        <strong>Fecha:</strong>{" "}
                        {formatFecha(pedido.fecha_pedido)}
                    </p>
                    <p className="text-xl font-semibold text-gray-700">
                        <strong>Estado Actual:</strong>{" "}
                        <span
                            className={`inline-block px-3 py-1 rounded-lg ${
                                estadoActual === "Pendiente"
                                    ? "bg-yellow-200 text-yellow-800"
                                    : estadoActual === "Enviado"
                                    ? "bg-blue-200 text-blue-800"
                                    : estadoActual === "Entregado"
                                    ? "bg-green-200 text-green-800"
                                    : "bg-red-200 text-red-800"
                            }`}
                        >
                            {estadoActual}
                        </span>
                    </p>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Detalles del Pedido
                </h2>
                <ul className="bg-gray-50 p-6 rounded-lg shadow-inner divide-y">
                    {pedido.detalles.map((detalle) => (
                        <li key={detalle.id} className="py-4">
                            <p className="text-lg font-semibold text-gray-700">
                                <strong>Producto:</strong>{" "}
                                {detalle.producto.nombre}
                            </p>
                            <p className="text-lg text-gray-600">
                                <strong>Cantidad:</strong> {detalle.cantidad}
                            </p>
                            <p className="text-lg text-gray-600">
                                <strong>Precio Unitario:</strong>{" "}
                                {detalle.precio_unitario} €
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                    <label
                        htmlFor="estado"
                        className="block text-lg font-semibold mb-2 text-gray-800"
                    >
                        Cambiar Estado:
                    </label>
                    <select
                        id="estado"
                        value={estadoSeleccionado}
                        onChange={handleChangeEstado}
                        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                    >
                        {estados.map((estadoOption) => (
                            <option key={estadoOption} value={estadoOption}>
                                {estadoOption}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-between">
                        <button
                            onClick={handleActualizarEstado}
                            className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            Actualizar Estado
                        </button>
                        <button
                            type="button"
                            onClick={() => history.back()}
                            className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

import React, { useState } from "react";
import Pagination from "../Pagination";
import { router } from "@inertiajs/react";

export default function PedidosRecientes({
    pedidos = {},
    estados = [],
    usuarios = [],
    filtroEstado = "",
    filtroUsuario = "",
}) {
    const pedidosData = pedidos.data || [];
    const pedidosLinks = pedidos.links || [];

    const [estadoSeleccionado, setEstadoSeleccionado] = useState(filtroEstado);
    const [usuarioSeleccionado, setUsuarioSeleccionado] =
        useState(filtroUsuario);

    const handleFilterChange = (e) => {
        const estado = e.target.value;
        setEstadoSeleccionado(estado);
        router.get(
            "/admin/reportes",
            { estado, usuario_id: usuarioSeleccionado },
            { preserveState: true, replace: true }
        );
    };

    const handleUsuarioChange = (e) => {
        const usuarioId = e.target.value;
        setUsuarioSeleccionado(usuarioId);
        router.get(
            "/admin/reportes",
            { estado: estadoSeleccionado, usuario_id: usuarioId },
            { preserveState: true, replace: true }
        );
    };

    return (
        <div>
            {/* Filtro de estado */}
            <div className="mb-6 flex items-center gap-2">
                <label htmlFor="estado" className="font-semibold text-gray-700">
                    Filtrar por estado:
                </label>
                <select
                    id="estado"
                    value={estadoSeleccionado}
                    onChange={handleFilterChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                >
                    <option value="">Todos</option>
                    {estados.map((estado) => (
                        <option key={estado} value={estado}>
                            {estado}
                        </option>
                    ))}
                </select>
            </div>

            {/* Filtro de usuario */}
            <div className="mb-6 flex items-center gap-2">
                <label
                    htmlFor="usuario"
                    className="font-semibold text-gray-700"
                >
                    Filtrar por usuario:
                </label>
                <select
                    id="usuario"
                    value={usuarioSeleccionado}
                    onChange={handleUsuarioChange}
                    className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                >
                    <option value="">Todos</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>
                            {usuario.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Listado de pedidos */}
            {pedidosData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {pedidosData.map((pedido) => (
                        <div
                            key={pedido.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transform transition duration-150 hover:scale-105"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-lime-500">
                                Factura #{pedido.id}
                            </h3>
                            <div className="text-gray-600 space-y-2">
                                <p>
                                    <span className="font-semibold">
                                        Total:
                                    </span>{" "}
                                    {pedido.total} €
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Fecha:
                                    </span>{" "}
                                    {pedido.fecha_pedido}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Estado:
                                    </span>{" "}
                                    {pedido.estado}
                                </p>
                            </div>
                            <div className="text-right mt-5">
                                <a
                                    href={`/admin/pedidos/${pedido.id}/gestionar`}
                                    className="inline-block bg-blue-400 text-white font-semibold px-5 py-2 rounded-md hover:bg-blue-700 transition shadow-sm hover:shadow-md"
                                >
                                    Gestionar
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-700">No hay pedidos disponibles.</p>
            )}

            {/* Paginación */}
            {pedidosLinks.length > 0 && <Pagination links={pedidosLinks} />}
        </div>
    );
}

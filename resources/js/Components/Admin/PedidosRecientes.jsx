import React from "react";
import Pagination from "../Pagination";

export default function PedidosRecientes({ pedidos }) {
    const pedidosData = pedidos?.data || [];
    const pedidosLinks = pedidos?.links || [];

    return (
        <div>
            {pedidosData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {pedidosData.map((pedido) => (
                        <div
                            key={pedido.id}
                            className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
                        >
                            <h3 className="text-2xl font-bold">
                                Factura #{pedido.id}
                            </h3>
                            <p>
                                <strong>Total:</strong> {pedido.total} €
                            </p>
                            <p>
                                <strong>Fecha:</strong> {pedido.fecha_pedido}
                            </p>
                            <p>
                                <strong>Estado:</strong> {pedido.estado}
                            </p>
                            <div className="text-right mt-4">
                                <a
                                    href={`/admin/pedidos/${pedido.id}/gestionar`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Gestionar
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay pedidos disponibles.</p>
            )}

            {pedidosLinks.length > 0 && <Pagination links={pedidosLinks} />}
        </div>
    );
}

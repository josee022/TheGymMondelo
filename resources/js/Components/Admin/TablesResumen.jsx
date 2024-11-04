// resources/js/Components/Admin/RecentTables.jsx
import React from "react";

export default function RecentTables({ ultimosUsuarios, ultimosPedidos }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Últimos Usuarios Registrados */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Últimos Usuarios Registrados</h2>
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ultimosUsuarios.map((user, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Últimos Pedidos Realizados */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Últimos Pedidos Realizados</h2>
                <table className="w-full">
                    <thead>
                        <tr className="text-left border-b">
                            <th className="p-2">ID Pedido</th>
                            <th className="p-2">Usuario</th>
                            <th className="p-2">Fecha</th>
                            <th className="p-2">Total</th>
                            <th className="p-2">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ultimosPedidos.map((pedido, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2">{pedido.id}</td>
                                <td className="p-2">{pedido.usuario.name}</td>
                                <td className="p-2">
                                    {new Date(pedido.fecha_pedido).toLocaleDateString()}
                                </td>
                                <td className="p-2">€{pedido.total}</td>
                                <td className="p-2">{pedido.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

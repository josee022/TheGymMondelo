import React from "react";

export default function Carrito({
    carrito,
    incrementarCantidad,
    decrementarCantidad,
    eliminarDelCarrito,
    calcularTotal,
    realizarPedido,
}) {
    return (
        <div className="bg-black p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">🛒 Tu Carrito</h2>
            {carrito.length > 0 ? (
                <div>
                    {carrito.map((producto) => (
                        <div
                            key={producto.id}
                            className="bg-gray-800 p-3 mb-2 rounded-md flex items-center justify-between"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {producto.nombre}
                                </h3>
                                <p className="text-sm">
                                    Cantidad: {producto.cantidad}
                                </p>
                                <p className="text-sm">
                                    Total:{" "}
                                    {(
                                        parseFloat(producto.precio) *
                                        producto.cantidad
                                    ).toFixed(2)}{" "}
                                    €
                                </p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="bg-red-500 py-1 px-2 rounded hover:bg-red-600 text-sm"
                                    onClick={() =>
                                        decrementarCantidad(producto.id)
                                    }
                                >
                                    -
                                </button>
                                <button
                                    className="bg-lime-500 py-1 px-2 rounded hover:bg-lime-600 text-sm"
                                    onClick={() =>
                                        incrementarCantidad(producto.id)
                                    }
                                >
                                    +
                                </button>
                                <button
                                    className="bg-red-700 py-1 px-2 rounded hover:bg-red-800 text-sm"
                                    onClick={() =>
                                        eliminarDelCarrito(producto.id)
                                    }
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                    <hr className="border-white my-4" />
                    <div className="text-right text-xl font-bold">
                        Total en el carrito: {calcularTotal()} €
                    </div>
                    <div className="mt-4 text-right">
                        <button
                            className="bg-lime-500 text-black py-2 px-4 rounded hover:bg-lime-700 transition-colors duration-300"
                            onClick={realizarPedido}
                        >
                            Realizar Pedido
                        </button>
                    </div>
                </div>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
        </div>
    );
}

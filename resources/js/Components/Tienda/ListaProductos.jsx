import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ListaProductos({ productos, agregarAlCarrito }) {
    // Estados para gestionar los productos ordenados y el tipo de orden
    const [sortedProductos, setSortedProductos] = useState(productos); // Lista de productos ordenada
    const [sortType, setSortType] = useState(null); // Tipo de orden actual (ascendente, descendente o ninguno)

    // Ordenar productos por precio ascendente
    const sortProductsByPriceAsc = () => {
        const sorted = [...sortedProductos].sort(
            (a, b) => parseFloat(a.precio) - parseFloat(b.precio) // Ordena de menor a mayor precio
        );
        setSortedProductos(sorted); // Actualiza la lista ordenada
        setSortType("asc"); // Establece el tipo de orden como ascendente
    };

    // Ordenar productos por precio descendente
    const sortProductsByPriceDesc = () => {
        const sorted = [...sortedProductos].sort(
            (a, b) => parseFloat(b.precio) - parseFloat(a.precio) // Ordena de mayor a menor precio
        );
        setSortedProductos(sorted); // Actualiza la lista ordenada
        setSortType("desc"); // Establece el tipo de orden como descendente
    };

    // Restablecer el orden al estado original
    const resetSort = () => {
        setSortedProductos(productos); // Restaura la lista original de productos
        setSortType(null); // Elimina cualquier tipo de orden actual
    };

    return (
        <div>
            {/* Controles de ordenación */}
            <div className="flex justify-end mb-6 space-x-4">
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        sortType === "asc"
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={sortProductsByPriceAsc}
                    disabled={sortType === "asc"}
                >
                    Ordenar por Precio (Más Barato)
                </button>
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        sortType === "desc"
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={sortProductsByPriceDesc}
                    disabled={sortType === "desc"}
                >
                    Ordenar por Precio (Más Caro)
                </button>
                <button
                    className={`py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                        !sortType
                            ? "bg-lime-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={resetSort}
                    disabled={!sortType}
                >
                    Restablecer Orden
                </button>
            </div>

            {/* Lista de Productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {sortedProductos && sortedProductos.length > 0 ? (
                    sortedProductos.map((producto) => (
                        <motion.div
                            key={producto.id}
                            className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Imagen del producto */}
                            <div className="mb-4">
                                <img
                                    src={
                                        producto.imagen
                                            ? `/images/${producto.imagen}`
                                            : "/images/default-product.png"
                                    }
                                    alt={producto.nombre}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </div>
                            {/* Nombre del producto */}
                            <h3 className="text-2xl font-bold text-lime-400 mb-4">
                                {producto.nombre}
                            </h3>
                            {/* Descripción del producto */}
                            <p className="text-gray-400 mb-4">
                                {producto.descripcion}
                            </p>
                            {/* Precio del producto */}
                            <p className="text-lime-400 mb-4">
                                Precio: {parseFloat(producto.precio).toFixed(2)}{" "}
                                €
                            </p>
                            {/* Botón para añadir al carrito */}
                            <button
                                className="bg-lime-500 text-black py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                                onClick={() => agregarAlCarrito(producto.id)}
                            >
                                Añadir al carrito
                            </button>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-white">No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
}

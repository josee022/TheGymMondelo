import React from "react";
import { motion } from "framer-motion";

export default function ListaProductos({ productos, agregarAlCarrito }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {productos && productos.length > 0 ? (
                productos.map((producto) => (
                    <motion.div
                        key={producto.id}
                        className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold text-lime-400 mb-4">
                            {producto.nombre}
                        </h3>
                        <p className="text-gray-400 mb-4">
                            {producto.descripcion}
                        </p>
                        <p className="text-lime-400 mb-4">
                            Precio: {parseFloat(producto.precio).toFixed(2)} €
                        </p>
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
    );
}

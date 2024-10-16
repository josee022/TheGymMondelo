import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePage, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

export default function Tienda() {
    const { auth, productos, flash } = usePage().props;
    const [carrito, setCarrito] = useState(flash.carrito || []);

    // Función para agregar producto al carrito
    const agregarAlCarrito = async (productoId) => {
        try {
            const response = await axios.post("/carrito/agregar", { producto_id: productoId });
            setCarrito(response.data.carrito);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Error al añadir producto al carrito.");
        }
    };

    // Función para incrementar cantidad en el carrito
    const incrementarCantidad = async (productoId) => {
        const itemEnCarrito = carrito.find((item) => item.id === productoId);
        if (itemEnCarrito) {
            try {
                const response = await axios.post("/carrito/actualizar", {
                    producto_id: productoId,
                    cantidad: itemEnCarrito.cantidad + 1
                });
                setCarrito(response.data.carrito);
                toast.success(response.data.message);
            } catch (error) {
                toast.error("Error al incrementar cantidad.");
            }
        }
    };

    // Función para decrementar cantidad en el carrito
    const decrementarCantidad = async (productoId) => {
        const itemEnCarrito = carrito.find((item) => item.id === productoId);
        if (itemEnCarrito && itemEnCarrito.cantidad > 1) {
            try {
                const response = await axios.post("/carrito/actualizar", {
                    producto_id: productoId,
                    cantidad: itemEnCarrito.cantidad - 1
                });
                setCarrito(response.data.carrito);
                toast.success(response.data.message);
            } catch (error) {
                toast.error("Error al decrementar cantidad.");
            }
        }
    };

    // Función para eliminar producto del carrito
    const eliminarDelCarrito = async (productoId) => {
        try {
            const response = await axios.post("/carrito/eliminar", { producto_id: productoId });
            setCarrito(response.data.carrito);
            toast.error(response.data.message);
        } catch (error) {
            toast.error("Error al eliminar producto.");
        }
    };

    // Función para realizar el pedido
    const realizarPedido = async () => {
        if (carrito.length === 0) {
            toast.error("No hay productos en el carrito.");
            return;
        }

        try {
            const response = await axios.post("/carrito/pedido", { carrito });
            setCarrito(response.data.carrito);
            toast.info(response.data.message);
        } catch (error) {
            toast.error("Hubo un error al realizar el pedido.");
        }
    };

    const calcularTotal = () => {
        return carrito.reduce((total, producto) => {
            return total + parseFloat(producto.precio) * producto.cantidad;
        }, 0).toFixed(2);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black-100 leading-tight">Tienda de Productos :</h2>}
        >
            <ToastContainer />
            <Head title="Tienda de Productos" />

            <div className="py-12 bg-gradient-to-b from-black via-green-800 to-lime-600 text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-6xl font-extrabold mb-4">🛒 Nuestra Tienda 🛒</h1>
                        <p className="text-xl">Descubre los mejores productos para acompañar tu entrenamiento. ¡Compra hoy mismo! 🚀</p>
                    </motion.div>

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
                                    <h3 className="text-2xl font-bold text-lime-400 mb-4">{producto.nombre}</h3>
                                    <p className="text-gray-400 mb-4">{producto.descripcion}</p>
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
                </div>
            </div>

            <div className="bg-black p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">🛒 Tu Carrito</h2>
                {carrito.length > 0 ? (
                    <div>
                        {carrito.map((producto) => (
                            <div key={producto.id} className="bg-gray-800 p-3 mb-2 rounded-md flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                                    <p className="text-sm">Cantidad: {producto.cantidad}</p>
                                    <p className="text-sm">Total: {(parseFloat(producto.precio) * producto.cantidad).toFixed(2)} €</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        className="bg-red-500 py-1 px-2 rounded hover:bg-red-600 text-sm"
                                        onClick={() => decrementarCantidad(producto.id)}
                                    >
                                        -
                                    </button>
                                    <button
                                        className="bg-lime-500 py-1 px-2 rounded hover:bg-lime-600 text-sm"
                                        onClick={() => incrementarCantidad(producto.id)}
                                    >
                                        +
                                    </button>
                                    <button
                                        className="bg-red-700 py-1 px-2 rounded hover:bg-red-800 text-sm"
                                        onClick={() => eliminarDelCarrito(producto.id)}
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

            <Footer />
        </AuthenticatedLayout>
    );
}

import React, { useState } from "react";
import { usePage, Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

export default function Tienda() {
    const { auth, productos } = usePage().props;

    const [carrito, setCarrito] = useState([]);

    // Función para agregar productos al carrito
    const agregarAlCarrito = (productoId) => {
        const producto = productos.find((p) => p.id === productoId);
        const itemEnCarrito = carrito.find((item) => item.id === productoId);

        if (itemEnCarrito) {
            setCarrito(
                carrito.map((item) =>
                    item.id === productoId
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            );
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }

        toast.success("Producto añadido al carrito");
    };

    // Función para decrementar la cantidad
    const decrementarCantidad = (productoId) => {
        setCarrito(
            carrito.map((item) =>
                item.id === productoId && item.cantidad > 1
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            )
        );
    };

    // Función para eliminar producto del carrito
    const eliminarDelCarrito = (productoId) => {
        setCarrito(carrito.filter((item) => item.id !== productoId));
        toast.error("Producto eliminado del carrito");
    };

    // Función para realizar el pedido
    const realizarPedido = () => {
        if (carrito.length === 0) {
            toast.error("No hay productos en el carrito.");
            return;
        }

        // Aquí envías los datos del carrito al backend para procesar el pedido
        Inertia.post('/carrito/pedido', { carrito }, {
            onSuccess: () => {
                toast.success("Pedido realizado con éxito");
                setCarrito([]);  // Limpiar el carrito después de realizar el pedido
            },
            onError: () => {
                toast.error("Hubo un error al realizar el pedido.");
            }
        });
    };

    // Función para calcular el total del carrito
    const calcularTotal = () => {
        return carrito.reduce((total, producto) => {
            return total + parseFloat(producto.precio) * producto.cantidad;
        }, 0).toFixed(2);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-black-100 leading-tight">Tienda de Productos</h2>}
        >
            <ToastContainer />
            <Head title="Tienda de Productos" />

            {/* Sección de Productos */}
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

                    {/* Sección de Productos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {productos && productos.length > 0 ? (
                            productos.map((producto, index) => (
                                <motion.div
                                    key={producto.id}
                                    className="bg-black bg-opacity-70 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-500 hover:-translate-y-3"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
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

            {/* Carrito de Compras */}
            <div className="bg-black p-8 text-white">
                <h2 className="text-3xl font-bold mb-6">🛒 Tu Carrito</h2>
                {carrito.length > 0 ? (
                    <div>
                        {carrito.map((producto, index) => (
                            <div key={producto.id} className="bg-gray-800 p-4 mb-4 rounded-lg">
                                <h3 className="text-xl font-semibold">{producto.nombre}</h3>
                                <p>Cantidad: {producto.cantidad}</p>
                                <p>Precio unitario: {parseFloat(producto.precio).toFixed(2)} €</p>
                                <p>Total: {(parseFloat(producto.precio) * producto.cantidad).toFixed(2)} €</p>

                                {/* Botones para actualizar el carrito */}
                                <div className="flex space-x-4 mt-4">
                                    <button
                                        className="bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600"
                                        onClick={() => decrementarCantidad(producto.id)}
                                    >
                                        Decrementar
                                    </button>
                                    <button
                                        className="bg-lime-500 py-2 px-4 rounded-lg hover:bg-lime-600"
                                        onClick={() => agregarAlCarrito(producto.id)}
                                    >
                                        Aumentar
                                    </button>
                                    <button
                                        className="bg-red-700 py-2 px-4 rounded-lg hover:bg-red-800"
                                        onClick={() => eliminarDelCarrito(producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                {index < carrito.length - 1 && <hr className="border-white my-4" />}
                            </div>
                        ))}
                        <hr className="border-white my-6" />
                        <div className="text-right text-2xl font-bold">
                            Total en el carrito: {calcularTotal()} €
                        </div>
                        <div className="mt-6 text-right">
                            <button
                                className="bg-green-500 text-black py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300"
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

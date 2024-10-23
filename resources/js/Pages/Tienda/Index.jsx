import React, { useState } from "react";
import axios from "axios";
import { usePage, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import ListaProductos from "@/Components/Tienda/ListaProductos";
import Carrito from "@/Components/Tienda/Carrito";

export default function Tienda() {
    const { auth, productos, flash } = usePage().props;
    const [carrito, setCarrito] = useState(flash.carrito || []);

    const agregarAlCarrito = async (productoId) => {
        try {
            const response = await axios.post("/carrito/agregar", {
                producto_id: productoId,
            });
            setCarrito(response.data.carrito);
            toast.success(response.data.message);
        } catch (error) {
            toast.error("Error al añadir producto al carrito.");
        }
    };

    const incrementarCantidad = async (productoId) => {
        const itemEnCarrito = carrito.find((item) => item.id === productoId);
        if (itemEnCarrito) {
            try {
                const response = await axios.post("/carrito/actualizar", {
                    producto_id: productoId,
                    cantidad: itemEnCarrito.cantidad + 1,
                });
                setCarrito(response.data.carrito);
                toast.success(response.data.message);
            } catch (error) {
                toast.error("Error al incrementar cantidad.");
            }
        }
    };

    const decrementarCantidad = async (productoId) => {
        const itemEnCarrito = carrito.find((item) => item.id === productoId);
        if (itemEnCarrito && itemEnCarrito.cantidad > 1) {
            try {
                const response = await axios.post("/carrito/actualizar", {
                    producto_id: productoId,
                    cantidad: itemEnCarrito.cantidad - 1,
                });
                setCarrito(response.data.carrito);
                toast.success(response.data.message);
            } catch (error) {
                toast.error("Error al decrementar cantidad.");
            }
        }
    };

    const eliminarDelCarrito = async (productoId) => {
        try {
            const response = await axios.post("/carrito/eliminar", {
                producto_id: productoId,
            });
            setCarrito(response.data.carrito);
            toast.error(response.data.message);
        } catch (error) {
            toast.error("Error al eliminar producto.");
        }
    };

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
        return carrito
            .reduce(
                (total, producto) =>
                    total + parseFloat(producto.precio) * producto.cantidad,
                0
            )
            .toFixed(2);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-black-100 leading-tight">
                    Tienda de Productos :
                </h2>
            }
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
                        <h1 className="text-6xl font-extrabold mb-4">
                            🛒 Nuestra Tienda 🛒
                        </h1>
                        <p className="text-xl">
                            Descubre los mejores productos para acompañar tu
                            entrenamiento. ¡Compra hoy mismo! 🚀
                        </p>
                    </motion.div>

                    <ListaProductos
                        productos={productos}
                        agregarAlCarrito={agregarAlCarrito}
                    />
                </div>
            </div>

            <Carrito
                carrito={carrito}
                incrementarCantidad={incrementarCantidad}
                decrementarCantidad={decrementarCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
                calcularTotal={calcularTotal}
                realizarPedido={realizarPedido}
            />

            <Footer />
        </AuthenticatedLayout>
    );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePage, Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import ListaProductos from "@/Components/Tienda/ListaProductos";
import Pagination from "@/Components/Pagination";
import Carrito from "@/Components/Tienda/Carrito";

export default function Tienda() {
    const { auth, productos } = usePage().props; // recibe los productos paginados y el usuario autenticado
    const [carrito, setCarrito] = useState([]);

    // Recuperar el carrito desde localStorage cuando el componente se monta
    useEffect(() => {
        const carritoGuardado =
            JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoGuardado);
    }, []);

    // Actualizar el carrito en localStorage cada vez que cambie el carrito
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

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
            setCarrito([]); // Limpiar carrito después de realizar el pedido
            toast.info(response.data.message);
            localStorage.removeItem("carrito"); // Limpiar carrito en localStorage
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
        <AuthenticatedLayout user={auth.user}>
            <ToastContainer />
            <Head title="Tienda de Productos" />

            <div className="py-12 bg-gradient-to-b from-black via-green-800 to-lime-600 text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h1 className="text-6xl font-extrabold mb-4">
                            🛒 Nuestra Tienda 🛒
                        </h1>
                        <p className="text-xl">
                            Descubre los mejores productos para acompañar tu
                            entrenamiento. ¡Compra hoy mismo! 🚀
                        </p>
                    </div>

                    {/* Lista de productos */}
                    <ListaProductos
                        productos={productos.data}
                        agregarAlCarrito={agregarAlCarrito}
                    />

                    {/* Componente de paginación */}
                    <Pagination className="mt-6" links={productos.links} />
                </div>
            </div>

            {/* Carrito de compras */}
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

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { usePage, Head, router } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import ListaProductos from "@/Components/Tienda/ListaProductos";
import Pagination from "@/Components/Pagination";
import Carrito from "@/Components/Tienda/Carrito";

// Inicializamos Stripe con la clave publicable
const stripePromise = loadStripe(
    "pk_test_51QNXpKEJzO4kuy9zOXZXYML8FDTkpqKxXWbBlj4ep3yqQow14nzLCtbdc6X3Pk78zkGMWIMQvKYQKUTQaM1bL6EK00A6v5vnA9"
);

function TiendaContent({ auth, productos, search }) {
    const [carrito, setCarrito] = useState([]);
    const [searchTerm, setSearchTerm] = useState(search || "");
    const searchInputRef = useRef(null);

    const stripe = useStripe();
    const elements = useElements();

    // Recuperar el carrito desde localStorage al montar el componente
    useEffect(() => {
        const carritoGuardado =
            JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoGuardado);
    }, []);

    // Guardar el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [productos]);

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

    const calcularTotal = () => {
        return carrito
            .reduce(
                (total, producto) =>
                    total + parseFloat(producto.precio) * producto.cantidad,
                0
            )
            .toFixed(2);
    };

    const realizarPedido = async () => {
        if (!stripe || !elements) {
            toast.error("Stripe aún no está listo.");
            return;
        }

        if (carrito.length === 0) {
            toast.error("No hay productos en el carrito.");
            return;
        }

        try {
            const total = calcularTotal();

            // Paso 1: Crear el intento de pago con Stripe
            const response = await axios.post("/crear-intento-pago", { total });
            const { clientSecret } = response.data;

            // Paso 2: Confirmar el pago con Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: auth.user.name,
                            email: auth.user.email,
                        },
                    },
                }
            );

            if (error) {
                // Manejo de errores específicos de Stripe
                switch (error.code) {
                    case "card_declined":
                        toast.error(
                            "El pago ha sido rechazado. Por favor, utiliza otra tarjeta."
                        );
                        break;
                    case "insufficient_funds":
                        toast.error(
                            "El pago ha sido rechazado debido a fondos insuficientes."
                        );
                        break;
                    case "expired_card":
                        toast.error(
                            "La tarjeta ha expirado. Por favor, utiliza una tarjeta válida."
                        );
                        break;
                    case "incorrect_cvc":
                        toast.error(
                            "El código de seguridad (CVC) ingresado es incorrecto."
                        );
                        break;
                    case "authentication_required":
                        toast.error(
                            "La autenticación de tu banco ha fallado. Intenta nuevamente."
                        );
                        break;
                    default:
                        toast.error(
                            "Hubo un error con tu tarjeta. Por favor, intenta nuevamente."
                        );
                }
            } else if (paymentIntent.status === "succeeded") {
                // Paso 3: Guardar el pedido en el backend
                try {
                    const pedidoResponse = await axios.post("/carrito/pedido", {
                        carrito, // Enviamos el carrito para registrar el pedido
                    });
                    setCarrito([]); // Limpia el carrito en el frontend
                    localStorage.removeItem("carrito"); // Borra el carrito del localStorage
                    elements.getElement(CardElement).clear(); // Limpia el formulario de tarjeta
                    toast.success(pedidoResponse.data.message);
                } catch (error) {
                    toast.error(
                        "El pago fue exitoso, pero no se pudo registrar el pedido."
                    );
                }
            }
        } catch (error) {
            toast.error("Hubo un error al procesar el pago.");
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        router.get(
            route("tienda.index"),
            { search: value },
            { replace: true, preserveScroll: true }
        );
    };

    return (
        <>
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

                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full p-3 mb-6 rounded-lg border border-gray-300 text-black"
                        value={searchTerm}
                        ref={searchInputRef}
                        onChange={handleSearchChange}
                    />

                    <ListaProductos
                        productos={productos.data}
                        agregarAlCarrito={agregarAlCarrito}
                    />

                    <Pagination className="mt-6" links={productos.links} />
                </div>
            </div>

            <div className="carrito-container bg-white p-6 rounded-lg shadow-md">
                <Carrito
                    carrito={carrito}
                    incrementarCantidad={(id) => incrementarCantidad(id)}
                    decrementarCantidad={(id) => decrementarCantidad(id)}
                    eliminarDelCarrito={(id) => eliminarDelCarrito(id)}
                    calcularTotal={calcularTotal}
                    realizarPedido={realizarPedido}
                />
                {/* Formulario de tarjeta */}
                <div className="stripe-payment mt-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                        Introduce tu tarjeta:
                    </h3>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    color: "#424770",
                                    fontSize: "16px",
                                    "::placeholder": {
                                        color: "#9b9b9b",
                                    },
                                },
                                invalid: {
                                    color: "#e5424d",
                                },
                            },
                            hidePostalCode: true,
                        }}
                        className="p-3 border rounded-lg"
                    />
                </div>
            </div>
        </>
    );
}

// Componente principal que envuelve el contenido con `<Elements>` para Stripe
export default function Tienda() {
    const { auth, productos, search } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <ToastContainer />
            <Head title="Tienda de Productos" />
            <Elements stripe={stripePromise}>
                <TiendaContent
                    auth={auth}
                    productos={productos}
                    search={search}
                />
            </Elements>
            <Footer />
        </AuthenticatedLayout>
    );
}

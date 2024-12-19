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

// Inicializamos Stripe con la clave pública
const stripePromise = loadStripe(
    "pk_test_51QNXpKEJzO4kuy9zOXZXYML8FDTkpqKxXWbBlj4ep3yqQow14nzLCtbdc6X3Pk78zkGMWIMQvKYQKUTQaM1bL6EK00A6v5vnA9"
);

function TiendaContent({ auth, productos, search }) {
    // Estados para gestionar el carrito y el término de búsqueda
    const [carrito, setCarrito] = useState([]); // Productos en el carrito
    const [searchTerm, setSearchTerm] = useState(search || ""); // Término de búsqueda inicial
    const searchInputRef = useRef(null); // Referencia para el campo de búsqueda

    // Hooks de Stripe
    const stripe = useStripe(); // Acceso a las funciones de Stripe
    const elements = useElements(); // Acceso a los elementos de pago de Stripe

    // Recuperar el carrito desde localStorage al cargar el componente
    useEffect(() => {
        const carritoGuardado =
            JSON.parse(localStorage.getItem("carrito")) || []; // Obtiene el carrito de localStorage
        setCarrito(carritoGuardado); // Actualiza el estado del carrito
    }, []); // Se ejecuta al montar el componente

    // Guardar el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito actualizado en localStorage
    }, [carrito]); // Se ejecuta cada vez que el carrito cambia

    // Focalizar automáticamente el input de búsqueda al cargar o actualizar productos
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus(); // Coloca el foco en el input de búsqueda
        }
    }, [productos]); // Se ejecuta cada vez que cambia la lista de productos

    // Función para agregar un producto al carrito
    const agregarAlCarrito = async (productoId) => {
        try {
            // Realiza una solicitud POST al backend para añadir el producto al carrito
            const response = await axios.post("/carrito/agregar", {
                producto_id: productoId, // ID del producto a agregar
            });
            setCarrito(response.data.carrito); // Actualiza el estado del carrito con la respuesta del servidor
            toast.success(response.data.message); // Muestra un mensaje de éxito
        } catch (error) {
            toast.error("Error al añadir producto al carrito."); // Maneja errores mostrando un mensaje
        }
    };

    // Función para incrementar la cantidad de un producto en el carrito
    const incrementarCantidad = async (productoId) => {
        const itemEnCarrito = carrito.find((item) => item.id === productoId); // Busca el producto en el carrito
        if (itemEnCarrito) {
            // Si el producto está en el carrito
            try {
                // Realiza una solicitud POST para actualizar la cantidad del producto
                const response = await axios.post("/carrito/actualizar", {
                    producto_id: productoId,
                    cantidad: itemEnCarrito.cantidad + 1, // Incrementa la cantidad en 1
                });
                setCarrito(response.data.carrito); // Actualiza el carrito con la nueva cantidad
                toast.success(response.data.message); // Muestra un mensaje de éxito
            } catch (error) {
                toast.error("Error al incrementar cantidad."); // Maneja errores
            }
        }
    };

    // Función para decrementar la cantidad de un producto en el carrito
    const decrementarCantidad = async (productoId) => {
        const itemEnCarrito = carrito.find((item) => item.id === productoId); // Busca el producto en el carrito
        if (itemEnCarrito && itemEnCarrito.cantidad > 1) {
            // Solo decrementar si la cantidad es mayor a 1
            try {
                // Realiza una solicitud POST para actualizar la cantidad del producto
                const response = await axios.post("/carrito/actualizar", {
                    producto_id: productoId,
                    cantidad: itemEnCarrito.cantidad - 1, // Decrementa la cantidad en 1
                });
                setCarrito(response.data.carrito); // Actualiza el carrito con la nueva cantidad
                toast.success(response.data.message); // Muestra un mensaje de éxito
            } catch (error) {
                toast.error("Error al decrementar cantidad."); // Maneja errores
            }
        }
    };

    // Función para eliminar un producto del carrito
    const eliminarDelCarrito = async (productoId) => {
        try {
            // Realiza una solicitud POST al backend para eliminar el producto
            const response = await axios.post("/carrito/eliminar", {
                producto_id: productoId, // ID del producto a eliminar
            });
            setCarrito(response.data.carrito); // Actualiza el estado del carrito con la respuesta del servidor
            toast.error(response.data.message); // Muestra un mensaje de eliminación (como alerta roja)
        } catch (error) {
            toast.error("Error al eliminar producto."); // Muestra un mensaje de error si algo falla
        }
    };

    // Función para calcular el total del carrito
    const calcularTotal = () => {
        return carrito
            .reduce(
                (total, producto) =>
                    total + parseFloat(producto.precio) * producto.cantidad, // Multiplica el precio por la cantidad de cada producto
                0 // Valor inicial del total
            )
            .toFixed(2); // Redondea el total a dos decimales
    };

    // Función para realizar un pedido con Stripe y registrar la compra
    const realizarPedido = async () => {
        // Verifica que Stripe y los elementos estén listos
        if (!stripe || !elements) {
            toast.error("Stripe aún no está listo."); // Muestra un mensaje si Stripe no está listo
            return;
        }

        // Verifica que el carrito no esté vacío
        if (carrito.length === 0) {
            toast.error("No hay productos en el carrito."); // Muestra un mensaje si el carrito está vacío
            return;
        }

        try {
            const total = calcularTotal(); // Calcula el total del carrito

            // Paso 1: Crear el intento de pago en el servidor
            const response = await axios.post("/crear-intento-pago", { total });
            const { clientSecret } = response.data; // Obtiene el clientSecret del intento de pago

            // Paso 2: Confirmar el pago con Stripe
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement), // Elemento de tarjeta
                        billing_details: {
                            name: auth.user.name, // Nombre del usuario autenticado
                            email: auth.user.email, // Email del usuario autenticado
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
                // Si el pago es exitoso, registra el pedido en el backend
                try {
                    const pedidoResponse = await axios.post("/carrito/pedido", {
                        carrito, // Envia el carrito al backend para registrar el pedido
                    });
                    setCarrito([]); // Limpia el carrito en el frontend
                    localStorage.removeItem("carrito"); // Borra el carrito del localStorage
                    elements.getElement(CardElement).clear(); // Limpia el formulario de tarjeta
                    toast.success(pedidoResponse.data.message); // Muestra un mensaje de éxito
                } catch (error) {
                    toast.error(
                        "El pago fue exitoso, pero no se pudo registrar el pedido."
                    ); // Muestra un mensaje si no se puede registrar el pedido
                }
            }
        } catch (error) {
            // Manejo de errores generales
            toast.error("Hubo un error al procesar el pago.");
        }
    };

    // Función para manejar cambios en el campo de búsqueda
    const handleSearchChange = (e) => {
        const value = e.target.value; // Obtiene el valor ingresado
        setSearchTerm(value); // Actualiza el estado del término de búsqueda

        // Realiza una búsqueda en la tienda mediante una solicitud GET
        router.get(
            route("tienda.index"), // Ruta de la tienda
            { search: value }, // Parámetro de búsqueda enviado al backend
            { replace: true, preserveScroll: true } // Configuración para reemplazar la URL y mantener el scroll
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

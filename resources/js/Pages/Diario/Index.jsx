import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DiarioIndex({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        fecha: "",
        ejercicio: "",
        series: "",
        repeticiones: "",
        peso: "",
        notas: "",
    });

    useEffect(() => {
        if (errors) {
            Object.keys(errors).forEach((key) => {
                toast.error(errors[key], {
                    icon: "🚫",
                    style: { backgroundColor: "#ff6161", color: "white" },
                });
            });
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("diario.store"), {
            onSuccess: () => {
                reset();
                Swal.fire({
                    title: "¡Registro Exitoso! 🎉",
                    text: "¡Bien hecho! Tu ejercicio ha sido guardado.",
                    icon: "success",
                    confirmButtonText: "💪 ¡A seguir entrenando!",
                    background: "#f1f8e9",
                    color: "#388e3c",
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Oops! 😥",
                    text: "Algo salió mal. Intenta de nuevo.",
                    icon: "error",
                    confirmButtonText: "Intentar de nuevo",
                    background: "#ffebee",
                    color: "#d32f2f",
                });
            },
        });
    };

    const vaciarFormulario = () => {
        reset();
        Swal.fire({
            title: "Formulario Vacío",
            text: "Todos los campos han sido vaciados.",
            icon: "info",
            confirmButtonText: "Entendido",
            background: "#e0f7fa",
            color: "#00796b",
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-3xl font-extrabold text-center text-lime-600 mt-4">
                    🏋️ Diario de Ejercicio 🏋️
                </h2>
            }
        >
            <Head title="Registro de Ejercicio" />
            <ToastContainer />

            {/* Botón flotante para acceder al historial, en el contenedor de fondo */}
            <div className="relative w-full">
                <Link
                    href={route("diario.historial")}
                    className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-bounce"
                >
                    📜 Ver Historial
                </Link>
            </div>

            {/* Contenedor de fondo con menor padding vertical */}
            <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-lime-100 via-green-100 to-green-200 py-4">
                <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8 animated fadeIn faster">
                    <header className="bg-lime-500 py-6 px-8 text-center flex flex-col items-center">
                        <span className="text-5xl mb-2">🏆</span>
                        <h3 className="text-4xl font-extrabold text-white">
                            ¡Hora de Entrenar! 💪
                        </h3>
                        <p className="text-lg text-gray-200 mt-2">
                            Registra cada detalle y sigue tu progreso 📈
                        </p>
                    </header>

                    <form
                        onSubmit={handleSubmit}
                        className="pt-8 space-y-6 bg-gradient-to-r from-green-50 to-lime-50 text-gray-800"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    📅 Fecha
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                                    value={data.fecha}
                                    onChange={(e) =>
                                        setData("fecha", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    🏋️ Ejercicio
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                                    placeholder="Ej. Sentadillas con barra"
                                    value={data.ejercicio}
                                    onChange={(e) =>
                                        setData("ejercicio", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    🔄 Series
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                                    value={data.series}
                                    onChange={(e) =>
                                        setData("series", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    🔢 Repeticiones
                                </label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                                    value={data.repeticiones}
                                    onChange={(e) =>
                                        setData("repeticiones", e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-semibold mb-2">
                                    ⚖️ Peso (kg)
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                                    placeholder="Opcional"
                                    value={data.peso}
                                    onChange={(e) =>
                                        setData("peso", e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold mb-2">
                                📝 Notas
                            </label>
                            <textarea
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                                placeholder="¿Cómo te sentiste hoy? ¿Algún ajuste o meta nueva? 💭"
                                value={data.notas}
                                onChange={(e) =>
                                    setData("notas", e.target.value)
                                }
                            />
                        </div>

                        <div className="text-center flex justify-center space-x-4 mt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-lime-500 to-green-500 text-white font-semibold rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
                            >
                                🚀 Guardar Ejercicio 🚀
                            </button>
                            <button
                                type="button"
                                onClick={vaciarFormulario}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
                            >
                                🧹 Vaciar Formulario 🧹
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

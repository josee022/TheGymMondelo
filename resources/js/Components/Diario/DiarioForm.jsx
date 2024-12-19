import React, { useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DiarioForm() {
    // Recibe los ejercicios previos desde el backend
    const { ejerciciosPrevios } = usePage().props;

    // Inicializa el formulario con campos necesarios para registrar un ejercicio
    const { data, setData, post, processing, errors, reset } = useForm({
        fecha: "", // Fecha del registro
        ejercicio: "", // Nombre del ejercicio
        series: "", // Número de series realizadas
        repeticiones: "", // Número de repeticiones por serie
        peso: "", // Peso utilizado en el ejercicio
        notas: "", // Notas adicionales sobre el ejercicio
    });

    // Valida los campos del formulario antes de enviarlo
    const validateFields = () => {
        let isValid = true;

        // Validación de la fecha
        if (!data.fecha) {
            toast.error("La fecha es obligatoria. 📅");
            isValid = false;
        }

        // Validación del ejercicio
        if (!data.ejercicio) {
            toast.error("El ejercicio es obligatorio. 🏋️");
            isValid = false;
        }

        // Validación de las series
        if (!data.series || data.series <= 0) {
            toast.error("Las series deben ser un número mayor a 0. 🔄");
            isValid = false;
        }

        // Validación de las repeticiones
        if (!data.repeticiones || data.repeticiones <= 0) {
            toast.error("Las repeticiones deben ser un número mayor a 0. 🔢");
            isValid = false;
        }

        // Validación del peso (opcional)
        if (data.peso && data.peso < 0) {
            toast.error("El peso no puede ser un número negativo. ⚖️");
            isValid = false;
        }

        // Validación de las notas (opcional)
        if (data.notas && data.notas.length > 200) {
            toast.error("Las notas no pueden tener más de 200 caracteres. 📝");
            isValid = false;
        }

        return isValid;
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que se recargue la página

        if (!validateFields()) {
            return; // Detiene el proceso si la validación falla
        }

        // Realiza una solicitud POST al servidor para guardar el registro
        post(route("diario.store"), {
            onSuccess: () => {
                reset(); // Limpia el formulario si la solicitud es exitosa
                Swal.fire({
                    title: "¡Registro Exitoso! 🎉",
                    text: "¡Bien hecho! Tu ejercicio ha sido guardado.",
                    icon: "success",
                    confirmButtonText: "💪 ¡A seguir entrenando!",
                    background: "#f1f8e9", // Estilo del fondo del modal
                    color: "#388e3c", // Color del texto
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Oops! 😥",
                    text: "Algo salió mal. Intenta de nuevo.",
                    icon: "error",
                    confirmButtonText: "Intentar de nuevo",
                    background: "#ffebee", // Estilo del fondo del modal
                    color: "#d32f2f", // Color del texto
                });
            },
        });
    };

    // Vacía el formulario y muestra una notificación
    const vaciarFormulario = () => {
        reset(); // Limpia los datos del formulario
        Swal.fire({
            title: "Formulario Vacío",
            text: "Todos los campos han sido vaciados.",
            icon: "info",
            confirmButtonText: "Entendido",
            background: "#e0f7fa", // Estilo del fondo del modal
            color: "#00796b", // Color del texto
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="pt-8 space-y-6 bg-gradient-to-r from-green-50 to-lime-50 text-gray-800"
        >
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                    <label className="block text-lg font-semibold mb-2">
                        📅 Fecha
                    </label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                        value={data.fecha}
                        onChange={(e) => setData("fecha", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold mb-2">
                        🏋️ Ejercicio
                    </label>
                    <select
                        className="w-full px-4 py-2 rounded-full border border-gray-300 mb-2 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                        onChange={(e) => setData("ejercicio", e.target.value)}
                        value={data.ejercicio}
                    >
                        <option value="">Selecciona un ejercicio...</option>
                        {ejerciciosPrevios.map((ejercicio, index) => (
                            <option key={index} value={ejercicio}>
                                {ejercicio}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="w-full px-4 py-2 rounded-full border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200 transition duration-300 ease-in-out"
                        placeholder="Ej. Sentadillas con barra"
                        value={data.ejercicio}
                        onChange={(e) => setData("ejercicio", e.target.value)}
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
                        onChange={(e) => setData("series", e.target.value)}
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
                        onChange={(e) => setData("peso", e.target.value)}
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
                    onChange={(e) => setData("notas", e.target.value)}
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
    );
}

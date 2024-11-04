import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";

const MySwal = withReactContent(Swal);

export default function Historial({ ejercicios, auth }) {
    const fechaActual = dayjs().format("YYYY-MM-DD");
    const [filteredEjercicios, setFilteredEjercicios] = useState(ejercicios);
    const [filtroFecha, setFiltroFecha] = useState(fechaActual);

    useEffect(() => {
        aplicarFiltros();
    }, [filtroFecha, ejercicios]);

    const aplicarFiltros = () => {
        setFilteredEjercicios(
            ejercicios.filter((ejercicio) => ejercicio.fecha === filtroFecha)
        );
    };

    const eliminarEjercicio = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("diario.destroy", id), {
                    onSuccess: () => {
                        Swal.fire(
                            "Eliminado",
                            "Ejercicio eliminado exitosamente",
                            "success"
                        );
                        setFilteredEjercicios(
                            filteredEjercicios.filter((e) => e.id !== id)
                        );
                    },
                });
            }
        });
    };

    const editarEjercicio = (ejercicio) => {
        MySwal.fire({
            title: "Editar Ejercicio",
            html: (
                <div className="space-y-4">
                    <input
                        type="date"
                        id="fecha"
                        defaultValue={ejercicio.fecha}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    <input
                        type="text"
                        id="ejercicio"
                        defaultValue={ejercicio.ejercicio}
                        placeholder="Ejercicio"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    <input
                        type="number"
                        id="series"
                        defaultValue={ejercicio.series}
                        placeholder="Series"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    <input
                        type="number"
                        id="repeticiones"
                        defaultValue={ejercicio.repeticiones}
                        placeholder="Repeticiones"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    <input
                        type="number"
                        id="peso"
                        defaultValue={ejercicio.peso || ""}
                        placeholder="Peso (kg)"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    <textarea
                        id="notas"
                        defaultValue={ejercicio.notas || ""}
                        placeholder="Notas"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    ></textarea>
                </div>
            ),
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Guardar",
            preConfirm: () => {
                return {
                    fecha: document.getElementById("fecha").value,
                    ejercicio: document.getElementById("ejercicio").value,
                    series: document.getElementById("series").value,
                    repeticiones: document.getElementById("repeticiones").value,
                    peso: document.getElementById("peso").value,
                    notas: document.getElementById("notas").value,
                };
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(route("diario.update", ejercicio.id), result.value, {
                    onSuccess: () => {
                        Swal.fire(
                            "Actualizado",
                            "Ejercicio actualizado exitosamente",
                            "success"
                        );
                        setFilteredEjercicios(
                            filteredEjercicios.map((e) =>
                                e.id === ejercicio.id
                                    ? { ...e, ...result.value }
                                    : e
                            )
                        );
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Historial de Ejercicios" />

            {/* Botón flotante para volver al formulario de registro */}
            <div className="relative w-full">
                <Link
                    href={route("diario.index")}
                    className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-lime-500 text-white font-semibold px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out animate-bounce"
                >
                    ➕ Nuevo Registro
                </Link>
            </div>

            <div className="min-h-screen bg-gradient-to-b from-lime-100 via-green-100 to-green-200 py-10">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Filtros */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-gradient-to-r from-lime-200 to-green-300 p-6 rounded-xl shadow-lg">
                        <div className="flex items-center space-x-3">
                            <span className="text-lg font-semibold text-green-800">
                                📅 Fecha:
                            </span>
                            <input
                                type="date"
                                value={filtroFecha}
                                onChange={(e) => setFiltroFecha(e.target.value)}
                                className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:border-green-500 focus:ring focus:ring-green-200 transition duration-200 ease-in-out"
                            />
                        </div>
                        <button
                            onClick={aplicarFiltros}
                            className="flex items-center space-x-2 bg-gradient-to-r from-lime-600 to-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition duration-300 ease-in-out transform"
                        >
                            <span>🔍</span>
                            <span>Aplicar Filtro</span>
                        </button>
                    </div>

                    {/* Historial de Ejercicios */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEjercicios.length > 0 ? (
                            filteredEjercicios.map((ejercicio) => (
                                <div
                                    key={ejercicio.id}
                                    className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition duration-300 ease-in-out"
                                >
                                    <h3 className="text-2xl font-bold text-teal-600 flex items-center space-x-2">
                                        {ejercicio.ejercicio} 🏋️
                                    </h3>
                                    <p className="text-gray-500 mt-2">
                                        <span className="font-semibold">
                                            📅 Fecha:
                                        </span>{" "}
                                        {new Date(
                                            ejercicio.fecha
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        <span className="font-semibold">
                                            🔄 Series:
                                        </span>{" "}
                                        {ejercicio.series}
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        <span className="font-semibold">
                                            🔢 Repeticiones:
                                        </span>{" "}
                                        {ejercicio.repeticiones}
                                    </p>
                                    {ejercicio.peso && (
                                        <p className="text-gray-500 mt-2">
                                            <span className="font-semibold">
                                                ⚖️ Peso:
                                            </span>{" "}
                                            {ejercicio.peso} kg
                                        </p>
                                    )}
                                    {ejercicio.notas && (
                                        <p className="text-gray-500 mt-2 italic">
                                            <span className="font-semibold">
                                                📝 Notas:
                                            </span>{" "}
                                            {ejercicio.notas}
                                        </p>
                                    )}
                                    <div className="flex justify-end space-x-3 mt-4">
                                        <button
                                            onClick={() =>
                                                editarEjercicio(ejercicio)
                                            }
                                            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out shadow-md"
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                eliminarEjercicio(ejercicio.id)
                                            }
                                            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 ease-in-out shadow-md"
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center bg-lime-100 text-lime-800 py-8 px-4 rounded-lg shadow-lg">
                                <span className="text-5xl mb-4">😕</span>
                                <p className="text-xl font-semibold">
                                    No se encontraron ejercicios para la fecha
                                    seleccionada.
                                </p>
                                <p className="text-gray-600">
                                    Intenta seleccionar otra fecha o verifica si
                                    registraste ejercicios ese día.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

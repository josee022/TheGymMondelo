import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dayjs from "dayjs";
import BotonNuevoRegistro from "@/Components/Diario/BotonNuevoRegistro";
import FiltroFecha from "@/Components/Diario/FiltroFecha";
import TarjetaEjercicio from "@/Components/Diario/TarjetaEjercicio";
import FiltroEjercicio from "@/Components/Diario/FiltroEjercicio";
import ContenedorGrafica from "@/Components/Diario/ContenedorGrafica";

const MySwal = withReactContent(Swal);

export default function Historial({ ejercicios, auth }) {
    const fechaActual = dayjs().format("YYYY-MM-DD");
    const [filteredEjercicios, setFilteredEjercicios] = useState(ejercicios);
    const [filtroFecha, setFiltroFecha] = useState(fechaActual);
    const [filtroEjercicio, setFiltroEjercicio] = useState("");
    const [datosGrafico, setDatosGrafico] = useState(null);

    useEffect(() => {
        aplicarFiltros();
    }, [filtroFecha, ejercicios]);

    const aplicarFiltros = () => {
        setFilteredEjercicios(
            ejercicios.filter((ejercicio) => ejercicio.fecha === filtroFecha)
        );
    };

    const mostrarGrafica = () => {
        const datos = ejercicios.filter((e) => e.ejercicio === filtroEjercicio);
        setDatosGrafico(datos);
    };

    const limpiarGrafica = () => {
        setDatosGrafico(null);
        setFiltroEjercicio("");
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
            preConfirm: () => ({
                fecha: document.getElementById("fecha").value,
                ejercicio: document.getElementById("ejercicio").value,
                series: document.getElementById("series").value,
                repeticiones: document.getElementById("repeticiones").value,
                peso: document.getElementById("peso").value,
                notas: document.getElementById("notas").value,
            }),
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

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Historial de Ejercicios" />
            <BotonNuevoRegistro />

            <div className="min-h-screen bg-gradient-to-b from-lime-100 via-green-100 to-green-200 py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <FiltroFecha
                        filtroFecha={filtroFecha}
                        setFiltroFecha={setFiltroFecha}
                        aplicarFiltros={aplicarFiltros}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {filteredEjercicios.length > 0 ? (
                            filteredEjercicios.map((ejercicio) => (
                                <TarjetaEjercicio
                                    key={ejercicio.id}
                                    ejercicio={ejercicio}
                                    editarEjercicio={() =>
                                        editarEjercicio(ejercicio)
                                    }
                                    eliminarEjercicio={() =>
                                        eliminarEjercicio(ejercicio.id)
                                    }
                                />
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

                    {/* Filtro de Ejercicio y Gráfica */}
                    <FiltroEjercicio
                        filtroEjercicio={filtroEjercicio}
                        setFiltroEjercicio={setFiltroEjercicio}
                        mostrarGrafica={mostrarGrafica}
                        limpiarGrafica={limpiarGrafica}
                        ejerciciosDisponibles={Array.from(
                            new Set(filteredEjercicios.map((e) => e.ejercicio))
                        )}
                    />

                    {/* Gráfica de Progreso */}
                    {datosGrafico && (
                        <ContenedorGrafica datosGrafico={datosGrafico} />
                    )}
                </div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

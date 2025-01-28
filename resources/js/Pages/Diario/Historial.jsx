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
import BotonesExportar from "@/Components/Diario/BotonesExportar";
import NotificacionMotivacion from "@/Components/Diario/NotificacionMotivacion";

// Configuración para usar SweetAlert con React
const MySwal = withReactContent(Swal);

export default function Historial({ ejercicios, auth }) {
    const fechaActual = dayjs().format("YYYY-MM-DD"); // Fecha actual formateada
    const [filteredEjercicios, setFilteredEjercicios] = useState(ejercicios); // Ejercicios filtrados por fecha
    const [filtroFecha, setFiltroFecha] = useState(fechaActual); // Estado para filtrar por fecha
    const [filtroEjercicio, setFiltroEjercicio] = useState(""); // Estado para filtrar por nombre de ejercicio
    const [datosGrafico, setDatosGrafico] = useState(null); // Datos seleccionados para el gráfico
    const [mensajeMotivacional, setMensajeMotivacional] = useState(""); // Mensaje motivacional

    // Efecto para obtener el mensaje motivacional del servidor al cargar el componente
    useEffect(() => {
        fetch("/diario/mensaje-motivacional") // Solicitud al backend para obtener el mensaje
            .then((response) => response.json()) // Convierte la respuesta a JSON
            .then((data) => setMensajeMotivacional(data.mensaje)) // Actualiza el estado con el mensaje recibido
            .catch((error) =>
                console.error(
                    "Error al obtener el mensaje motivacional:",
                    error
                )
            );
    }, []); // Solo se ejecuta al montar el componente

    // Efecto para aplicar filtros cada vez que cambia la fecha o los ejercicios
    useEffect(() => {
        aplicarFiltros(); // Aplica los filtros basados en la fecha seleccionada
    }, [filtroFecha, ejercicios]); // Se ejecuta cuando cambian el filtro o los ejercicios

    // Filtra los ejercicios según la fecha seleccionada
    const aplicarFiltros = () => {
        setFilteredEjercicios(
            ejercicios.filter((ejercicio) => ejercicio.fecha === filtroFecha) // Filtra ejercicios por fecha
        );
    };

    // Genera los datos para un gráfico basado en el ejercicio seleccionado
    const mostrarGrafica = () => {
        const datos = ejercicios.filter((e) => e.ejercicio === filtroEjercicio); // Filtra ejercicios por nombre
        setDatosGrafico(datos); // Actualiza el estado con los datos seleccionados
    };

    // Limpia los datos del gráfico y reinicia el filtro de ejercicio
    const limpiarGrafica = () => {
        setDatosGrafico(null); // Elimina los datos del gráfico
        setFiltroEjercicio(""); // Resetea el filtro de ejercicio
    };

    // Función para editar un ejercicio
    const editarEjercicio = (ejercicio) => {
        // Configura el modal con SweetAlert para editar un ejercicio
        MySwal.fire({
            title: "Editar Ejercicio", // Título del modal
            html: (
                <div className="space-y-4">
                    {/* Campo para la fecha */}
                    <input
                        type="date"
                        id="fecha"
                        defaultValue={ejercicio.fecha} // Valor actual del ejercicio
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    {/* Campo para el nombre del ejercicio */}
                    <input
                        type="text"
                        id="ejercicio"
                        defaultValue={ejercicio.ejercicio}
                        placeholder="Ejercicio"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    {/* Campo para el número de series */}
                    <input
                        type="number"
                        id="series"
                        defaultValue={ejercicio.series}
                        placeholder="Series"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    {/* Campo para el número de repeticiones */}
                    <input
                        type="number"
                        id="repeticiones"
                        defaultValue={ejercicio.repeticiones}
                        placeholder="Repeticiones"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    {/* Campo para el peso */}
                    <input
                        type="number"
                        id="peso"
                        defaultValue={ejercicio.peso || ""} // Si no hay peso, deja el campo vacío
                        placeholder="Peso (kg)"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    />
                    {/* Campo para las notas */}
                    <textarea
                        id="notas"
                        defaultValue={ejercicio.notas || ""} // Si no hay notas, deja el campo vacío
                        placeholder="Notas"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lime-500 focus:ring focus:ring-lime-200"
                    ></textarea>
                </div>
            ),
            showCancelButton: true, // Muestra el botón de cancelar
            focusConfirm: false, // Evita que el botón de confirmar reciba el foco automáticamente
            confirmButtonText: "Guardar", // Texto del botón de confirmar
            preConfirm: () => ({
                // Recoge los valores de los campos al confirmar
                fecha: document.getElementById("fecha").value,
                ejercicio: document.getElementById("ejercicio").value,
                series: document.getElementById("series").value,
                repeticiones: document.getElementById("repeticiones").value,
                peso: document.getElementById("peso").value,
                notas: document.getElementById("notas").value,
            }),
        }).then((result) => {
            if (result.isConfirmed) {
                // Si se confirma, envía los datos actualizados al servidor
                router.put(route("diario.update", ejercicio.id), result.value, {
                    onSuccess: () => {
                        // Muestra una notificación de éxito
                        Swal.fire(
                            "Actualizado",
                            "Ejercicio actualizado exitosamente",
                            "success"
                        );
                        // Actualiza la lista de ejercicios filtrados
                        setFilteredEjercicios(
                            filteredEjercicios.map((e) =>
                                e.id === ejercicio.id
                                    ? { ...e, ...result.value } // Actualiza solo el ejercicio modificado
                                    : e
                            )
                        );
                    },
                });
            }
        });
    };

    // Función para eliminar un ejercicio
    const eliminarEjercicio = (id) => {
        // Configura el modal de confirmación con SweetAlert
        Swal.fire({
            title: "¿Estás seguro?", // Título del modal
            text: "Esta acción no se puede deshacer.", // Mensaje de advertencia
            icon: "warning", // Icono de advertencia
            showCancelButton: true, // Muestra el botón de cancelar
            confirmButtonText: "Sí, eliminar", // Texto del botón de confirmación
            cancelButtonText: "Cancelar", // Texto del botón de cancelación
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma la eliminación
                router.delete(route("diario.destroy", id), {
                    onSuccess: () => {
                        // Muestra un mensaje de éxito al eliminar
                        Swal.fire(
                            "Eliminado",
                            "Ejercicio eliminado exitosamente",
                            "success"
                        );

                        // Actualiza la lista de ejercicios filtrados localmente
                        setFilteredEjercicios(
                            filteredEjercicios.filter((e) => e.id !== id) // Elimina el ejercicio del estado local
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
                    {/* Muestra el mensaje motivacional */}
                    <NotificacionMotivacion mensaje={mensajeMotivacional} />

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
                    <FiltroEjercicio
                        filtroEjercicio={filtroEjercicio}
                        setFiltroEjercicio={setFiltroEjercicio}
                        mostrarGrafica={mostrarGrafica}
                        limpiarGrafica={limpiarGrafica}
                        ejerciciosDisponibles={Array.from(
                            new Set(filteredEjercicios.map((e) => e.ejercicio))
                        )}
                    />
                    {datosGrafico && (
                        <ContenedorGrafica datosGrafico={datosGrafico} />
                    )}
                    <BotonesExportar filtroFecha={filtroFecha} />
                </div>
            </div>

            <Footer />
        </AuthenticatedLayout>
    );
}

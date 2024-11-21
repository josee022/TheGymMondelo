import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CrearClase = ({ entrenadores, selectedClase, onSubmit }) => {
    const initialFormState = {
        nombre: "",
        descripcion: "",
        fecha: "",
        hora_inicio: "",
        hora_fin: "",
        entrenador_id: "",
        capacidad: "",
    };

    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        if (selectedClase) {
            setForm(selectedClase);
        } else {
            setForm(initialFormState);
        }
    }, [selectedClase]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const validateForm = () => {
        const {
            nombre,
            descripcion,
            fecha,
            hora_inicio,
            hora_fin,
            entrenador_id,
            capacidad,
        } = form;

        // Validar campos vacíos
        if (!nombre.trim()) {
            Swal.fire(
                "Error",
                "El nombre de la clase es obligatorio.",
                "error"
            );
            return false;
        }
        if (nombre.length < 3) {
            Swal.fire(
                "Error",
                "El nombre debe tener al menos 3 caracteres.",
                "error"
            );
            return false;
        }
        if (!descripcion.trim()) {
            Swal.fire("Error", "La descripción es obligatoria.", "error");
            return false;
        }
        if (descripcion.length < 10) {
            Swal.fire(
                "Error",
                "La descripción debe tener al menos 10 caracteres.",
                "error"
            );
            return false;
        }
        if (!fecha) {
            Swal.fire("Error", "La fecha es obligatoria.", "error");
            return false;
        }

        // Validar que la fecha sea futura
        const selectedDate = new Date(fecha);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        if (selectedDate <= currentDate) {
            Swal.fire("Error", "La fecha debe ser una fecha futura.", "error");
            return false;
        }

        if (!hora_inicio) {
            Swal.fire("Error", "La hora de inicio es obligatoria.", "error");
            return false;
        }
        if (!hora_fin) {
            Swal.fire("Error", "La hora de fin es obligatoria.", "error");
            return false;
        }

        // Validar que la hora de fin sea posterior a la hora de inicio
        if (hora_inicio >= hora_fin) {
            Swal.fire(
                "Error",
                "La hora de fin debe ser posterior a la hora de inicio.",
                "error"
            );
            return false;
        }

        if (!entrenador_id) {
            Swal.fire("Error", "Debes seleccionar un entrenador.", "error");
            return false;
        }

        if (!capacidad || capacidad <= 0) {
            Swal.fire(
                "Error",
                "La capacidad debe ser un número mayor o igual a 1.",
                "error"
            );
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            onSubmit(form);
        }
    };

    const resetForm = () => {
        setForm(initialFormState);
    };

    return (
        <div className="bg-gradient-to-br from-lime-300 to-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-center text-black-600 mb-4">
                {selectedClase ? "Editar Clase" : "Crear Nueva Clase"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Nombre de la Clase
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        placeholder="Nombre de la Clase"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        value={form.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción de la Clase"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                        rows="2"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="fecha"
                            value={form.fecha}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Hora de Inicio
                        </label>
                        <input
                            type="time"
                            name="hora_inicio"
                            value={form.hora_inicio}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Hora de Fin
                        </label>
                        <input
                            type="time"
                            name="hora_fin"
                            value={form.hora_fin}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Entrenador
                    </label>
                    <select
                        name="entrenador_id"
                        value={form.entrenador_id}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                    >
                        <option value="">Selecciona un Entrenador</option>
                        {entrenadores.map((entrenador) => (
                            <option key={entrenador.id} value={entrenador.id}>
                                {entrenador.usuario.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">
                        Capacidad de la Clase
                    </label>
                    <input
                        type="number"
                        name="capacidad"
                        value={form.capacidad}
                        onChange={handleChange}
                        placeholder="Capacidad"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                        min="1"
                    />
                </div>
                <div className="flex justify-between gap-3">
                    <button
                        type="submit"
                        className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-lime-300"
                    >
                        {selectedClase ? "Actualizar Clase" : "Crear Clase"}
                    </button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Vaciar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CrearClase;

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CrearPrograma = ({
    selectedPrograma, // Programa seleccionado para edición
    setSelectedPrograma, // Función para limpiar el programa seleccionado
    handleSubmit, // Función para manejar el envío del formulario
}) => {
    // Estado inicial del formulario
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        duracion: "",
        nivel: "Principiante", // Valor predeterminado
        precio: "",
    });

    // Actualiza el formulario si cambia el programa seleccionado
    useEffect(() => {
        if (selectedPrograma) {
            // Rellena el formulario con los datos del programa seleccionado
            setForm(selectedPrograma);
        } else {
            // Restaura el formulario a su estado inicial
            setForm({
                nombre: "",
                descripcion: "",
                duracion: "",
                nivel: "Principiante",
                precio: "",
            });
        }
    }, [selectedPrograma]);

    // Maneja los cambios en los campos del formulario
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value })); // Actualiza el campo correspondiente
    };

    const validateForm = () => {
        // Desestructuración de los datos del formulario
        const { nombre, descripcion, duracion, nivel, precio } = form;

        // Validación del nombre
        if (!nombre.trim()) {
            Swal.fire(
                "Error",
                "El nombre del programa es obligatorio.",
                "error"
            );
            return false; // Detiene la ejecución si el nombre está vacío
        }
        if (nombre.trim().length < 3) {
            Swal.fire(
                "Error",
                "El nombre debe tener al menos 3 caracteres.",
                "error"
            );
            return false; // Detiene la ejecución si el nombre tiene menos de 3 caracteres
        }

        // Validación de la descripción
        if (!descripcion.trim()) {
            Swal.fire("Error", "La descripción es obligatoria.", "error");
            return false; // Detiene la ejecución si la descripción está vacía
        }
        if (descripcion.trim().length < 10) {
            Swal.fire(
                "Error",
                "La descripción debe tener al menos 10 caracteres.",
                "error"
            );
            return false; // Detiene la ejecución si la descripción tiene menos de 10 caracteres
        }

        // Validación de la duración
        if (!duracion || isNaN(duracion) || duracion < 1) {
            Swal.fire(
                "Error",
                "La duración debe ser un número mayor o igual a 1 (en semanas).",
                "error"
            );
            return false; // Detiene la ejecución si la duración es menor que 1 o no es un número
        }

        // Validación del nivel
        if (!["Principiante", "Intermedio", "Avanzado"].includes(nivel)) {
            Swal.fire("Error", "El nivel seleccionado no es válido.", "error");
            return false; // Detiene la ejecución si el nivel no es válido
        }

        // Validación del precio
        if (!precio || isNaN(precio) || precio < 0) {
            Swal.fire(
                "Error",
                "El precio debe ser un número mayor o igual a 0.",
                "error"
            );
            return false; // Detiene la ejecución si el precio es menor que 0 o no es un número
        }

        return true; // Retorna true si todas las validaciones pasan
    };

    const onSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recarga de la página)

        if (validateForm()) {
            // Valida los datos del formulario
            // Si la validación pasa, se llama a `handleSubmit` con los datos y el estado de edición
            handleSubmit(form, !!selectedPrograma);

            // Restablece el formulario a su estado inicial después de enviar
            setForm({
                nombre: "",
                descripcion: "",
                duracion: "",
                nivel: "Principiante",
                precio: "",
            });

            // Limpia el programa seleccionado (si está editando)
            setSelectedPrograma(null);
        }
    };

    const onClear = () => {
        // Restablece el formulario a su estado inicial
        setForm({
            nombre: "",
            descripcion: "",
            duracion: "",
            nivel: "Principiante",
            precio: "",
        });

        // Limpia la selección del programa (si se estaba editando)
        setSelectedPrograma(null);
    };

    return (
        <form
            onSubmit={onSubmit}
            className="space-y-5 bg-gradient-to-br from-lime-50 to-lime-100 p-8 rounded-3xl shadow-xl"
        >
            <h2 className="text-3xl font-bold text-center text-black-600 mb-4">
                {selectedPrograma
                    ? "📝 Editar Programa"
                    : "Crear Nuevo Programa"}
            </h2>
            <input
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                placeholder="Nombre del Programa"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400"
                required
            />
            <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={onChange}
                placeholder="Descripción"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400"
            />
            <input
                name="duracion"
                type="number"
                value={form.duracion}
                onChange={onChange}
                placeholder="Duración (semanas)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400"
                required
            />
            <select
                name="nivel"
                value={form.nivel}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400"
            >
                <option>Principiante</option>
                <option>Intermedio</option>
                <option>Avanzado</option>
            </select>
            <input
                name="precio"
                type="number"
                value={form.precio}
                onChange={onChange}
                placeholder="Precio"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400"
                required
            />
            <button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-3 rounded-lg"
            >
                {selectedPrograma ? "Actualizar Programa" : "Crear Programa"}
            </button>
            <button
                type="button"
                onClick={onClear}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg"
            >
                Vaciar
            </button>
        </form>
    );
};

export default CrearPrograma;

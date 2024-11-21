import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const CrearPrograma = ({
    selectedPrograma,
    setSelectedPrograma,
    handleSubmit,
}) => {
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        duracion: "",
        nivel: "Principiante",
        precio: "",
    });

    useEffect(() => {
        if (selectedPrograma) {
            setForm(selectedPrograma);
        } else {
            setForm({
                nombre: "",
                descripcion: "",
                duracion: "",
                nivel: "Principiante",
                precio: "",
            });
        }
    }, [selectedPrograma]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { nombre, descripcion, duracion, nivel, precio } = form;

        if (!nombre.trim()) {
            Swal.fire(
                "Error",
                "El nombre del programa es obligatorio.",
                "error"
            );
            return false;
        }
        if (nombre.trim().length < 3) {
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
        if (descripcion.trim().length < 10) {
            Swal.fire(
                "Error",
                "La descripción debe tener al menos 10 caracteres.",
                "error"
            );
            return false;
        }

        if (!duracion || isNaN(duracion) || duracion < 1) {
            Swal.fire(
                "Error",
                "La duración debe ser un número mayor o igual a 1 (en semanas).",
                "error"
            );
            return false;
        }

        if (!["Principiante", "Intermedio", "Avanzado"].includes(nivel)) {
            Swal.fire("Error", "El nivel seleccionado no es válido.", "error");
            return false;
        }

        if (!precio || isNaN(precio) || precio < 0) {
            Swal.fire(
                "Error",
                "El precio debe ser un número mayor o igual a 0.",
                "error"
            );
            return false;
        }

        return true;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleSubmit(form, !!selectedPrograma);
            setForm({
                nombre: "",
                descripcion: "",
                duracion: "",
                nivel: "Principiante",
                precio: "",
            });
            setSelectedPrograma(null);
        }
    };

    const onClear = () => {
        setForm({
            nombre: "",
            descripcion: "",
            duracion: "",
            nivel: "Principiante",
            precio: "",
        });
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

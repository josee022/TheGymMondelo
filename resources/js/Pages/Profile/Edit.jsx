import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import Footer from "@/Components/Footer";
import React, { useState } from "react";

export default function Edit({ user }) {
    // Inicializa el formulario con los datos del usuario actual
    const { data, setData, errors } = useForm({
        name: user.name || "", // Nombre del usuario (o vacío si no existe)
        email: user.email || "", // Email del usuario
        biografia: user.biografia || "", // Biografía del usuario
        fecha_nacimiento: user.fecha_nacimiento || "", // Fecha de nacimiento
        sexo: user.sexo || "", // Sexo del usuario
        altura: user.altura || "", // Altura en cm
        peso: user.peso || "", // Peso en kg
        nivel_actividad: user.nivel_actividad || "", // Nivel de actividad física
        foto_perfil: null, // Foto de perfil (por defecto, null)
    });

    // Estado para mostrar una vista previa de la foto de perfil seleccionada
    const [preview, setPreview] = useState(
        user.foto_perfil ? `/fotos_perfil/${user.foto_perfil}` : null // Si el usuario tiene foto, muestra la URL
    );

    // Estado para indicar si el formulario está procesando la solicitud
    const [isProcessing, setIsProcessing] = useState(false);

    // Maneja el cambio de imagen al seleccionar una nueva foto
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Obtiene el archivo seleccionado
        setData("foto_perfil", file); // Actualiza el estado con el archivo seleccionado

        if (file) {
            setPreview(URL.createObjectURL(file)); // Genera una vista previa del archivo
        }
    };

    // Maneja el envío del formulario
    const submit = async (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        setIsProcessing(true); // Activa el estado de procesamiento

        // Crea un objeto FormData para enviar los datos, incluyendo la imagen
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("biografia", data.biografia);
        formData.append("fecha_nacimiento", data.fecha_nacimiento);
        formData.append("sexo", data.sexo);
        formData.append("altura", data.altura);
        formData.append("peso", data.peso);
        formData.append("nivel_actividad", data.nivel_actividad);

        // Si se seleccionó una nueva foto de perfil, agrégala a los datos
        if (data.foto_perfil) {
            formData.append("foto_perfil", data.foto_perfil);
        }

        try {
            // Envía los datos al servidor para actualizar el perfil
            await router.post(route("profile.update"), formData, {
                forceFormData: true, // Asegura que los datos se envíen como FormData
            });
        } catch (error) {
            console.error("Error al actualizar el perfil:", error); // Maneja errores de la solicitud
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Editar Perfil
                </h2>
            }
        >
            <Head title="Editar perfil" />
            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
                    <form
                        onSubmit={submit}
                        encType="multipart/form-data"
                        className="space-y-6"
                    >
                        {/* Imagen de perfil */}
                        <div className="flex items-center gap-6 mb-4">
                            <div>
                                <img
                                    src={
                                        preview || "/images/default-avatar.png"
                                    }
                                    alt="Vista previa"
                                    className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-md"
                                />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-gray-700"
                            />
                            <InputError
                                message={errors.foto_perfil}
                                className="mt-2"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="name" value="Nombre" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Correo electrónico"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full bg-gray-200"
                                    autoComplete="email"
                                    readOnly
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="biografia"
                                    value="Biografía"
                                />
                                <TextInput
                                    id="biografia"
                                    name="biografia"
                                    value={data.biografia}
                                    className="mt-1 block w-full"
                                    autoComplete="biografia"
                                    onChange={(e) =>
                                        setData("biografia", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.biografia}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="fecha_nacimiento"
                                    value="Fecha de nacimiento"
                                />
                                <TextInput
                                    id="fecha_nacimiento"
                                    type="date"
                                    name="fecha_nacimiento"
                                    value={data.fecha_nacimiento}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData(
                                            "fecha_nacimiento",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.fecha_nacimiento}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="sexo" value="Sexo" />
                                <select
                                    id="sexo"
                                    name="sexo"
                                    value={data.sexo}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                    onChange={(e) =>
                                        setData("sexo", e.target.value)
                                    }
                                >
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                <InputError
                                    message={errors.sexo}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="altura"
                                    value="Altura (cm)"
                                />
                                <TextInput
                                    id="altura"
                                    type="number"
                                    name="altura"
                                    value={data.altura}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("altura", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.altura}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor="peso" value="Peso (kg)" />
                                <TextInput
                                    id="peso"
                                    type="number"
                                    name="peso"
                                    value={data.peso}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("peso", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.peso}
                                    className="mt-2"
                                />
                            </div>

                            <div className="col-span-2">
                                <InputLabel
                                    htmlFor="nivel_actividad"
                                    value="Nivel de actividad"
                                />
                                <select
                                    id="nivel_actividad"
                                    name="nivel_actividad"
                                    value={data.nivel_actividad}
                                    className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                    onChange={(e) =>
                                        setData(
                                            "nivel_actividad",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="Sedentario">
                                        Sedentario
                                    </option>
                                    <option value="Ligero">Ligero</option>
                                    <option value="Moderado">Moderado</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Muy Activo">
                                        Muy Activo
                                    </option>
                                </select>
                                <InputError
                                    message={errors.nivel_actividad}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end mt-6 gap-4">
                            <a
                                href="/dashboard"
                                className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                            >
                                Volver
                            </a>
                            <PrimaryButton
                                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                disabled={isProcessing}
                            >
                                {isProcessing
                                    ? "Guardando..."
                                    : "Guardar cambios"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </AuthenticatedLayout>
    );
}

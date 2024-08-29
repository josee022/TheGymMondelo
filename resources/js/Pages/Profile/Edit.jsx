import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importa el layout para usuarios autenticados
import { Head, useForm } from '@inertiajs/react'; // Importa los componentes necesarios de InertiaJS
import InputLabel from '@/Components/InputLabel'; // Importa el componente para las etiquetas de entrada
import TextInput from '@/Components/TextInput'; // Importa el componente para los campos de texto
import PrimaryButton from '@/Components/PrimaryButton'; // Importa el componente para el botón primario
import InputError from '@/Components/InputError'; // Importa el componente para mostrar errores de entrada
import Footer from '@/Components/Footer'; // Importa el componente para el pie de página

export default function Edit({ user }) {
    // Inicializa el formulario con los datos del usuario
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '', // Nombre del usuario
        email: user.email || '', // Correo electrónico del usuario
        biografia: user.biografia || '', // Biografía del usuario
        fecha_nacimiento: user.fecha_nacimiento || '', // Fecha de nacimiento del usuario
        sexo: user.sexo || '', // Sexo del usuario
        altura: user.altura || '', // Altura del usuario
        peso: user.peso || '', // Peso del usuario
        nivel_actividad: user.nivel_actividad || '', // Nivel de actividad del usuario
    });

    // Función para manejar el envío del formulario
    const submit = (e) => {
        e.preventDefault(); // Previene la acción por defecto del formulario
        patch(route('profile.update')); // Envía los datos del formulario al servidor usando el método PATCH
    };

    return (
        <AuthenticatedLayout
            user={user} // Pasa el objeto de usuario al layout autenticado
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edición del perfil de usuario : </h2>} // Encabezado del panel de edición
        >
            <Head title="Editar perfil" />

            <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-50 to-lime-400 py-12">
                {/* Contenedor principal */}
                <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                    {/* Encabezado del formulario */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1 bg-[#a3e635]"></span>
                                <span className="relative">Editar Perfil</span>
                            </span>
                        </h1>
                    </div>

                    {/* Formulario de edición */}
                    <form onSubmit={submit}> {/* Ejecuta la función `submit` cuando se envíe el formulario */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Información Básica */}
                            <div>
                                <InputLabel htmlFor="name" value="Nombre" /> {/* Etiqueta para el campo de nombre */}
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name} // Valor del campo de nombre
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)} // Actualiza el valor en el estado
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" /> {/* Muestra errores de validación para el campo de nombre */}
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Correo electrónico" /> {/* Etiqueta para el campo de correo electrónico */}
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email} // Valor del campo de correo electrónico
                                    className="mt-1 block w-full bg-gray-200"
                                    autoComplete="email"
                                    readOnly // Campo de correo electrónico solo de lectura
                                />
                                <InputError message={errors.email} className="mt-2" /> {/* Muestra errores de validación para el campo de correo electrónico */}
                            </div>

                            <div className="col-span-2">
                                <InputLabel htmlFor="biografia" value="Biografía" /> {/* Etiqueta para el campo de biografía */}
                                <TextInput
                                    id="biografia"
                                    name="biografia"
                                    value={data.biografia} // Valor del campo de biografía
                                    className="mt-1 block w-full"
                                    autoComplete="biografia"
                                    onChange={(e) => setData('biografia', e.target.value)} // Actualiza el valor en el estado
                                />
                                <InputError message={errors.biografia} className="mt-2" /> {/* Muestra errores de validación para el campo de biografía */}
                            </div>

                            <div>
                                <InputLabel htmlFor="fecha_nacimiento" value="Fecha de nacimiento" /> {/* Etiqueta para el campo de fecha de nacimiento */}
                                <TextInput
                                    id="fecha_nacimiento"
                                    type="date"
                                    name="fecha_nacimiento"
                                    value={data.fecha_nacimiento} // Valor del campo de fecha de nacimiento
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('fecha_nacimiento', e.target.value)} // Actualiza el valor en el estado
                                />
                                <InputError message={errors.fecha_nacimiento} className="mt-2" /> {/* Muestra errores de validación para el campo de fecha de nacimiento */}
                            </div>

                            <div>
                                <InputLabel htmlFor="sexo" value="Sexo" /> {/* Etiqueta para el campo de sexo */}
                                <select
                                    id="sexo"
                                    name="sexo"
                                    value={data.sexo} // Valor del campo de sexo
                                    className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                    onChange={(e) => setData('sexo', e.target.value)} // Actualiza el valor en el estado
                                >
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                <InputError message={errors.sexo} className="mt-2" /> {/* Muestra errores de validación para el campo de sexo */}
                            </div>

                            <div>
                                <InputLabel htmlFor="altura" value="Altura (cm)" /> {/* Etiqueta para el campo de altura */}
                                <TextInput
                                    id="altura"
                                    type="number"
                                    name="altura"
                                    value={data.altura} // Valor del campo de altura
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('altura', e.target.value)} // Actualiza el valor en el estado
                                />
                                <InputError message={errors.altura} className="mt-2" /> {/* Muestra errores de validación para el campo de altura */}
                            </div>

                            <div>
                                <InputLabel htmlFor="peso" value="Peso (kg)" /> {/* Etiqueta para el campo de peso */}
                                <TextInput
                                    id="peso"
                                    type="number"
                                    name="peso"
                                    value={data.peso} // Valor del campo de peso
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('peso', e.target.value)} // Actualiza el valor en el estado
                                />
                                <InputError message={errors.peso} className="mt-2" /> {/* Muestra errores de validación para el campo de peso */}
                            </div>

                            <div className="col-span-2">
                                <InputLabel htmlFor="nivel_actividad" value="Nivel de actividad" /> {/* Etiqueta para el campo de nivel de actividad */}
                                <select
                                    id="nivel_actividad"
                                    name="nivel_actividad"
                                    value={data.nivel_actividad} // Valor del campo de nivel de actividad
                                    className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                    onChange={(e) => setData('nivel_actividad', e.target.value)} // Actualiza el valor en el estado
                                >
                                    <option value="Sedentario">Sedentario</option>
                                    <option value="Ligero">Ligero</option>
                                    <option value="Moderado">Moderado</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Muy Activo">Muy Activo</option>
                                </select>
                                <InputError message={errors.nivel_actividad} className="mt-2" /> {/* Muestra errores de validación para el campo de nivel de actividad */}
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex items-center justify-end mt-6 gap-4">
                            <a href="/dashboard" className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#a3e635]">
                                Volver
                            </a>
                            <PrimaryButton className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-[#a3e635]" disabled={processing}>
                                Guardar cambios
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
            <Footer /> {/* Añade el pie de página */}
        </AuthenticatedLayout>
    );
}

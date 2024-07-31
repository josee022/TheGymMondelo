import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';

export default function Edit({ user }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        biografia: user.biografia || '',
        fecha_nacimiento: user.fecha_nacimiento || '',
        sexo: user.sexo || '',
        altura: user.altura || '',
        peso: user.peso || '',
        nivel_actividad: user.nivel_actividad || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar perfil</h2>}
        >
            <Head title="Editar perfil." />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="biografia" value="Biografía" />
                    <TextInput
                        id="biografia"
                        name="biografia"
                        value={data.biografia}
                        className="mt-1 block w-full"
                        autoComplete="biografia"
                        onChange={(e) => setData('biografia', e.target.value)}
                    />
                    <InputError message={errors.biografia} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="fecha_nacimiento" value="Fecha de nacimiento" />
                    <TextInput
                        id="fecha_nacimiento"
                        type="date"
                        name="fecha_nacimiento"
                        value={data.fecha_nacimiento}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                    />
                    <InputError message={errors.fecha_nacimiento} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="sexo" value="Sexo" />
                    <select
                        id="sexo"
                        name="sexo"
                        value={data.sexo}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('sexo', e.target.value)}
                    >
                        <option selected value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <InputError message={errors.sexo} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="altura" value="Altura (cm)" />
                    <TextInput
                        id="altura"
                        type="number"
                        name="altura"
                        value={data.altura}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('altura', e.target.value)}
                    />
                    <InputError message={errors.altura} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="peso" value="Peso (kg)" />
                    <TextInput
                        id="peso"
                        type="number"
                        name="peso"
                        value={data.peso}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('peso', e.target.value)}
                    />
                    <InputError message={errors.peso} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nivel_actividad" value="Nivel de actividad" />
                    <select
                        id="nivel_actividad"
                        name="nivel_actividad"
                        value={data.nivel_actividad}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('nivel_actividad', e.target.value)}
                    >
                        <option value="Sedentario">Sedentario</option>
                        <option value="Ligero">Ligero</option>
                        <option selected value="Moderado">Moderado</option>
                        <option value="Activo">Activo</option>
                        <option value="Muy Activo">Muy Activo</option>
                    </select>
                    <InputError message={errors.nivel_actividad} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <a href="/dashboard" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                        Volver
                    </a>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Guardar cambios.
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

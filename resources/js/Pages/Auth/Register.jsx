import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        fecha_nacimiento: '',
        sexo: '',
        altura: '',
        peso: '',
        nivel_actividad: ''
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Registro" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nombre completo" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
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
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="fecha_nacimiento" value="Fecha de Nacimiento" />
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
                        step="0.01"
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
                        step="0.01"
                        name="peso"
                        value={data.peso}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('peso', e.target.value)}
                    />
                    <InputError message={errors.peso} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nivel_actividad" value="Nivel de Actividad" />
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
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        ¿ Ya tienes cuenta ? Inicie sesión
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Registrate
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function GrayBackgroundPage() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false, // Añadido para el checkbox de "Recordarme"
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/login', {
            onSuccess: () => {
                // Redirige o maneja el estado después del inicio de sesión exitoso
            },
            onError: (error) => {
                // Maneja errores aquí, si es necesario
                console.error('Error:', error);
            },
        });
    };

    return (
        <>
            <Head title="Página con Fondo Gris Oscuro" />

            <div className="relative min-h-screen flex">
                {/* Imagen de fondo en la mitad izquierda */}
                <div className="relative w-1/2 h-screen">
                    {/* Logo de la flecha en la parte superior izquierda */}
                    <div className="absolute top-4 left-4">
                        <Link href="/" className="block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="w-8 h-8 text-white cursor-pointer"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </Link>
                    </div>
                    <img
                        src="/imagenes/login_register/2-loginRegister.jpg"
                        alt="Background"
                        className="object-cover h-full w-full"
                    />
                </div>

                {/* Contenedor a la derecha con fondo gris oscuro */}
                <div className="w-1/2 h-screen bg-gray-700 flex flex-col items-center justify-center relative">
                    {/* Logo en la esquina superior derecha */}
                    <div className="absolute top-0 right-0 p-4">
                        <img
                            src="/imagenes/logo/1-logoWeb.png"
                            alt="Logo"
                            className="w-36 h-auto"
                        />
                    </div>

                    {/* Mensaje centrado vertical y horizontalmente */}
                    <div className="text-center text-white flex flex-col items-center justify-center h-full px-8">
                        <h1 className="text-4xl font-bold mb-4 relative">
                            <span className="relative inline-block">
                                <span className="absolute inset-x-0 bottom-0 h-1" style={{ backgroundColor: '#a3e635' }}></span>
                                <span className="relative">BIENVENIDO DE NUEVO</span>
                            </span>
                        </h1>

                        {/* Formulario */}
                        <form className="w-full max-w-md mt-8" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-white text-lg mb-2">Correo electrónico</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Ingrese su correo"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-white text-lg mb-2">Contraseña</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.password ? 'border-red-500' : ''}`}
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>

                            {/* Checkbox "Recordarme" */}
                            <div className="mb-4 flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="mr-2 h-4 w-4"
                                />
                                <label htmlFor="remember" className="text-white text-sm">Recordarme</label>
                            </div>

                            {/* Enlace para recuperar contraseña */}
                            <div className="text-sm text-gray-200 mb-4">
                                <Link
                                    href={route('password.request')}
                                    className="underline hover:text-[#a3e635]"
                                >
                                    ¿Has olvidado tu contraseña? Recupérala
                                </Link>
                            </div>

                            {/* Botón de inicio de sesión */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#a3e635] text-black py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                            >
                                {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
                            </button>

                            {/* Enlace para registro */}
                            <div className="text-sm text-gray-200 mt-4">
                                <p>No tienes cuenta?
                                    <Link
                                        href={route('register')}
                                        className="underline hover:text-[#a3e635] ms-1"
                                    >
                                        Regístrate
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

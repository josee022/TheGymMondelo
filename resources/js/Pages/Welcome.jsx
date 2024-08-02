import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido" />
            {/* Contenedor principal con imagen de fondo */}
            <div className="relative min-h-screen bg-cover bg-center"
                 style={{ backgroundImage: `url('/imagenes/login_register/2-loginRegister.jpg')` }}>

                {/* Logo en la esquina superior izquierda */}
                <div className="absolute top-0 left-0 p-6">
                    <img
                        src="/imagenes/logo/1-logoWeb.png"
                        alt="Logo"
                        className="w-32 h-auto rounded-full"
                    />
                </div>

                {/* Enlaces de navegación en la esquina superior derecha */}
                <div className="absolute top-6 right-6 flex space-x-4">
                    {/* Condicional para mostrar diferentes enlaces según el estado de autenticación */}
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 block text-center rounded-full px-6 py-2 bg-gray-100 border border-gray-300"
                        >
                            Perfil
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 block text-center rounded-full px-6 py-2 bg-gray-100 border border-gray-300"
                            >
                                Inicio de Sesión
                            </Link>
                        </>
                    )}
                </div>

                {/* Contenedor principal del mensaje de bienvenida */}
                <div className="flex items-center justify-center min-h-screen">
                    <div className="p-12 max-w-xl mx-auto bg-green-500 rounded-lg shadow-lg text-center transform scale-100 transition-transform duration-300 hover:scale-105">
                        {/* Título animado con efecto de pulso */}
                        <h1 className="text-4xl font-bold text-white mb-4 animate-pulse">
                            ¡ Bienvenido a TheGymMondelo !
                        </h1>
                        {/* Descripción adicional */}
                        <p className="text-lg text-white mb-4">
                            Prepárate para transformar tu cuerpo y mente con nosotros.
                            Únete y empieza tu camino hacia la cima en nuestra fábrica de atletas.
                            Diferentes tipos de planes adaptados a tus necesidades y propósitos,
                            siempre acompañado de nuestra atención para ayudarte a conseguir ese
                            soñado cambio. ¡ GO !
                        </p>
                        {/* Enlace para registrarse */}
                        <Link
                            href={route('register')}
                            className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition duration-200"
                        >
                            Únete Ahora
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

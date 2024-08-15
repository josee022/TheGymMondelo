import { Head, Link, useForm } from '@inertiajs/react'; // Importa componentes y hooks necesarios de @inertiajs/react
import { useEffect } from 'react'; // Importa useEffect para manejar efectos secundarios

export default function Register() {
    // Inicializa el hook useForm con los campos del formulario
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', // Nombre completo
        email: '', // Correo electrónico
        password: '', // Contraseña
        password_confirmation: '', // Confirmación de contraseña
        fecha_nacimiento: '', // Fecha de nacimiento
        sexo: '', // Sexo
        altura: '', // Altura en cm
        peso: '', // Peso en kg
        nivel_actividad: '' // Nivel de actividad
    });

    // useEffect para limpiar los campos de contraseña cuando el componente se desmonte
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []); // El array vacío asegura que este efecto solo se ejecute al desmontar el componente

    // Función que maneja el envío del formulario
    const submit = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        post(route('register')); // Envía los datos del formulario a la ruta 'register'
    };

    return (
        <>
            <Head title="Registro" /> {/* Configura el título de la página */}

            <div className="relative min-h-screen flex"> {/* Contenedor principal con flexbox */}
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
                                <span className="relative">CREA TU CUENTA</span>
                            </span>
                        </h1>

                        {/* Formulario */}
                        <form className="w-full max-w-sm mt-4" onSubmit={submit}>
                            {/* Campo para nombre completo */}
                            <div className="mb-2">
                                <label htmlFor="name" className="block text-white text-sm mb-1">Nombre completo</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Campo para correo electrónico */}
                            <div className="mb-2">
                                <label htmlFor="email" className="block text-white text-sm mb-1">Correo electrónico</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.email ? 'border-red-500' : ''}`}
                                />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Campo para contraseña */}
                            <div className="mb-2">
                                <label htmlFor="password" className="block text-white text-sm mb-1">Contraseña</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.password ? 'border-red-500' : ''}`}
                                />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Campo para confirmación de contraseña */}
                            <div className="mb-2">
                                <label htmlFor="password_confirmation" className="block text-white text-sm mb-1">Confirmar contraseña</label>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.password_confirmation ? 'border-red-500' : ''}`}
                                />
                                {errors.password_confirmation && <p className="text-red-500 text-xs">{errors.password_confirmation}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Campo para fecha de nacimiento */}
                            <div className="mb-2">
                                <label htmlFor="fecha_nacimiento" className="block text-white text-sm mb-1">Fecha de Nacimiento</label>
                                <input
                                    id="fecha_nacimiento"
                                    name="fecha_nacimiento"
                                    type="date"
                                    value={data.fecha_nacimiento}
                                    onChange={(e) => setData('fecha_nacimiento', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.fecha_nacimiento ? 'border-red-500' : ''}`}
                                />
                                {errors.fecha_nacimiento && <p className="text-red-500 text-xs">{errors.fecha_nacimiento}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Campo para sexo */}
                            <div className="mb-2">
                                <label htmlFor="sexo" className="block text-white text-sm mb-1">Sexo</label>
                                <select
                                    id="sexo"
                                    name="sexo"
                                    value={data.sexo}
                                    onChange={(e) => setData('sexo', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.sexo ? 'border-red-500' : ''}`}
                                >
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                {errors.sexo && <p className="text-red-500 text-xs">{errors.sexo}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Campo para altura */}
                            <div className="mb-2">
                                <label htmlFor="altura" className="block text-white text-sm mb-1">Altura (cm)</label>
                                <input
                                    id="altura"
                                    name="altura"
                                    type="number"
                                    step="0.01"
                                    value={data.altura}
                                    onChange={(e) => setData('altura', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.altura ? 'border-red-500' : ''}`}
                                />
                                {errors.altura && <p className="text-red-500 text-xs">{errors.altura}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Campo para peso */}
                            <div className="mb-2">
                                <label htmlFor="peso" className="block text-white text-sm mb-1">Peso (kg)</label>
                                <input
                                    id="peso"
                                    name="peso"
                                    type="number"
                                    step="0.01"
                                    value={data.peso}
                                    onChange={(e) => setData('peso', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.peso ? 'border-red-500' : ''}`}
                                />
                                {errors.peso && <p className="text-red-500 text-xs">{errors.peso}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Campo para nivel de actividad */}
                            <div className="mb-2">
                                <label htmlFor="nivel_actividad" className="block text-white text-sm mb-1">Nivel de Actividad</label>
                                <select
                                    id="nivel_actividad"
                                    name="nivel_actividad"
                                    value={data.nivel_actividad}
                                    onChange={(e) => setData('nivel_actividad', e.target.value)}
                                    className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${errors.nivel_actividad ? 'border-red-500' : ''}`}
                                >
                                    <option value="Sedentario">Sedentario</option>
                                    <option value="Ligero">Ligero</option>
                                    <option value="Moderado">Moderado</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Muy Activo">Muy Activo</option>
                                </select>
                                {errors.nivel_actividad && <p className="text-red-500 text-xs">{errors.nivel_actividad}</p>} {/* Mensaje de error */}
                            </div>

                            {/* Botón para enviar el formulario */}
                            <button
                                type="submit"
                                disabled={processing} // Deshabilita el botón mientras se procesa el formulario
                                className="w-full bg-[#a3e635] text-black py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                            >
                                {processing ? 'Registrando...' : 'Registrate'} {/* Texto dinámico basado en el estado de procesamiento */}
                            </button>

                            {/* Enlace para iniciar sesión */}
                            <div className="text-sm text-gray-200 mt-2">
                                <p>¿Ya tienes cuenta?
                                    <Link
                                        href={route('login')}
                                        className="underline hover:text-[#a3e635] ms-1"
                                    >
                                        Inicia sesión
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

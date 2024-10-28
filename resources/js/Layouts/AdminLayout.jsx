// resources/js/Layouts/AdminLayout.jsx
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function AdminLayout({ children }) {
    const handleLogout = () => {
        Inertia.post(route("logout"), {}, {
            onFinish: () => (window.location.href = "/"),
        });
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-gray-100"> {/* Reduce el alto mínimo */}
            {/* Sidebar */}
            <aside className="w-1/5 bg-gray-900 text-white p-6 flex flex-col justify-between"> {/* Reduce ancho y padding */}
                <div>
                    <div className="flex flex-col items-center mb-8">
                        {/* Logo */}
                        <Link href="/admin/dashboard">
                            <img
                                src="/imagenes/logo/1-logoWeb.png"
                                alt="Logo"
                                className="h-20 w-auto mb-4" // Logo más pequeño
                            />
                        </Link>
                        <h2 className="text-2xl font-bold underline underline-offset-4 decoration-white mb-8">
                            Panel de Control
                        </h2>
                    </div>
                    {/* Enlaces de navegación */}
                    <nav className="space-y-6"> {/* Reduce espacio entre enlaces */}
                        <Link href="/admin/usuarios" className="block text-xl hover:text-blue-400">
                            Gestión de Usuarios
                        </Link>
                        <Link href="/admin/contenidos" className="block text-xl hover:text-blue-400">
                            Gestión de Contenidos
                        </Link>
                        <Link href="/admin/productos" className="block text-xl hover:text-blue-400">
                            Productos
                        </Link>
                        <Link href="/admin/reportes" className="block text-xl hover:text-blue-400">
                            Reportes y Análisis
                        </Link>
                        <Link href="/admin/configuracion" className="block text-xl hover:text-blue-400">
                            Configuración del Sistema
                        </Link>
                    </nav>
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-auto bg-red-500 px-3 py-2 rounded text-white font-semibold hover:bg-red-600 transition duration-200"
                >
                    Cerrar sesión
                </button>
            </aside>

            {/* Contenedor Principal */}
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md mx-6 my-4">
                {children}
            </div>
        </div>
    );
}

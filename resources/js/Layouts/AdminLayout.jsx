import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function AdminLayout({ children }) {
    const handleLogout = () => {
        Inertia.post(
            route("logout"),
            {},
            {
                onFinish: () => (window.location.href = "/"),
            }
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {" "}
            <aside className="w-1/5 bg-gray-900 text-white p-6 flex flex-col justify-between">
                <div>
                    <div className="flex flex-col items-center mb-8">
                        <Link href="/admin/dashboard">
                            <img
                                src="/imagenes/logo/1-logoWeb.png"
                                alt="Logo"
                                className="h-20 w-auto mb-4"
                            />
                        </Link>
                        <Link
                            href="/admin/dashboard"
                            className="text-2xl font-bold underline underline-offset-4 decoration-white mb-8 hover:text-blue-400"
                        >
                            Panel de Control
                        </Link>
                    </div>
                    <nav className="space-y-6">
                        <Link
                            href="/admin/usuarios"
                            className="block text-xl hover:text-blue-400"
                        >
                            Gestión de Usuarios
                        </Link>
                        <Link
                            href="/admin/mister"
                            className="block text-xl hover:text-blue-400"
                        >
                            Gestión de Entrenadores
                        </Link>
                        <Link
                            href="/admin/productos"
                            className="block text-xl hover:text-blue-400"
                        >
                            Gestión de Productos
                        </Link>
                        <Link
                            href="/admin/reportes"
                            className="block text-xl hover:text-blue-400"
                        >
                            Reportes y Análisis
                        </Link>
                        <Link
                            href="/admin/graficas"
                            className="block text-xl hover:text-blue-400"
                        >
                            Gráficas Informativas y Seguimiento
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
            {/* Contenedor Principal ajustado para ocupar toda la pantalla */}
            <div className="flex-1 p-6 bg-white rounded-lg shadow-md mx-6 my-4 h-[calc(100vh-3rem)] overflow-auto">
                {children}
            </div>
        </div>
    );
}

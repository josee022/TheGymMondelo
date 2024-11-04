// resources/js/Pages/UsuarioSuspendido.jsx
import React from "react";
import { router } from "@inertiajs/react";

export default function UsuarioSuspendido() {
    const handleLogout = () => {
        router.post(
            route("logout"),
            {},
            {
                onFinish: () => (window.location.href = "/"),
            }
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
            <div className="bg-gray-800 p-12 md:p-16 rounded-xl shadow-2xl text-center max-w-2xl mx-auto space-y-8">
                <div className="flex flex-col items-center space-y-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-24 w-24 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12c0-4.418-3.582-8-8-8S5 7.582 5 12s3.582 8 8 8 8-3.582 8-8z"
                        />
                    </svg>
                    <h1 className="text-4xl font-extrabold text-red-500">
                        Cuenta Suspendida
                    </h1>
                    <p className="text-xl text-gray-300">
                        Tu cuenta ha sido suspendida temporalmente. Si crees que
                        esto es un error o necesitas más información, contacta a
                        nuestro soporte.
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full py-4 px-8 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition duration-200"
                >
                    Cerrar sesión y volver al inicio
                </button>
            </div>
        </div>
    );
}

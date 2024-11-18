import React from "react";
import { Link, useForm } from "@inertiajs/react";

const AccessDenied = () => {
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"), {
            onFinish: () => {
                window.location.href = "/";
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
            <div className="bg-gray-800 p-12 md:p-16 rounded-xl shadow-2xl text-center max-w-2xl mx-auto space-y-8">
                <div className="flex flex-col items-center space-y-6">
                    <h1 className="text-4xl font-extrabold text-red-500">
                        Acceso Denegado
                    </h1>
                    <p className="text-xl text-gray-300">
                        No tienes permisos para acceder a esta sección. Por
                        favor, verifica tus credenciales o comunícate con el
                        administrador si crees que esto es un error.
                    </p>
                    <p className="text-xl text-gray-300">
                        Cerraremos tu sesión por seguridad. Por favor, vuelve a
                        iniciar sesión y comunícate con soporte técnico para
                        cualquier problema.
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full py-4 px-8 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition duration-200"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default AccessDenied;

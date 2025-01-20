import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <Head title="Verificación de Correo Electrónico" />
            <div className="bg-gray-800 text-lime-400 rounded-lg shadow-lg p-8 w-full max-w-4xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-lime-500 mb-6">
                        Verifica tu Correo Electrónico
                    </h1>
                    <p className="text-gray-300 text-lg">
                        Gracias por registrarte en{" "}
                        <span className="text-lime-400">TheGymMondelo</span>.
                        Por favor, revisa tu correo y haz clic en el enlace de
                        verificación para completar tu registro.
                    </p>
                    <p className="text-gray-400 mt-4">
                        ¿No recibiste el correo? Haz clic en el botón de abajo
                        para reenviar el enlace.
                    </p>
                </div>

                {status === "verification-link-sent" && (
                    <div className="mt-6 bg-lime-600 text-black rounded-lg p-4 text-center font-medium">
                        Un nuevo enlace de verificación ha sido enviado a tu
                        correo.
                    </div>
                )}

                <form onSubmit={submit} className="mt-8">
                    <div className="flex flex-col items-center space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-lime-500 text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-lime-400 transition duration-200 w-full max-w-sm"
                        >
                            Reenviar Correo de Verificación
                        </button>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="text-gray-300 underline hover:text-lime-500 transition duration-200"
                        >
                            Cerrar Sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

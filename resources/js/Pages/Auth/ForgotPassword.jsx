import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <>
            <Head title="Recuperar Contraseña" />

            <div className="relative min-h-screen flex">
                <div className="relative w-1/2 h-screen">
                    <div className="absolute top-4 left-4">
                        <a href="/login" className="block">
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
                        </a>
                    </div>
                    <img
                        src="/imagenes/login_register/2-loginRegister.jpg"
                        alt="Background"
                        className="object-cover h-full w-full"
                    />
                </div>

                <div className="w-1/2 h-screen bg-gray-700 flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 right-0 p-4">
                        <img
                            src="/imagenes/logo/1-logoWeb.png"
                            alt="Logo"
                            className="w-36 h-auto"
                        />
                    </div>

                    <div className="text-center text-white flex flex-col items-center justify-center h-full px-8">
                        <h1 className="text-4xl font-bold mb-4 relative">
                            <span className="relative inline-block">
                                <span
                                    className="absolute inset-x-0 bottom-0 h-1"
                                    style={{ backgroundColor: "#a3e635" }}
                                ></span>
                                <span className="relative">
                                    RECUPERAR CONTRASEÑA
                                </span>
                            </span>
                        </h1>

                        <p className="text-gray-300 mb-6 text-lg">
                            Introduce tu correo electrónico y te enviaremos un
                            enlace para restablecer tu contraseña.
                        </p>

                        {status && (
                            <div className="mb-4 font-medium text-sm text-green-500">
                                {status}
                            </div>
                        )}

                        <form className="w-full max-w-md" onSubmit={submit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-white text-lg mb-2"
                                >
                                    Correo Electrónico
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-4 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton
                                    className="w-full bg-[#a3e635] text-black py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Enviando..."
                                        : "Enviar Enlace de Recuperación"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

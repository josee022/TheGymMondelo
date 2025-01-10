import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("password.store"));
    };

    return (
        <>
            <Head title="Restablecer Contraseña" />

            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
                <div className="mb-8">
                    <img
                        src="/imagenes/logo/1-logoWeb.png"
                        alt="Logo TheGymMondelo"
                        className="w-40 h-auto"
                    />
                </div>

                <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-[#a3e635]">
                        Restablecer Contraseña
                    </h2>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <InputLabel
                                htmlFor="email"
                                value="Correo Electrónico"
                                className="text-white text-lg"
                            />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                readOnly
                                className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-500 text-gray-300 cursor-not-allowed"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                htmlFor="password"
                                value="Nueva Contraseña"
                                className="text-white text-lg"
                            />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                autoComplete="new-password"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div className="mb-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirmar Contraseña"
                                className="text-white text-lg"
                            />
                            <TextInput
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <PrimaryButton
                                className="w-full bg-[#a3e635] text-black py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                                disabled={processing}
                            >
                                {processing
                                    ? "Restableciendo..."
                                    : "Restablecer Contraseña"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

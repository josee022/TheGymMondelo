import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Register() {
    // Manejador de formulario con datos iniciales
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        fecha_nacimiento: "",
        sexo: "Masculino", // Valor inicial predeterminado
        altura: "",
        peso: "",
        nivel_actividad: "Sedentario", // Nivel predeterminado
        biografia: "",
    });

    // Estado local para errores de validación personalizados
    const [localErrors, setLocalErrors] = useState({});

    // Resetear contraseñas al desmontar el componente
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    // Capitaliza cada palabra del nombre
    const capitalizeWords = (text) =>
        text.replace(/\b\w/g, (char) => char.toUpperCase());

    // Validación de campos antes del envío
    const validateFields = () => {
        const errors = {};

        // Validar nombre obligatorio y formatearlo
        if (!data.name) {
            errors.name = "El nombre es obligatorio.";
        } else {
            setData("name", capitalizeWords(data.name));
        }

        // Validar correo electrónico
        if (!data.email.includes("@"))
            errors.email = "Introduce un correo válido.";

        // Validar contraseña y confirmación
        if (data.password.length < 6)
            errors.password = "La contraseña debe tener al menos 6 caracteres.";
        if (data.password !== data.password_confirmation)
            errors.password_confirmation = "Las contraseñas no coinciden.";

        // Validar fecha de nacimiento para mayores de 10 años
        if (!data.fecha_nacimiento) {
            errors.fecha_nacimiento = "La fecha de nacimiento es obligatoria.";
        } else {
            const birthDate = new Date(data.fecha_nacimiento);
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 10);

            if (birthDate > minDate) {
                errors.fecha_nacimiento = "Debes tener al menos 10 años.";
            }
        }

        // Validar altura y peso si están presentes
        if (data.altura && (data.altura <= 0 || data.altura > 250))
            errors.altura = "Introduce una altura válida en cm.";
        if (data.peso && (data.peso <= 0 || data.peso > 500))
            errors.peso = "Introduce un peso válido en kg.";

        // Actualizar errores locales y retornar si son válidos
        setLocalErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Enviar el formulario si la validación es exitosa
    const submit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            post(route("register")); // Enviar datos al servidor
        }
    };

    return (
        <>
            <Head title="Registro" />
            <div className="relative min-h-screen flex">
                <div className="relative w-1/2 h-screen">
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
                                <span className="relative">CREA TU CUENTA</span>
                            </span>
                        </h1>

                        <form
                            className="w-full max-w-sm mt-4"
                            onSubmit={submit}
                        >
                            <InputField
                                id="name"
                                label="Nombre completo"
                                type="text"
                                value={data.name}
                                setData={setData}
                                error={localErrors.name || errors.name}
                            />
                            <InputField
                                id="email"
                                label="Correo electrónico"
                                type="email"
                                value={data.email}
                                setData={setData}
                                error={localErrors.email || errors.email}
                            />
                            <InputField
                                id="password"
                                label="Contraseña"
                                type="password"
                                value={data.password}
                                setData={setData}
                                error={localErrors.password || errors.password}
                            />
                            <InputField
                                id="password_confirmation"
                                label="Confirmar contraseña"
                                type="password"
                                value={data.password_confirmation}
                                setData={setData}
                                error={
                                    localErrors.password_confirmation ||
                                    errors.password_confirmation
                                }
                            />
                            <InputField
                                id="fecha_nacimiento"
                                label="Fecha de Nacimiento"
                                type="date"
                                value={data.fecha_nacimiento}
                                setData={setData}
                                error={
                                    localErrors.fecha_nacimiento ||
                                    errors.fecha_nacimiento
                                }
                            />
                            <SelectField
                                id="sexo"
                                label="Sexo"
                                options={["Masculino", "Femenino", "Otro"]}
                                value={data.sexo}
                                setData={setData}
                                error={errors.sexo}
                            />
                            <InputField
                                id="altura"
                                label="Altura (cm)"
                                type="number"
                                step="0.01"
                                value={data.altura}
                                setData={setData}
                                error={localErrors.altura || errors.altura}
                            />
                            <InputField
                                id="peso"
                                label="Peso (kg)"
                                type="number"
                                step="0.01"
                                value={data.peso}
                                setData={setData}
                                error={localErrors.peso || errors.peso}
                            />
                            <SelectField
                                id="nivel_actividad"
                                label="Nivel de Actividad"
                                options={[
                                    "Sedentario",
                                    "Ligero",
                                    "Moderado",
                                    "Activo",
                                    "Muy Activo",
                                ]}
                                value={data.nivel_actividad}
                                setData={setData}
                                error={errors.nivel_actividad}
                            />

                            <InputField
                                id="biografia"
                                label="Biografía"
                                type="text"
                                value={data.biografia}
                                setData={setData}
                                error={errors.biografia}
                                optional
                            />

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#a3e635] text-black py-2 px-4 rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#a3e635]"
                            >
                                {processing ? "Registrando..." : "Registrate"}
                            </button>

                            <div className="text-sm text-gray-200 mt-2">
                                <p>
                                    ¿Ya tienes cuenta?
                                    <Link
                                        href={route("login")}
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

const InputField = ({
    id,
    label,
    type,
    value,
    setData,
    error,
    step,
    optional,
}) => (
    <div className="mb-2">
        <label htmlFor={id} className="block text-white text-sm mb-1">
            {label}
            {optional && " (Opcional)"}
        </label>
        <input
            id={id}
            name={id}
            type={type}
            step={step}
            value={value}
            onChange={(e) => setData(id, e.target.value)}
            className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${
                error ? "border-red-500" : ""
            }`}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

const SelectField = ({ id, label, options, value, setData, error }) => (
    <div className="mb-2">
        <label htmlFor={id} className="block text-white text-sm mb-1">
            {label}
        </label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={(e) => setData(id, e.target.value)}
            className={`w-full px-3 py-1 border rounded-md bg-gray-300 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#a3e635] ${
                error ? "border-red-500" : ""
            }`}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
);

import React from "react";

export default function SuscripcionHero() {
    return (
        <>
            <h1 className="text-4xl font-extrabold mb-4 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                🚀 TU CAMBIO FÍSICO Y DE VIDA 💪
            </h1>

            <p className="text-lg text-gray-300 text-center max-w-lg mb-6 animate-slide-up font-semibold">
                Esto es lo que consigues si te apuntas a{" "}
                <span className="text-green-400 font-bold">TheGymMondelo</span>:
                <span className="text-yellow-400"> 🌟</span>
            </p>

            <div className="relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
                <div className="absolute inset-0 bg-green-400 opacity-50 blur-xl rounded-full"></div>
            </div>
        </>
    );
}

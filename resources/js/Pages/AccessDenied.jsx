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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                color: "#fff",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <h1
                style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
            >
                Acceso Denegado
            </h1>
            <p
                style={{
                    fontSize: "1.25rem",
                    marginBottom: "2rem",
                    maxWidth: "500px",
                }}
            >
                No tienes permisos para acceder a esta sección. Por favor,
                verifica tus credenciales o comunícate con el administrador si
                crees que esto es un error.
            </p>
            <br />
            <p
                style={{
                    fontSize: "1.25rem",
                    marginBottom: "2rem",
                    maxWidth: "500px",
                }}
            >
                Cerraremos tu sesión por seguridad, por favor, vuelva a iniciar
                sesión y comuníquese con soprte técnico para algún tipo de
                problema, gracias,
            </p>
            <button
                onClick={handleLogout}
                style={{
                    padding: "0.75rem 1.5rem",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color: "#ff7e5f",
                    backgroundColor: "#fff",
                    borderRadius: "50px",
                    textDecoration: "none",
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    cursor: "pointer",
                    border: "none",
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#ff7e5f";
                    e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.color = "#ff7e5f";
                }}
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default AccessDenied;

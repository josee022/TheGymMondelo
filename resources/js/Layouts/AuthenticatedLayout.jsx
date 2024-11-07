import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user = {}, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-black border-b border-gray-700 h-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
                    <div className="flex items-center flex-shrink-0 h-full">
                        <Link href={route("inicio.index")}>
                            <img
                                src="/imagenes/logo/1-logoWeb.png"
                                alt="Logo"
                                className="h-28 w-auto rounded-full"
                            />
                        </Link>
                    </div>

                    <div className="flex-1 flex items-center justify-center space-x-8">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="text-white text-xl relative group">
                                    Servicios
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route("dietas.index")}>
                                    Dietas
                                </Dropdown.Link>
                                <Dropdown.Link href={route("programas.index")}>
                                    Programas
                                </Dropdown.Link>
                                <Dropdown.Link href={route("clases.index")}>
                                    Clases
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("suscripciones.index")}
                                >
                                    Suscripciones
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                        <NavLink
                            href={route("entrenadores.index")}
                            active={route().current("entrenadores.index")}
                            className="text-white text-xl relative group"
                        >
                            Entrenadores
                        </NavLink>
                        <NavLink
                            href={route("tienda.index")}
                            active={route().current("tienda.index")}
                            className="text-white text-xl relative group"
                        >
                            Tienda
                        </NavLink>
                        <NavLink
                            href={route("blogs.create")}
                            active={route().current("blogs.create")}
                            className="text-white text-xl relative group"
                        >
                            Blog
                        </NavLink>
                        <NavLink
                            href={route("foros.index")}
                            active={route().current("foros.index")}
                            className="text-white text-xl relative group"
                        >
                            Foro
                        </NavLink>
                        <NavLink
                            href={route("diario.index")}
                            active={route().current("diario.index")}
                            className="text-white text-xl relative group"
                        >
                            Diario
                        </NavLink>
                        <NavLink
                            href={route("contacto")}
                            active={route().current("contacto")}
                            className="text-white text-xl relative group"
                        >
                            Contacto
                        </NavLink>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-lime-400 hover:bg-lime-600">
                                    {user.name || "Usuario"}
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route("dashboard")}>
                                    Perfil
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Cerrar sesión
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("inicio.index")}
                            active={route().current("inicio.index")}
                        >
                            Inicio
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("dietas.index")}
                            active={route().current("dietas.index")}
                        >
                            Dietas
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("programas.index")}
                            active={route().current("programas.index")}
                        >
                            Programas
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("clases.index")}
                            active={route().current("clases.index")}
                        >
                            Clases
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("suscripciones.index")}
                            active={route().current("suscripciones.index")}
                        >
                            Suscripciones
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("tienda.index")}
                            active={route().current("tienda.index")}
                        >
                            Tienda
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("blogs.create")}
                            active={route().current("blogs.create")}
                        >
                            Blog
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("foros.index")}
                            active={route().current("foros.index")}
                        >
                            Foro
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("diario.index")}
                            active={route().current("diario.index")}
                        >
                            Diario
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("contacto")}
                            active={route().current("contacto")}
                        >
                            Contacto
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

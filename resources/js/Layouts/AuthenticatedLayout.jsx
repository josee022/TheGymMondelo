import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';


export default function Authenticated({ user = {}, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-black border-b border-gray-700 h-28"> {/* Ajusta la altura aquí */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0 h-full">
                        <Link href="/">
                            <img
                                src="/imagenes/logo/1-logoWeb.png"
                                alt="Logo"
                                className="h-28 w-auto rounded-full" // Ajusta el logo para que ocupe toda la altura del contenedor
                            />
                        </Link>
                    </div>

                    {/* Enlaces de navegación */}
                    <div className="flex-1 flex items-center justify-center space-x-8">
                        <NavLink
                            href={route('inicio.index')}
                            active={route().current('inicio.index')}
                            className="text-white text-xl relative group"
                        >
                            Inicio
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('inicio.index') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('entrenadores.index')}
                            active={route().current('entrenadores.index')}
                            className="text-white text-xl relative group"
                        >
                            Entrenadores
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('entrenadores.index') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('clases.index')}
                            active={route().current('clases.index')}
                            className="text-white text-xl relative group"
                        >
                            Clases
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('clases.index') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('dietas.index')}
                            active={route().current('dietas.index')}
                            className="text-white text-xl relative group"
                        >
                            Dietas
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('dietas.index') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('programas.index')}
                            active={route().current('programas.index')}
                            className="text-white text-xl relative group"
                        >
                            Programas
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('programas.index') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('suscripciones.index')}
                            active={route().current('suscripciones.index')}
                            className="text-white text-xl relative group"
                        >
                            Suscripciones
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('suscripciones.index') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('blogs.create')}
                            active={route().current('blogs.create')}
                            className="text-white text-xl relative group"
                        >
                            Blog
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('blogs.create') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('foros.index')}
                            active={route().current('foros.index')}
                            className="text-white text-xl relative group"
                        >
                            Foro
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('foros.index') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('tienda.index')}
                            active={route().current('tienda.index')}
                            className="text-white text-xl relative group"
                        >
                            Tienda
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('tienda.index') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                        <NavLink
                            href={route('contacto')}
                            active={route().current('contacto')}
                            className="text-white text-xl relative group"
                        >
                            Contacto
                            <span
                                className={`absolute inset-x-0 bottom-0 h-1 transition-transform transform ${route().current('contacto') ? 'scale-x-100' : 'scale-x-0'}`}
                                style={{ transformOrigin: 'left' }}
                            />
                        </NavLink>
                    </div>

                    {/* Menú de usuario */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-black bg-lime-400 hover:bg-lime-600 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name || 'Usuario'}
                                            <svg
                                                className="ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('dashboard')}>Perfil</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Cerrar sesión
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* Menú móvil */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('inicio.index')} active={route().current('inicio.index')}>
                            Inicio
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('entrenadores.index')} active={route().current('entrenadores.index')}>
                            Entrenadores
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('clases.index')} active={route().current('clases.index')}>
                            Clases
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dietas.index')} active={route().current('dietas.index')}>
                            Dietas
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('programas.index')} active={route().current('programas.index')}>
                            Programas
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('suscripciones.index')} active={route().current('suscripciones.index')}>
                            Suscripciones
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('blogs.create')} active={route().current('blogs.create')}>
                            Blog
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('foros.index')} active={route().current('foros.index')}>
                            Foro
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('tienda.index')} active={route().current('tienda.index')}>
                            Tienda
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('contacto')} active={route().current('contacto')}>
                            Contacto
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name || 'Invitado'}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email || 'Sin correo'}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('dashboard')}>Perfil</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex justify-center mt-6">
            <ul className="flex items-center">
                {/* Mapea los enlaces de paginación */}
                {links.map((link, index) => (
                    <li key={index} className="mx-1">
                        {/* Si el enlace tiene una URL, renderiza un componente Link */}
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`px-3 py-2 border rounded ${
                                    link.active ? 'bg-lime-500 text-white' : 'bg-white text-lime-500 hover:bg-lime-200'
                                }`}
                                // Reemplaza el texto 'Previous' y 'Next' con flechas
                                dangerouslySetInnerHTML={{ __html: link.label.replace('Previous', '&larr;').replace('Next', '&rarr;') }}
                            />
                        ) : (
                            //Si el enlace no tiene una URL, renderiza un elemento span
                            <span
                                className={`px-3 py-2 border rounded ${
                                    link.active ? 'bg-lime-500 text-white' : 'bg-white text-lime-500'
                                }`}
                                // Reemplaza el texto 'Previous' y 'Next' con flechas
                                dangerouslySetInnerHTML={{ __html: link.label.replace('Previous', '&larr;').replace('Next', '&rarr;') }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

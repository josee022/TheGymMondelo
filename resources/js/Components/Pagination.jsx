import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="flex justify-center mt-6">
            <ul className="flex items-center">
                {links.map((link, index) => (
                    <li key={index} className="mx-1">
                        {link.url ? (
                            <Link
                                href={link.url}
                                className={`px-3 py-2 border rounded ${
                                    link.active ? 'bg-green-500 text-white' : 'bg-white text-green-500 hover:bg-green-200'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label.replace('Previous', '&larr;').replace('Next', '&rarr;') }}
                            />
                        ) : (
                            <span
                                className={`px-3 py-2 border rounded ${
                                    link.active ? 'bg-green-500 text-white' : 'bg-white text-green-500'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label.replace('Previous', '&larr;').replace('Next', '&rarr;') }}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

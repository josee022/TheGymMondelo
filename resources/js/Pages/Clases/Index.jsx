
import { Link } from '@inertiajs/react';

export default function ClasesIndex({ clases }) {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Clases Disponibles</h1>
            <ul className="list-disc pl-5">
                {clases.map((clase) => (
                    <li key={clase.id} className="mb-2">
                        <Link href={`/clases/${clase.id}`} className="text-blue-500 hover:underline">
                            {clase.nombre} - {clase.fecha} - {clase.hora_inicio} a {clase.hora_fin}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

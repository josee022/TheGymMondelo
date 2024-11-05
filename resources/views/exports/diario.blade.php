<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Diario de Ejercicios - {{ \Carbon\Carbon::parse($fechaFiltro)->format('d/m/Y') }}</title>
    <style>
        /* Estilos generales */
        body {
            font-family: Arial, sans-serif;
            color: #333;
            padding: 20px;
            background-color: #f9f9f9;
        }

        h2 {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1.2px;
        }

        /* Contenedor de tabla */
        .table-container {
            max-width: 100%;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        /* Estilos de tabla */
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
        }

        .table th,
        .table td {
            padding: 10px;
            text-align: center;
            font-size: 14px;
            border-bottom: 1px solid #ddd;
        }

        .table th {
            background-color: #3d5afe;
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .table td {
            background-color: #fafafa;
            color: #333;
        }

        /* Fila alterna */
        .table tr:nth-child(even) td {
            background-color: #f1f4fc;
        }

        /* Destacado */
        .highlight {
            font-size: 16px;
            color: #ff6f00;
        }

        /* Peso */
        .table td.peso {
            font-weight: bold;
            color: #4caf50;
        }

        /* Estilo de notas con límite de ancho y salto de línea */
        .table td.notas {
            font-style: italic;
            color: #555;
            max-width: 150px;
            word-wrap: break-word;
            white-space: pre-wrap;
            word-break: break-word;
        }
    </style>
</head>

<body>
    <div class="table-container">
        <h2>Diario de Ejercicios - {{ \Carbon\Carbon::parse($fechaFiltro)->format('d/m/Y') }}</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Ejercicio</th>
                    <th>Series</th>
                    <th>Repeticiones</th>
                    <th class="highlight">Peso (kg)</th>
                    <th>Notas</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($ejercicios as $ejercicio)
                    <tr>
                        <td>{{ $ejercicio->ejercicio }}</td>
                        <td>{{ $ejercicio->series }}</td>
                        <td>{{ $ejercicio->repeticiones }}</td>
                        <td class="peso">{{ $ejercicio->peso ?? '-' }} kg</td>
                        <td class="notas">{{ $ejercicio->notas ?? 'Sin notas' }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>

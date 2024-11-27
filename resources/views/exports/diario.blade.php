<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Diario de Ejercicios</title>
    <style>
        /* Estilos generales */
        body {
            font-family: 'Arial', sans-serif;
            font-size: 14px;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }

        /* Contenedor principal */
        .container {
            padding: 20px;
            margin: 0 auto;
            max-width: 800px;
            background: #fff;
        }

        /* Encabezado */
        .header {
            text-align: center;
            padding: 15px 0;
            border-bottom: 3px solid #3d5afe;
            margin-bottom: 20px;
        }

        .header h1 {
            font-size: 28px;
            color: #3d5afe;
            text-transform: uppercase;
            margin: 0;
        }

        /* Fecha del día */
        .date-header {
            font-size: 18px;
            color: #3d5afe;
            margin-top: 30px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #3d5afe;
        }

        /* Tablas */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        table th,
        table td {
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
        }

        table th {
            background: #3d5afe;
            color: #fff;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: bold;
        }

        table td {
            background: #f9f9f9;
        }

        table tr:nth-child(even) td {
            background: #eef1ff;
        }

        /* Notas */
        table td.notas {
            text-align: left;
            font-style: italic;
            color: #555;
        }

        /* Peso */
        table td.peso {
            font-weight: bold;
            color: #4caf50;
        }

        /* Pie de página */
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Encabezado -->
        <div class="header">
            <h1>Diario de Ejercicios</h1>
        </div>

        <!-- Contenido -->
        @foreach ($ejercicios as $fecha => $diaEjercicios)
            <div class="date-header">
                Fecha: {{ \Carbon\Carbon::parse($fecha)->format('d/m/Y') }}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Ejercicio</th>
                        <th>Series</th>
                        <th>Repeticiones</th>
                        <th>Peso (kg)</th>
                        <th>Notas</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($diaEjercicios as $ejercicio)
                        <tr>
                            <td>{{ $ejercicio->ejercicio }}</td>
                            <td>{{ $ejercicio->series }}</td>
                            <td>{{ $ejercicio->repeticiones }}</td>
                            <td class="peso">{{ $ejercicio->peso ?? '-' }}</td>
                            <td class="notas">{{ $ejercicio->notas ?? 'Sin notas' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endforeach

        <!-- Pie de página -->
        <div class="footer">
            Diario de Ejercicios - Generado automáticamente el {{ now()->format('d/m/Y') }}
        </div>
    </div>
</body>

</html>

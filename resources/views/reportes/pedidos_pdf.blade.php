<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        h1 {
            color: #3490dc;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f4f4f4;
        }
    </style>
</head>

<body>
    <h1>Reporte de Pedidos</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($pedidos as $pedido)
                <tr>
                    <td>{{ $pedido->id }}</td>
                    <td>{{ $pedido->total }} €</td>
                    <td>{{ $pedido->fecha_pedido }}</td>
                    <td>{{ $pedido->estado }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Respuesta a tu mensaje</title>
</head>

<body style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f9; padding: 0; margin: 0;">
    <div
        style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
        <!-- Encabezado -->
        <div style="background-color: #4CAF50; padding: 20px; text-align: center; color: white;">
            <h1 style="font-size: 24px; margin: 0;">TheGymMondelo</h1>
            <p style="font-size: 16px; margin: 5px 0;">Estamos aquí para ayudarte</p>
        </div>

        <!-- Cuerpo del mensaje -->
        <div style="padding: 30px;">
            <h2 style="color: #333; font-size: 20px;">Hola, {{ $contacto->nombre }} 👋</h2>
            <p style="font-size: 16px; color: #555;">Gracias por ponerte en contacto con nosotros. Hemos revisado tu
                mensaje y a continuación encontrarás nuestra respuesta:</p>

            <div style="margin-top: 20px;">
                <h3 style="color: #4CAF50; font-size: 18px; margin-bottom: 8px;">Tu mensaje:</h3>
                <p
                    style="background-color: #f1f1f1; padding: 15px; border-radius: 5px; color: #333; font-size: 15px; line-height: 1.6;">
                    {{ $contacto->mensaje }}
                </p>
            </div>

            <div style="margin-top: 20px;">
                <h3 style="color: #4CAF50; font-size: 18px; margin-bottom: 8px;">Nuestra respuesta:</h3>
                <p
                    style="background-color: #e7f7e8; padding: 15px; border-radius: 5px; color: #333; font-size: 15px; line-height: 1.6;">
                    {{ $respuesta->respuesta }}
                </p>
            </div>
        </div>

        <!-- Pie de página con mensaje final -->
        <div style="background-color: #333; padding: 20px; text-align: center; color: white;">
            <p style="font-size: 16px; margin: 0;">¡Gracias por comunicarte con <strong>TheGymMondelo!</strong> 💪</p>
            <p style="font-size: 14px; margin: 5px 0;">
                Nos esforzamos por ayudarte a alcanzar tus metas. Si tienes alguna otra consulta, no dudes en
                contactarnos.
            </p>
            <p style="font-size: 14px; margin: 5px 0;">
                Síguenos en nuestras redes sociales para más consejos y novedades. ¡Nos encanta verte progresar!
            </p>
        </div>
    </div>
</body>

</html>

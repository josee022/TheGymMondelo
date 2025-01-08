<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripeController extends Controller
{
    // Método para crear un intento de pago para un monto específico (por ejemplo, compra general)
    public function crearIntentoPago(Request $request)
    {
        try {
            // Configura la clave secreta de la API de Stripe
            Stripe::setApiKey(env('STRIPE_SECRET'));

            // Convierte el monto de la transacción a centavos (Stripe maneja las cantidades en centavos)
            $monto = $request->total * 100;

            // Crea el PaymentIntent en Stripe con el monto, la moneda y los metadatos
            $intent = PaymentIntent::create([
                'amount' => $monto,
                'currency' => 'usd', // Usamos dólares como moneda
                'metadata' => ['user_id' => $request->user()->id], // Guardamos el ID del usuario para referencia
            ]);

            // Devuelve el client_secret, necesario para el lado del cliente para completar el pago
            return response()->json([
                'clientSecret' => $intent->client_secret,
            ]);
        } catch (\Exception $e) {
            // Si ocurre un error, se captura y se devuelve un mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para crear un intento de pago para la compra de un programa
    public function crearIntentoPagoPrograma(Request $request)
    {
        try {
            // Configura la clave secreta de la API de Stripe
            Stripe::setApiKey(env('STRIPE_SECRET'));

            // Convierte el monto de la transacción a centavos
            $monto = $request->monto * 100;
            $programaId = $request->programa_id; // El ID del programa que se está comprando

            // Crea el PaymentIntent para el pago del programa
            $intent = PaymentIntent::create([
                'amount' => $monto,
                'currency' => 'eur', // Usamos euros como moneda
                'payment_method_types' => ['card'], // Solo permitimos pagos con tarjeta
                'metadata' => [
                    'user_id' => $request->user()->id, // ID del usuario
                    'programa_id' => $programaId, // ID del programa adquirido
                ],
            ]);

            // Devuelve el client_secret necesario para el cliente
            return response()->json(['clientSecret' => $intent->client_secret]);
        } catch (\Exception $e) {
            // Si ocurre un error, se captura y se devuelve un mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para crear un intento de pago para una suscripción
    public function crearIntentoPagoSuscripcion(Request $request)
    {
        try {
            // Configura la clave secreta de la API de Stripe
            Stripe::setApiKey(env('STRIPE_SECRET'));

            // Convierte el monto de la transacción a centavos
            $monto = $request->monto * 100;
            $tipo = $request->tipo; // El tipo de suscripción (mensual, anual, etc.)

            // Crea el PaymentIntent para la suscripción
            $intent = PaymentIntent::create([
                'amount' => $monto,
                'currency' => 'eur', // Usamos euros como moneda
                'payment_method_types' => ['card'], // Solo permitimos pagos con tarjeta
                'metadata' => [
                    'user_id' => $request->user()->id, // ID del usuario
                    'suscripcion_tipo' => $tipo, // Tipo de suscripción
                ],
            ]);

            // Devuelve el client_secret necesario para el cliente
            return response()->json(['clientSecret' => $intent->client_secret]);
        } catch (\Exception $e) {
            // Si ocurre un error, se captura y se devuelve un mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Método para crear un intento de pago para la compra de una dieta
    public function crearIntentoPagoDieta(Request $request)
    {
        try {
            // Configura la clave secreta de la API de Stripe
            Stripe::setApiKey(env('STRIPE_SECRET'));

            // Convierte el monto de la transacción a centavos
            $monto = $request->monto * 100;

            // Crea el PaymentIntent para la compra de la dieta
            $intent = PaymentIntent::create([
                'amount' => $monto,
                'currency' => 'eur', // Usamos euros como moneda
                'metadata' => ['user_id' => $request->user()->id], // ID del usuario
            ]);

            // Devuelve el client_secret necesario para el cliente
            return response()->json([
                'clientSecret' => $intent->client_secret,
            ]);
        } catch (\Exception $e) {
            // Si ocurre un error, se captura y se devuelve un mensaje de error
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

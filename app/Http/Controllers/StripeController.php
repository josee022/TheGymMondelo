<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class StripeController extends Controller
{
    public function crearIntentoPago(Request $request)
    {
        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            // Calcular el monto total en centavos
            $monto = $request->total * 100;

            // Crear un PaymentIntent
            $intent = PaymentIntent::create([
                'amount' => $monto,
                'currency' => 'usd', // Cambia según tu moneda preferida
                'metadata' => ['user_id' => $request->user()->id],
            ]);

            return response()->json([
                'clientSecret' => $intent->client_secret,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crearIntentoPagoPrograma(Request $request)
    {
        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $monto = $request->monto * 100; // Convertir a centavos
            $programaId = $request->programa_id;

            $intent = PaymentIntent::create([
                'amount' => $monto,
                'currency' => 'eur', // Cambia a tu moneda
                'payment_method_types' => ['card'],
                'metadata' => [
                    'user_id' => $request->user()->id,
                    'programa_id' => $programaId,
                ],
            ]);

            return response()->json(['clientSecret' => $intent->client_secret]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function crearIntentoPagoSuscripcion(Request $request)
    {
        try {
            Stripe::setApiKey(env('STRIPE_SECRET'));

            $monto = $request->monto * 100; // Convertir a centavos
            $tipo = $request->tipo;

            $intent = PaymentIntent::create([
                'amount' => $monto,
                'currency' => 'eur', // Cambia a tu moneda
                'payment_method_types' => ['card'],
                'metadata' => [
                    'user_id' => $request->user()->id,
                    'suscripcion_tipo' => $tipo,
                ],
            ]);

            return response()->json(['clientSecret' => $intent->client_secret]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

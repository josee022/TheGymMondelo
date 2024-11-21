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
}

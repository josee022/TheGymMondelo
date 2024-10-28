<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->rol === 'cliente') {
            return $next($request);
        }

        return Inertia::render('AccessDenied');
    }
}

<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Entrenador;
use App\Models\Reserva;
use App\Policies\EntrenadorPolicy;
use App\Policies\ReservaPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Entrenador::class => EntrenadorPolicy::class,
        Reserva::class => ReservaPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}

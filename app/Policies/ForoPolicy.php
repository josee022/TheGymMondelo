<?php

namespace App\Policies;

use App\Models\Foro;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ForoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Foro $foro): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Foro $foro): bool
    {
        return $user->id === $foro->usuario_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Foro $foro): bool
    {
        return $user->id === $foro->usuario_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Foro $foro): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Foro $foro): bool
    {
        return false;
    }
}

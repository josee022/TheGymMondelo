<?php

namespace App\Policies;

use App\Models\ComentarioForo;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ComentarioForoPolicy
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
    public function view(User $user, ComentarioForo $comentarioForo): bool
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
    public function update(User $user, ComentarioForo $comentarioForo): bool
    {
        // Validar si el usuario es el autor del comentario
        return $user->id === $comentarioForo->usuario_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, ComentarioForo $comentarioForo): bool
    {
        // Validar si el usuario es el autor del comentario
        return $user->id === $comentarioForo->usuario_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, ComentarioForo $comentarioForo): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, ComentarioForo $comentarioForo): bool
    {
        return false;
    }
}

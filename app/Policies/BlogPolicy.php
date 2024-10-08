<?php

namespace App\Policies;

use App\Models\Blog;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class BlogPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        // Implement logic if needed
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Blog $blog): bool
    {
        // Any user can view a blog
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        // Implement logic if needed
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Blog $blog): bool
    {
        // Verificar si el usuario es el autor del blog
        return $user->id === $blog->autor_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Blog $blog): bool
    {
        // Verificar si el usuario es el autor del blog
        return $user->id === $blog->autor_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Blog $blog): bool
    {
        // Implement logic if needed
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Blog $blog): bool
    {
        // Implement logic if needed
        return false;
    }
}

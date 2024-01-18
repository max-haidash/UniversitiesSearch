<?php

declare(strict_types=1);

namespace App\Http\Repositories\Auth;

use App\Models\User;

/**
 * Interface AuthActionsRepositoryInterface
 * @package App\Http\Repositories\Auth
 */
interface AuthActionsRepositoryInterface
{
    /**
     * @param array $data
     * @return string
     */
    public function loginAndGetToken(array $data): string;

    /**
     * @param User $authUser
     */
    public function logout(User $authUser): void;
}

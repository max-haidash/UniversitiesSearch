<?php

declare(strict_types=1);

namespace App\Http\Repositories\Auth;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Class AuthActionsRepository
 * @package App\Http\Repositories\Auth
 */
class AuthActionsRepository implements AuthActionsRepositoryInterface
{
    private array $data;
    private string $token;

    /**
     * @param array $data
     * @return string
     * @throws \Exception
     */
    public function loginAndGetToken(array $data): string
    {
        try {
            return $this->setData($data)
                 ->launchLoginProcess()
                 ->getToken();
        } catch (\Exception $exception) {
            throw $exception;
        }
    }

    /**
     * @param User $authUser
     * @throws \Exception
     */
    public function logout(User $authUser): void
    {
        try {
            $authUser->tokens()->delete();
        } catch (\Exception $exception) {
            throw $exception;
        }
    }

    /**
     * @return $this
     */
    protected function launchLoginProcess(): self
    {
        $user = User::byGivenProp($this->data['email']);

        if (!empty($user) && Hash::check($this->data['password'], $user->password)) {
            $token = $user->createToken($this->data['email'], ['*'], Carbon::now()->addDays(2))->plainTextToken;
            $this->setToken($token);
        } else {
            throw new NotFoundHttpException(__('Login credentials are invalid'));
        }

        return $this;
    }

    /**
     * @return $this
     */
    protected function setData(array $data): self
    {
        $this->data = $data;

        return $this;
    }

    /**
     * @param string $token
     * @return $this
     */
    protected function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @return string
     */
    protected function getToken(): string
    {
        return $this->token;
    }
}

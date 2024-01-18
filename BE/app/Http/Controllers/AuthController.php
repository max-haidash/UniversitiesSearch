<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\ApiResponse;
use App\Http\Repositories\Auth\AuthActionsRepositoryInterface;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

/**
 * Class AuthController
 * @package App\Http\Controllers
 */
class AuthController extends Controller
{
    use ApiResponse;

    public function __construct(
        private AuthActionsRepositoryInterface $repository
    )
    {}

    /**
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function loginAction(LoginRequest $request): JsonResponse
    {
        try {
            $token = $this->repository->loginAndGetToken($request->validated());
            $responseData = $this->coreResponseData(__('Login successfully'), true, 'token', $token);
        } catch (\Exception $exception) {
            $responseData = $this->coreResponseData($exception->getMessage(), false);
        }

        return response()->json([
            'data' => $responseData
        ], $responseData['code']);
    }

    /**
     * @return JsonResponse
     */
    public function logoutAction(): JsonResponse
    {
        /** @var User $user */
        $user = Auth::user();

        try {
            $this->repository->logout($user);
            $responseData = $this->coreResponseData(__('Logout successfully'), true);
        } catch (\Exception $exception) {
            $responseData = $this->coreResponseData($exception->getMessage(), false);
        }

        return response()->json([
            'data' => $responseData
        ], $responseData['code']);
    }
}

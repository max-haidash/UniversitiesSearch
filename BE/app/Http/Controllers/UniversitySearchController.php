<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\ApiResponse;
use App\Http\Repositories\UniversitySearch\UniversitySearchRepositoryInterface;
use App\Http\Requests\UniversitySearchRequest;
use Illuminate\Http\JsonResponse;

/**
 * Class UniversitySearchController
 * @package App\Http\Controllers
 */
class UniversitySearchController extends Controller
{
    use ApiResponse;

    public function __construct(
        private UniversitySearchRepositoryInterface $repository
    )
    {}

    /**
     * @param UniversitySearchRequest $request
     * @return JsonResponse
     */
    public function searchAction(UniversitySearchRequest $request): JsonResponse
    {
        try {
            $result = $this->repository->search($request->get('search'));
            $responseData = $this->coreResponseData(__('OK'), true, 'universities', $result);
        } catch (\Exception $exception) {
            $responseData = $this->coreResponseData($exception->getMessage(), false);
        }

        return response()->json([
            'data' => $responseData
        ], $responseData['code']);
    }
}

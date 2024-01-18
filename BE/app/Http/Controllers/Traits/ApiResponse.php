<?php

declare(strict_types=1);

namespace App\Http\Controllers\Traits;

use Illuminate\Http\JsonResponse;

/**
 * Trait ApiResponse
 * @package App\Http\Controllers\Traits
 */
trait ApiResponse
{
    /**
     * @param string $message
     * @param $isSuccess
     * @param string $dataKey
     * @param mixed|null $content
     * @param int $code
     * @return array
     */
    public function coreResponseData(string $message,
                                     $isSuccess,
                                     string $dataKey = '',
                                     mixed $content = null,
                                     int $code = JsonResponse::HTTP_OK): array
    {
        $resultCode = !$isSuccess ? JsonResponse::HTTP_BAD_REQUEST : $code;

        $data = [
            'message' => $message,
            'code' => $resultCode,
            'success' => $isSuccess
        ];

        if (!empty($dataKey)) {
            $data[$dataKey] = $content;
        }

        return $data;
    }
}

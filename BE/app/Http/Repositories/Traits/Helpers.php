<?php

declare(strict_types=1);

namespace App\Http\Repositories\Traits;

/**
 * Trait Helpers
 * @package App\Http\Repositories\Traits
 */
trait Helpers
{
    /**
     * @param string $searchParam
     * @param string|null $value
     * @return bool
     */
    protected function likeSearch(string $searchParam, ?string $value = null): bool
    {
        return !empty($value) && str_contains(strtolower($value), strtolower($searchParam));
    }

    /**
     * @param string $searchParam
     * @param array|null $data
     * @return bool
     */
    protected function likeSearchInNestedData(string $searchParam, ?array $data = null): bool
    {
        if (!empty($data) && is_array($data)) {
            foreach ($data as $value) {
                if ($this->likeSearch($searchParam, $value)) {
                    return true;
                }
            }
        }

        return false;
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Repositories\UniversitySearch;

/**
 * Interface UniversitySearchRepositoryInterface
 * @package App\Http\Repositories\UniversitySearch
 */
interface UniversitySearchRepositoryInterface
{
    /**
     * @param string|null $searchParam
     * @return array
     */
    public function search(?string $searchParam = null): array;
}

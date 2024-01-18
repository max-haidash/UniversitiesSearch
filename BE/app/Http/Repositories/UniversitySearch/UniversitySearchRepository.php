<?php

declare(strict_types=1);

namespace App\Http\Repositories\UniversitySearch;

use App\Http\Repositories\Traits\Helpers;
use Illuminate\Support\Facades\Cache;

/**
 * Class UniversitySearchRepository
 * @package App\Http\Repositories\UniversitySearch
 */
class UniversitySearchRepository implements UniversitySearchRepositoryInterface
{
    use Helpers;

    const RESULT_LENGTH = 5;
    private ?string $searchParam = null;

    /**
     * @param string|null $searchParam
     * @return array
     * @throws \Exception
     */
    public function search(?string $searchParam = null): array
    {
        try {
            return $this->setSearchParam($searchParam)
                        ->getResult();
        } catch (\Exception $exception) {
            throw $exception;
        }
    }

    /**
     * @return array
     */
    protected function getResult(): array
    {
        if (empty(Cache::get('universities'))) {
            return [];
        }

        $data = Cache::get('universities');

        if (!empty($this->getSearchParam())) {
            $param = $this->getSearchParam();

            $data = array_filter($data, function ($data) use ($param) {
                return $this->likeSearch($param,$data['country'] ?? null)
                    || $this->likeSearch($param, $data['name'] ?? null)
                    || $this->likeSearchInNestedData($param, $data['domains'] ?? null);
            });

        }

        return array_slice($data, 0, self::RESULT_LENGTH);
    }

    /**
     * @return string|null
     */
    protected function getSearchParam(): ?string
    {
        return $this->searchParam;
    }

    /**
     * @param string|null $param
     * @return $this
     */
    protected function setSearchParam(?string $param = null): self
    {
        $this->searchParam = $param;

        return $this;
    }
}

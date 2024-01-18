<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Support\Facades\Cache;

/**
 * Trait CacheExternalDataTrait
 * @package App\Traits
 */
trait CacheExternalDataTrait
{
    protected static array $countries = [
        'United States',
        'United Kingdom',
        'Australia',
        'New Zealand'
    ];

    /**
     * @param array $data
     * @return bool
     */
    protected function cacheExistsData(array $data): bool
    {
        if (!empty($data)) {
            $dataByCountries = array_filter($data, function ($data) {
                return !empty($data['country']) && in_array($data['country'], self::$countries);
            });

            Cache::forever('universities', $dataByCountries);
            return true;
        }

        return false;
    }
}

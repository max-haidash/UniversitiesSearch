<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Repositories\Auth\AuthActionsRepository;
use App\Http\Repositories\Auth\AuthActionsRepositoryInterface;
use App\Http\Repositories\UniversitySearch\UniversitySearchRepository;
use App\Http\Repositories\UniversitySearch\UniversitySearchRepositoryInterface;

/**
 * Class RepositoryServiceProvider
 * @package App\Providers
 */
class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthActionsRepositoryInterface::class, AuthActionsRepository::class);
        $this->app->bind(UniversitySearchRepositoryInterface::class, UniversitySearchRepository::class);
    }
}

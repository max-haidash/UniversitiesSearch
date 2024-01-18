<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Http\Services\GuzzleService;
use App\Traits\CacheExternalDataTrait;
use Illuminate\Console\Command;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Class SaveUniversitiesToCache
 * @package App\Console\Commands
 */
class SaveUniversitiesToCache extends Command
{
    use CacheExternalDataTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:universities';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cache universities data';

    /**
     * @param GuzzleService $service
     * @throws GuzzleException
     */
    public function handle(GuzzleService $service)
    {
        $success = $this->cacheExistsData($service->handleAndGetResponseData());

        if ($success) {
            $this->info('Universities data cached successfully');
        } else {
            $this->warn('Failed while cache external api data');
        }
    }
}

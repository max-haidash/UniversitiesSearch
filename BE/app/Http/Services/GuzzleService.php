<?php

declare(strict_types=1);

namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Class GuzzleService
 * @package App\Http\Services
 */
class GuzzleService
{
    private string $base_uri = 'http://universities.hipolabs.com/';
    private string $endPoint = 'search';

    /**
     * @return Client
     */
    public function newClient(): Client
    {
        return new Client(['base_uri' => $this->base_uri]);
    }

    /**
     * @return Response|null
     * @throws GuzzleException
     */
    public function sendGetRequest(): ?Response
    {
        $client = $this->newClient();

        try {
            $response = $client->get($this->endPoint, [
                'query' => [],
                'verify' => false
            ]);
        } catch (\Exception $exception) {
            $response = null;
        }

        return $response;
    }

    /**
     * @return array
     * @throws GuzzleException
     */
    public function handleAndGetResponseData(): array
    {
        $response = $this->sendGetRequest();

        if (!empty($response)) {
            return json_decode($response->getBody()->getContents(), true);
        }

        return [];
    }
}

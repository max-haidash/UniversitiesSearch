<?php

declare(strict_types=1);

namespace Tests\Unit;

use App\Http\Services\GuzzleService;
use App\Models\User;
use App\Traits\CacheExternalDataTrait;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use GuzzleHttp\Exception\GuzzleException;

/**
 * Class UniversitySearchTest
 * @package Tests\Feature
 */
class UniversitySearchTest extends TestCase
{
    use CacheExternalDataTrait;

    private string $endPoint = '/api/universities';

    /**
     * @throws GuzzleException
     */
    public function test_universities_fetch_without_params(): void
    {
        $success = $this->successCacheExistsExternalApiData();

        if (!$success) {
            $this->expectOutputString('Failed while cache external api data');
        } else {
            $this->successAssertion();
        }
    }

    /**
     * @throws GuzzleException
     */
    public function test_universities_fetch_with_country_partial_name_params(): void
    {
        $success = $this->successCacheExistsExternalApiData();

        if (!$success) {
            $this->expectOutputString('Failed while cache external api data');
        } else {
            $this->successAssertion(['search' => 'Kingdom']);
        }
    }

    /**
     * @throws GuzzleException
     */
    public function test_universities_fetch_with_domain_partial_name_params(): void
    {
        $success = $this->successCacheExistsExternalApiData();

        if (!$success) {
            $this->expectOutputString('Failed while cache external api data');
        } else {
            $this->successAssertion(['search' => 'myport']);
        }
    }

    /**
     * @throws GuzzleException
     */
    public function test_universities_fetch_with_name_partial_params(): void
    {
        $success = $this->successCacheExistsExternalApiData();

        if (!$success) {
            $this->expectOutputString('Failed while cache external api data');
        } else {
            $this->successAssertion(['search' => 'Holloway']);
        }
    }

    /**
     * @param array $params
     */
    private function successAssertion(array $params = []): void
    {
        $headers = $this->getFetchDataHeaders();
        $response = $this->withHeaders($headers)->json('GET', $this->endPoint, $params);
        $response->assertStatus(200);
        $response->assertJsonFragment($this->expectedJsonFragment($response->json()['data']['universities'][0] ?? []));
    }

    /**
     * @param array $data
     * @return array
     */
    private function expectedJsonFragment(array $data): array
    {
        return [
            'web_pages' => $data['web_pages'] ?? [],
            'country' => $data['country'] ?? '',
            'domains' => $data['domains'] ?? [],
            'name' => $data['name'] ?? '',
            'alpha_two_code' => $data['alpha_two_code'] ?? ''
        ];
    }

    /**
     * @throws GuzzleException
     */
    private function successCacheExistsExternalApiData(): bool
    {
        $service = new GuzzleService();
        return $this->cacheExistsData($service->handleAndGetResponseData());
    }

    /**
     * @return string[]
     */
    private function getFetchDataHeaders(): array
    {
        $user = User::firstOrCreate([
            'email' => 'ben@gmail.com'
        ], [
            'name' => 'Ben White',
            'password' => Hash::make('password')
        ]);

        $token = $this->getBearerToken($user);

        return [
            'Authorization' => "Bearer {$token}",
            'Accept' => 'application/json'
        ];
    }

    /**
     * @param User $user
     * @return string
     */
    private function getBearerToken(User $user): string
    {
        $headers = [
            'Accept' => 'application/json'
        ];

        $response = $this->withHeaders($headers)->postJson('/api/auth/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        return $response->json('data')['token'] ?? '';
    }
}

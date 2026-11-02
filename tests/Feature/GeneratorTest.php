<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class GeneratorTest extends TestCase
{
    public function test_generator_loads_in_indonesian_without_database_queries(): void
    {
        DB::shouldReceive('connection')->never();

        $this->get('/')
            ->assertOk()
            ->assertSee('<html lang="id">', false)
            ->assertSee('QRKita — Pembuat Kode QR Online')
            ->assertSee('Buat Kode QR')
            ->assertSee('Unduh PNG')
            ->assertSee('Salin Gambar')
            ->assertSee('Maksimal 500 karakter.')
            ->assertSee('id="qr-canvas"', false);
    }

    public function test_no_backend_endpoint_accepts_user_content(): void
    {
        $this->post('/', ['content' => 'https://contoh.com'])->assertStatus(405);
    }
}

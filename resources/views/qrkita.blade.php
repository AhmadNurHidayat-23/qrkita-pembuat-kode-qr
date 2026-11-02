<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Buat kode QR dari tautan atau teks. Gratis, tanpa akun, dan langsung di browser Anda. Unduh sebagai PNG atau salin gambarnya.">
    <meta name="theme-color" content="#fafaf8">
    <title>QRKita — Pembuat Kode QR Online</title>
    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    <a class="skip-link" href="#generator">Langsung ke pembuat QR</a>
    <header class="site-header wrap">
        <a class="wordmark" href="{{ route('home') }}" aria-label="QRKita, halaman utama">qrkita.</a>
        <span class="header-note">Sederhana. Siap dibagikan.</span>
    </header>

    <main class="wrap">
        <section class="intro" aria-labelledby="page-title">
            <p class="eyebrow">PEMBUAT KODE QR ONLINE</p>
            <h1 id="page-title">Buat Kode QR<br>dengan Mudah.</h1>
            <p class="intro-description">Ubah tautan atau teks menjadi kode QR yang siap dibagikan.</p>
        </section>

        <section class="generator" id="generator" aria-label="Pembuat kode QR">
            <div class="input-panel">
                <div class="panel-heading"><span class="step">01</span><h2>Masukkan konten</h2></div>
                <form id="qr-form" novalidate>
                    <fieldset id="generator-controls" disabled>
                        <label for="qr-content">Tautan atau teks</label>
                        <textarea id="qr-content" rows="6" placeholder="https://contoh.com&#10;atau tulis pesan Anda di sini…" aria-describedby="input-hint character-count input-error" spellcheck="false" autocapitalize="off"></textarea>
                        <div class="input-meta">
                            <p id="input-hint">Maksimal 500 karakter.</p>
                            <p id="character-count">0 / 500</p>
                        </div>
                        <p class="input-error" id="input-error" role="alert" hidden></p>
                        <button class="button button-primary" id="generate-button" type="submit">
                            <span>Buat Kode QR</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
                        </button>
                    </fieldset>
                </form>
                <p class="privacy-note">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
                    Konten Anda diproses di browser, tanpa disimpan.
                </p>
                <noscript><p class="input-error">Aktifkan JavaScript di browser untuk membuat kode QR.</p></noscript>
            </div>

            <div class="preview-panel" aria-labelledby="preview-title">
                <div class="panel-heading"><span class="step">02</span><h2 id="preview-title">Kode QR Anda</h2></div>
                <div class="preview-stage">
                    <div class="empty-preview" id="empty-preview">
                        <svg class="qr-placeholder" viewBox="0 0 80 80" aria-hidden="true">
                            <path d="M8 29V8h21M51 8h21v21M72 51v21H51M29 72H8V51"/>
                            <path d="M21 21h11v11H21zM48 21h11v11H48zM21 48h11v11H21zM48 48h5v5h6v6H48z"/>
                        </svg>
                        <p>Kode QR akan muncul di sini</p>
                        <span>Mulai dengan tautan atau teks Anda.</span>
                    </div>
                    <canvas id="qr-canvas" width="1024" height="1024" role="img" aria-label="Kode QR dari konten Anda" hidden></canvas>
                </div>
                <p class="preview-caption" id="preview-caption">PNG · 1024 × 1024 piksel</p>
                <div class="result-actions">
                    <button class="button button-download" id="download-button" type="button" disabled>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></svg>
                        Unduh PNG
                    </button>
                    <button class="button button-copy" id="copy-button" type="button" disabled hidden>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H4v13h4"/></svg>
                        Salin Gambar
                    </button>
                </div>
                <p class="result-message" id="result-message" role="status" aria-live="polite" aria-atomic="true"></p>
            </div>
        </section>
    </main>

    <footer class="site-footer wrap">
        <p>QRKita — Pembuat Kode QR Online.</p>
        <span>Dibuat untuk memudahkan.</span>
    </footer>
</body>
</html>

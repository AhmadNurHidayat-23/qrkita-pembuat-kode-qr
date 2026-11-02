# QRKita — Pembuat Kode QR Online

QRKita mengubah tautan atau teks menjadi kode QR yang dapat dipindai, diunduh sebagai PNG, dan disalin sebagai gambar. Antarmuka berbahasa Indonesia menggunakan desain minimalis, tipografi Inter, dan tata letak responsif.

## Tujuan pengembangan

Aplikasi ini mempermudah berbagi alamat situs dan pesan melalui kode QR tanpa akun, database, riwayat, analitik, ataupun API eksternal. Konten diproses dalam memori browser, tanpa dikirim ke server atau disimpan.

## Fitur utama

- Membuat QR dari tautan maupun teks, termasuk Unicode dan emoji.
- Memvalidasi input kosong dan batas maksimal 500 karakter Unicode.
- Menampilkan pratinjau dengan warna hitam di atas latar putih.
- Mengunduh PNG berukuran 1024 × 1024 piksel.
- Menyalin gambar apabila browser mendukung Clipboard API.
- Menampilkan pesan kesalahan dan status dalam bahasa Indonesia.
- Menonaktifkan hasil lama ketika konten diubah agar gambar selalu sesuai masukan terbaru.

## Teknologi dan cara kerja

QRKita menggunakan Laravel 13, Blade, HTML5, CSS3, JavaScript murni, dan Vite. Library `qr` membentuk matriks QR tanpa dependency tambahan. Matriks digambar ke kanvas menggunakan modul berukuran bulat, zona kosong empat modul, dan koreksi kesalahan tingkat medium. Browser kemudian menyiapkan gambar PNG untuk diunduh atau disalin. Font Inter disertakan secara lokal beserta lisensinya.

Laravel hanya menyajikan halaman Blade dan aset. Tidak ada pemrosesan konten di backend atau form POST, sehingga tidak ada endpoint pembentukan QR yang membutuhkan validasi server atau token CSRF. Teks tidak dimasukkan sebagai HTML. Tautan dikodekan sebagaimana diketik; tambahkan `https://` agar pemindai mengenalinya sebagai alamat web. Kode yang dihasilkan bersifat statis dan tidak kedaluwarsa, tetapi isi tautannya mengikuti situs tujuan.

## Menjalankan secara lokal

Gunakan PHP minimal 8.3, Composer 2, dan Node.js 22.12 atau lebih baru. Untuk MAMP, project ditempatkan di `/Applications/MAMP/htdocs/qrkita-pembuat-kode-qr`. Jalankan dari direktori project:

```sh
composer setup
php artisan serve
```

Perintah persiapan memasang dependency, menyalin `.env.example` bila diperlukan, membuat kunci aplikasi, dan membangun aset. Tidak perlu migrasi atau MySQL. Buka `http://localhost:8000`. Saat mengubah tampilan, jalankan `npm run dev` pada terminal terpisah. Pada MAMP dengan port standar, buka `http://localhost:8888/qrkita-pembuat-kode-qr/public/`. Berkas `.htaccess` memblokir akses source dan hanya mengizinkan direktori publik, termasuk saat modul rewrite MAMP nonaktif. Untuk hosting, arahkan document root khusus situs ke `public`, tanpa mengubah project lain.

Tombol salin membutuhkan konteks aman seperti HTTPS atau localhost dan izin papan klip. Jika tidak tersedia atau ditolak, gunakan unduhan PNG. JavaScript harus aktif; generator memberi pemberitahuan ketika dinonaktifkan.

## Pengujian

```sh
php artisan test
npm test
npm run build
```

Pengujian Laravel memeriksa halaman dan ketiadaan akses database. Pengujian JavaScript memverifikasi validasi, zona kosong, serta keterbacaan QR dengan decoder independen `jsqr`, termasuk URL, teks multibaris, Unicode, dan batas maksimal karakter. Paket decoder hanya digunakan dalam pengujian dan tidak masuk aset aplikasi.

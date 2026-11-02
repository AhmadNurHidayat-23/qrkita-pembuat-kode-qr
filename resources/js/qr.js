import encodeQR from 'qr';

export const MAX_CHARACTERS = 500;
export const IMAGE_SIZE = 1024;

export function countCharacters(value) {
    return Array.from(value).length;
}

export function validateContent(value) {
    if (!value.trim()) return 'Masukkan tautan atau teks terlebih dahulu.';
    if (countCharacters(value) > MAX_CHARACTERS) return 'Konten terlalu panjang. Maksimal 500 karakter.';
    return '';
}

export function createMatrix(value) {
    const error = validateContent(value);
    if (error) throw new Error(error);
    return encodeQR(value, 'raw', { ecc: 'medium', border: 4 });
}

export function renderQr(canvas, value) {
    const matrix = createMatrix(value);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Kanvas tidak tersedia. Coba gunakan browser terbaru.');
    canvas.width = IMAGE_SIZE;
    canvas.height = IMAGE_SIZE;
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);
    // Modul utuh dan zona tenang empat modul menjaga QR mudah dipindai.
    const scale = Math.floor(IMAGE_SIZE / matrix.length);
    const offset = Math.floor((IMAGE_SIZE - matrix.length * scale) / 2);
    context.fillStyle = '#000000';
    matrix.forEach((row, y) => row.forEach((dark, x) => {
        if (dark) context.fillRect(offset + x * scale, offset + y * scale, scale, scale);
    }));
}

export function canvasToPng(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) resolve(blob);
            else reject(new Error('Gambar tidak dapat disiapkan. Silakan buat ulang kode QR.'));
        }, 'image/png');
    });
}

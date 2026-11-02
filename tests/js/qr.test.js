import { test } from 'node:test';
import assert from 'node:assert/strict';
import jsQR from 'jsqr';
import { countCharacters, createMatrix, IMAGE_SIZE, renderQr, validateContent } from '../../resources/js/qr.js';

function rasterize(value) {
    const data = new Uint8ClampedArray(IMAGE_SIZE * IMAGE_SIZE * 4);
    const context = {
        fillStyle: '',
        fillRect(x, y, width, height) {
            const color = this.fillStyle === '#ffffff' ? 255 : 0;
            for (let row = y; row < y + height; row++) {
                for (let col = x; col < x + width; col++) {
                    const offset = (row * IMAGE_SIZE + col) * 4;
                    data.set([color, color, color, 255], offset);
                }
            }
        },
    };
    const canvas = { getContext: () => context };
    renderQr(canvas, value);
    return { width: canvas.width, height: canvas.height, data };
}

test('input kosong dan spasi ditolak', () => {
    for (const value of ['', '   ', '\n\t']) {
        assert.match(validateContent(value), /Masukkan/);
        assert.throws(() => createMatrix(value));
    }
});

test('batas 500 karakter termasuk Unicode diterapkan', () => {
    assert.equal(countCharacters('Hai 👋'), 5);
    assert.equal(validateContent('😀'.repeat(500)), '');
    assert.match(validateContent('a'.repeat(501)), /500 karakter/);
});

for (const [label, value] of [
    ['URL', 'https://contoh.com/halaman?nama=Ahmad&bahasa=id#qr'],
    ['teks', 'Halo dari QRKita!\nBaris kedua: kopi & roti.'],
    ['Unicode', 'Selamat pagi 👋 — 你好 — مرحبا'],
    ['teks HTML', '<script>alert("uji")</script>'],
    ['spasi asli', '  Pesan dengan spasi  '],
    ['batas maksimum', 'x'.repeat(500)],
    ['batas Unicode', '😀'.repeat(500)],
]) {
    test(`QR ${label} dapat dipindai kembali dengan konten persis sama`, () => {
        const image = rasterize(value);
        assert.equal(jsQR(image.data, image.width, image.height)?.data, value);
    });
}

test('zona tenang minimal empat modul di setiap sisi', () => {
    const matrix = createMatrix('QRKita');
    for (let i = 0; i < 4; i++) {
        assert.ok(matrix[i].every(value => !value));
        assert.ok(matrix.at(-i - 1).every(value => !value));
        assert.ok(matrix.every(row => !row[i] && !row.at(-i - 1)));
    }
});

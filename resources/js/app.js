import { canvasToPng, countCharacters, renderQr, validateContent } from './qr';

const form = document.querySelector('#qr-form');
const input = document.querySelector('#qr-content');
const canvas = document.querySelector('#qr-canvas');
const empty = document.querySelector('#empty-preview');
const error = document.querySelector('#input-error');
const counter = document.querySelector('#character-count');
const download = document.querySelector('#download-button');
const copy = document.querySelector('#copy-button');
const message = document.querySelector('#result-message');
const generate = document.querySelector('#generate-button');
let png = null;
let revision = 0;
let busy = false;

const canCopy = window.isSecureContext && typeof ClipboardItem !== 'undefined'
    && typeof navigator.clipboard?.write === 'function'
    && (typeof ClipboardItem.supports !== 'function' || ClipboardItem.supports('image/png'));

copy.hidden = !canCopy;
document.querySelector('#generator-controls').disabled = false;

function setError(text) {
    error.textContent = text;
    error.hidden = !text;
    input.setAttribute('aria-invalid', text ? 'true' : 'false');
}

function setMessage(text, failed = false) {
    message.textContent = text;
    message.dataset.error = String(failed);
}

function clearResult() {
    png = null;
    canvas.hidden = true;
    empty.hidden = false;
    download.disabled = true;
    copy.disabled = true;
    setMessage('');
}

input.addEventListener('input', () => {
    revision += 1;
    counter.textContent = `${countCharacters(input.value)} / 500`;
    clearResult();
    setError(countCharacters(input.value) > 500 ? validateContent(input.value) : '');
});

form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    clearResult();
    const validation = validateContent(input.value);
    setError(validation);
    if (validation) {
        input.focus();
        return;
    }
    const current = revision;
    busy = true;
    generate.disabled = true;
    form.setAttribute('aria-busy', 'true');
    try {
        renderQr(canvas, input.value);
        const result = await canvasToPng(canvas);
        if (current !== revision) return;
        png = result;
        canvas.hidden = false;
        empty.hidden = true;
        download.disabled = false;
        copy.disabled = false;
        setMessage('Kode QR siap. Pindai, unduh, atau bagikan.');
    } catch {
        if (current === revision) setError('Kode QR gagal dibuat. Periksa konten Anda dan coba lagi.');
    } finally {
        busy = false;
        generate.disabled = false;
        form.setAttribute('aria-busy', 'false');
    }
});

download.addEventListener('click', () => {
    if (!png) return;
    const url = URL.createObjectURL(png);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrkita-kode-qr.png';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 10000);
    setMessage('Unduhan PNG dimulai.');
});

copy.addEventListener('click', async () => {
    if (!png || !canCopy) return;
    const current = revision;
    copy.disabled = true;
    try {
        // Blob disiapkan saat QR dibuat agar klik tetap memiliki izin pengguna di Safari.
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
        if (current === revision) setMessage('Gambar QR berhasil disalin.');
    } catch {
        if (current === revision) setMessage('Gambar tidak dapat disalin. Izinkan akses papan klip atau unduh PNG.', true);
    } finally {
        copy.disabled = !png;
    }
});

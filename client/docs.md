# CertiChain — Client Documentation

Frontend web application untuk platform **CertiChain**: sistem penerbitan dan verifikasi sertifikat digital berbasis blockchain, dibangun dengan React + Vite + Tailwind CSS v4.

---

## Daftar Isi

- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Halaman & Routing](#halaman--routing)
- [API Integration](#api-integration)
- [Build untuk Production](#build-untuk-production)
- [Deploy ke Vercel](#deploy-ke-vercel)

---

## Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| **React** | ^19 | UI library |
| **Vite** | ^8 | Build tool & dev server |
| **Tailwind CSS** | ^4 | Utility-first CSS framework |
| **React Router** | ^8 | Client-side routing |
| **SweetAlert2** | ^11 | Dialog / popup notifikasi |

---

## Struktur Proyek

```
client/
├── public/                     # Aset statis (favicon, dll.)
├── src/
│   ├── api/
│   │   └── certificate.js      # Fungsi fetch ke backend API
│   ├── assets/                 # Gambar dan aset lokal
│   ├── components/
│   │   └── InvalidCard.jsx     # Komponen kartu sertifikat tidak valid
│   ├── pages/
│   │   ├── LandingPage.jsx     # Halaman utama / beranda
│   │   ├── UploadPage.jsx      # Halaman upload sertifikat
│   │   ├── CertificatesPage.jsx # Halaman daftar semua sertifikat
│   │   └── VerifyPage.jsx      # Halaman verifikasi sertifikat
│   ├── App.jsx                 # (Sisa template Vite, tidak digunakan di routing)
│   ├── index.css               # Global styles + Tailwind
│   └── main.jsx                # Entry point — setup React Router
├── .env                        # Variabel environment
├── .gitignore
├── index.html                  # HTML template utama
├── package.json
├── vite.config.js              # Konfigurasi Vite + plugin React & Tailwind
└── vercel.json                 # Konfigurasi deploy Vercel (SPA rewrite)
```

---

## Prasyarat

Pastikan sudah terinstal di sistem kamu:

- **Node.js** versi `18` atau lebih baru → [Download Node.js](https://nodejs.org/)
- **npm** (sudah termasuk dengan Node.js)
- **Server CertiChain** harus sudah berjalan (lokal atau sudah di-deploy) — lihat `server/docs.md`

---

## Instalasi

### 1. Clone repositori (jika belum)

```bash
git clone <URL_REPO>
cd Hackaton/client
```

### 2. Install dependencies

```bash
npm install
```

---

## Konfigurasi Environment

Buat file `.env` di dalam folder `client/`:

```env
# URL base API backend CertiChain
VITE_URL_API=http://localhost:3000/api
```

### Penjelasan variabel:

| Variabel | Keterangan |
|---|---|
| `VITE_URL_API` | Base URL dari backend server. Ganti dengan URL production jika sudah di-deploy (contoh: `https://certichain-api.vercel.app/api`). |

> **Penting:** Semua variabel environment di Vite **wajib** diawali dengan prefix `VITE_` agar bisa diakses di dalam kode React melalui `import.meta.env.VITE_...`.

---

## Menjalankan Aplikasi

### Mode Development (dengan HMR / auto-reload)

```bash
npm run dev
```

Aplikasi akan berjalan di: **`http://localhost:5173`**

Output di terminal:

```
  VITE v8.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Buka browser dan akses `http://localhost:5173`.

### Lint (cek kualitas kode)

```bash
npm run lint
```

---

## Halaman & Routing

Routing dikelola oleh **React Router v8** dan dikonfigurasi di `src/main.jsx`.

| Path | Halaman | Keterangan |
|---|---|---|
| `/` | `LandingPage` | Beranda — pengenalan platform CertiChain |
| `/upload` | `UploadPage` | Form upload file PDF sertifikat |
| `/certificates` | `CertificatesPage` | Daftar semua sertifikat yang telah diupload |
| `/verify/:id` | `VerifyPage` | Hasil verifikasi sertifikat berdasarkan UUID |

### Detail Tiap Halaman

#### `/` — Landing Page
Halaman beranda yang menampilkan fitur-fitur utama CertiChain. Terdapat navigasi menuju halaman Upload dan Certificates.

#### `/upload` — Upload Page
Pengguna dapat memilih dan mengupload file PDF sertifikat. Setelah berhasil:
- File PDF akan di-embed QR code verifikasi
- Hash sertifikat didaftarkan ke blockchain Ethereum Sepolia
- Muncul notifikasi sukses via **SweetAlert2**

#### `/certificates` — Certificates Page
Menampilkan semua sertifikat yang telah diupload dalam bentuk daftar/kartu, diurutkan dari yang terbaru.

#### `/verify/:id` — Verify Page
Halaman yang dituju saat pengguna memindai QR code dari sertifikat. Sistem akan:
1. Mengambil data sertifikat dari database berdasarkan `:id`
2. Mengambil hash dari blockchain
3. Membandingkan keduanya dan menampilkan status **Valid** atau **Tidak Valid**

---

## API Integration

Semua pemanggilan ke backend dilakukan melalui helper functions di `src/api/certificate.js`. Base URL diambil dari environment variable `VITE_URL_API`.

| Fungsi | Method | Endpoint | Digunakan di |
|---|---|---|---|
| `uploadFile(formData)` | `POST` | `/certificate/upload` | `UploadPage` |
| `findAllCertificates()` | `GET` | `/certificates` | `CertificatesPage` |
| `findCertificate(id)` | `GET` | `/certificate/verify/:id` | `VerifyPage` |

**Contoh penggunaan:**

```js
import { findAllCertificates } from "../api/certificate";

const response = await findAllCertificates();
const data = await response.json();
console.log(data.data); // array of certificates
```

---

## Build untuk Production

Untuk menghasilkan file statis yang siap di-deploy:

```bash
npm run build
```

File hasil build akan tersimpan di folder `dist/`. Kamu bisa preview hasil build dengan:

```bash
npm run preview
```

Preview akan berjalan di: `http://localhost:4173`

---

## Deploy ke Vercel

Client ini sudah dikonfigurasi untuk deploy ke **Vercel** sebagai Single Page Application (SPA). File `vercel.json` mengatur agar semua route diarahkan ke `index.html` sehingga React Router bisa bekerja dengan benar.

### Langkah Deploy

1. Install Vercel CLI (jika belum):

   ```bash
   npm install -g vercel
   ```

2. Login ke Vercel:

   ```bash
   vercel login
   ```

3. Deploy dari folder `client/`:

   ```bash
   vercel --prod
   ```

4. Set environment variable di **Vercel Dashboard → Project → Settings → Environment Variables**:

   | Key | Value |
   |---|---|
   | `VITE_URL_API` | `https://certichain-api.vercel.app/api` (atau URL server kamu) |

> **Catatan:** Vercel secara otomatis menjalankan `npm run build` saat deploy. Pastikan environment variable sudah diset sebelum melakukan deploy agar build berhasil terhubung ke API yang benar.

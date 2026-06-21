# CertiChain — Server Documentation

Backend REST API untuk platform **CertiChain**: sistem penerbitan dan verifikasi sertifikat digital berbasis blockchain (Ethereum Sepolia).

---

## Daftar Isi

- [Tech Stack](#tech-stack)
- [Struktur Proyek](#struktur-proyek)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Server](#menjalankan-server)
- [API Endpoints](#api-endpoints)
- [Alur Kerja Sistem](#alur-kerja-sistem)
- [Deploy ke Vercel](#deploy-ke-vercel)

---

## Tech Stack

| Teknologi | Kegunaan |
|---|---|
| **Node.js + Express 5** | Framework web server |
| **Supabase** | Database (PostgreSQL) & File Storage |
| **Ethers.js v6** | Interaksi dengan smart contract Ethereum |
| **Multer** | Upload file (multipart/form-data) |
| **pdf-lib** | Manipulasi file PDF |
| **QRCode** | Generasi QR code untuk verifikasi |
| **Cloudinary** | (Opsional) layanan penyimpanan media |
| **Morgan** | HTTP request logger |
| **Nodemon** | Auto-reload server saat development |

---

## Struktur Proyek

```
server/
├── src/
│   ├── app.js                  # Entry point — konfigurasi Express
│   ├── config/
│   │   ├── blockchain.js       # Konfigurasi provider & wallet Ethereum
│   │   └── supabase.js         # Konfigurasi Supabase client
│   ├── contracts/
│   │   ├── certificate.sol     # Smart contract Solidity
│   │   └── CertificateABI.js   # ABI contract untuk ethers.js
│   ├── controllers/
│   │   └── certificate.controller.js   # Logic handler tiap endpoint
│   ├── middleware/
│   │   └── multer.js           # Konfigurasi upload file
│   ├── routes/
│   │   └── certificate.route.js        # Definisi routing API
│   ├── services/
│   │   ├── blockchain.service.js       # Interaksi dengan smart contract
│   │   ├── pdf.service.js              # Embed QR code ke PDF
│   │   └── supabase.service.js         # Query database & storage
│   └── utils/
│       ├── generateHash.js     # Generate SHA-256 hash dari file
│       ├── generateQR.js       # Generate QR code
│       ├── generateUUID.js     # Generate UUID unik
│       └── generateUrl.js      # Generate URL verifikasi
├── .env                        # Variabel environment (jangan di-commit!)
├── .gitignore
├── package.json
└── vercel.json                 # Konfigurasi deploy Vercel
```

---

## Prasyarat

Pastikan sudah terinstal di sistem kamu:

- **Node.js** versi `18` atau lebih baru → [Download Node.js](https://nodejs.org/)
- **npm** (sudah termasuk dengan Node.js)
- Akun **Supabase** → [supabase.com](https://supabase.com)
- Akun **Ethereum** dengan sedikit **Sepolia ETH** untuk gas fee (bisa di-faucet gratis)

---

## Instalasi

### 1. Clone repositori

```bash
git clone <URL_REPO>
cd Hackaton/server
```

### 2. Install dependencies

```bash
npm install
```

---

## Konfigurasi Environment

Buat file `.env` di dalam folder `server/` (atau salin dari contoh di bawah):

```env
# Port server (default: 3000)
PORT=3000

# Supabase
SUPABASE_URL=https://<project-id>.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_<your-key>

# Ethereum (Jaringan Sepolia Testnet)
RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
PRIVATE_KEY=<private-key-wallet-kamu>
CONTRACT_ADDRESS=<alamat-smart-contract>
```

### Penjelasan tiap variabel:

| Variabel | Keterangan |
|---|---|
| `PORT` | Port yang digunakan server. Default `3000`. |
| `SUPABASE_URL` | URL project Supabase kamu (dari Dashboard → Project Settings → API). |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable/anon key dari Supabase. |
| `RPC_URL` | URL node RPC Ethereum Sepolia. Bisa pakai endpoint public gratis. |
| `PRIVATE_KEY` | Private key wallet Ethereum untuk menandatangani transaksi. **Jangan pernah share key ini!** |
| `CONTRACT_ADDRESS` | Alamat smart contract `Certificate.sol` yang sudah di-deploy ke Sepolia. |

### Setup Supabase

1. Buat project baru di [supabase.com](https://supabase.com).
2. Buat **Storage bucket** bernama `sertifikat` dan set sebagai **Public**.
3. Buat **tabel database** bernama `certificates` dengan skema berikut:

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | `uuid` / `text` | Primary key — UUID sertifikat |
| `hash` | `text` | SHA-256 hash dari file PDF asli |
| `file_url` | `text` | URL publik file PDF di Supabase Storage |
| `tx_hash` | `text` | Transaction hash dari blockchain |
| `certificate_name` | `text` | Nama file sertifikat |
| `created_at` | `timestamptz` | Dibuat otomatis oleh Supabase |

---

## Menjalankan Server

### Mode Development (dengan auto-reload)

```bash
npm run dev
```

Server akan berjalan di: `http://localhost:3000`

Output yang muncul di terminal:

```
[nodemon] starting `node src/app.js`
Server running on port: 3000
```

### Mode Production

```bash
node src/app.js
```

### Cek apakah server berjalan

Buka browser atau gunakan tool seperti **Thunder Client / Postman**:

```
GET http://localhost:3000/test
```

Response:

```html
<h1>Api ini berfungsi</h1>
```

---

## API Endpoints

Base URL: `http://localhost:3000/api`

---

### 1. Upload Sertifikat

Meng-upload file PDF sertifikat, embed QR code verifikasi, simpan ke Supabase, dan daftarkan hash ke blockchain.

```
POST /api/certificate/upload
```

**Content-Type:** `multipart/form-data`

| Form Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `sertifikat` | `file` | ✅ | File PDF yang akan diupload |

**Contoh Request (cURL):**

```bash
curl -X POST http://localhost:3000/api/certificate/upload \
  -F "sertifikat=@/path/to/sertifikat.pdf"
```

**Response Sukses (201):**

```json
{
  "success": true,
  "message": "Sertifikat berhasil diupload",
  "data": {
    "id": "uuid-sertifikat",
    "hash": "sha256-hash-file",
    "verifycationUrl": "https://certichain.app/verify/uuid-sertifikat",
    "urlFile": "https://supabase.co/storage/v1/object/public/sertifikat/...",
    "tx_hash": "0xabc123..."
  }
}
```

**Response Error (400) — File tidak dikirim:**

```json
{
  "success": false,
  "message": "Wajib upload file"
}
```

**Response Error (400) — Bukan PDF:**

```json
{
  "success": false,
  "message": "file harus berupa pdf"
}
```

---

### 2. Verifikasi Sertifikat

Memverifikasi keaslian sertifikat dengan membandingkan hash di database dengan hash yang tersimpan di blockchain.

```
GET /api/certificate/verify/:id
```

| Parameter | Lokasi | Keterangan |
|---|---|---|
| `id` | URL params | UUID sertifikat yang ingin diverifikasi |

**Contoh Request:**

```bash
curl http://localhost:3000/api/certificate/verify/uuid-sertifikat
```

**Response Sukses — Sertifikat Valid (200):**

```json
{
  "success": true,
  "verified": true,
  "message": "Sertifikat valid",
  "data": {
    "id": "uuid-sertifikat",
    "name_file": "uuid-namafile.pdf",
    "hash": "sha256-hash-file",
    "fileUrl": "https://supabase.co/storage/v1/...",
    "txHash": "0xabc123...",
    "network": "Ethereum Sepolia",
    "timeStamp": "2026-06-21T00:00:00Z"
  }
}
```

**Response Sukses — Sertifikat Tidak Valid (200):**

```json
{
  "success": true,
  "verified": false,
  "message": "Sertifikat tidak valid"
}
```

**Response Error (404) — Sertifikat tidak ditemukan:**

```json
{
  "success": false,
  "message": "Sertifikat tidak ditemukan"
}
```

---

### 3. Ambil Semua Sertifikat

Mengambil daftar seluruh sertifikat yang tersimpan di database, diurutkan dari yang terbaru.

```
GET /api/certificates
```

**Contoh Request:**

```bash
curl http://localhost:3000/api/certificates
```

**Response Sukses (200):**

```json
{
  "success": true,
  "message": "Daftar Sertifikat berhasil diambil",
  "total": 2,
  "data": [
    {
      "id": "uuid-1",
      "hash": "hash-1",
      "file_url": "https://...",
      "tx_hash": "0x...",
      "certificate_name": "uuid-1-sertifikat.pdf",
      "created_at": "2026-06-21T00:00:00Z"
    }
  ]
}
```

---

## Alur Kerja Sistem

### Upload Sertifikat

```
User upload PDF
      │
      ▼
Validasi file (wajib ada, harus PDF)
      │
      ▼
Generate SHA-256 hash dari buffer file asli
      │
      ▼
Generate UUID + URL verifikasi
      │
      ▼
Embed QR code (berisi URL verifikasi) ke dalam PDF
      │
      ▼
Upload PDF (sudah ada QR) ke Supabase Storage
      │
      ▼
Simpan UUID + hash ke Smart Contract (Ethereum Sepolia)
      │
      ▼
Simpan semua data ke tabel Supabase `certificates`
      │
      ▼
Return response sukses ke client
```

### Verifikasi Sertifikat

```
User akses URL verifikasi (berisi UUID)
      │
      ▼
Ambil data sertifikat dari Supabase DB
      │
      ▼
Ambil hash sertifikat dari blockchain (via UUID)
      │
      ▼
Bandingkan hash DB vs hash blockchain
      │
      ▼
Return status: valid / tidak valid
```

---

## Deploy ke Vercel

Server ini sudah dikonfigurasi untuk deploy ke **Vercel** menggunakan `vercel.json`.

### Langkah Deploy

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Login ke Vercel:

   ```bash
   vercel login
   ```

3. Deploy dari folder `server/`:

   ```bash
   vercel --prod
   ```

4. Set environment variables di **Vercel Dashboard → Project → Settings → Environment Variables** sesuai dengan isi `.env` kamu.

> **Catatan:** Pastikan semua environment variable sudah diset di Vercel sebelum deploy, karena server tidak akan bisa terhubung ke Supabase dan blockchain tanpa konfigurasi tersebut.

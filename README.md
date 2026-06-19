# CertiChain

CertiChain adalah platform verifikasi sertifikat digital yang menggabungkan teknologi Web2 dan Web3 untuk membantu lembaga kursus, bootcamp, dan lembaga pelatihan dalam menerbitkan serta memverifikasi sertifikat secara aman dan transparan.

Sistem menyimpan metadata sertifikat pada database dan hash sertifikat pada blockchain. Dengan pendekatan ini, sertifikat dapat diverifikasi kapan saja dan setiap perubahan data dapat terdeteksi karena hash yang tersimpan di blockchain bersifat permanen dan tidak dapat diubah.

## Latar Belakang

Pemalsuan sertifikat masih menjadi masalah yang sering terjadi pada berbagai institusi pendidikan dan pelatihan. CertiChain hadir sebagai solusi dengan memanfaatkan blockchain sebagai sumber verifikasi yang terpercaya (*source of truth*) untuk menjamin keaslian sertifikat digital.

## Fitur Utama

* Penerbitan sertifikat digital
* Penyimpanan hash sertifikat di blockchain
* Verifikasi sertifikat secara publik
* Deteksi manipulasi data sertifikat
* QR Code untuk verifikasi cepat

## Teknologi yang Digunakan

### Frontend

* React.js
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Supabase

### Blockchain

* Solidity
* Ethers.js
* Sepolia Testnet

## Cara Kerja

1. Admin menerbitkan sertifikat.
2. Data sertifikat diubah menjadi hash menggunakan algoritma SHA-256.
3. Hash disimpan ke blockchain melalui smart contract.
4. Metadata sertifikat disimpan di database.
5. Pengguna melakukan verifikasi melalui scan qr yang ada di setifikat.
6. Sistem mengambil hash dari blockchain dan membandingkannya dengan hash hasil perhitungan data sertifikat.
7. Jika hash cocok, sertifikat dinyatakan valid dan autentik.

## Keunggulan

* Data sertifikat tidak dapat dimanipulasi tanpa terdeteksi.
* Verifikasi dapat dilakukan secara mandiri oleh siapa saja.
* Biaya penyimpanan blockchain lebih rendah karena hanya menyimpan hash.
* Tetap cepat dan efisien karena data operasional disimpan di database.

## Target Pengguna

* Bootcamp
* Lembaga pelatihan

## Status Proyek

Proyek ini dikembangkan sebagai solusi dalam kompetisi hackathon untuk meningkatkan keamanan dan kepercayaan terhadap sertifikat digital melalui teknologi blockchain.

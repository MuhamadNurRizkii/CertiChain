// SPDX-License-Identifier: MIT

//  versi compiler Solidity yang digunakan
pragma solidity ^0.8.20;

// INI CONTOH KODE PROGRAM YANG KITA BUAT DI REMIX IDE

// Smart Contract untuk menyimpan dan memverifikasi hash sertifikat
contract Certificate {

    // Struct untuk menyimpan data sertifikat
    struct CertificateData {
        string hash;
        bool exists;
    }

    // Mapping dengan format:
    // ID Sertifikat => Data Sertifikat
    mapping(string => CertificateData) private certificates;

    // Event yang akan dipanggil ketika sertifikat berhasil disimpan
    event CertificateStored(
        string indexed id,
        string hash
    );

    // Function untuk menyimpan hash sertifikat ke blockchain
    function storeCertificate(
        string memory id,
        string memory hash
    ) external {

        // Memastikan ID sertifikat tidak kosong
        require(
            bytes(id).length > 0,
            "Invalid id"
        );

        // Memastikan hash sertifikat tidak kosong
        require(
            bytes(hash).length > 0,
            "Invalid hash"
        );

        // Memastikan sertifikat dengan ID tersebut
        // belum pernah disimpan sebelumnya
        require(
            !certificates[id].exists,
            "Certificate already exists"
        );

        // Menyimpan data sertifikat ke dalam mapping
        certificates[id] = CertificateData({
            hash: hash,
            exists: true
        });

        // Mengirim event sebagai bukti bahwa
        // sertifikat berhasil disimpan
        emit CertificateStored(
            id,
            hash
        );
    }

    // Function untuk mengambil hash sertifikat
    // berdasarkan ID sertifikat
    function getCertificateHash(
        string memory id
    )
        public
        view
        returns (string memory)
    {
        // Memastikan sertifikat sudah terdaftar
        require(
            certificates[id].exists,
            "Certificate not found"
        );

        // Mengembalikan hash sertifikat
        return certificates[id].hash;
    }

    // Function untuk mengecek apakah
    // sertifikat sudah terdaftar atau belum
    function certificateExists(
        string memory id
    )
        public
        view
        returns (bool)
    {
        // Mengembalikan nilai true jika sertifikat ada
        // dan false jika tidak ditemukan
        return certificates[id].exists;
    }
}
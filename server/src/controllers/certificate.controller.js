import { dataLength } from "ethers";
import {
  findCertificateHash,
  storeCertificateOnChain,
} from "../services/blockchain.service.js";
import { embedQR } from "../services/pdf.service.js";
import {
  findAllCertificates,
  findCertificate,
  insertCertificate,
  uploadFile,
} from "../services/supabase.service.js";
import { generateHash } from "../utils/generateHash.js";
import { generateVerifycationUrl } from "../utils/generateUrl.js";
import { generateUUID } from "../utils/generateUUID.js";

export const uploadCertificate = async (req, res) => {
  try {
    // file dari user
    const file = req.file;
    console.log("file: ");
    console.log(file);

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Wajib upload file",
      });
    }

    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({
        success: false,
        message: "file harus berupa pdf",
      });
    }

    // hash file buffer
    const fileHash = generateHash(file.buffer);
    // generate uuid
    const uuid = generateUUID();
    // generate url
    const url = generateVerifycationUrl(uuid);

    // gabungkan qr ke dalam file pdf
    const pdfBuffer = await embedQR(file.buffer, url);
    const filename = file.originalname;

    // upload ke storage supabase
    const publicUrl = await uploadFile(pdfBuffer, filename);
    console.log(publicUrl);

    // upload uuid, hash file ke blockchain
    const txHash = await storeCertificateOnChain(uuid, fileHash);

    // menambahkan data ke database
    const certificate = await insertCertificate({
      id: uuid,
      hash: fileHash,
      file_url: publicUrl,
      tx_hash: txHash,
      certificate_name: filename,
    });

    return res.status(201).json({
      success: true,
      message: "Sertifikat berhasil diupload",
      data: {
        id: uuid,
        hash: fileHash,
        verifycationUrl: url,
        urlFile: publicUrl,
        tx_hash: txHash,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyCertificate = async (req, res) => {
  try {
    // id dari url
    const { id } = req.params;

    // ambil data sertifikat
    const certificate = await findCertificate(id);

    if (!certificate) {
      return res
        .status(404)
        .json({ success: false, message: "Sertifikat tidak ditemukan" });
    }

    // ambil hash di blockchain
    const blockchainHash = await findCertificateHash(id);

    const verified = certificate.hash === blockchainHash;

    return res.status(200).json({
      success: true,
      verified: verified,
      message: verified ? "Sertifikat valid" : "Sertifikat tidak valid",
      data: {
        id: certificate.id,
        name_file: certificate.certificate_name,
        hash: certificate.hash,
        fileUrl: certificate.file_url,
        txHash: certificate.tx_hash,
        network: "Ethereum Sepolia",
        timeStamp: certificate.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCertificates = async (req, res) => {
  const certificates = await findAllCertificates();

  return res.status(200).json({
    success: true,
    message: "Daftar Sertifikat berhasil diambil",
    total: certificates.length,
    data: certificates,
  });
  try {
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

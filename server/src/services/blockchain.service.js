import { ethers } from "ethers";
import { CertificateABI } from "../contracts/CertificateABI.js";
import { wallet } from "../config/blockchain.js";

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  CertificateABI,
  wallet,
);

export const storeCertificateOnChain = async (id, hash) => {
  const tx = await contract.storeCertificate(id, hash);

  const receipt = await tx.wait();
  console.log("txHash:");
  console.log(receipt);

  return receipt.hash;
};

export const findCertificateHash = async (id) => {
  return await contract.getCertificateHash(id);
};

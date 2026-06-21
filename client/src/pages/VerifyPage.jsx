import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { findCertificate } from "../api/certificate";
import { showError } from "../utils/alert";
import { formatDateTime } from "../utils/formatDate";
import InvalidCard from "../components/InvalidCard";
import logo from "../assets/logo.png";

const VerifyPage = () => {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(true);
  const { id } = useParams();

  const fetchCertificate = async () => {
    try {
      setLoading(true);
      const response = await findCertificate(id);
      const data = await response.json();

      if (data.success) {
        setCertificate(data.data);
        setVerify(data.verified);
      } else {
        showError("Error", data.message);
      }
    } catch (error) {
      await showError("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificate();
  }, []);
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-gutter h-16 max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-md">
            {/* Brand Logo */}
            <Link
              className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2"
              to="/"
            >
              <img alt="CertiChain Logo" className="h-8 w-auto" src={logo} />
              CertiChain
            </Link>
          </div>
          <div className="flex items-center gap-lg">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-md">
              <Link
                to={"/"}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to={"/upload"}
                className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              >
                Upload
              </Link>
              <Link
                to={"/certificates"}
                className="text-primary font-bold border-b-2 border-primary pb-1"
              >
                Certificates
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow pt-24 pb-xl px-gutter flex flex-col items-center justify-center max-w-container-max mx-auto w-full">
        {/* Verification Card */}
        {loading ? (
          <div className="absolute z-10 inset-0 bg-surface-container-lowest/90 backdrop-blur-sm  flex flex-col items-center justify-center rounded-xl">
            <div className="w-10 h-10 border-[3px] border-primary-container/20 border-t-primary-container rounded-full animate-spin mb-md"></div>
            <p className="text-body-md font-body-md text-on-surface font-medium">
              Loading...
            </p>
          </div>
        ) : certificate === null ? (
          <p>Certificate Not Found</p>
        ) : verify ? (
          <div className="w-full max-w-3xl bg-surface-container-lowest rounded-xl border border-outline-variant shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:border-primary">
            {/* Success Header */}
            <div className="bg-secondary/10 px-lg py-xl flex flex-col items-center text-center border-b border-outline-variant">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-md shadow-lg shadow-secondary/20">
                <span
                  className="material-symbols-outlined text-on-secondary text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-secondary mb-2">
                VERIFIED
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[28rem] mx-auto">
                Certificate is authentic and successfully registered on
                blockchain.
              </p>
            </div>

            {/* Details Grid */}
            <div className="p-lg space-y-lg">
              <div className="bg-surface-container-low p-lg rounded-xl border border-outline-variant">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        description
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Certificate Name
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest p-3 rounded font-mono text-sm text-on-surface break-all border border-outline-variant">
                      {certificate.name_file}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        fingerprint
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Certificate Hash
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest p-3 rounded font-mono text-sm text-on-surface break-all border border-outline-variant">
                      {certificate.hash}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        receipt_long
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Transaction Hash
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest p-3 rounded font-mono text-sm text-on-surface break-all border border-outline-variant flex justify-between items-center group cursor-pointer hover:border-primary transition-colors">
                      <span className="truncate pr-4">
                        {certificate.txHash}
                      </span>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${certificate.txHash}`}
                        target="_blank"
                        className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform"
                      >
                        open_in_new
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        language
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Network
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="font-body-md text-body-md text-on-surface font-medium">
                        Ethereum Sepolia
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        schedule
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Verification Time
                      </span>
                    </div>
                    <div className="px-1">
                      <span className="font-body-md text-body-md text-on-surface">
                        {formatDateTime(certificate.timeStamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-surface-container px-lg py-md border-t border-outline-variant flex flex-wrap gap-sm justify-end">
              <a
                href={`https://sepolia.etherscan.io/tx/${certificate.txHash}`}
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md border border-outline-variant bg-surface-container-lowest text-on-surface hover:border-primary hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  receipt_long
                </span>
                View Transaction
              </a>
              <a
                href={certificate.fileUrl}
                target="_blank"
                className="flex items-center gap-2 px-6 py-2 rounded font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-fixed-variant transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">
                  visibility
                </span>
                View Certificate
              </a>
            </div>
          </div>
        ) : (
          <InvalidCard certificate={certificate} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container w-full py-lg px-gutter flex flex-col md:flex-row justify-between items-center gap-md border-t border-outline-variant mt-auto flat no shadows">
        <div className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-on-surface">
          <img alt="CertiChain Logo" className="h-8 w-auto" src={logo} />
          <span>CertiChain</span>
        </div>
        <div className="flex gap-md font-label-sm text-label-sm">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 rounded"
            href="#"
          >
            About
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 rounded"
            href="#"
          >
            Contact
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 rounded"
            href="#"
          >
            Documentation
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 rounded"
            href="#"
          >
            Privacy Policy
          </a>
        </div>
        <div className="text-on-surface-variant font-body-md text-body-md text-sm">
          © 2026 CertiChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default VerifyPage;

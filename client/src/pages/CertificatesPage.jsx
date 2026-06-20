import React, { useEffect, useState } from "react";
import { data, Link } from "react-router";
import { findAllCertificates } from "../api/certificate";
import { showError } from "../utils/alert";
import { truncateHash } from "../utils/truncateHash";

const CertificatesPage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCertificates = certificates.filter((certificate) =>
    certificate.certificate_name.toLowerCase().includes(search.toLowerCase()),
  );

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await findAllCertificates();
      const data = await response.json();

      if (data.success) {
        setCertificates(data.data);
      }
    } catch (error) {
      await showError("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);
  console.log(certificates);
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col pt-16">
      {/* TopNavBar */}
      <nav className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-16 max-w-container-max mx-auto shadow-sm">
        <Link className="flex items-center gap-2" to="/">
          <img
            alt="CertChain Logo"
            className="h-8 w-auto"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSNDrH4i1zxEQ0HuOuctK-lSsosbSmeRxX0_Lv6Tak1ZCDEDCJVoY_S0MgqCEqy0gLFG7JFfdCrf2wg1o4OaFFqjjnf6b8t0UzihpJxw515zI8Gi_Nqmjnbb2dD4_V-hGR_9jwJKWQuGqA83ZlpD8daiQjZZFDinFi-NcB11DRbNvdy0fBXBXfth8l_CE94Ci5PS2xURJL1fO3bw9BjD_MJsfJYqzbY45S7Qa3FoT6FLweA8uOTh3tt_OKWofguJr4QYI6w9mAg"
          />
          <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">
            CertiChain
          </span>
        </Link>
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
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-gutter py-lg flex flex-col gap-lg">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              List Certificates
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Manage and verify your blockchain-secured academic records.
            </p>
          </div>
          <Link
            to="/upload"
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md flex items-center gap-2 hover:bg-primary-container hover:shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Upload New
          </Link>
        </header>

        {/* Stats Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-md">
          {/* Stat Card 1, 2, 3 */}
        </section>

        {/* Search and Filter Bar for Grid */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-md bg-surface-container-lowest p-sm rounded-xl border border-outline-variant shadow-sm">
          <div className="relative w-full sm:w-1/3">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
              placeholder="Filter by filename or hash..."
              type="text"
            />
          </div>
        </div>

        {/* Certificates Grid */}
        <section className=" relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {loading ? (
            <div className="absolute z-10 inset-0 bg-surface-container-lowest/90 backdrop-blur-sm  flex flex-col items-center justify-center rounded-xl">
              <div className="w-7 h-7 border-[3px] border-primary-container/20 border-t-primary-container rounded-full animate-spin mb-md"></div>
              <p className="text-body-md font-body-md text-on-surface font-medium">
                Registering on Blockchain...
              </p>
              <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                This may take a few seconds
              </p>
            </div>
          ) : filteredCertificates.length === 0 ? (
            <p>Certificate not found</p>
          ) : (
            filteredCertificates.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-[16px] border border-outline-variant p-md flex flex-col gap-md hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-50"></div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        description
                      </span>
                    </div>
                    <div>
                      <h3
                        className="text-base font-medium text-on-surface truncate w-40"
                        title={`${item.certificate_name}`}
                      >
                        {item.certificate_name}
                      </h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {item.created_at.split("T")[0]}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 border border-secondary/20">
                    <span className="material-symbols-outlined text-[14px]">
                      check_circle
                    </span>
                    VERIFIED
                  </div>
                  <div className="font-mono text-label-sm text-outline flex items-center gap-1 bg-surface-container px-2 py-1 rounded">
                    <span className="material-symbols-outlined text-[14px]">
                      tag
                    </span>
                    {truncateHash(item.tx_hash)}
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-outline-variant flex justify-end">
                  <Link
                    to={`/verify/${item.id}`}
                    className="text-primary font-label-md hover:text-primary-container flex items-center gap-1 transition-colors"
                  >
                    Verify Details
                    <span className="material-symbols-outlined text-[18px]">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))
          )}
          {/* Certificate Card 1 */}
          {/* <div className="bg-surface-container-lowest rounded-[16px] border border-outline-variant p-md flex flex-col gap-md hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all duration-300 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-50"></div>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    description
                  </span>
                </div>
                <div>
                  <h3
                    className="font-headline-md text-headline-md text-on-surface truncate w-40"
                    title="CS_Degree_JohnDoe_2024.pdf"
                  >
                    CS_Degree_John...pdf
                  </h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Oct 24, 2024 • 2.4 MB
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 border border-secondary/20">
                <span className="material-symbols-outlined text-[14px]">
                  check_circle
                </span>
                VERIFIED
              </div>
              <div className="font-mono text-label-sm text-outline flex items-center gap-1 bg-surface-container px-2 py-1 rounded">
                <span className="material-symbols-outlined text-[14px]">
                  tag
                </span>
                0x7a...3f9c
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-outline-variant flex justify-end">
              <Link
                to="/verify/id"
                className="text-primary font-label-md hover:text-primary-container flex items-center gap-1 transition-colors"
              >
                Verify Details
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div> */}

          {/* Certificate Card 2 */}
          {/* <div className="bg-surface-container-lowest rounded-[16px] border border-outline-variant p-md flex flex-col gap-md hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all duration-300 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-50"></div>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    description
                  </span>
                </div>
                <div>
                  <h3
                    className="font-headline-md text-headline-md text-on-surface truncate w-40"
                    title="Business_Cert_2023.pdf"
                  >
                    Business_Cert_2...pdf
                  </h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Sep 12, 2024 • 1.1 MB
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 border border-secondary/20">
                <span className="material-symbols-outlined text-[14px]">
                  check_circle
                </span>
                VERIFIED
              </div>
              <div className="font-mono text-label-sm text-outline flex items-center gap-1 bg-surface-container px-2 py-1 rounded">
                <span className="material-symbols-outlined text-[14px]">
                  tag
                </span>
                0xb4...1e2a
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-outline-variant flex justify-end">
              <Link
                to="/verify/id"
                className="text-primary font-label-md hover:text-primary-container flex items-center gap-1 transition-colors"
              >
                Verify Details
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div> */}

          {/* Certificate Card 3 */}
          {/* <div className="bg-surface-container-lowest rounded-[16px] border border-outline-variant p-md flex flex-col gap-md hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all duration-300 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container opacity-50"></div>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    description
                  </span>
                </div>
                <div>
                  <h3
                    className="font-headline-md text-headline-md text-on-surface truncate w-40"
                    title="Engineering_Diploma.pdf"
                  >
                    Engineering_Dip...pdf
                  </h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Aug 05, 2024 • 3.7 MB
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 border border-secondary/20">
                <span className="material-symbols-outlined text-[14px]">
                  check_circle
                </span>
                VERIFIED
              </div>
              <div className="font-mono text-label-sm text-outline flex items-center gap-1 bg-surface-container px-2 py-1 rounded">
                <span className="material-symbols-outlined text-[14px]">
                  tag
                </span>
                0x9c...8d4f
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-outline-variant flex justify-end">
              <Link
                to="/verify/id"
                className="text-primary font-label-md hover:text-primary-container flex items-center gap-1 transition-colors"
              >
                Verify Details
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div> */}

          {/* Certificate Card 4 (Pending State Example) */}
          {/* <div className="bg-surface-container-lowest rounded-[16px] border border-outline-variant p-md flex flex-col gap-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-outline group-hover:bg-surface-container-high transition-colors">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    description
                  </span>
                </div>
                <div>
                  <h3
                    className="font-headline-md text-headline-md text-on-surface truncate w-40"
                    title="Design_Portfolio.pdf"
                  >
                    Design_Portfoli...pdf
                  </h3>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Just now • 5.2 MB
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1 border border-tertiary/20">
                <span className="material-symbols-outlined text-[14px] animate-spin">
                  sync
                </span>
                PENDING
              </div>
              <div className="font-mono text-label-sm text-outline flex items-center gap-1 bg-surface-container px-2 py-1 rounded opacity-50">
                <span className="material-symbols-outlined text-[14px]">
                  tag
                </span>
                Awaiting...
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-outline-variant flex justify-end">
              <button
                className="text-outline font-label-md cursor-not-allowed flex items-center gap-1"
                disabled
              >
                Processing
                <span className="material-symbols-outlined text-[18px]">
                  hourglass_empty
                </span>
              </button>
            </div>
          </div> */}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant mt-auto">
        <div className="w-full py-lg px-gutter flex flex-col md:flex-row justify-between items-center gap-md max-w-container-max mx-auto">
          <div className="flex items-center gap-2">
            <img
              alt="CertChain Logo"
              className="h-8 w-auto"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSNDrH4i1zxEQ0HuOuctK-lSsosbSmeRxX0_Lv6Tak1ZCDEDCJVoY_S0MgqCEqy0gLFG7JFfdCrf2wg1o4OaFFqjjnf6b8t0UzihpJxw515zI8Gi_Nqmjnbb2dD4_V-hGR_9jwJKWQuGqA83ZlpD8daiQjZZFDinFi-NcB11DRbNvdy0fBXBXfth8l_CE94Ci5PS2xURJL1fO3bw9BjD_MJsfJYqzbY45S7Qa3FoT6FLweA8uOTh3tt_OKWofguJr4QYI6w9mAg"
            />
            <span className="font-headline-md text-headline-md font-bold text-on-surface">
              CertChain
            </span>
          </div>
          <div className="flex gap-md font-label-sm text-label-sm">
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 rounded"
              to="#"
            >
              About
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 rounded"
              to="#"
            >
              Contact
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 rounded"
              to="#"
            >
              Documentation
            </Link>
            <Link
              className="text-on-surface-variant hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 rounded"
              to="#"
            >
              Privacy Policy
            </Link>
          </div>
          <div className="font-body-md text-body-md text-on-surface-variant text-sm">
            © 2026 CertChain. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CertificatesPage;

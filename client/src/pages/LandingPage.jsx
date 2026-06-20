import React, { useState } from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";

const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 w-full z-50">
        <div className="flex justify-between items-center px-gutter h-16 max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-md">
            {/* Brand Logo */}
            <a
              className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2"
              href="#"
            >
              <img
                alt="CertiChain Logo"
                className="h-8 w-auto"
                src={`${logo}`}
              />
              CertiChain
            </a>
          </div>
          <div className="flex items-center gap-lg">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-md">
              <Link
                to={"/"}
                className="text-primary font-bold border-b-2 border-primary pb-1"
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
                className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
              >
                Certificates
              </Link>
            </nav>
            <div className="flex items-center gap-sm">
              <Link
                to={"/upload"}
                className="hidden md:inline-block bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-md hover:bg-primary-fixed-variant transition-colors shadow-sm focus:ring-2 focus:ring-primary/20"
              >
                Get Started
              </Link>
              {/* Hamburger Button */}
              <button
                className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="material-symbols-outlined">
                  {isMobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-surface border-b border-outline-variant shadow-lg z-40">
          <nav className="flex flex-col p-4 gap-4">
            <Link
              to={"/"}
              className="text-primary font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={"/upload"}
              className="text-on-surface-variant font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Upload
            </Link>
            <Link
              to={"/certificates"}
              className="text-on-surface-variant font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Certificates
            </Link>
          </nav>
        </div>
      )}

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="max-w-container-max mx-auto px-gutter py-xl md:py-24 grid grid-cols-1 md:grid-cols-2 gap-xl items-center">
          <div className="space-y-lg">
            <h1 className="font-display-lg text-display-lg text-on-surface">
              Blockchain Digital <br /> Certificate Verification
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              Prevent fake certificates using secure blockchain technology.
              Issue, verify, and store credentials with absolute cryptographic
              certainty.
            </p>
            <div className="flex flex-wrap gap-sm">
              <Link
                to={"/upload"}
                className="bg-primary-container text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity shadow-md hover:shadow-lg focus:ring-2 focus:ring-primary/20 flex items-center gap-2"
              >
                <span
                  className="material-symbols-outlined"
                  data-icon="upload_file"
                >
                  upload_file
                </span>
                Upload Certificate
              </Link>
              <Link
                to={"/certificates"}
                className="bg-surface-container-lowest text-on-surface border border-outline-variant px-6 py-3 rounded-lg font-label-md text-label-md hover:border-primary hover:text-primary transition-colors shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary/20 flex items-center gap-2"
              >
                <span
                  className="material-symbols-outlined"
                  data-icon="verified"
                >
                  verified
                </span>
                View Certificates
              </Link>
            </div>
          </div>
          <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-surface-container-low shadow-sm border border-outline-variant flex items-center justify-center">
            <img
              alt=""
              className="w-full h-full object-cover rounded-xl"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlCZxkrI5CMPQ9ad9zn2OD68oY_AewUVemqvdlCwuH5xICQBGztUrTbhrttPCROGOL_-9MDSc9ltOQ7HV0CuleZjnLYhZLgIsVmsVQP8J6T5XUNlkmTeyTDbR9Jy5_PhBc-N762B4mzfRuOmKFBguOENEe_mVaMj4F-NmqQyySnq2FDDDCa0ObueMSuipd2G7nQm6Cgffh8G92qUXXan3y8UG7sZRhpwy87PuS1yTVmXTwckpriWb6Xvf5v5m8afyPSbdWthBrPA"
            />
          </div>
        </section>

        {/* Features Section (Bento Grid) */}
        <section className="bg-surface-container-low py-xl">
          <div className="max-w-container-max mx-auto px-gutter">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-sm">
                Uncompromising Security &amp; Speed
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Built on advanced blockchain infrastructure to ensure your
                credentials are safe, instantly verifiable, and immune to
                tampering.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
              {/* Feature 1 */}
              <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant hover:border-primary hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center mb-md group-hover:bg-primary-container/20 transition-colors">
                  <span
                    className="material-symbols-outlined text-primary-container"
                    data-icon="lock"
                  >
                    lock
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
                  Secure Blockchain Storage
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Store immutable certificate records securely on a
                  decentralized network, eliminating single points of failure.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant hover:border-primary hover:shadow-lg transition-all duration-300 group md:col-span-1">
                <div className="w-12 h-12 bg-secondary-container/20 rounded-lg flex items-center justify-center mb-md group-hover:bg-secondary-container/40 transition-colors">
                  <span
                    className="material-symbols-outlined text-secondary"
                    data-icon="bolt"
                  >
                    bolt
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
                  Instant Verification
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Verify certificate authenticity in seconds with our
                  lightning-fast validation protocol, without relying on manual
                  checks.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant hover:border-primary hover:shadow-lg transition-all duration-300 group md:col-span-1">
                <div className="w-12 h-12 bg-tertiary-container/10 rounded-lg flex items-center justify-center mb-md group-hover:bg-tertiary-container/20 transition-colors">
                  <span
                    className="material-symbols-outlined text-tertiary"
                    data-icon="security"
                  >
                    security
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
                  Tamper Proof
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Cryptographic hashing guarantees that certificates cannot be
                  modified or forged once registered on the chain.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Statistics Section */}
      </main>

      {/* Footer */}
      <footer className="bg-surface-container w-full py-lg px-gutter flex flex-col md:flex-row justify-between items-center gap-md border-t border-outline-variant">
        <div className="font-headline-md text-headline-md font-bold text-on-surface flex items-center gap-2">
          <img alt="CertiChain Logo" className="h-8 w-auto" src={logo} />
          CertChain
        </div>
        <nav className="flex flex-wrap justify-center gap-md font-label-sm text-label-sm">
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
        </nav>
        <div className="font-body-md text-body-md text-on-surface-variant">
          © 2026 CertChain. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

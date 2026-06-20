import React, { useState, useRef } from "react";
import { Link } from "react-router";
import { uploadFile } from "../api/certificate";
import { showError, showSuccess } from "../utils/alert";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  console.log(file);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadState, setUploadState] = useState("idle"); // 'idle', 'loading', 'success'
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file || uploadState === "loading") return;

    setUploadState("loading");

    try {
      const formData = new FormData();
      formData.append("sertifikat", file);

      const response = await uploadFile(formData);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setUploadState("success");

      await showSuccess("Success", data.message);

      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      await showError("Error", error.message || "Something went wrong");

      setUploadState("idle");
    }
  };

  const step2Active = !!file;
  const step3Active = uploadState === "success";

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col">
      <style>{`
                .check-anim {
                    stroke-dasharray: 48;
                    stroke-dashoffset: 48;
                    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
                }
                @keyframes stroke {
                    100% { stroke-dashoffset: 0; }
                }
            `}</style>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-gutter h-16 max-w-container-max mx-auto bg-surface-container-lowest border-b border-outline-variant">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <img
            alt="CertChain Logo"
            className="h-8 w-auto"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSNDrH4i1zxEQ0HuOuctK-lSsosbSmeRxX0_Lv6Tak1ZCDEDCJVoY_S0MgqCEqy0gLFG7JFfdCrf2wg1o4OaFFqjjnf6b8t0UzihpJxw515zI8Gi_Nqmjnbb2dD4_V-hGR_9jwJKWQuGqA83ZlpD8daiQjZZFDinFi-NcB11DRbNvdy0fBXBXfth8l_CE94Ci5PS2xURJL1fO3bw9BjD_MJsfJYqzbY45S7Qa3FoT6FLweA8uOTh3tt_OKWofguJr4QYI6w9mAg"
          />
          <span className="text-headline-md font-headline-md font-bold text-primary">
            CertiChain
          </span>
        </div>
        {/* Navigation Links (Desktop) */}
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
              className="text-primary font-bold border-b-2 border-primary pb-1"
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
        </div>
      </nav>
      {/* Main Content Canvas */}
      <main className="flex-1 flex items-center justify-center pt-24 pb-lg px-gutter max-w-container-max mx-auto w-full">
        {/* Upload Card */}
        <div className="bg-surface-container-lowest w-full max-w-3xl rounded-[16px] shadow-[0px_4px_20px_rgba(0,0,0,0.05)] p-lg md:p-xl border border-outline-variant/30 relative overflow-hidden">
          {/* Header Section */}
          <div className="text-center mb-lg">
            <h1 className="text-headline-lg font-headline-lg text-on-surface mb-2">
              Upload Certificate
            </h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-[32rem] mx-auto">
              Upload a PDF certificate to register it on the blockchain.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-xl">
            <div className="flex justify-between items-center mb-2 text-label-sm font-label-sm text-on-surface-variant">
              <span className="text-primary-container font-semibold">
                Choose File
              </span>
              <span
                className={
                  step2Active ? "text-primary-container font-semibold" : ""
                }
              >
                Upload
              </span>
              <span
                className={
                  step3Active ? "text-primary-container font-semibold" : ""
                }
              >
                Completed
              </span>
            </div>
            <div className="flex gap-2 w-full">
              <div className="h-1 flex-1 bg-primary-container rounded-full transition-colors duration-300"></div>
              <div
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step2Active ? "bg-primary-container" : "bg-surface-variant"}`}
              ></div>
              <div
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step3Active ? "bg-primary-container" : "bg-surface-variant"}`}
              ></div>
            </div>
          </div>

          {/* Work Area */}
          <div className="relative">
            {/* State 1: Drop Zone */}
            {!file && (
              <div
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-xl flex flex-col items-center justify-center gap-md transition-all duration-200 cursor-pointer min-h-[280px] ${isDragOver ? "border-primary-container bg-surface-bright" : "border-outline-variant hover:border-primary-container hover:bg-surface-bright"}`}
              >
                <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary-container mb-2">
                  <span
                    className="material-symbols-outlined"
                    style={{
                      fontSize: "32px",
                      fontVariationSettings: '"FILL" 0',
                    }}
                  >
                    upload_file
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-body-lg font-body-lg text-on-surface font-medium">
                    Drag and drop your PDF here
                  </p>
                  <p className="text-label-md font-label-md text-on-surface-variant mt-1">
                    Maximum file size: 10MB
                  </p>
                </div>
                <div className="flex items-center w-full max-w-[20rem] gap-4 my-2">
                  <div className="h-px bg-outline-variant flex-1"></div>
                  <span className="text-label-sm font-label-sm text-outline">
                    OR
                  </span>
                  <div className="h-px bg-outline-variant flex-1"></div>
                </div>
                <button className="px-6 py-2 bg-surface-container-lowest border border-outline-variant text-on-surface font-label-md text-label-md rounded-lg hover:border-primary-container hover:text-primary-container transition-colors focus:ring-2 focus:ring-primary-container/20">
                  Choose PDF File
                </button>
                <input
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="application/pdf"
                  className="hidden"
                  type="file"
                />
              </div>
            )}

            {/* State 2: Selected File Info */}
            {file && (
              <div className="border border-outline-variant rounded-xl p-md flex items-center justify-between bg-surface-bright min-h-[100px] mb-lg">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 rounded-lg bg-error-container text-on-error-container flex items-center justify-center">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      picture_as_pdf
                    </span>
                  </div>
                  <div>
                    <p className="text-body-md font-body-md font-medium text-on-surface line-clamp-1">
                      {file.name}
                    </p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-full hover:bg-surface-container"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            )}

            {/* State 3: Loading View */}
            {uploadState === "loading" && (
              <div className="absolute inset-0 bg-surface-container-lowest/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
                <div className="w-7 h-7 border-[3px] border-primary-container/20 border-t-primary-container rounded-full animate-spin mb-md"></div>
                <p className="text-body-md font-body-md text-on-surface font-medium">
                  Registering on Blockchain...
                </p>
                <p className="text-label-sm font-label-sm text-on-surface-variant mt-1">
                  This may take a few seconds
                </p>
              </div>
            )}
          </div>

          {/* Action Button Area */}
          <div className="mt-xl flex justify-end">
            <button
              onClick={handleUpload}
              disabled={!file || uploadState === "loading"}
              className={`w-full md:w-auto px-8 py-3 text-label-md font-label-md font-semibold rounded-lg transition-all ${
                !file
                  ? "bg-surface-container-high text-on-surface-variant cursor-not-allowed"
                  : uploadState === "loading"
                    ? "bg-primary-container text-on-primary-container opacity-70 cursor-wait"
                    : "bg-primary-container text-on-primary-container hover:opacity-90 shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
              }`}
            >
              {uploadState === "loading"
                ? "Processing..."
                : uploadState === "success"
                  ? "Upload Another"
                  : "Upload Certificate"}
            </button>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      <div
        className={`fixed bottom-lg right-lg bg-inverse-surface text-inverse-on-surface px-md py-sm rounded-lg shadow-lg flex items-center gap-sm transform transition-all duration-300 z-50 pointer-events-none ${showToast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      >
        <svg
          className="w-6 h-6 text-secondary-fixed-dim"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          ></circle>
          <path
            className={showToast ? "check-anim" : ""}
            d="M8 12L11 15L16 9"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </svg>
        <span className="text-body-md font-body-md font-medium">
          Certificate successfully registered
        </span>
      </div>
    </div>
  );
};

export default UploadPage;

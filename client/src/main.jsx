import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import VerifyPage from "./pages/VerifyPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import CertificatesPage from "./pages/CertificatesPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/certificates" element={<CertificatesPage />} />
        <Route path="/verify/:id" element={<VerifyPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

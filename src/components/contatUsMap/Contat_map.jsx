import React, { useEffect, useState } from "react";

const ContactMap = ({ isOpen, onClose }) => {
  const locationLink = "https://maps.app.goo.gl/ayqnFDDKzWmZmRRu6";
  const phoneNumber = "+88-01700-760511";
  const [loading, setLoading] = useState(true);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // prevent scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Top Section */}
        <div style={topSectionStyle}>
          <div>
            📞{" "}
            <a
              href={`tel:${phoneNumber}`}
              style={{ textDecoration: "none", color: "#222" }}
            >
              {phoneNumber}
            </a>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => window.open(locationLink, "_blank")}
              style={directionBtnStyle}
            >
              Get Directions
            </button>

            <button onClick={onClose} style={closeIconStyle}>
              ✕
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
          {loading && (
            <div style={loaderStyle}>
              <div style={spinnerStyle}></div>
            </div>
          )}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.2356698655108!2d90.5848889!3d23.7405278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b5f87df6e7a1%3A0xee1bf8ac272caeb2!2sInnovation%20Plastics%20Can%20Ltd!5e1!3m2!1sen!2sbd!4v1772635155170!5m2!1sen!2sbd"
            style={iframeStyle}
            onLoad={() => setLoading(false)}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  backdropFilter: "blur(6px)",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  animation: "fadeIn 0.3s ease",
};

const modalStyle = {
  background: "rgba(255,255,255,0.95)",
  padding: "20px",
  borderRadius: "16px",
  width: "92%",
  maxWidth: "600px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  animation: "slideUp 0.35s ease",
  overflow: "hidden",
};

const topSectionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
  fontWeight: "600",
};

const directionBtnStyle = {
  padding: "6px 14px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
};

const closeIconStyle = {
  background: "transparent",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
};

const iframeStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  border: 0,
};

const loaderStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(255,255,255,0.7)",
  zIndex: 10,
};

const spinnerStyle = {
  width: "40px",
  height: "40px",
  border: "5px solid #ccc",
  borderTop: "5px solid #007bff",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

/* ================= KEYFRAMES ================= */

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`,
  styleSheet.cssRules.length
);

export default ContactMap;
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { certificates, Certificate } from "../data/portfolioData";
import { smoother } from "./Navbar";
import "./styles/Certificates.css";

/** Preview image: PDFs use their pre-rendered first page. */
const previewOf = (c: Certificate) => c.thumb ?? c.file;

const CertCard = ({ cert, tabIndex }: { cert: Certificate; tabIndex?: number }) => (
  <a
    href={cert.file}
    target="_blank"
    rel="noopener noreferrer"
    className="cert-card"
    data-cursor="disable"
    tabIndex={tabIndex}
  >
    <div className="cert-thumb">
      <img src={previewOf(cert)} alt={cert.title} loading="lazy" />
      {cert.file.endsWith(".pdf") && <span className="cert-badge">PDF</span>}
    </div>
    <div className="cert-info">
      <h4>{cert.title}</h4>
      <h5>{cert.issuer}</h5>
    </div>
  </a>
);

const Certificates = () => {
  const [open, setOpen] = useState(false);

  // While the popup is open: Esc closes it and the page behind doesn't scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    smoother?.paused(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflowY = prevOverflow || "auto";
      smoother?.paused(false);
    };
  }, [open]);

  return (
    <div className="certificates-section">
      <h2>
        My <span>&</span>
        <br /> Certificates
      </h2>

      {/* Slow right-to-left ticker (list is doubled for a seamless loop) */}
      <div className="cert-marquee">
        <div className="cert-track">
          {[...certificates, ...certificates].map((cert, i) => (
            <CertCard
              key={`${cert.id}-${i}`}
              cert={cert}
              tabIndex={i >= certificates.length ? -1 : undefined}
            />
          ))}
        </div>
      </div>

      <button
        className="cert-view-all"
        onClick={() => setOpen(true)}
        data-cursor="disable"
      >
        View all certificates <span>({certificates.length})</span>
      </button>

      {open &&
        createPortal(
          <div
            className="cert-modal"
            role="dialog"
            aria-modal="true"
            aria-label="All certificates"
            onClick={() => setOpen(false)}
          >
            <div className="cert-modal-panel" onClick={(e) => e.stopPropagation()}>
              <div className="cert-modal-head">
                <h3>
                  All <span>Certificates</span>
                </h3>
                <button
                  className="cert-modal-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  data-cursor="disable"
                >
                  <MdClose />
                </button>
              </div>
              <div className="cert-modal-grid">
                {certificates.map((cert) => (
                  <CertCard key={cert.id} cert={cert} />
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Certificates;

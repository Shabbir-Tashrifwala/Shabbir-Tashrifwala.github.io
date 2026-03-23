"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const RESUME_PATH = "/assets/Shabbir_Tashrifwala_Resume.pdf";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [showResume, setShowResume] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 50);
      if (currentY > lastY.current && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (showResume || mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showResume, mobileOpen]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
              atTop
                ? "bg-transparent"
                : "bg-[var(--bg-primary)]/90 backdrop-blur-[12px] border-b border-[var(--border-light)]"
            }`}
          >
            <div className="section-container flex items-center justify-between">
              {/* Brand */}
              <a
                href="#home"
                className="font-serif text-xl font-bold text-[var(--text-primary)] tracking-wide"
              >
                ST
              </a>

              {/* Desktop Links */}
              <ul className="hidden md:flex items-center gap-8">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-sans text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setShowResume(true)}
                    className="font-sans text-sm font-medium px-5 py-2 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 rounded-md cursor-pointer"
                  >
                    Resume
                  </button>
                </li>
              </ul>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex flex-col gap-1.5 cursor-pointer p-1"
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-6 h-0.5 bg-[var(--text-primary)] transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-[var(--bg-primary)] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-6 text-[var(--text-primary)] text-2xl cursor-pointer"
              aria-label="Close menu"
            >
              &times;
            </button>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-sans text-xl font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setShowResume(true); }}
              className="font-sans text-lg font-medium px-6 py-2.5 border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white transition-all duration-200 rounded-md cursor-pointer"
            >
              Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{ background: "rgba(26, 26, 26, 0.9)", backdropFilter: "blur(12px)" }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] flex-shrink-0 bg-[var(--bg-primary)]">
              <span className="font-sans text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-widest">
                Resume
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={RESUME_PATH}
                  download="Shabbir_Tashrifwala_Resume.pdf"
                  className="flex items-center gap-2 font-sans text-sm font-medium px-4 py-2 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all duration-200 rounded-md"
                >
                  <span>&darr;</span>
                  Download
                </a>
                <button
                  onClick={() => setShowResume(false)}
                  className="font-sans text-sm px-4 py-2 border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all duration-200 rounded-md cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 relative overflow-hidden bg-[var(--bg-secondary)]">
              <iframe
                src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0"
                title="Shabbir Tashrifwala Resume"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

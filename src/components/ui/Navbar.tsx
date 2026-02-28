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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showResume) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showResume]);

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
              atTop ? "bg-transparent" : "glass border-b border-cyber-teal/10"
            }`}
          >
            <div className="section-container flex items-center justify-between">
              {/* Brand */}
              <a
                href="#home"
                className="font-mono text-cyber-teal text-sm tracking-widest uppercase font-bold neon-text"
              >
                ST
              </a>

              {/* Links */}
              <ul className="flex items-center gap-8">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-mono text-xs tracking-widest uppercase text-slate-400 hover:text-cyber-teal transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cyber-teal group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setShowResume(true)}
                    className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-cyber-teal text-cyber-teal hover:bg-cyber-teal/10 transition-all duration-200 rounded-sm cursor-pointer"
                    style={{ boxShadow: "0 0 10px rgba(0,240,255,0.15)" }}
                  >
                    Resume
                  </button>
                </li>
              </ul>
            </div>
          </motion.nav>
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
            style={{ background: "rgba(5, 10, 24, 0.95)", backdropFilter: "blur(12px)" }}
          >
            {/* Modal header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b border-cyber-teal/20 flex-shrink-0"
              style={{ background: "rgba(10, 22, 40, 0.9)" }}
            >
              <div className="flex items-center gap-4">
                <span className="h-px w-8 bg-cyber-teal/40" />
                <span className="font-mono text-cyber-teal text-xs tracking-[0.3em] uppercase">
                  Resume
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* Download button */}
                <a
                  href={RESUME_PATH}
                  download="Shabbir_Tashrifwala_Resume.pdf"
                  className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-4 py-2 bg-cyber-teal text-cyber-navy font-bold hover:bg-cyber-teal/80 transition-all duration-200 rounded-sm"
                  style={{ boxShadow: "0 0 16px rgba(0,240,255,0.3)" }}
                >
                  <span>↓</span>
                  Download
                </a>
                {/* Close button */}
                <button
                  onClick={() => setShowResume(false)}
                  className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-cyber-teal/30 text-slate-400 hover:text-cyber-teal hover:border-cyber-teal transition-all duration-200 rounded-sm cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0"
                title="Shabbir Tashrifwala Resume"
              />
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-cyber-teal/20 pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-cyber-teal/20 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-cyber-teal/20 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-cyber-teal/20 pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

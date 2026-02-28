"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setAtTop(currentY < 50);
      if (currentY > lastY.current && currentY > 100) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      lastY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
                <a
                  href="/Shabbir_Tashrifwala_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-cyber-teal text-cyber-teal hover:bg-cyber-teal/10 transition-all duration-200 rounded-sm"
                  style={{ boxShadow: "0 0 10px rgba(0,240,255,0.15)" }}
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

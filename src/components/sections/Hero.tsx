"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]"
      style={{ minHeight: "85vh" }}
    >
      {/* Content */}
      <div className="section-container text-center px-6">
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="font-sans text-sm text-[var(--text-tertiary)] uppercase tracking-[3px] mb-6"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          className="font-serif font-bold text-[var(--text-primary)] leading-[1.2] mb-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          Shabbir Tashrifwala
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
          className="font-sans text-[var(--text-secondary)] text-lg mb-10"
          style={{ fontSize: "1.1rem" }}
        >
          Exploring the frontiers of intelligent systems.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.3 }}
        >
          <a
            href="#projects"
            className="inline-block px-8 py-3.5 font-sans text-sm font-medium bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-all duration-200"
          >
            View Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}

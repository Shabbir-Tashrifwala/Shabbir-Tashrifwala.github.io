"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

// Lazy-load R3F canvas to avoid blocking initial paint
const ParticleNetwork = dynamic(
  () => import("@/components/three/ParticleNetwork"),
  { ssr: false, loading: () => null }
);

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const name = nameRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    if (!name || !subtitle || !cta) return;

    const nameText = "Shabbir Tashrifwala";
    const subtitleText = "Teaching machines to think so I don't have to.";

    // Split name into chars
    name.innerHTML = nameText
      .split("")
      .map((ch) =>
        ch === " "
          ? '<span style="display:inline-block;width:0.4em">&nbsp;</span>'
          : `<span style="display:inline-block;opacity:0;transform:translateY(40px)">${ch}</span>`
      )
      .join("");

    // Split subtitle into chars
    subtitle.innerHTML = subtitleText
      .split("")
      .map((ch) =>
        ch === " "
          ? '<span style="display:inline-block;width:0.3em">&nbsp;</span>'
          : `<span style="display:inline-block;opacity:0">${ch}</span>`
      )
      .join("");

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.5 });

    tl.to(name.querySelectorAll("span"), {
      opacity: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.6,
    })
      .to(
        subtitle.querySelectorAll("span"),
        {
          opacity: 1,
          stagger: 0.025,
          duration: 0.3,
        },
        "-=0.2"
      )
      .fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.1"
      );

    // Glitch effect on name loop
    const glitchInterval = setInterval(() => {
      if (!nameRef.current) return;
      gsap.to(nameRef.current, {
        skewX: 5,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(nameRef.current, { skewX: 0 });
        },
      });
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-navy"
    >
      {/* R3F Background Canvas */}
      <div className="absolute inset-0 z-0">
        <ParticleNetwork />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-cyber-navy/40 via-transparent to-cyber-navy pointer-events-none" />
      <div className="absolute inset-0 z-[1] cyber-grid opacity-30 pointer-events-none" />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.3) 2px, rgba(0,240,255,0.3) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 section-container text-center px-6">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="h-px w-8 bg-cyber-teal/60" />
          <span className="font-mono text-cyber-teal text-xs tracking-[0.3em] uppercase">
            Hello, I&apos;m
          </span>
          <span className="h-px w-8 bg-cyber-teal/60" />
        </motion.div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 text-white leading-none"
          style={{ textShadow: "0 0 60px rgba(0,240,255,0.15)" }}
        >
          Shabbir Tashrifwala
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono text-cyber-teal text-sm sm:text-base md:text-lg tracking-wider mt-4 mb-8"
          style={{ textShadow: "0 0 20px rgba(0,240,255,0.5)" }}
        >
          Teaching machines to think so I don&apos;t have to.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="group relative px-8 py-3 font-mono text-sm tracking-widest uppercase bg-cyber-teal text-cyber-navy font-bold overflow-hidden transition-all duration-300 hover:shadow-neon-teal"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 font-mono text-sm tracking-widest uppercase border border-cyber-teal/50 text-cyber-teal hover:border-cyber-teal hover:shadow-neon-teal-sm transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyber-teal/60 to-transparent" />
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-cyber-teal/30 pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-cyber-teal/30 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-cyber-teal/30 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-cyber-teal/30 pointer-events-none" />
    </section>
  );
}

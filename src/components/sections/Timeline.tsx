"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2023",
    title: "Grade 10 — ICSE",
    subtitle: "St. Mary's School, Mumbai",
    type: "education",
    details: [
      "Completed Grade 10 under the ICSE board",
      "St. Mary's School, Mumbai",
    ],
    icon: "▣",
  },
  {
    year: "2024 – 2026",
    title: "Higher Secondary — ISC (Grades 11–12)",
    subtitle: "St. Mary's School, Mumbai",
    type: "education",
    details: [
      "Science stream (ISC board)",
      "St. Mary's School, Mumbai",
    ],
    icon: "▣",
  },
  {
    year: "Apr – Sep 2025",
    title: "Software Development Intern",
    subtitle: "Data Science & ML · AppPerfect Corporation",
    type: "work",
    details: [
      "Data Science & Machine Learning focus",
      "AppPerfect Corporation",
    ],
    icon: "◈",
  },
  {
    year: "May 2025",
    title: "IOAI Training Camp",
    subtitle: "International Olympiad of AI — Top 22 in India",
    type: "award",
    details: [
      "Selected among Top 22 students in India",
      "International Olympiad of Artificial Intelligence",
    ],
    icon: "◆",
  },
];

const typeColors: Record<string, string> = {
  education: "#00F0FF",
  work: "#a78bfa",
  award: "#FFD700",
};

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const milestoneEls = document.querySelectorAll(".timeline-milestone");
    const line = lineRef.current;

    if (line) {
      const totalLen = 1000;
      gsap.set(line, { strokeDasharray: totalLen, strokeDashoffset: totalLen });
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1.5,
        },
      });
    }

    milestoneEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            once: true,
          },
        }
      );

      const dot = el.querySelector(".milestone-dot");
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 bg-cyber-navy-light overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-3">
            <span className="h-px w-12 bg-cyber-teal/40" />
            <span className="font-mono text-cyber-teal text-xs tracking-[0.3em] uppercase">
              Journey
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Experience & Education<span className="text-cyber-teal">.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* SVG animated line */}
          <svg
            className="absolute left-[11px] top-0 h-full w-px md:left-1/2 pointer-events-none"
            style={{ overflow: "visible" }}
          >
            <line
              ref={lineRef}
              x1="0"
              y1="0"
              x2="0"
              y2="1000"
              stroke="#00F0FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
          </svg>

          {/* Milestones */}
          <div className="flex flex-col gap-12">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              const color = typeColors[m.type] ?? "#00F0FF";

              return (
                <div
                  key={i}
                  className={`timeline-milestone relative flex items-start gap-8 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                    } pl-8 md:pl-0`}
                  >
                    <div
                      className="glass p-5 rounded-sm border border-cyber-teal/10 hover:border-cyber-teal/30 transition-all duration-300 group"
                      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
                    >
                      <div
                        className={`flex items-center gap-3 mb-2 ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span
                          className="font-mono text-xs tracking-widest uppercase px-2 py-0.5 rounded-sm"
                          style={{
                            color,
                            background: `${color}15`,
                            border: `1px solid ${color}30`,
                          }}
                        >
                          {m.year}
                        </span>
                        <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">
                          {m.type}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-base mb-1 group-hover:text-cyber-teal transition-colors duration-300">
                        {m.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-3">{m.subtitle}</p>
                      <ul className={`space-y-1 ${isLeft ? "md:flex md:flex-col md:items-end" : ""}`}>
                        {m.details.map((d, di) => (
                          <li
                            key={di}
                            className="font-mono text-xs text-slate-500 flex items-center gap-2"
                            style={{ justifyContent: isLeft ? "flex-end" : "flex-start" }}
                          >
                            <span style={{ color: `${color}60` }}>▸</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-0 top-6 md:relative md:top-0 md:left-auto flex-shrink-0 flex items-start justify-center md:w-0 md:overflow-visible">
                    <div
                      className="milestone-dot relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: color,
                        background: `${color}20`,
                        boxShadow: `0 0 12px ${color}50`,
                      }}
                    >
                      <span className="text-xs" style={{ color }}>{m.icon}</span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

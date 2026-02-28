"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2024–2026",
    title: "St. Mary's ISC, Mumbai",
    subtitle: "Grade 11–12 | Science Stream",
    type: "education",
    details: ["Grade 10: 92.8%", "ISC (Grade 12) in progress"],
    icon: "▣",
  },
  {
    year: "2025",
    title: "Indian National AI Olympiad (IIIT-Hyderabad)",
    subtitle: "INAIO — Top 10 in India",
    type: "award",
    details: [
      "Second Runner-up, INAIO",
      "Selected for IOAI Training Camp (Top 22 in India)",
    ],
    icon: "◈",
  },
  {
    year: "2024",
    title: "EUMIND International Exchange",
    subtitle: "Team Leader — Best Article Award",
    type: "leadership",
    details: [
      "Led winning team for Best Article Award",
      "International collaborative project",
    ],
    icon: "◉",
  },
  {
    year: "2023",
    title: "School Leader",
    subtitle: "Student Body Representative",
    type: "leadership",
    details: [
      "Appointed as representative of the student body",
      "Event Head: Immaculata — Mumbai's largest interschool cultural festival",
    ],
    icon: "◎",
  },
  {
    year: "2023",
    title: "International Karate Tournament",
    subtitle: "Philippines — National Representative",
    type: "sports",
    details: [
      "Represented India internationally",
      "Silver Medal — State-level Karate Tournament",
    ],
    icon: "◇",
  },
  {
    year: "Ongoing",
    title: "INAIO Committee & ACM IKDD",
    subtitle: "Vice President, ACM IKDD | INAIO Committee Member",
    type: "role",
    details: [
      "Member, INAIO Committee",
      "Vice President, ACM IKDD",
    ],
    icon: "◆",
  },
];

const typeColors: Record<string, string> = {
  education: "#00F0FF",
  award: "#FFD700",
  leadership: "#00F0FF",
  sports: "#00F0FF",
  role: "#00F0FF",
};

export default function Timeline() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const milestoneEls = document.querySelectorAll(".timeline-milestone");
    const line = lineRef.current;

    // Animate SVG line drawing on scroll
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

    // Illuminate milestones as they enter viewport center
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

      // Dot pulse
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
            ref={svgRef}
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

                  {/* Spacer for alternating layout */}
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

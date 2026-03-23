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
    type: "education" as const,
  },
  {
    year: "2024 – 2026",
    title: "Higher Secondary — ISC (Grades 11–12)",
    subtitle: "St. Mary's School, Mumbai",
    type: "education" as const,
  },
  {
    year: "Apr – Sep 2025",
    title: "Software Development Intern",
    subtitle: "Data Science & ML · AppPerfect Corporation",
    type: "work" as const,
  },
  {
    year: "May 2025",
    title: "IOAI Training Camp",
    subtitle: "International Olympiad of AI",
    type: "award" as const,
    detail: "Selected among Top 22 students in India",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const milestoneEls = document.querySelectorAll(".timeline-milestone");

    milestoneEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[var(--bg-secondary)]"
    >
      <div className="section-container">
        {/* Heading */}
        <div className="mb-16">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Experience
          </h2>
        </div>

        {/* Timeline with left border */}
        <div className="relative max-w-[780px] mx-auto pl-8 border-l-2 border-[var(--border)]">
          <div className="flex flex-col gap-10">
            {milestones.map((m, i) => {
              const isFilled = m.type === "work" || m.type === "award";

              return (
                <div
                  key={i}
                  className="timeline-milestone relative"
                  style={{ opacity: 0 }}
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-[calc(2rem+5px)] top-1.5 w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isFilled ? "var(--accent)" : "var(--bg-primary)",
                      border: isFilled ? "none" : "2px solid var(--border)",
                    }}
                  />

                  {/* Year + Type */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-sans text-xs font-medium text-[var(--text-tertiary)] uppercase">
                      {m.year}
                    </span>
                    <span
                      className="font-sans text-xs font-medium px-2 py-0.5 rounded"
                      style={{
                        backgroundColor:
                          m.type === "education"
                            ? "var(--bg-tertiary)"
                            : "var(--accent-soft)",
                        color:
                          m.type === "education"
                            ? "var(--text-tertiary)"
                            : "var(--accent)",
                        fontSize: "0.7rem",
                      }}
                    >
                      {m.type}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-semibold text-[var(--text-primary)] text-lg mb-1">
                    {m.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="font-sans text-[var(--text-secondary)] text-sm">
                    {m.subtitle}
                  </p>

                  {/* Optional detail */}
                  {m.detail && (
                    <p className="font-sans text-[var(--text-secondary)] text-sm mt-1">
                      {m.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

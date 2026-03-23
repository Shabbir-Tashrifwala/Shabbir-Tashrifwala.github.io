"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    heading: "Languages",
    skills: ["Python", "C++", "Java", "C"],
  },
  {
    heading: "Frameworks",
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "NumPy / pandas"],
  },
  {
    heading: "Tools",
    skills: ["Jupyter / Colab", "Git / GitHub", "FastAPI"],
  },
  {
    heading: "Core Concepts",
    skills: [
      "Data Structures & Algorithms",
      "Standard Template Library (STL)",
      "Computer Vision",
      "Deep Learning",
      "Adversarial ML",
      "Survival Analysis",
      "3D Pose Estimation",
      "Batch Processing",
      "REST APIs",
    ],
  },
];

export default function Skills() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="skills" className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="section-container">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Skills
          </h2>
        </div>

        {/* Skill groups */}
        <div className="max-w-[780px] mx-auto space-y-10">
          {skillGroups.map((group) => (
            <div key={group.heading}>
              <h3 className="font-sans font-semibold text-[var(--text-primary)] text-base mb-4">
                {group.heading}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-sans text-sm text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-md px-3.5 py-1.5"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

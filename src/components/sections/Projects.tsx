"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Adversarially Robust Deepfake Detection",
    tags: ["PyTorch", "Computer Vision", "Adversarial ML", "Python"],
    description:
      "Built an adversarially-trained deepfake detector robust to manipulation attacks, maintaining high accuracy on both clean and adversarially-modified videos by focusing on natural facial features.",
    href: "/projects/Deepfake-detection-html-1.html",
  },
  {
    id: 2,
    title: "ASL Fingerspelling to Text",
    tags: ["TensorFlow", "3D Pose Tracking", "Neural Networks", "OpenCV"],
    description:
      "ASL fingerspelling-to-text system using 3D pose tracking and neural networks to automatically translate hand gestures into written English with real-time inference.",
    href: "/projects/ASL-fingerspelling-text.html",
  },
  {
    id: 3,
    title: "Churn Prevention via Survival Analysis",
    tags: ["Scikit-learn", "Survival Analysis", "FastAPI", "Python"],
    description:
      "Built a churn prediction system that forecasts both which customers will leave and when, generating personalized retention recommendations through daily batch processing and real-time API.",
    href: "/projects/churn-prevention.html",
  },
];

export default function Projects() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card-trigger");

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

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
    <section id="projects" className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="section-container">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Projects
          </h2>
        </div>

        {/* Cards - vertical stack */}
        <div className="flex flex-col gap-6 max-w-[780px] mx-auto">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              className="project-card-trigger block bg-[var(--bg-secondary)] border border-[var(--border-light)] rounded-xl p-8 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-200 group"
              style={{ opacity: 0 }}
            >
              {/* Title */}
              <h3 className="font-serif font-semibold text-[var(--text-primary)] text-xl mb-3 leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-[var(--text-secondary)] text-[0.95rem] leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs font-medium px-2.5 py-1 rounded bg-[var(--accent-soft)] text-[var(--accent)]"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <span className="inline-flex items-center gap-1 font-sans text-sm font-medium text-[var(--accent)] group-hover:text-[var(--accent-hover)]">
                Read Case Study{" "}
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-200">
                  &rarr;
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

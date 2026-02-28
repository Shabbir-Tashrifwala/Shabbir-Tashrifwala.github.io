"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
    accent: "#00F0FF",
    icon: "◈",
    stat: "Top-tier robustness",
    href: "/projects/Deepfake-detection-html-1.html",
  },
  {
    id: 2,
    title: "ASL Fingerspelling to Text",
    tags: ["TensorFlow", "3D Pose Tracking", "Neural Networks", "OpenCV"],
    description:
      "ASL fingerspelling-to-text system using 3D pose tracking and neural networks to automatically translate hand gestures into written English with real-time inference.",
    accent: "#00F0FF",
    icon: "◉",
    stat: "Real-time inference",
    href: "/projects/ASL-fingerspelling-text.html",
  },
  {
    id: 3,
    title: "Churn Prevention via Survival Analysis",
    tags: ["Scikit-learn", "Survival Analysis", "FastAPI", "Python"],
    description:
      "Built a churn prediction system that forecasts both which customers will leave and when, generating personalized retention recommendations through daily batch processing and real-time API.",
    accent: "#00F0FF",
    icon: "◎",
    stat: "Predictive analytics",
    href: "/projects/churn-prevention.html",
  },
];

// ── 3D Tilt Card ─────────────────────────────────────────────────────────────
function TiltCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      data-card-index={index}
      className="project-card-trigger"
      style={{
        perspective: 1000,
        opacity: 0,
        transform: "translateY(60px) scale(0.95)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full rounded-sm overflow-hidden group"
      >
        {/* Clickable card body */}
        <a
          href={project.href}
          className="block relative h-full glass p-6 flex flex-col gap-4 border border-cyber-teal/10 group-hover:border-cyber-teal/40 transition-all duration-500 cursor-pointer"
          style={{
            background: "rgba(10, 22, 40, 0.7)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Dynamic glow that follows mouse */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([lx, ly]) =>
                  `radial-gradient(circle at ${lx}% ${ly}%, rgba(0,240,255,0.06) 0%, transparent 60%)`
              ),
            }}
          />

          {/* Icon + stat header */}
          <div className="flex items-center justify-between">
            <span
              className="text-3xl"
              style={{ color: "rgba(0,240,255,0.3)", filter: "drop-shadow(0 0 8px rgba(0,240,255,0.4))" }}
            >
              {project.icon}
            </span>
            <span className="font-mono text-cyber-teal/50 text-xs tracking-widest uppercase">
              {project.stat}
            </span>
          </div>

          {/* Header */}
          <div>
            <h3 className="text-white font-bold text-base leading-tight group-hover:text-cyber-teal transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed flex-1">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-1 rounded-sm text-cyber-teal/70 border border-cyber-teal/15 bg-cyber-teal/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View project link indicator */}
          <div className="flex items-center gap-2 pt-1 border-t border-cyber-teal/10 group-hover:border-cyber-teal/30 transition-colors duration-300">
            <span className="font-mono text-xs text-cyber-teal/50 group-hover:text-cyber-teal transition-colors duration-300 tracking-widest uppercase">
              View project
            </span>
            <span className="text-cyber-teal/40 group-hover:text-cyber-teal group-hover:translate-x-1 transition-all duration-300 text-xs">
              →
            </span>
          </div>

          {/* Bottom accent bar */}
          <div
            className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
            style={{ background: "linear-gradient(90deg, transparent, #00F0FF, transparent)" }}
          />
        </a>
      </motion.div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".project-card-trigger");

    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        delay: i * 0.15,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          once: true,
        },
      });
    });

    if (headingRef.current) {
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 bg-cyber-navy overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <div className="flex items-center gap-4 mb-3">
            <span className="h-px w-12 bg-cyber-teal/40" />
            <span className="font-mono text-cyber-teal text-xs tracking-[0.3em] uppercase">
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Projects<span className="text-cyber-teal">.</span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <TiltCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

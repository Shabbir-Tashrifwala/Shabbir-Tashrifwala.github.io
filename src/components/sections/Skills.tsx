"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  // Languages
  { name: "Python", level: 92, category: "Languages" },
  { name: "C++", level: 85, category: "Languages" },
  { name: "Java", level: 70, category: "Languages" },
  { name: "C", level: 75, category: "Languages" },
  // Frameworks
  { name: "PyTorch", level: 88, category: "Frameworks" },
  { name: "TensorFlow", level: 82, category: "Frameworks" },
  { name: "scikit-learn", level: 85, category: "Frameworks" },
  { name: "OpenCV", level: 78, category: "Frameworks" },
  { name: "NumPy / pandas", level: 90, category: "Frameworks" },
  // Tools
  { name: "Jupyter / Colab", level: 90, category: "Tools" },
  { name: "Git / GitHub", level: 80, category: "Tools" },
  { name: "FastAPI", level: 72, category: "Tools" },
];

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function SkillRing({
  skill,
  idx,
}: {
  skill: (typeof skills)[0];
  idx: number;
}) {
  const progressRef = useRef<SVGCircleElement>(null);
  const labelRef = useRef<SVGTextElement>(null);
  const triggered = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;

        const offset = CIRCUMFERENCE - (skill.level / 100) * CIRCUMFERENCE;
        gsap.to(progressRef.current, {
          strokeDashoffset: offset,
          duration: 1.5,
          delay: idx * 0.08,
          ease: "power2.out",
        });

        // Count up number
        const obj = { val: 0 };
        gsap.to(obj, {
          val: skill.level,
          duration: 1.5,
          delay: idx * 0.08,
          ease: "power2.out",
          onUpdate() {
            if (labelRef.current) {
              labelRef.current.textContent = `${Math.round(obj.val)}%`;
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [skill.level, idx]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.07, duration: 0.5 }}
      className="flex flex-col items-center gap-3 group"
      data-cursor-hover
    >
      <div className="relative">
        <svg width="100" height="100" viewBox="0 0 100 100" className="-rotate-90">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="rgba(0,240,255,0.08)"
            strokeWidth="4"
          />
          {/* Progress */}
          <circle
            ref={progressRef}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="#00F0FF"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            style={{ filter: "drop-shadow(0 0 4px rgba(0,240,255,0.6))" }}
          />
        </svg>

        {/* Center label */}
        <svg
          className="absolute inset-0"
          width="100"
          height="100"
          viewBox="0 0 100 100"
        >
          <text
            ref={labelRef}
            x="50"
            y="54"
            textAnchor="middle"
            className="fill-cyber-teal font-mono text-xs font-bold"
            fontSize="12"
            fill="#00F0FF"
          >
            0%
          </text>
        </svg>
      </div>

      <span className="font-mono text-xs text-slate-300 text-center tracking-wide group-hover:text-cyber-teal transition-colors duration-300">
        {skill.name}
      </span>
    </motion.div>
  );
}

const categories = ["Languages", "Frameworks", "Tools"];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-32 bg-cyber-navy overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />

      {/* Glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Heading */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-3">
            <span className="h-px w-12 bg-cyber-teal/40" />
            <span className="font-mono text-cyber-teal text-xs tracking-[0.3em] uppercase">
              Tech Stack
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            Skills<span className="text-cyber-teal">.</span>
          </h2>
        </div>

        {/* Categories */}
        {categories.map((cat) => (
          <div key={cat} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-mono text-sm text-slate-400 tracking-widest uppercase">
                {cat}
              </h3>
              <div className="h-px flex-1 bg-cyber-teal/10" />
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
              {skills
                .filter((s) => s.category === cat)
                .map((skill, idx) => (
                  <SkillRing key={skill.name} skill={skill} idx={idx} />
                ))}
            </div>
          </div>
        ))}

        {/* Core concepts strip */}
        <div className="mt-4 pt-12 border-t border-cyber-teal/10">
          <h3 className="font-mono text-sm text-slate-400 tracking-widest uppercase mb-6">
            Core Concepts
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Data Structures & Algorithms",
              "Standard Template Library (STL)",
              "Computer Vision",
              "Deep Learning",
              "Adversarial ML",
              "Survival Analysis",
              "3D Pose Estimation",
              "Batch Processing",
              "REST APIs",
            ].map((concept) => (
              <motion.span
                key={concept}
                whileHover={{ scale: 1.05, borderColor: "rgba(0,240,255,0.5)" }}
                className="font-mono text-xs px-3 py-1.5 border border-cyber-teal/15 text-slate-400 rounded-sm bg-cyber-teal/5 cursor-default transition-colors duration-200 hover:text-cyber-teal"
              >
                {concept}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

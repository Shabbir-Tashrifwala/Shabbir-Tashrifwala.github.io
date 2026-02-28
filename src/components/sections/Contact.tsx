"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type State = "idle" | "loading" | "success" | "error";

function FloatingInput({
  label,
  type = "text",
  name,
  required,
  multiline,
}: {
  label: string;
  type?: string;
  name: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const sharedProps = {
    name,
    required,
    onFocus: () => setFocused(true),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false);
      setHasValue(e.target.value.length > 0);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setHasValue(e.target.value.length > 0),
    className: `
      w-full bg-transparent border-b font-mono text-sm text-white pt-6 pb-2 px-0
      outline-none transition-all duration-300
      ${focused
        ? "border-cyber-teal"
        : "border-slate-700 hover:border-slate-500"
      }
    `,
    style: focused
      ? { boxShadow: "0 2px 0 0 rgba(0,240,255,0.4)" }
      : undefined,
  };

  return (
    <div className="relative group">
      {multiline ? (
        <textarea
          {...sharedProps}
          rows={4}
          className={sharedProps.className + " resize-none"}
          style={sharedProps.style}
        />
      ) : (
        <input type={type} {...sharedProps} />
      )}

      {/* Floating label */}
      <label
        className={`
          absolute left-0 font-mono text-xs tracking-widest uppercase transition-all duration-200 pointer-events-none
          ${focused || hasValue
            ? "top-0 text-cyber-teal scale-90 origin-left"
            : "top-6 text-slate-500"
          }
        `}
      >
        {label}
      </label>

      {/* Focus underline glow */}
      <AnimatePresence>
        {focused && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            className="absolute bottom-0 left-0 right-0 h-px bg-cyber-teal origin-left"
            style={{ boxShadow: "0 0 8px rgba(0,240,255,0.6)" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const [state, setState] = useState<State>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");

    // Simulate send (replace with real form handler / Formspree)
    await new Promise((res) => setTimeout(res, 1800));
    setState("success");

    setTimeout(() => {
      setState("idle");
      formRef.current?.reset();
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-cyber-navy-light overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Glow blobs */}
      <div
        className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="h-px w-12 bg-cyber-teal/40" />
              <span className="font-mono text-cyber-teal text-xs tracking-[0.3em] uppercase">
                Let&apos;s Talk
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Get In Touch<span className="text-cyber-teal">.</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Whether it&apos;s a project collab, research opportunity, or you just want to nerd
              out about AI — reach out.
            </p>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-6 mb-12"
          >
            {[
              { label: "Email", value: "shabbir@tashrifwala.com", href: "mailto:shabbir@tashrifwala.com" },
              { label: "Phone", value: "+91-9137433985", href: "tel:+919137433985" },
              { label: "Web", value: "tashrifwala.com", href: "https://www.tashrifwala.com" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex flex-col gap-1"
              >
                <span className="font-mono text-xs text-slate-500 tracking-widest uppercase">
                  {item.label}
                </span>
                <span className="font-mono text-sm text-cyber-teal group-hover:underline underline-offset-4 decoration-cyber-teal/40">
                  {item.value}
                </span>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <FloatingInput label="Name" name="name" required />
              <FloatingInput label="Email" type="email" name="email" required />
            </div>
            <FloatingInput label="Subject" name="subject" />
            <FloatingInput label="Message" name="message" required multiline />

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={state === "loading" || state === "success"}
                className="relative w-full sm:w-auto px-10 py-3 font-mono text-sm tracking-widest uppercase font-bold overflow-hidden group transition-all duration-300"
                style={{
                  background: state === "success" ? "rgba(0,240,255,0.1)" : "transparent",
                  border: "1px solid rgba(0,240,255,0.5)",
                  color: "#00F0FF",
                  boxShadow: state !== "idle" ? "0 0 20px rgba(0,240,255,0.2)" : "none",
                }}
              >
                {/* Hover fill */}
                <span
                  className="absolute inset-0 bg-cyber-teal translate-y-full group-hover:translate-y-0 transition-transform duration-300 group-disabled:hidden"
                  aria-hidden
                />

                <span className="relative z-10 group-hover:text-cyber-navy transition-colors duration-300 flex items-center justify-center gap-3">
                  <AnimatePresence mode="wait">
                    {state === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Send Message
                      </motion.span>
                    )}
                    {state === "loading" && (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                          />
                        </svg>
                        Transmitting...
                      </motion.span>
                    )}
                    {state === "success" && (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Message Sent
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </div>
          </motion.form>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 pt-8 border-t border-cyber-teal/10 text-center"
          >
            <p className="font-mono text-xs text-slate-600 tracking-widest">
              Built with Next.js · Three.js · GSAP · Framer Motion
            </p>
            <p className="font-mono text-xs text-slate-700 mt-1">
              © {new Date().getFullYear()} Shabbir Tashrifwala
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

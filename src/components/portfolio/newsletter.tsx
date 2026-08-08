import { motion } from "framer-motion";
import { useState } from "react";
import { SectionLabel } from "./about";

type FormState = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMsg("Please enter a valid email address.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setState("success");
        setEmail("");
      } else {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong relative overflow-hidden rounded-3xl px-8 py-12 md:px-14 md:py-16"
        >
          {/* Ambient orb */}
          <div
            className="absolute -left-20 -top-20 size-72 rounded-full bg-primary opacity-10 blur-3xl"
            aria-hidden
          />

          <div className="relative max-w-xl">
            <SectionLabel>The UGG Letter</SectionLabel>

            <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Build better.{" "}
              <span className="text-gradient">Operate smarter.</span>
            </h2>

            <p className="mt-4 text-muted-foreground">
              Occasional insights on AI, customer support, e-commerce automation,
              and building businesses with intention.
            </p>

            {state === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                <p className="font-display text-lg font-semibold text-foreground">
                  You're on the list.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We'll only send something when it's worth your inbox.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8" noValidate>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      placeholder="Your email address"
                      disabled={state === "loading"}
                      aria-label="Email address"
                      className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/50 focus:bg-white/[0.06] disabled:opacity-50"
                    />
                    {state === "error" && errorMsg && (
                      <p className="mt-2 px-2 text-xs text-muted-foreground">
                        {errorMsg}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {state === "loading" ? (
                      <>
                        <span className="size-3.5 animate-spin rounded-full border-2 border-background/30 border-t-background" />
                        Subscribing…
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>

                <p className="mt-4 px-1 text-xs text-muted-foreground/60">
                  No noise. No spam. Just useful insights, when they're worth sending.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

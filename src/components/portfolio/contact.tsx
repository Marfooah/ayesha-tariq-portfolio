import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionLabel } from "./about";

export function FinalCTAContent({
  auditUrl,
  socialProof,
}: {
  auditUrl?: string;
  socialProof?: string;
}) {
  return (
    <div className="relative">
      <SectionLabel>Start Here</SectionLabel>
      <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl md:text-5xl max-w-3xl mx-auto">
        Better support isn't built by{" "}
        <span className="text-gradient">hiring faster.</span>
      </h2>
      <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
        It's built by designing better systems. Request an Operations Assessment and we'll map
        exactly where your support operation can improve.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4">
        {auditUrl ? (
          <a
            href={auditUrl}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
          >
            Request an Operations Assessment
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        ) : (
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-semibold text-background opacity-40 cursor-not-allowed"
          >
            Request an Operations Assessment
            <ArrowRight className="size-4" />
          </button>
        )}
        {socialProof && (
          <span className="glass rounded-full px-3 py-1 text-xs text-muted-foreground">
            {socialProof}
          </span>
        )}
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14 text-center"
        >
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary opacity-20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-24 -left-10 size-72 rounded-full bg-emerald opacity-20 blur-3xl" aria-hidden />
          <FinalCTAContent auditUrl={SITE.auditUrl} socialProof={SITE.socialProof} />
        </motion.div>
      </div>
    </section>
  );
}

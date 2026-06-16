import { useState } from "react";
import { toast } from "sonner";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionLabel } from "./about";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const subject = encodeURIComponent(`Portfolio inquiry — ${name}`);
    const body = encodeURIComponent(
      `${fd.get("message")}\n\nFrom: ${name} <${fd.get("email")}>`,
    );
    setSending(true);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
      form.reset();
    }, 400);
  };

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-8 md:p-14">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary opacity-20 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 size-72 rounded-full bg-emerald opacity-20 blur-3xl" />

          <div className="relative grid gap-12 md:grid-cols-2">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                Let's build the <span className="text-gradient">next system</span>.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Open to AI engineering roles, contract work, and collaborations on
                ambitious ML products.
              </p>

              <ul className="mt-8 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-primary" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="size-4 text-primary" />
                  <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary">
                    linkedin.com/in/ayeshxtariq
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Github className="size-4 text-primary" />
                  <a href={SITE.github} target="_blank" rel="noreferrer" className="hover:text-primary">
                    github.com/{SITE.githubUser}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-4 text-primary" /> {SITE.location}
                </li>
              </ul>
            </div>

            <form onSubmit={onSubmit} className="grid gap-3">
              <Field name="name" label="Name" placeholder="Your name" />
              <Field name="email" label="Email" type="email" placeholder="you@company.com" />
              <Field
                name="message"
                label="Message"
                placeholder="Tell me about the project…"
                multiline
              />
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                <Send className="size-4" /> {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name, label, placeholder, type = "text", multiline,
}: { name: string; label: string; placeholder?: string; type?: string; multiline?: boolean }) {
  const cls =
    "mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/30";
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      {multiline ? (
        <textarea name={name} required placeholder={placeholder} rows={5} className={cls} />
      ) : (
        <input name={name} required placeholder={placeholder} type={type} className={cls} />
      )}
    </label>
  );
}
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { content, profile } from "@/data";
import { SectionHeading } from "./About";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "At least 10 characters").max(1000),
});

const ICONS = { Mail, Github, Linkedin, Twitter } as const;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? content.contact.form.invalidInputMessage);
      return;
    }
    setSending(true);
    const body = `Hi ${profile.name},%0D%0A%0D%0A${encodeURIComponent(parsed.data.message)}%0D%0A%0D%0A— ${encodeURIComponent(parsed.data.name)} (${encodeURIComponent(parsed.data.email)})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio inquiry from ${parsed.data.name}`)}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success(content.contact.form.successMessage);
    }, 400);
  }

  const introParts = content.contact.intro.split(content.contact.highlight);

  return (
    <section id="contact" className="relative py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <SectionHeading kicker={content.contact.kicker} title={content.contact.title} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass space-y-5 rounded-3xl p-6"
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              {introParts[0]}
              <span className="text-foreground">{content.contact.highlight}</span>
              {introParts[1] ?? ""}
            </p>
            <div className="space-y-3 pt-2">
              {content.contact.links.map((contact) => {
                const Icon = ICONS[contact.icon as keyof typeof ICONS] ?? Mail;
                const href = profile.socials[contact.key as keyof typeof profile.socials] || "#";
                const label = contact.key === "email" ? profile.email : contact.label;

                return (
                  <a
                    key={contact.key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-glass-border bg-surface/5 px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4 text-aurora-cyan" />
                    <span className="truncate">{label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={submit}
            className="glass space-y-4 rounded-3xl p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label={content.contact.form.nameLabel}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                placeholder={content.contact.form.namePlaceholder}
              />
              <Field
                label={content.contact.form.emailLabel}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                placeholder={content.contact.form.emailPlaceholder}
              />
            </div>
            <div>
              <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {content.contact.form.messageLabel}
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={content.contact.form.messagePlaceholder}
                className="w-full resize-none rounded-xl border border-glass-border bg-surface/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-aurora-cyan/50 focus:bg-surface/10"
              />
            </div>
            <button
              disabled={sending}
              className="group inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {sending ? content.contact.form.sendingLabel : content.contact.form.submitLabel}
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-3 border-t border-glass-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <div>
            © {new Date().getFullYear()} {profile.name}. {content.contact.footer.builtWithCare}
          </div>
          <div className="font-mono">
            {content.contact.footer.craftedIn.replace("{location}", profile.location)}
          </div>
        </footer>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-glass-border bg-surface/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-aurora-cyan/50 focus:bg-surface/10"
      />
    </div>
  );
}

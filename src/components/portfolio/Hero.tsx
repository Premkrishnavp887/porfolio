import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import avatar from "@/assets/hero-avatar.jpg";
import { content, profile } from "@/data";

function Typer({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    const speed = deleting ? 45 : 85;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="text-aurora font-display">
      {text}
      <span className="caret h-[0.9em] translate-y-[0.1em]" />
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div
        className="aurora-blob h-[420px] w-[420px] left-[-120px] top-[10%]"
        style={{ background: "var(--aurora-violet)" }}
      />
      <div
        className="aurora-blob h-[360px] w-[360px] right-[-80px] top-[20%]"
        style={{ background: "var(--aurora-cyan)", animationDelay: "-4s" }}
      />

      <div className="container relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground"
          >
            <Sparkles className="h-3.5 w-3.5 text-aurora-cyan" />
            {content.hero.banner}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {content.hero.introPrefix}
            <span className="text-gradient">{profile.name.split(" ")[0]}</span>.
            <br />
            <span className="text-muted-foreground/90">{content.hero.roleIntro} </span>
            <Typer words={profile.roles} />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.tagline} {content.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-aurora px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
            >
              {content.hero.ctas.projects}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resumeUrl}
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface/15"
            >
              <Download className="h-4 w-4" /> {content.hero.ctas.resume}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" /> {content.hero.ctas.contact}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <span>Place: {profile.location}</span>
              <span className="text-muted-foreground/40">•</span>
              <span>Current Status: {content.hero.statusText}</span>
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-aurora opacity-30 blur-2xl" />
          <div className="glass-strong relative overflow-hidden rounded-[1.75rem] p-2">
            <img
              src={avatar}
              alt={`Avatar of ${profile.name}`}
              width={1024}
              height={1024}
              className="floaty h-auto w-full rounded-[1.4rem] object-cover"
            />
            <div className="pointer-events-none absolute inset-2 rounded-[1.4rem] ring-1 ring-inset ring-white/10" />
          </div>
          <div className="glass mt-3 grid grid-cols-3 gap-2 rounded-2xl p-2 text-center text-[10px] font-mono text-muted-foreground">
            <div>
              <div className="text-aurora-cyan text-sm font-semibold">
                {profile.stats[0]?.value ?? 2}
              </div>
              projects
            </div>
            <div>
              <div className="text-aurora-violet text-sm font-semibold">
                {profile.stats[2]?.value ?? 9}
              </div>
              certifications
            </div>
            <div>
              <div className="text-aurora-pink text-sm font-semibold">
                {profile.stats[3]?.value ?? 3}
              </div>
              internships
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

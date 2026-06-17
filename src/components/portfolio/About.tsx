import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Target } from "lucide-react";
import { content, profile } from "@/data";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n.toLocaleString()}</span>;
}

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading kicker={content.about.kicker} title={content.about.title} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="glass card-glow-hover rounded-3xl p-8 lg:col-span-2"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">{profile.summary}</p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-glass-border bg-surface/5 p-4 text-sm text-muted-foreground">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-aurora-cyan" />
              <span>
                <span className="text-foreground">{content.about.careerGoalPrefix}</span>
                {profile.goals}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-aurora-violet" />
              {content.about.educationLabel}
            </div>
            <ol className="relative space-y-5 border-l border-glass-border pl-5">
              {profile.education.map((e) => (
                <li key={e.school} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-aurora" />
                  <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {e.period}
                  </div>
                  <div className="mt-0.5 font-medium">{e.school}</div>
                  <div className="text-sm text-muted-foreground">{e.degree}</div>
                  <div className="mt-1 text-xs text-muted-foreground/80">{e.detail}</div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {profile.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass card-glow-hover rounded-2xl p-5"
            >
              <div className="text-4xl font-semibold tracking-tight text-gradient font-display">
                <Counter to={s.value} />
                {s.value >= 1000 ? "" : "+"}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  align = "left",
}: {
  kicker: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-aurora-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-aurora-cyan" /> {kicker}
      </div>
      <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </div>
  );
}

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { content, projects } from "@/data";
import { SectionHeading } from "./About";
import { PROJECT_ACCENT_GRADIENTS, PROJECT_STATUS_STYLES } from "@/config/projectConfig";
import { DURATIONS, EASE, SPRINGS } from "@/config/animationConfig";

export function Projects() {
  const FILTERS = content.projects.filters;
  const [filter, setFilter] = useState<string>(FILTERS[0]);

  const filtered = useMemo(
    () => (filter === FILTERS[0] ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter, FILTERS],
  );

  return (
    <section id="projects" className="relative py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading kicker={content.projects.kicker} title={content.projects.title} />
          <div className="glass inline-flex flex-wrap items-center gap-1 rounded-full p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full px-3 py-1.5 text-xs transition-colors ${
                  filter === f ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-aurora"
                    transition={SPRINGS.FILTER_PILL}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: DURATIONS.MEDIUM, ease: EASE }}
                whileHover={{ y: -4 }}
                className="glass card-glow group relative overflow-hidden rounded-3xl p-1 text-left"
              >
                <ProjectThumb accent={p.accent} title={p.title} />
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                    <StatusBadge status={p.status} />
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-glass-border bg-surface/10 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="inline-flex rounded-full bg-aurora px-4 py-2 text-sm font-semibold text-background transition hover:bg-aurora/90"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectThumb({ title, accent }: { title: string; accent: string }) {
  const map = PROJECT_ACCENT_GRADIENTS;
  return (
    <div
      className={`relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br ${map[accent] ?? map.cyan}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, oklch(1 0 0 / 0.15), transparent 40%), radial-gradient(circle at 80% 70%, oklch(1 0 0 / 0.08), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-3xl font-semibold tracking-tight text-foreground/90 mix-blend-overlay">
          {title}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone = PROJECT_STATUS_STYLES as Record<string, string>;
  return (
    <span
      className={`whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10px] ${
        tone[status] ?? "bg-surface/15 text-muted-foreground border-surface/30"
      }`}
    >
      {status}
    </span>
  );
}

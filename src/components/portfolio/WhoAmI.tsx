import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Cloud, Code2, Cpu, Puzzle, Rocket, Shield, Workflow } from "lucide-react";
import { content, interests } from "@/data";
import { SectionHeading } from "./About";

const ICONS = { Workflow, Brain, Cloud, Shield, Puzzle, Rocket, Cpu, Code2 } as const;

export function WhoAmI() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % interests.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="who" className="relative py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <SectionHeading kicker={content.whoami.kicker} title={content.whoami.title} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative h-[280px]">
            <AnimatePresence mode="wait">
              {interests.map((it, idx) =>
                idx === i ? (
                  <motion.div
                    key={it.title}
                    initial={{ opacity: 0, y: 30, rotateX: -10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -30, rotateX: 10 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-strong absolute inset-0 flex flex-col justify-between rounded-3xl p-8"
                  >
                    <div>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-aurora text-background">
                        {(() => {
                          const Icon = ICONS[it.icon as keyof typeof ICONS] ?? Rocket;
                          return <Icon className="h-6 w-6" />;
                        })()}
                      </div>
                      <h3 className="mt-5 font-display text-3xl font-semibold tracking-tight">
                        {it.title}
                      </h3>
                      <p className="mt-3 text-base text-muted-foreground">{it.blurb}</p>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                      <span className="text-aurora-cyan">0{idx + 1}</span> / 0{interests.length}
                    </div>
                  </motion.div>
                ) : null,
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {interests.map((it, idx) => {
              const Icon = ICONS[it.icon as keyof typeof ICONS] ?? Rocket;
              const active = idx === i;
              return (
                <button
                  key={it.title}
                  onClick={() => setI(idx)}
                  className={`group relative overflow-hidden rounded-2xl p-4 text-left transition-all ${
                    active ? "glass-strong" : "glass hover:bg-surface/15"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="who-active"
                      className="absolute inset-0 rounded-2xl ring-1 ring-aurora-cyan/40"
                    />
                  )}
                  <Icon
                    className={`h-5 w-5 ${active ? "text-aurora-cyan" : "text-muted-foreground"}`}
                  />
                  <div className="mt-3 text-sm font-medium">{it.title}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

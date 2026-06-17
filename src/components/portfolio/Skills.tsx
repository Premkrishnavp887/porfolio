import { motion } from "framer-motion";
import { Cloud, Code2, Database, Layers } from "lucide-react";
import { content, skills } from "@/data";
import { SectionHeading } from "./About";

const ICONS = { Code2, Layers, Cloud, Database } as const;

export function Skills() {
  return (
    <section id="skills" className="relative py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading kicker={content.skills.kicker} title={content.skills.title} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {skills.map((cat, idx) => {
            const Icon = ICONS[cat.icon as keyof typeof ICONS] ?? Code2;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="glass card-glow-hover group relative overflow-hidden rounded-3xl p-6"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-aurora opacity-20 blur-3xl transition-opacity group-hover:opacity-40" />
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl glass">
                    <Icon className="h-5 w-5 text-aurora-cyan" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{cat.category}</h3>
                    <p className="text-xs text-muted-foreground">
                      {cat.items.length} {content.skills.skillCountSuffix}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {cat.items.map((it) => (
                    <li key={it.name}>
                      <div className="mb-1.5 flex items-baseline justify-between text-sm">
                        <span className="text-foreground">{it.name}</span>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {it.level}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface/15">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${it.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-aurora"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

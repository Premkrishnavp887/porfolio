import { motion } from "framer-motion";
import { content, experience } from "@/data";
import { SectionHeading } from "./About";
import { EXPERIENCE_TYPE_TONE } from "@/config/projectConfig";
import { DURATIONS, INTERVALS, EASE } from "@/config/animationConfig";

export function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="container mx-auto max-w-5xl px-6">
        <SectionHeading kicker={content.experience.kicker} title={content.experience.title} />

        <ol className="relative mt-14 border-l border-glass-border pl-6 sm:pl-8">
          {experience.map((e, i) => (
            <motion.li
              key={e.role + e.org}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: DURATIONS.MEDIUM_SLOW,
                delay: i * INTERVALS.SMALL,
                ease: EASE,
              }}
              className="relative mb-6 last:mb-0"
            >
              <span className="absolute -left-[33px] sm:-left-[41px] top-5 h-3 w-3 rounded-full bg-aurora ring-4 ring-background" />
              <div className="glass card-glow-hover rounded-2xl p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div
                      className={`font-mono text-[11px] uppercase tracking-wider ${EXPERIENCE_TYPE_TONE[e.type as keyof typeof EXPERIENCE_TYPE_TONE] ?? "text-muted-foreground"}`}
                    >
                      {e.type}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
                      {e.role} <span className="text-muted-foreground">· {e.org}</span>
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

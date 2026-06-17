import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import { achievements, content } from "@/data";
import { SectionHeading } from "./About";
import { ACHIEVEMENT_TYPE_ICON } from "@/config/projectConfig";
import { DURATIONS, INTERVALS, EASE } from "@/config/animationConfig";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading kicker={content.achievements.kicker} title={content.achievements.title} />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon =
              ACHIEVEMENT_TYPE_ICON[a.type as keyof typeof ACHIEVEMENT_TYPE_ICON] ?? Award;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: DURATIONS.MEDIUM, delay: i * INTERVALS.TINY, ease: EASE }}
                className="glass card-glow-hover flex items-start gap-3 rounded-2xl p-5"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl glass">
                  <Icon className="h-4 w-4 text-aurora-cyan" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {a.type} · {a.year}
                  </div>
                  <div className="mt-0.5 text-sm font-medium leading-snug text-foreground">
                    {a.title}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

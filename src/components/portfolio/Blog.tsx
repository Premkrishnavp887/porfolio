import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { content, posts } from "@/data";
import { SectionHeading } from "./About";

export function Blog() {
  return (
    <section id="blog" className="relative py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading kicker={content.blog.kicker} title={content.blog.title} />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {posts.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.url ?? "#"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass card-glow-hover group flex flex-col justify-between gap-6 rounded-3xl p-6"
            >
              <div>
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  <span className="rounded-full bg-surface/15 px-2 py-0.5 text-aurora-cyan">
                    {p.tag}
                  </span>
                  <span>{p.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {p.readTime}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-sm text-aurora-cyan">
                {content.blog.readLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

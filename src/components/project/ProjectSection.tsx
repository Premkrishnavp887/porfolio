import type { ReactNode } from "react";

export function ProjectSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-surface/80 p-8 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.75)]">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-6 space-y-6 text-sm leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

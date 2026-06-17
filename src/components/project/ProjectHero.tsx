import { ExternalLink, Github } from "lucide-react";
import { content } from "@/data";
import { PROJECT_ACCENT_GRADIENTS } from "@/config/projectConfig";
import type { Project } from "@/types/project";

function ProjectStatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-surface/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
      {status}
    </span>
  );
}

export function ProjectHero({ project }: { project: Project }) {
  const heroImage = project.screenshots?.[0];

  return (
    <section className="glass relative overflow-hidden rounded-[2rem] border border-white/10 bg-background/80 p-8 shadow-2xl shadow-black/10">
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <ProjectStatusBadge status={project.status} />
            <span className="rounded-full border border-white/10 bg-surface/90 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {project.accent}
            </span>
          </div>

          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
              {project.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {content.projects.modal.stackLabel}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-glass-border bg-background/80 px-3 py-1 text-[11px] text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950/90 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-900"
              >
                <Github className="h-4 w-4" />
                {content.projects.modal.sourceLabel}
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-aurora px-4 py-3 text-sm font-medium text-background transition hover:bg-aurora/90"
              >
                <ExternalLink className="h-4 w-4" />
                {content.projects.modal.demoLabel}
              </a>
            )}
          </div>
        </div>

        {heroImage ? (
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 p-0 shadow-xl shadow-slate-950/25">
            <img src={heroImage.src} alt={heroImage.alt} className="h-full w-full object-cover" />
            {heroImage.caption ? (
              <div className="border-t border-white/10 bg-surface/90 px-5 py-4 text-sm text-muted-foreground">
                {heroImage.caption}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

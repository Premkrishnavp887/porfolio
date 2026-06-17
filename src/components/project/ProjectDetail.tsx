import { Link } from "@tanstack/react-router";
import { content } from "@/data";
import { ProjectArchitecture } from "@/components/project/ProjectArchitecture";
import { ProjectFeatures } from "@/components/project/ProjectFeatures";
import { ProjectFuture } from "@/components/project/ProjectFuture";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectLearnings } from "@/components/project/ProjectLearnings";
import { ProjectOverview } from "@/components/project/ProjectOverview";
import { ProjectProblem } from "@/components/project/ProjectProblem";
import { ProjectScreenshots } from "@/components/project/ProjectScreenshots";
import { ProjectSolution } from "@/components/project/ProjectSolution";
import { ProjectChallenges } from "@/components/project/ProjectChallenges";
import type { Project } from "@/types/project";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-6xl px-6 py-24">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
        >
          {content.projects.detail.backLabel}
        </Link>

        <div className="space-y-10">
          <ProjectHero project={project} />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="space-y-10">
              <ProjectOverview
                overview={project.detail?.overview}
                description={project.description}
                highlights={project.detail?.highlights}
              />
              <ProjectProblem problem={project.problem} />
              <ProjectSolution solution={project.solution} />
              <ProjectArchitecture architecture={project.architecture} />
              <ProjectFeatures features={project.features} />
              <ProjectChallenges challenges={project.challenges} />
              <ProjectLearnings learnings={project.learnings} />
              <ProjectFuture futureEnhancements={project.futureEnhancements} />
              <ProjectScreenshots screenshots={project.screenshots} />
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.75)]">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {content.projects.modal.stackLabel}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
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

              <div className="rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.75)]">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Tags</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

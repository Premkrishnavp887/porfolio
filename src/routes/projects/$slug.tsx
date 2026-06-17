import { createFileRoute, Link } from "@tanstack/react-router";
import { content, getProjectBySlug } from "@/data";
import { ProjectDetail } from "@/components/project/ProjectDetail";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = getProjectBySlug(params.slug ?? "");

    return {
      meta: [
        { title: project ? `${project.title} — Projects` : "Project — Projects" },
        { name: "description", content: project?.description ?? content.meta.description },
      ],
    };
  },
  component: ProjectDetailRoute,
});

function ProjectDetailRoute() {
  const { slug } = Route.useParams();
  const project = getProjectBySlug(slug ?? "");

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24">
        <div className="glass w-full max-w-xl rounded-3xl border border-white/10 p-10 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            {content.projects.detail.notFoundTitle}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {content.projects.detail.notFoundSubtitle}
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-aurora px-6 py-3 text-sm font-semibold text-background transition hover:bg-aurora/90"
          >
            {content.projects.detail.backLabel}
          </Link>
        </div>
      </main>
    );
  }

  return <ProjectDetail project={project} />;
}

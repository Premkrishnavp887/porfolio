import { content } from "@/data";
import { ProjectSection } from "./ProjectSection";
import type { ProjectArchitecture } from "@/types/project";

export function ProjectArchitecture({ architecture }: { architecture?: ProjectArchitecture }) {
  if (!architecture) {
    return null;
  }

  const hasDetails =
    architecture.overview ||
    architecture.diagram ||
    architecture.components?.length ||
    architecture.notes?.length;

  if (!hasDetails) {
    return null;
  }

  return (
    <ProjectSection title={content.projects.detail.architectureLabel}>
      {architecture.overview ? <p>{architecture.overview}</p> : null}

      {architecture.components?.length ? (
        <div>
          <p className="font-medium text-foreground">
            {content.projects.detail.architectureComponentsLabel}
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
            {architecture.components.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-aurora" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {architecture.diagram ? (
        <figure className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90">
          <img
            src={architecture.diagram}
            alt={content.projects.detail.architectureDiagramLabel}
            className="w-full object-cover"
          />
          <figcaption className="border-t border-white/10 bg-surface/90 px-4 py-3 text-sm text-muted-foreground">
            {content.projects.detail.architectureDiagramLabel}
          </figcaption>
        </figure>
      ) : null}

      {architecture.notes?.length ? (
        <div>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
            {architecture.notes.map((note) => (
              <li key={note} className="flex gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-aurora" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ProjectSection>
  );
}

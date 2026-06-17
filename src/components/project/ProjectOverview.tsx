import { content } from "@/data";
import { ProjectSection } from "./ProjectSection";

export function ProjectOverview({
  overview,
  description,
  highlights,
}: {
  overview?: string;
  description: string;
  highlights?: string[];
}) {
  if (!overview && !highlights?.length) {
    return null;
  }

  return (
    <ProjectSection title={content.projects.detail.overviewLabel}>
      {overview ? <p>{overview}</p> : <p>{description}</p>}
      {highlights?.length ? (
        <div>
          <p className="font-medium text-foreground">{content.projects.detail.highlightsLabel}</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-aurora" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ProjectSection>
  );
}

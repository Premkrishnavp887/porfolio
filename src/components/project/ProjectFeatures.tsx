import { content } from "@/data";
import { ProjectSection } from "./ProjectSection";

export function ProjectFeatures({ features }: { features?: string[] }) {
  if (!features?.length) {
    return null;
  }

  return (
    <ProjectSection title={content.projects.detail.featuresLabel}>
      <ul className="grid gap-3 text-sm leading-7 text-muted-foreground sm:grid-cols-2">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-aurora" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}

import { content } from "@/data";
import { ProjectSection } from "./ProjectSection";

export function ProjectLearnings({ learnings }: { learnings?: string[] }) {
  if (!learnings?.length) {
    return null;
  }

  return (
    <ProjectSection title={content.projects.detail.learningsLabel}>
      <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
        {learnings.map((learning) => (
          <li key={learning} className="flex gap-3">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-aurora" />
            <span>{learning}</span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}

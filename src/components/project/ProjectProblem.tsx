import { content } from "@/data";
import { ProjectSection } from "./ProjectSection";

export function ProjectProblem({ problem }: { problem?: string[] }) {
  if (!problem?.length) {
    return null;
  }

  return (
    <ProjectSection title={content.projects.detail.problemLabel}>
      <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
        {problem.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-aurora" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}

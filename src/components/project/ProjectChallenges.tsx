import { content } from "@/data";
import { ProjectSection } from "./ProjectSection";

export function ProjectChallenges({ challenges }: { challenges?: string[] }) {
  if (!challenges?.length) {
    return null;
  }

  return (
    <ProjectSection title={content.projects.detail.challengesLabel}>
      <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
        {challenges.map((challenge) => (
          <li key={challenge} className="flex gap-3">
            <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-aurora" />
            <span>{challenge}</span>
          </li>
        ))}
      </ul>
    </ProjectSection>
  );
}

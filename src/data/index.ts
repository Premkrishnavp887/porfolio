import rawProfile from "./profile.json";
import rawProjects from "./projects.json";
import rawSkills from "./skills.json";
import rawExperience from "./experience.json";
import rawAchievements from "./achievements.json";
import rawInterests from "./interests.json";
import rawPosts from "./posts.json";
import rawContent from "./content.json";
import rawGithubData from "./github.json";

import { ProfileSchema } from "@/schemas/profile.schema";
import { ProjectsSchema } from "@/schemas/project.schema";
import { SkillsSchema } from "@/schemas/skill.schema";
import { ExperienceSchema } from "@/schemas/experience.schema";
import { AchievementsSchema } from "@/schemas/achievement.schema";
import { InterestsSchema } from "@/schemas/interest.schema";
import { PostsSchema } from "@/schemas/post.schema";
import { ContentSchema } from "@/schemas/content.schema";
import { GitHubDataSchema } from "@/schemas/github.schema";

import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { SkillCategory } from "@/types/skill";
import type { ExperienceEntry } from "@/types/experience";
import type { AchievementEntry } from "@/types/achievement";
import type { InterestEntry } from "@/types/interest";
import type { PostEntry } from "@/types/post";
import type { Content } from "@/types/content";
import type {
  GitHubData,
  GitHubRepo,
  GitHubStat,
  GitHubLegend,
  LanguageColorMap,
} from "@/types/github";

export const profile: Profile = ProfileSchema.parse(rawProfile);
export const projects: Project[] = ProjectsSchema.parse(rawProjects);
export const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, Project>;
export const getProjectBySlug = (slug: string) => projectsBySlug[slug];
export const skills: SkillCategory[] = SkillsSchema.parse(rawSkills);
export const experience: ExperienceEntry[] = ExperienceSchema.parse(rawExperience);
export const achievements: AchievementEntry[] = AchievementsSchema.parse(rawAchievements);
export const interests: InterestEntry[] = InterestsSchema.parse(rawInterests);
export const posts: PostEntry[] = PostsSchema.parse(rawPosts);
export const content: Content = ContentSchema.parse(rawContent);
export const githubData: GitHubData = GitHubDataSchema.parse(rawGithubData);

export type { Profile } from "@/types/profile";
export type { Project, ProjectStatus, ProjectAccent } from "@/types/project";
export type { Skill, SkillCategory } from "@/types/skill";
export type { ExperienceEntry } from "@/types/experience";
export type { AchievementEntry } from "@/types/achievement";
export type { InterestEntry } from "@/types/interest";
export type { PostEntry } from "@/types/post";
export type { Content } from "@/types/content";
export type {
  GitHubData,
  GitHubRepo,
  GitHubStat,
  GitHubLegend,
  LanguageColorMap,
} from "@/types/github";

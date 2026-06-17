import type { z } from "zod";
import {
  GitHubDataSchema,
  GitHubLegendSchema,
  GitHubProfileSchema,
  GitHubRepoSchema,
  GitHubRepositorySchema,
  GitHubStatSchema,
  LanguageColorMapSchema,
} from "@/schemas/github.schema";

export type GitHubStat = z.infer<typeof GitHubStatSchema>;
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;
export type GitHubLegend = z.infer<typeof GitHubLegendSchema>;
export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;
export type GitHubRepository = z.infer<typeof GitHubRepositorySchema>;
export type LanguageColorMap = z.infer<typeof LanguageColorMapSchema>;
export type GitHubData = z.infer<typeof GitHubDataSchema>;
export type GitHubContent = GitHubData;

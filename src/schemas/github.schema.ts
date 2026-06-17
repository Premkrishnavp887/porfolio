import { z } from "zod";

export const GitHubProfileSchema = z.object({
  login: z.string(),
  public_repos: z.number(),
  followers: z.number(),
  html_url: z.string().url(),
  avatar_url: z.string().url(),
  name: z.string().optional(),
  bio: z.string().nullable().optional(),
});

export const GitHubRepositorySchema = z.object({
  name: z.string(),
  html_url: z.string().url(),
  description: z.string().nullable().optional(),
  stargazers_count: z.number(),
  language: z.string().nullable().optional(),
});

export const GitHubStatSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const GitHubRepoSchema = z.object({
  name: z.string(),
  desc: z.string(),
  lang: z.string(),
  stars: z.number(),
  url: z.string(),
});

export const GitHubLegendSchema = z.object({
  less: z.string(),
  more: z.string(),
});

export const LanguageColorMapSchema = z.record(z.string());

export const GitHubDataSchema = z.object({
  username: z.string().min(1, "GitHub username cannot be empty"),
  kicker: z.string(),
  title: z.string(),
  activityLabel: z.string(),
  legend: GitHubLegendSchema,
  stats: z.array(GitHubStatSchema),
  repos: z.array(GitHubRepoSchema),
  languageColors: LanguageColorMapSchema,
});

export type GitHubData = z.infer<typeof GitHubDataSchema>;
export type GitHubRepo = z.infer<typeof GitHubRepoSchema>;
export type GitHubStat = z.infer<typeof GitHubStatSchema>;
export type GitHubLegend = z.infer<typeof GitHubLegendSchema>;
export type LanguageColorMap = z.infer<typeof LanguageColorMapSchema>;

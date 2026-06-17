import { z } from "zod";

export const SocialLinksSchema = z.object({
  github: z.string(),
  linkedin: z.string(),
  twitter: z.string(),
  email: z.string(),
});

export const StatSchema = z.object({
  label: z.string(),
  value: z.number(),
});

export const EducationSchema = z.object({
  school: z.string(),
  degree: z.string(),
  period: z.string(),
  detail: z.string(),
});

export const ProfileSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  tagline: z.string(),
  summary: z.string(),
  location: z.string(),
  email: z.string(),
  resumeUrl: z.string(),
  socials: SocialLinksSchema,
  roles: z.array(z.string()),
  stats: z.array(StatSchema),
  education: z.array(EducationSchema),
  goals: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

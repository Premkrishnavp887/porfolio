import { z } from "zod";

export const ExperienceTypeSchema = z.enum(["Internship", "Freelance", "Open Source", "Hackathon"]);

export const ExperienceEntrySchema = z.object({
  role: z.string(),
  org: z.string(),
  period: z.string(),
  type: ExperienceTypeSchema,
  detail: z.string(),
});

export const ExperienceSchema = z.array(ExperienceEntrySchema);

export type ExperienceEntry = z.infer<typeof ExperienceEntrySchema>;
export type ExperienceType = z.infer<typeof ExperienceTypeSchema>;

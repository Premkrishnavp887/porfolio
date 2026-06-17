import { z } from "zod";

export const AchievementTypeSchema = z.enum([
  "Certificate",
  "Placement",
  "Competition",
  "Research",
]);

export const AchievementEntrySchema = z.object({
  title: z.string(),
  year: z.string(),
  type: AchievementTypeSchema,
});

export const AchievementsSchema = z.array(AchievementEntrySchema);

export type AchievementEntry = z.infer<typeof AchievementEntrySchema>;
export type AchievementType = z.infer<typeof AchievementTypeSchema>;

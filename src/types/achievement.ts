import type { z } from "zod";
import { AchievementEntrySchema, AchievementTypeSchema } from "@/schemas/achievement.schema";

export type AchievementEntry = z.infer<typeof AchievementEntrySchema>;
export type AchievementType = z.infer<typeof AchievementTypeSchema>;

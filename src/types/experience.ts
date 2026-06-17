import type { z } from "zod";
import { ExperienceEntrySchema, ExperienceTypeSchema } from "@/schemas/experience.schema";

export type ExperienceEntry = z.infer<typeof ExperienceEntrySchema>;
export type ExperienceType = z.infer<typeof ExperienceTypeSchema>;

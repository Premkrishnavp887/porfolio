import type { z } from "zod";
import { SkillCategorySchema, SkillSchema } from "@/schemas/skill.schema";

export type Skill = z.infer<typeof SkillSchema>;
export type SkillCategory = z.infer<typeof SkillCategorySchema>;

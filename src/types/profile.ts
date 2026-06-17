import type { z } from "zod";
import { ProfileSchema } from "@/schemas/profile.schema";

export type Profile = z.infer<typeof ProfileSchema>;

export type SocialLinks = Profile["socials"];
export type Stat = Profile["stats"][number];
export type Education = Profile["education"][number];

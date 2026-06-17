import type { z } from "zod";
import { InterestEntrySchema, InterestIconSchema } from "@/schemas/interest.schema";

export type InterestEntry = z.infer<typeof InterestEntrySchema>;
export type InterestIcon = z.infer<typeof InterestIconSchema>;

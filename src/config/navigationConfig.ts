import { content } from "@/data";

export const NAV_SECTIONS = content.navigation.links;
export const NAV_SECTION_IDS = ["home", ...NAV_SECTIONS.map((section) => section.id)] as const;

export const COMMAND_NAV_ITEMS = content.commandPalette.navigateItems;
export const COMMAND_LINKS = content.commandPalette.links;

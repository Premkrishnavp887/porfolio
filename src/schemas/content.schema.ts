import { z } from "zod";

const NavigationLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
});

const NavigationActionLabelsSchema = z.object({
  hireMe: z.string(),
  commandPalette: z.string(),
  commandPaletteShortcut: z.string(),
  themeToggle: z.string(),
});

const NavigationContentSchema = z.object({
  links: z.array(NavigationLinkSchema),
  actionLabels: NavigationActionLabelsSchema,
});

const CommandPaletteNavigateItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
});

const CommandPaletteLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
});

const CommandPaletteContentSchema = z.object({
  label: z.string(),
  placeholder: z.string(),
  navigateHeading: z.string(),
  linksHeading: z.string(),
  emptyMessage: z.string(),
  navigateItems: z.array(CommandPaletteNavigateItemSchema),
  links: z.array(CommandPaletteLinkSchema),
});

const HeroCtasSchema = z.object({
  projects: z.string(),
  resume: z.string(),
  contact: z.string(),
});

const HeroContentSchema = z.object({
  banner: z.string(),
  introPrefix: z.string(),
  roleIntro: z.string(),
  description: z.string(),
  ctas: HeroCtasSchema,
  statusText: z.string(),
});

const AboutContentSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  educationLabel: z.string(),
  careerGoalPrefix: z.string(),
});

const SkillsContentSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  skillCountSuffix: z.string(),
});

const ProjectsModalContentSchema = z.object({
  stackLabel: z.string(),
  sourceLabel: z.string(),
  demoLabel: z.string(),
});

const ProjectsDetailContentSchema = z.object({
  backLabel: z.string(),
  overviewLabel: z.string(),
  highlightsLabel: z.string(),
  problemLabel: z.string(),
  solutionLabel: z.string(),
  architectureLabel: z.string(),
  architectureComponentsLabel: z.string(),
  architectureDiagramLabel: z.string(),
  featuresLabel: z.string(),
  challengesLabel: z.string(),
  learningsLabel: z.string(),
  futureLabel: z.string(),
  screenshotsLabel: z.string(),
  notFoundTitle: z.string(),
  notFoundSubtitle: z.string(),
});

const ProjectsContentSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  filters: z.array(z.string()),
  modal: ProjectsModalContentSchema,
  detail: ProjectsDetailContentSchema,
});

const ExperienceContentSchema = z.object({
  kicker: z.string(),
  title: z.string(),
});

const AchievementsContentSchema = z.object({
  kicker: z.string(),
  title: z.string(),
});

const WhoAmIContentSchema = z.object({
  kicker: z.string(),
  title: z.string(),
});

const BlogContentSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  readLabel: z.string(),
});

const ContactLinkKeySchema = z.enum(["email", "github", "linkedin", "twitter"]);

const ContactLinkSchema = z.object({
  key: ContactLinkKeySchema,
  icon: z.string(),
  label: z.string(),
});

const ContactFormContentSchema = z.object({
  nameLabel: z.string(),
  emailLabel: z.string(),
  messageLabel: z.string(),
  namePlaceholder: z.string(),
  emailPlaceholder: z.string(),
  messagePlaceholder: z.string(),
  submitLabel: z.string(),
  sendingLabel: z.string(),
  invalidInputMessage: z.string(),
  successMessage: z.string(),
});

const ContactFooterContentSchema = z.object({
  builtWithCare: z.string(),
  craftedIn: z.string(),
});

const ContactContentSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  intro: z.string(),
  highlight: z.string(),
  links: z.array(ContactLinkSchema),
  form: ContactFormContentSchema,
  footer: ContactFooterContentSchema,
});

const ErrorMessageSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  action: z.string().optional(),
  retry: z.string().optional(),
  home: z.string().optional(),
});

const ErrorsContentSchema = z.object({
  notFound: ErrorMessageSchema,
  generic: ErrorMessageSchema,
});

const MetaContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  ogDescription: z.string(),
  twitterCard: z.string(),
});

export const ContentSchema = z.object({
  meta: MetaContentSchema,
  navigation: NavigationContentSchema,
  commandPalette: CommandPaletteContentSchema,
  hero: HeroContentSchema,
  about: AboutContentSchema,
  skills: SkillsContentSchema,
  projects: ProjectsContentSchema,
  experience: ExperienceContentSchema,
  achievements: AchievementsContentSchema,
  whoami: WhoAmIContentSchema,
  blog: BlogContentSchema,
  contact: ContactContentSchema,
  errors: ErrorsContentSchema,
  ui: z.record(z.unknown()).optional(),
});

export type Content = z.infer<typeof ContentSchema>;

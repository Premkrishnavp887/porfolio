import { content } from "@/data";
import type { ProjectScreenshot } from "@/types/project";

export function ProjectScreenshots({ screenshots }: { screenshots?: ProjectScreenshot[] }) {
  if (!screenshots?.length) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-surface/80 p-8 shadow-[0_20px_70px_-40px_rgba(15,23,42,0.75)]">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {content.projects.detail.screenshotsLabel}
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {screenshots.map((screenshot) => (
          <figure
            key={screenshot.src}
            className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90"
          >
            <img src={screenshot.src} alt={screenshot.alt} className="h-full w-full object-cover" />
            {screenshot.caption ? (
              <figcaption className="border-t border-white/10 bg-surface/90 px-4 py-4 text-sm text-muted-foreground">
                {screenshot.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}

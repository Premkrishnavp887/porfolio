import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Achievements } from "@/components/portfolio/Achievements";
import { GitHubStats } from "@/components/portfolio/GitHubStats";
import { WhoAmI } from "@/components/portfolio/WhoAmI";
import { Blog } from "@/components/portfolio/Blog";
import { Contact } from "@/components/portfolio/Contact";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { Particles } from "@/components/portfolio/Particles";

import { content, profile } from "@/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ${content.meta.title}` },
      {
        name: "description",
        content: `${profile.name} is a final-year CS engineer specializing in software engineering, DevOps and cloud. ${content.meta.description}`,
      },
      { property: "og:title", content: `${profile.name} — ${content.meta.title}` },
      {
        property: "og:description",
        content: `${profile.name} — ${content.meta.ogDescription}`,
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: content.meta.twitterCard },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Particles />
      <ScrollProgress />

      <Navbar onOpenPalette={() => setPaletteOpen(true)} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <GitHubStats />
        <WhoAmI />
        <Blog />
        <Contact />
      </main>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

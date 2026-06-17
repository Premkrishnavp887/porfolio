import { motion } from "framer-motion";
import { GitBranch, Github, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getGitHubProfile, getGitHubRepos } from "@/lib/github";
import { githubData } from "@/data";
import type { GitHubProfile, GitHubRepository } from "@/types/github";
import { SectionHeading } from "./About";
import { GITHUB_HEAT_TONE } from "@/config/projectConfig";
import { DURATIONS, INTERVALS, EASE } from "@/config/animationConfig";

/**
 * Future:
 * Replace githubData with GitHub API response.
 * Keep UI unchanged by mapping API response
 * to GitHubData interface.
 */

const HEATMAP = Array.from({ length: 53 * 7 }, (_, i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  const r = x - Math.floor(x);
  if (r < 0.45) return 0;
  if (r < 0.7) return 1;
  if (r < 0.88) return 2;
  if (r < 0.97) return 3;
  return 4;
});

export function GitHubStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepository[] | null>(null);

  useEffect(() => {
    let active = true;

    async function loadGitHubData() {
      try {
        const [profileData, repoData] = await Promise.all([getGitHubProfile(), getGitHubRepos()]);

        if (!active) {
          return;
        }

        setProfile(profileData);
        setRepos(repoData);
      } catch (failure) {
        console.error("GitHub API error:", failure);
        if (!active) {
          return;
        }

        setError(failure instanceof Error ? failure.message : "Unable to fetch GitHub data.");
        setProfile(null);
        setRepos(null);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadGitHubData();

    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(() => {
    if (!profile || repos === null) {
      return githubData.stats;
    }

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

    return [
      { label: githubData.stats[0].label, value: profile.public_repos.toString() },
      { label: githubData.stats[1].label, value: totalStars.toString() },
      { label: githubData.stats[2].label, value: profile.followers.toString() },
      { label: githubData.stats[3].label, value: githubData.stats[3].value },
    ];
  }, [profile, repos]);

  const repoCards = useMemo(() => {
    if (!repos) {
      return githubData.repos;
    }

    return repos.map((repo) => ({
      name: repo.name,
      desc: repo.description ?? "",
      lang: repo.language ?? "Unknown",
      stars: repo.stargazers_count,
      url: repo.html_url,
    }));
  }, [repos]);

  const statusMessage = loading
    ? "Loading live GitHub data..."
    : error
      ? "Live GitHub unavailable — showing cached data."
      : null;

  const isRepoEmpty = !loading && repos?.length === 0;

  return (
    <section id="github" className="relative py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeading kicker={githubData.kicker} title={githubData.title} />
        {statusMessage ? (
          <div className="mt-4 rounded-2xl border border-glass-border bg-surface/5 px-4 py-3 text-sm text-muted-foreground">
            {statusMessage}
          </div>
        ) : null}

        <div className="mt-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATIONS.MEDIUM_SLOW }}
            className="glass rounded-3xl p-6 h-fit"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Github className="h-4 w-4" /> {githubData.activityLabel}
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                <span>{githubData.legend.less}</span>
                {GITHUB_HEAT_TONE.map((t, i) => (
                  <span key={i} className={`h-2.5 w-2.5 rounded-sm ${t}`} />
                ))}
                <span>{githubData.legend.more}</span>
              </div>
            </div>

            <div
              className="grid gap-[3px] overflow-x-auto"
              style={{
                gridTemplateColumns: "repeat(53, minmax(10px, 1fr))",
                gridAutoFlow: "column",
                gridTemplateRows: "repeat(7, 10px)",
              }}
            >
              {HEATMAP.map((v, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: DURATIONS.QUICK,
                    delay: (i % 53) * INTERVALS.GRID,
                    ease: EASE,
                  }}
                  className={`rounded-sm ${GITHUB_HEAT_TONE[v]}`}
                />
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-glass-border bg-surface/5 p-4"
                >
                  <div className="font-display text-2xl font-semibold text-gradient">{s.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: DURATIONS.MEDIUM_SLOW, delay: 0.1, ease: EASE }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {isRepoEmpty ? (
              <div className="glass card-glow-hover block rounded-2xl p-4 text-sm text-muted-foreground md:col-span-2">
                No repositories were returned from GitHub.
              </div>
            ) : (
              repoCards.map((r) => (
                <a
                  key={r.name}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass card-glow-hover block rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <GitBranch className="h-4 w-4 text-aurora-cyan" />
                      {r.name}
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground">
                      <Star className="h-3 w-3" /> {r.stars}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{r.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span
                      className={`h-2 w-2 rounded-full ${githubData.languageColors[r.lang] ?? "bg-muted"}`}
                    />
                    {r.lang}
                  </div>
                </a>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

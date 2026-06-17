import { GitHubProfileSchema, GitHubRepositorySchema } from "@/schemas/github.schema";
import type { GitHubProfile, GitHubRepository } from "@/types/github";
import { githubData } from "@/data";

const GITHUB_API_BASE = "https://api.github.com";

// Get username from configuration, with validation
function getConfiguredUsername(): string {
  const username = githubData.username?.trim();

  if (!username) {
    const error = new Error(
      "GitHub username is not configured in src/data/github.json. " +
        'Please add a "username" field with your GitHub account.',
    );
    console.error("[ERROR]", error.message);
    throw error;
  }

  return username;
}

function getHeaders() {
  return {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };
}

async function fetchGitHubApi<T>(url: string, schema: { parse: (input: unknown) => T }) {
  const response = await fetch(url, { headers: getHeaders() });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return schema.parse(json);
}

export async function getGitHubProfile(username?: string): Promise<GitHubProfile> {
  const finalUsername = username || getConfiguredUsername();
  console.log(`[GitHub] Fetching profile for: ${finalUsername}`);
  return fetchGitHubApi(`${GITHUB_API_BASE}/users/${finalUsername}`, GitHubProfileSchema);
}

export async function getGitHubRepos(username?: string): Promise<GitHubRepository[]> {
  const finalUsername = username || getConfiguredUsername();
  console.log(`[GitHub] Fetching repos for: ${finalUsername}`);
  return fetchGitHubApi(
    `${GITHUB_API_BASE}/users/${finalUsername}/repos?per_page=100&sort=updated`,
    GitHubRepositorySchema.array(),
  );
}

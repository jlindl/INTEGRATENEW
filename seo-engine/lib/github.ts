/**
 * Opens a GitHub issue for failures. In Actions, GITHUB_TOKEN and
 * GITHUB_REPOSITORY are provided automatically; locally the issue is printed
 * instead.
 */
import { config } from "../config";

export async function openIssue(title: string, body: string): Promise<string | null> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!token || !repo) {
    console.warn(`[issue] GITHUB_TOKEN/GITHUB_REPOSITORY not set, so no issue was opened.\n  ${title}\n${body}`);
    return null;
  }

  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, labels: [config.issues.label] }),
  });
  if (!res.ok) {
    console.warn(`[issue] GitHub returned ${res.status}: ${await res.text()}`);
    return null;
  }
  const json = (await res.json()) as { html_url: string };
  console.log(`[issue] opened ${json.html_url}`);
  return json.html_url;
}

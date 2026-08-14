// Community JSON mirror for GitHub Trending (GitHub has no official trending API).
// Free hobby-tier mirrors like this one come and go; if this one is down, swap in
// a currently-live mirror here. The dashboard degrades gracefully either way —
// a dead endpoint just shows "GitHub Trending is temporarily unavailable".
const ENDPOINT = 'https://github-trending-api.now.sh/repositories?since=daily';

export const SOURCE_KEY = 'githubTrending';
export const SOURCE_NAME = 'GitHub Trending';

export async function fetchRepos() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`GitHub Trending request failed: ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('GitHub Trending response was not a list');

  return data.map((repo) => ({
    id: `gh-${repo.author}/${repo.name}`,
    name: `${repo.author}/${repo.name}`,
    description: repo.description || '',
    language: repo.language || 'Unknown',
    stars: repo.stars ?? 0,
    growthToday: typeof repo.currentPeriodStars === 'number' ? repo.currentPeriodStars : null,
    repoUrl: repo.url,
    avatarUrl: repo.avatar || null,
  }));
}

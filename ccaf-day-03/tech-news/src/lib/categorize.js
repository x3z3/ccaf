export const CATEGORIES = ['AI', 'Programming', 'Startups', 'Cybersecurity', 'Cloud', 'Mobile', 'Web Dev'];

const KEYWORD_MAP = {
  AI: ['ai', 'artificial intelligence', 'llm', 'openai', 'anthropic', 'claude', 'gpt', 'chatgpt', 'gemini', 'machine learning', 'neural network', 'genai', 'copilot'],
  Programming: ['programming', 'developer', 'code', 'coding', 'framework', 'library', 'compiler', 'language', 'github', 'open source', 'algorithm', 'sdk', 'api'],
  Startups: ['startup', 'funding', 'raises', 'series a', 'series b', 'series c', 'venture capital', 'vc', 'seed round', 'valuation', 'founder', 'ipo', 'acquires', 'acquisition'],
  Cybersecurity: ['security', 'breach', 'hack', 'vulnerability', 'exploit', 'ransomware', 'malware', 'cve', 'phishing', 'cyberattack', 'data leak', 'zero-day'],
  Cloud: ['cloud', 'aws', 'azure', 'google cloud', 'kubernetes', 'docker', 'serverless', 'saas', 'data center', 'infrastructure'],
  Mobile: ['ios', 'android', 'iphone', 'app store', 'play store', 'mobile app', 'smartphone', 'samsung', 'pixel'],
  'Web Dev': ['javascript', 'typescript', 'react', 'vue', 'css', 'html', 'browser', 'frontend', 'front-end', 'backend', 'web app', 'node.js'],
};

export function deriveCategories(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  return CATEGORIES.filter((category) =>
    KEYWORD_MAP[category].some((keyword) => lower.includes(keyword))
  );
}

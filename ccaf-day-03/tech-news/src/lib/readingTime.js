const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(text) {
  if (!text) return 1;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

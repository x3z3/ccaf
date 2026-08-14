export function formatNumber(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatArea(value) {
  const formatted = formatNumber(value);
  return formatted ? `${formatted} km²` : null;
}

export function formatDensity(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value)} /km²`;
}

export function formatList(values) {
  if (!Array.isArray(values) || values.length === 0) return null;
  return values.join(', ');
}

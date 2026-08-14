// Shared formatting, escaping, and derived-total helpers.
// All calculators are pure functions of state — nothing here reads or writes storage/DOM.

export function generateId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export function formatCurrency(amount) {
  const value = Number.isFinite(amount) ? amount : 0;
  return currencyFormatter.format(value);
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[ch]));
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Whole months elapsed between dateStr and today, clamped to >= 0.
export function monthsElapsedSince(dateStr) {
  const start = new Date(dateStr);
  if (Number.isNaN(start.getTime())) return 0;
  const now = new Date();
  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months -= 1;
  return Math.max(0, months);
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// --- Derived totals. All-time sums (no calendar-month filtering). ---

export function sumIncome(state) {
  return state.income.reduce((sum, entry) => sum + entry.amount, 0);
}

export function sumExpenses(state) {
  return state.expenses.reduce((sum, entry) => sum + entry.amount, 0);
}

export function sumEMI(state) {
  return state.loans.reduce((sum, loan) => sum + loan.emi, 0);
}

export function sumSIPMonthly(state) {
  return state.sips.reduce((sum, sip) => sum + sip.monthlyContribution, 0);
}

export function sumOutstandingDebt(state) {
  return state.loans.reduce((sum, loan) => sum + loan.emi * loan.monthsRemaining, 0);
}

export function sumFDValue(state) {
  return state.fds.reduce((sum, fd) => sum + fd.principal, 0);
}

export function sumSIPContributed(state) {
  return state.sips.reduce(
    (sum, sip) => sum + sip.monthlyContribution * monthsElapsedSince(sip.startDate),
    0
  );
}

export function sumStocksInvested(state) {
  return state.stocks.reduce((sum, stock) => sum + stock.quantity * stock.buyPrice, 0);
}

export function netCashFlow(state) {
  return sumIncome(state) - sumExpenses(state) - sumEMI(state) - sumSIPMonthly(state);
}

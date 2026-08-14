// localStorage load/save/seed/sanitize. This is the only module allowed to touch localStorage.
import { generateId } from './utils.js';

const STORAGE_KEY = 'financeTracker.state.v1';

export function defaultUiState() {
  return {
    activeTab: 'dashboard',
    investments: { activeSubTab: 'loans' },
    expenseFilter: { category: '' },
    editingStockId: null,
    watchlist: { sortByPerformance: false, sectorFilter: '' },
  };
}

function seedDefaults() {
  return {
    income: [
      { id: generateId(), source: 'Salary', amount: 75000, date: '2026-08-01' },
    ],
    expenses: [
      { id: generateId(), category: 'Rent', amount: 18000, date: '2026-08-01', note: '' },
      { id: generateId(), category: 'Groceries', amount: 6000, date: '2026-08-05', note: 'Monthly groceries' },
    ],
    loans: [
      { id: generateId(), name: 'Car Loan', emi: 9000, interestRate: 9.5, monthsRemaining: 24 },
    ],
    fds: [
      { id: generateId(), name: 'Bank FD', principal: 100000, interestRate: 7, startDate: '2025-01-01', maturityDate: '2027-01-01' },
    ],
    sips: [
      { id: generateId(), name: 'Index Fund SIP', monthlyContribution: 5000, startDate: '2025-01-01' },
    ],
    stocks: [
      { id: generateId(), name: 'TCS', sector: 'IT', quantity: 10, buyPrice: 3500 },
    ],
  };
}

function toFiniteNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function isValidDateStr(value) {
  if (typeof value !== 'string' || value === '') return false;
  return !Number.isNaN(new Date(value).getTime());
}

function validateIncomeEntry(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const amount = toFiniteNumber(raw.amount);
  if (amount === null || amount < 0 || !isValidDateStr(raw.date)) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : generateId(),
    source: typeof raw.source === 'string' ? raw.source : '',
    amount,
    date: raw.date,
  };
}

function validateExpenseEntry(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const amount = toFiniteNumber(raw.amount);
  if (amount === null || amount < 0 || !isValidDateStr(raw.date)) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : generateId(),
    category: typeof raw.category === 'string' ? raw.category : '',
    amount,
    date: raw.date,
    note: typeof raw.note === 'string' ? raw.note : '',
  };
}

function validateLoanEntry(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const emi = toFiniteNumber(raw.emi);
  const interestRate = toFiniteNumber(raw.interestRate);
  const monthsRemaining = toFiniteNumber(raw.monthsRemaining);
  if (emi === null || emi < 0) return null;
  if (interestRate === null || interestRate < 0) return null;
  if (monthsRemaining === null || monthsRemaining < 0) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : generateId(),
    name: typeof raw.name === 'string' ? raw.name : '',
    emi,
    interestRate,
    monthsRemaining,
  };
}

function validateFdEntry(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const principal = toFiniteNumber(raw.principal);
  const interestRate = toFiniteNumber(raw.interestRate);
  if (principal === null || principal < 0) return null;
  if (interestRate === null || interestRate < 0) return null;
  if (!isValidDateStr(raw.startDate) || !isValidDateStr(raw.maturityDate)) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : generateId(),
    name: typeof raw.name === 'string' ? raw.name : '',
    principal,
    interestRate,
    startDate: raw.startDate,
    maturityDate: raw.maturityDate,
  };
}

function validateSipEntry(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const monthlyContribution = toFiniteNumber(raw.monthlyContribution);
  if (monthlyContribution === null || monthlyContribution < 0) return null;
  if (!isValidDateStr(raw.startDate)) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : generateId(),
    name: typeof raw.name === 'string' ? raw.name : '',
    monthlyContribution,
    startDate: raw.startDate,
  };
}

function validateStockEntry(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const quantity = toFiniteNumber(raw.quantity);
  const buyPrice = toFiniteNumber(raw.buyPrice);
  if (quantity === null || quantity <= 0) return null;
  if (buyPrice === null || buyPrice <= 0) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : generateId(),
    name: typeof raw.name === 'string' ? raw.name : '',
    sector: typeof raw.sector === 'string' ? raw.sector : '',
    quantity,
    buyPrice,
  };
}

function sanitizeArray(rawArray, validator) {
  if (!Array.isArray(rawArray)) return [];
  return rawArray.map(validator).filter(Boolean);
}

function sanitize(parsed) {
  try {
    if (!parsed || typeof parsed !== 'object') return seedDefaults();
    return {
      income: sanitizeArray(parsed.income, validateIncomeEntry),
      expenses: sanitizeArray(parsed.expenses, validateExpenseEntry),
      loans: sanitizeArray(parsed.loans, validateLoanEntry),
      fds: sanitizeArray(parsed.fds, validateFdEntry),
      sips: sanitizeArray(parsed.sips, validateSipEntry),
      stocks: sanitizeArray(parsed.stocks, validateStockEntry),
    };
  } catch {
    return seedDefaults();
  }
}

export function save(state) {
  try {
    const { income, expenses, loans, fds, sips, stocks } = state;
    const payload = { version: 1, income, expenses, loans, fds, sips, stocks };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save finance tracker state:', err);
  }
}

export function load() {
  let raw = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to read finance tracker state:', err);
  }

  if (raw === null) {
    const state = { ...seedDefaults(), ui: defaultUiState() };
    save(state);
    return state;
  }

  let parsed = null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = null;
  }

  if (parsed === null || typeof parsed !== 'object') {
    const state = { ...seedDefaults(), ui: defaultUiState() };
    save(state);
    return state;
  }

  return { ...sanitize(parsed), ui: defaultUiState() };
}

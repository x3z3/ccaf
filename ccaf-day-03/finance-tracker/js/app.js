// Entry point. Owns the single state object, all mutators, and the one delegated
// listener set. Every mutator ends by calling commit() — the only allowed flow is
// change state -> save -> redraw.
import { load, save } from './storage.js';
import { render } from './render.js';
import { generateId, todayStr } from './utils.js';

const state = load();

function commit() {
  save(state);
  render(state);
}

// --- Income & Expenses ---

function addIncome({ source, amount, date }) {
  state.income.push({ id: generateId(), source: source || '', amount, date });
  commit();
}

function deleteIncome(id) {
  state.income = state.income.filter((entry) => entry.id !== id);
  commit();
}

function addExpense({ category, amount, date, note }) {
  state.expenses.push({ id: generateId(), category, amount, date, note: note || '' });
  commit();
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter((entry) => entry.id !== id);
  commit();
}

// --- Investments ---

function addLoan({ name, emi, interestRate, monthsRemaining }) {
  state.loans.push({ id: generateId(), name: name || '', emi, interestRate, monthsRemaining });
  commit();
}

function deleteLoan(id) {
  state.loans = state.loans.filter((entry) => entry.id !== id);
  commit();
}

function addFd({ name, principal, interestRate, startDate, maturityDate }) {
  state.fds.push({ id: generateId(), name: name || '', principal, interestRate, startDate, maturityDate });
  commit();
}

function deleteFd(id) {
  state.fds = state.fds.filter((entry) => entry.id !== id);
  commit();
}

function addSip({ name, monthlyContribution, startDate }) {
  state.sips.push({ id: generateId(), name: name || '', monthlyContribution, startDate });
  commit();
}

function deleteSip(id) {
  state.sips = state.sips.filter((entry) => entry.id !== id);
  commit();
}

function addStock({ name, sector, quantity, buyPrice }) {
  state.stocks.push({ id: generateId(), name, sector, quantity, buyPrice });
  commit();
}

function deleteStock(id) {
  state.stocks = state.stocks.filter((entry) => entry.id !== id);
  if (state.ui.editingStockId === id) state.ui.editingStockId = null;
  commit();
}

function editStock(id, { name, sector, quantity, buyPrice }) {
  state.stocks = state.stocks.map((entry) => (entry.id === id ? { ...entry, name, sector, quantity, buyPrice } : entry));
  state.ui.editingStockId = null;
  commit();
}

// --- UI-only mutators ---

function setActiveTab(tab) {
  state.ui.activeTab = tab;
  commit();
}

function setInvestmentSubtab(subtab) {
  state.ui.investments.activeSubTab = subtab;
  commit();
}

function setExpenseFilter(category) {
  state.ui.expenseFilter.category = category;
  commit();
}

function setEditingStock(id) {
  state.ui.editingStockId = id;
  commit();
}

function setWatchlistSort(sortByPerformance) {
  state.ui.watchlist.sortByPerformance = sortByPerformance;
  commit();
}

function setWatchlistSectorFilter(sector) {
  state.ui.watchlist.sectorFilter = sector;
  commit();
}

// --- Event delegation: one click, submit, and change listener for the whole app ---

const root = document.getElementById('app');

root.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;
  const { action, id } = target.dataset;

  switch (action) {
    case 'set-tab':
      setActiveTab(target.dataset.tab);
      break;
    case 'set-investment-subtab':
      setInvestmentSubtab(target.dataset.subtab);
      break;
    case 'delete-income':
      deleteIncome(id);
      break;
    case 'delete-expense':
      deleteExpense(id);
      break;
    case 'delete-loan':
      deleteLoan(id);
      break;
    case 'delete-fd':
      deleteFd(id);
      break;
    case 'delete-sip':
      deleteSip(id);
      break;
    case 'delete-stock':
      deleteStock(id);
      break;
    case 'edit-stock':
      setEditingStock(id);
      break;
    case 'cancel-edit-stock':
      setEditingStock(null);
      break;
    case 'save-stock-edit': {
      const row = target.closest('[data-row]');
      const name = row.querySelector('[name="name"]').value.trim();
      const sector = row.querySelector('[name="sector"]').value.trim();
      const quantity = Number(row.querySelector('[name="quantity"]').value);
      const buyPrice = Number(row.querySelector('[name="buyPrice"]').value);
      if (!name || !sector || !Number.isFinite(quantity) || quantity <= 0 || !Number.isFinite(buyPrice) || buyPrice <= 0) {
        return;
      }
      editStock(id, { name, sector, quantity, buyPrice });
      break;
    }
    case 'toggle-watchlist-sort':
      setWatchlistSort(!state.ui.watchlist.sortByPerformance);
      break;
  }
});

root.addEventListener('submit', (event) => {
  const form = event.target.closest('form[data-action]');
  if (!form) return;
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  switch (form.dataset.action) {
    case 'quick-add-income': {
      const amount = Number(data.amount);
      if (!Number.isFinite(amount) || amount <= 0) return;
      addIncome({ source: 'Salary', amount, date: todayStr() });
      form.reset();
      break;
    }
    case 'quick-add-expense': {
      const amount = Number(data.amount);
      const category = (data.category || '').trim();
      if (!category || !Number.isFinite(amount) || amount <= 0) return;
      addExpense({ category, amount, date: todayStr(), note: '' });
      break;
    }
    case 'add-income': {
      const amount = Number(data.amount);
      if (!Number.isFinite(amount) || amount <= 0 || !data.date) return;
      addIncome({ source: (data.source || '').trim(), amount, date: data.date });
      break;
    }
    case 'add-expense': {
      const amount = Number(data.amount);
      const category = (data.category || '').trim();
      if (!category || !Number.isFinite(amount) || amount <= 0 || !data.date) return;
      addExpense({ category, amount, date: data.date, note: (data.note || '').trim() });
      break;
    }
    case 'add-loan': {
      const emi = Number(data.emi);
      const interestRate = Number(data.interestRate);
      const monthsRemaining = Number(data.monthsRemaining);
      if (!Number.isFinite(emi) || emi <= 0) return;
      if (!Number.isFinite(interestRate) || interestRate < 0) return;
      if (!Number.isFinite(monthsRemaining) || monthsRemaining < 0) return;
      addLoan({ name: (data.name || '').trim(), emi, interestRate, monthsRemaining });
      break;
    }
    case 'add-fd': {
      const principal = Number(data.principal);
      const interestRate = Number(data.interestRate);
      if (!Number.isFinite(principal) || principal <= 0) return;
      if (!Number.isFinite(interestRate) || interestRate < 0) return;
      if (!data.startDate || !data.maturityDate) return;
      addFd({ name: (data.name || '').trim(), principal, interestRate, startDate: data.startDate, maturityDate: data.maturityDate });
      break;
    }
    case 'add-sip': {
      const monthlyContribution = Number(data.monthlyContribution);
      if (!Number.isFinite(monthlyContribution) || monthlyContribution <= 0 || !data.startDate) return;
      addSip({ name: (data.name || '').trim(), monthlyContribution, startDate: data.startDate });
      break;
    }
    case 'add-stock': {
      const quantity = Number(data.quantity);
      const buyPrice = Number(data.buyPrice);
      const name = (data.name || '').trim();
      const sector = (data.sector || '').trim();
      if (!name || !sector) return;
      if (!Number.isFinite(quantity) || quantity <= 0) return;
      if (!Number.isFinite(buyPrice) || buyPrice <= 0) return;
      addStock({ name, sector, quantity, buyPrice });
      break;
    }
  }
});

root.addEventListener('change', (event) => {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  switch (target.dataset.action) {
    case 'filter-expenses':
      setExpenseFilter(target.value);
      break;
    case 'filter-watchlist-sector':
      setWatchlistSectorFilter(target.value);
      break;
  }
});

render(state);

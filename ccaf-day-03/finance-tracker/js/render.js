// All rendering lives here. Every function takes state and rebuilds a container's
// innerHTML from a template string — nothing here patches individual DOM nodes.
import {
  formatCurrency,
  escapeHtml,
  formatDate,
  monthsElapsedSince,
  sumIncome,
  sumExpenses,
  sumEMI,
  sumSIPMonthly,
  sumOutstandingDebt,
  sumFDValue,
  sumSIPContributed,
  sumStocksInvested,
  netCashFlow,
} from './utils.js';

// Hardcoded sample data — not user-editable, never persisted, never treated as state.
export const WATCHLIST_STOCKS = Object.freeze([
  { name: 'Infosys', sector: 'IT', price: 1520, changePercent: 2.4 },
  { name: 'Wipro', sector: 'IT', price: 410, changePercent: -1.1 },
  { name: 'HDFC Bank', sector: 'Banking', price: 1650, changePercent: 1.2 },
  { name: 'ICICI Bank', sector: 'Banking', price: 1180, changePercent: 0.6 },
  { name: 'Sun Pharma', sector: 'Pharma', price: 1740, changePercent: 3.1 },
  { name: 'Cipla', sector: 'Pharma', price: 1490, changePercent: -0.4 },
  { name: 'Reliance Industries', sector: 'Energy', price: 2980, changePercent: 1.8 },
  { name: 'ONGC', sector: 'Energy', price: 265, changePercent: -2.2 },
  { name: 'Hindustan Unilever', sector: 'FMCG', price: 2410, changePercent: 0.3 },
  { name: 'Nestle India', sector: 'FMCG', price: 24800, changePercent: 4.0 },
]);

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'income-expenses', label: 'Income & Expenses' },
  { id: 'investments', label: 'Investments' },
  { id: 'watchlist', label: 'Stocks to Watch' },
];

const INVESTMENT_SUBTABS = [
  { id: 'loans', label: 'Loans' },
  { id: 'fds', label: 'FDs' },
  { id: 'sips', label: 'SIPs' },
  { id: 'stocks', label: 'My Stocks' },
];

export function render(state) {
  renderTabNav(state);
  renderDashboard(state);
  renderIncomeExpenses(state);
  renderInvestments(state);
  renderWatchlist(state);

  document.querySelectorAll('.tab-section').forEach((section) => {
    section.classList.toggle('active', section.id === `section-${state.ui.activeTab}`);
  });
}

function renderTabNav(state) {
  const html = TABS.map(
    (tab) => `
    <button type="button" class="tab-btn${tab.id === state.ui.activeTab ? ' active' : ''}"
      data-action="set-tab" data-tab="${tab.id}">${escapeHtml(tab.label)}</button>`
  ).join('');
  document.getElementById('tab-nav').innerHTML = html;
}

function card(label, value) {
  return `
    <div class="card">
      <span class="card-label">${escapeHtml(label)}</span>
      <span class="card-value">${formatCurrency(value)}</span>
    </div>`;
}

function renderDashboard(state) {
  const income = sumIncome(state);
  const expenses = sumExpenses(state);
  const emi = sumEMI(state);
  const sip = sumSIPMonthly(state);
  const net = netCashFlow(state);
  const debt = sumOutstandingDebt(state);
  const fdValue = sumFDValue(state);
  const sipContributed = sumSIPContributed(state);
  const stocksInvested = sumStocksInvested(state);

  const spent = expenses + emi + sip;
  const leftover = Math.max(income - spent, 0);
  const barTotal = income > 0 ? income : (spent > 0 ? spent : 1);
  const segments = [
    { label: 'Expenses', value: expenses, cls: 'seg-expenses' },
    { label: 'EMI', value: emi, cls: 'seg-emi' },
    { label: 'SIP', value: sip, cls: 'seg-sip' },
    { label: 'Leftover', value: leftover, cls: 'seg-leftover' },
  ];
  const flowBarHtml = segments
    .filter((seg) => seg.value > 0)
    .map(
      (seg) => `<div class="flow-seg ${seg.cls}" style="width:${((seg.value / barTotal) * 100).toFixed(1)}%"
        title="${escapeHtml(seg.label)}: ${formatCurrency(seg.value)}"></div>`
    )
    .join('');
  const flowLegendHtml = segments
    .map((seg) => `<span class="legend-item"><span class="legend-swatch ${seg.cls}"></span>${escapeHtml(seg.label)}</span>`)
    .join('');

  document.getElementById('section-dashboard').innerHTML = `
    <h2>Dashboard</h2>
    <div class="net-cash-flow ${net >= 0 ? 'positive' : 'negative'}">
      <span class="label">Net Cash Flow</span>
      <span class="value">${formatCurrency(net)}</span>
    </div>
    <div class="flow-bar" role="img" aria-label="Breakdown of where this month's money goes">${flowBarHtml}</div>
    <div class="flow-bar-legend">${flowLegendHtml}</div>
    <div class="cards-grid">
      ${card('Income', income)}
      ${card('Expenses', expenses)}
      ${card('EMI', emi)}
      ${card('SIP', sip)}
      ${card('Outstanding Debt', debt)}
      ${card('FD Value', fdValue)}
      ${card('SIP Contributed', sipContributed)}
      ${card('Stocks Invested', stocksInvested)}
    </div>
    <div class="quick-add">
      <h3>Quick Add</h3>
      <form class="quick-add-form" data-action="quick-add-income">
        <label>Salary / Income
          <input type="number" name="amount" min="0" step="0.01" required placeholder="Amount">
        </label>
        <button type="submit">Add Income</button>
      </form>
      <form class="quick-add-form" data-action="quick-add-expense">
        <label>Expense
          <input type="text" name="category" required placeholder="Category">
        </label>
        <input type="number" name="amount" min="0" step="0.01" required placeholder="Amount">
        <button type="submit">Add Expense</button>
      </form>
    </div>
  `;
}

function renderIncomeExpenses(state) {
  const incomeRows = state.income
    .map(
      (entry) => `
      <li>
        <span class="entry-main">${escapeHtml(entry.source) || 'Income'}</span>
        <span class="entry-amount">${formatCurrency(entry.amount)}</span>
        <span class="entry-date">${formatDate(entry.date)}</span>
        <button type="button" data-action="delete-income" data-id="${entry.id}" aria-label="Delete income entry">Delete</button>
      </li>`
    )
    .join('') || '<li class="empty">No income logged yet.</li>';

  const categories = [...new Set(state.expenses.map((e) => e.category).filter(Boolean))].sort();
  const activeFilter = state.ui.expenseFilter.category;
  const filteredExpenses = activeFilter
    ? state.expenses.filter((e) => e.category === activeFilter)
    : state.expenses;

  const expenseRows = filteredExpenses
    .map(
      (entry) => `
      <li>
        <span class="entry-main">${escapeHtml(entry.category) || 'Expense'}</span>
        <span class="entry-amount">${formatCurrency(entry.amount)}</span>
        <span class="entry-date">${formatDate(entry.date)}</span>
        ${entry.note ? `<span class="entry-note">${escapeHtml(entry.note)}</span>` : ''}
        <button type="button" data-action="delete-expense" data-id="${entry.id}" aria-label="Delete expense entry">Delete</button>
      </li>`
    )
    .join('') || '<li class="empty">No expenses match this filter.</li>';

  const categoryOptions = categories
    .map((cat) => `<option value="${escapeHtml(cat)}"${cat === activeFilter ? ' selected' : ''}>${escapeHtml(cat)}</option>`)
    .join('');

  document.getElementById('section-income-expenses').innerHTML = `
    <h2>Income & Expenses</h2>
    <div class="two-col">
      <div class="panel">
        <h3>Income</h3>
        <form data-action="add-income" class="entry-form">
          <input type="text" name="source" placeholder="Source (e.g. Salary)">
          <input type="number" name="amount" min="0" step="0.01" required placeholder="Amount">
          <input type="date" name="date" required value="${escapeHtml(new Date().toISOString().slice(0, 10))}">
          <button type="submit">Add Income</button>
        </form>
        <ul class="entry-list">${incomeRows}</ul>
      </div>
      <div class="panel">
        <h3>Expenses</h3>
        <form data-action="add-expense" class="entry-form">
          <input type="text" name="category" required placeholder="Category">
          <input type="number" name="amount" min="0" step="0.01" required placeholder="Amount">
          <input type="date" name="date" required value="${escapeHtml(new Date().toISOString().slice(0, 10))}">
          <input type="text" name="note" placeholder="Why? (optional)">
          <button type="submit">Add Expense</button>
        </form>
        <label class="filter-label">Filter by category
          <select data-action="filter-expenses">
            <option value=""${activeFilter === '' ? ' selected' : ''}>All Categories</option>
            ${categoryOptions}
          </select>
        </label>
        <ul class="entry-list">${expenseRows}</ul>
      </div>
    </div>
  `;
}

function loansHtml(state) {
  const rows = state.loans
    .map(
      (loan) => `
      <li>
        <span class="entry-main">${escapeHtml(loan.name) || 'Loan'}</span>
        <span>EMI ${formatCurrency(loan.emi)}/mo</span>
        <span>${loan.interestRate}% p.a.</span>
        <span>${loan.monthsRemaining} months left</span>
        <button type="button" data-action="delete-loan" data-id="${loan.id}">Delete</button>
      </li>`
    )
    .join('') || '<li class="empty">No loans added yet.</li>';

  return `
    <form data-action="add-loan" class="entry-form">
      <input type="text" name="name" placeholder="Loan name">
      <input type="number" name="emi" min="0" step="0.01" required placeholder="EMI">
      <input type="number" name="interestRate" min="0" step="0.01" required placeholder="Interest rate %">
      <input type="number" name="monthsRemaining" min="0" step="1" required placeholder="Months remaining">
      <button type="submit">Add Loan</button>
    </form>
    <ul class="entry-list">${rows}</ul>
  `;
}

function fdsHtml(state) {
  const rows = state.fds
    .map(
      (fd) => `
      <li>
        <span class="entry-main">${escapeHtml(fd.name) || 'FD'}</span>
        <span>${formatCurrency(fd.principal)}</span>
        <span>${fd.interestRate}% p.a.</span>
        <span>${formatDate(fd.startDate)} → ${formatDate(fd.maturityDate)}</span>
        <button type="button" data-action="delete-fd" data-id="${fd.id}">Delete</button>
      </li>`
    )
    .join('') || '<li class="empty">No fixed deposits added yet.</li>';

  return `
    <form data-action="add-fd" class="entry-form">
      <input type="text" name="name" placeholder="FD name">
      <input type="number" name="principal" min="0" step="0.01" required placeholder="Principal">
      <input type="number" name="interestRate" min="0" step="0.01" required placeholder="Interest rate %">
      <input type="date" name="startDate" required placeholder="Start date">
      <input type="date" name="maturityDate" required placeholder="Maturity date">
      <button type="submit">Add FD</button>
    </form>
    <ul class="entry-list">${rows}</ul>
  `;
}

function sipsHtml(state) {
  const rows = state.sips
    .map(
      (sip) => `
      <li>
        <span class="entry-main">${escapeHtml(sip.name) || 'SIP'}</span>
        <span>${formatCurrency(sip.monthlyContribution)}/mo</span>
        <span>since ${formatDate(sip.startDate)}</span>
        <span>${formatCurrency(sip.monthlyContribution * monthsElapsedSince(sip.startDate))} contributed</span>
        <button type="button" data-action="delete-sip" data-id="${sip.id}">Delete</button>
      </li>`
    )
    .join('') || '<li class="empty">No SIPs added yet.</li>';

  return `
    <form data-action="add-sip" class="entry-form">
      <input type="text" name="name" placeholder="SIP name">
      <input type="number" name="monthlyContribution" min="0" step="0.01" required placeholder="Monthly contribution">
      <input type="date" name="startDate" required placeholder="Start date">
      <button type="submit">Add SIP</button>
    </form>
    <ul class="entry-list">${rows}</ul>
  `;
}

function stocksHtml(state) {
  const rows = state.stocks
    .map((stock) => {
      if (state.ui.editingStockId === stock.id) {
        return `
        <li class="editing" data-row data-id="${stock.id}">
          <input type="text" name="name" value="${escapeHtml(stock.name)}" placeholder="Name">
          <input type="text" name="sector" value="${escapeHtml(stock.sector)}" placeholder="Sector">
          <input type="number" name="quantity" min="0" step="1" value="${stock.quantity}" placeholder="Quantity">
          <input type="number" name="buyPrice" min="0" step="0.01" value="${stock.buyPrice}" placeholder="Buy price">
          <button type="button" data-action="save-stock-edit" data-id="${stock.id}">Save</button>
          <button type="button" data-action="cancel-edit-stock">Cancel</button>
        </li>`;
      }
      return `
      <li>
        <span class="entry-main">${escapeHtml(stock.name) || 'Stock'}</span>
        <span>${escapeHtml(stock.sector)}</span>
        <span>${stock.quantity} @ ${formatCurrency(stock.buyPrice)}</span>
        <span>${formatCurrency(stock.quantity * stock.buyPrice)} invested</span>
        <button type="button" data-action="edit-stock" data-id="${stock.id}">Edit</button>
        <button type="button" data-action="delete-stock" data-id="${stock.id}">Delete</button>
      </li>`;
    })
    .join('') || '<li class="empty">No stocks added yet.</li>';

  return `
    <form data-action="add-stock" class="entry-form">
      <input type="text" name="name" required placeholder="Stock name">
      <input type="text" name="sector" required placeholder="Sector">
      <input type="number" name="quantity" min="0" step="1" required placeholder="Quantity">
      <input type="number" name="buyPrice" min="0" step="0.01" required placeholder="Buy price">
      <button type="submit">Add Stock</button>
    </form>
    <ul class="entry-list">${rows}</ul>
  `;
}

function renderInvestments(state) {
  const activeSubTab = state.ui.investments.activeSubTab;
  const subNavHtml = INVESTMENT_SUBTABS.map(
    (sub) => `
    <button type="button" class="subtab-btn${sub.id === activeSubTab ? ' active' : ''}"
      data-action="set-investment-subtab" data-subtab="${sub.id}">${escapeHtml(sub.label)}</button>`
  ).join('');

  const contentBuilders = { loans: loansHtml, fds: fdsHtml, sips: sipsHtml, stocks: stocksHtml };
  const contentHtml = (contentBuilders[activeSubTab] || loansHtml)(state);

  document.getElementById('section-investments').innerHTML = `
    <h2>Investments</h2>
    <nav class="subtab-nav">${subNavHtml}</nav>
    <div class="subtab-content">${contentHtml}</div>
  `;
}

function renderWatchlist(state) {
  const { sortByPerformance, sectorFilter } = state.ui.watchlist;
  const sectors = [...new Set(WATCHLIST_STOCKS.map((s) => s.sector))].sort();

  let list = sectorFilter ? WATCHLIST_STOCKS.filter((s) => s.sector === sectorFilter) : [...WATCHLIST_STOCKS];
  if (sortByPerformance) list = [...list].sort((a, b) => b.changePercent - a.changePercent);

  const sectorOptions = sectors
    .map((sector) => `<option value="${escapeHtml(sector)}"${sector === sectorFilter ? ' selected' : ''}>${escapeHtml(sector)}</option>`)
    .join('');

  const rows = list
    .map(
      (stock) => `
      <li>
        <span class="entry-main">${escapeHtml(stock.name)}</span>
        <span>${escapeHtml(stock.sector)}</span>
        <span>${formatCurrency(stock.price)}</span>
        <span class="${stock.changePercent >= 0 ? 'positive' : 'negative'}">${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(1)}%</span>
      </li>`
    )
    .join('') || '<li class="empty">No stocks match this filter.</li>';

  document.getElementById('section-watchlist').innerHTML = `
    <h2>Stocks to Watch</h2>
    <p class="disclaimer">Sample data for learning purposes — not live prices, not investment advice.</p>
    <div class="watchlist-controls">
      <label class="filter-label">Filter by sector
        <select data-action="filter-watchlist-sector">
          <option value=""${sectorFilter === '' ? ' selected' : ''}>All Sectors</option>
          ${sectorOptions}
        </select>
      </label>
      <button type="button" class="${sortByPerformance ? 'active' : ''}" data-action="toggle-watchlist-sort">
        ${sortByPerformance ? 'Sorted by Top Performers ✓' : 'Sort by Top Performers'}
      </button>
    </div>
    <ul class="entry-list watchlist-list">${rows}</ul>
  `;
}

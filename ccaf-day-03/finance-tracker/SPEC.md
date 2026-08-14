# Personal Finance Tracker — SPEC.md

**Assignment 1 · Demo Project**

A single-page personal finance tracker built with plain HTML, CSS, and JavaScript. No backend, no frameworks, no libraries.

---

## 1. Overview

Track income, expenses, loans, fixed deposits (FDs), SIPs, and owned stocks in one place, with a dashboard that pulls everything together into a single financial snapshot.

- **Currency:** All amounts in ₹, formatted with Indian digit grouping (e.g. `₹1,23,456`).
- **Persistence:** Everything is saved in the browser via `localStorage` — no server, no database.
- **Setup:** No build step or install required. Right-click `index.html` in VS Code → **Open with Live Server**.

**Stack:** HTML · CSS · Vanilla JavaScript · `localStorage`

---

## 2. Core Design Principle

> **The dashboard can't be wrong.**

There is no stored total that can fall out of sync with reality. Every number shown on the dashboard is *derived* from the raw entries at the moment the screen is drawn — never cached, never persisted as a separate value.

**Store the entries. Calculate the totals.**

This principle governs the whole app:

- One **state object** is the single source of truth.
- The only allowed flow is: **change state → save → redraw.**
- The DOM is never touched directly outside of a redraw — no manual patching of individual elements.

---

## 3. Tabs & Functionality

### 3.1 Dashboard

- **Headline metric — Net Cash Flow:**
  `income − expenses − EMI − SIP`
  - Green when positive, red when in deficit.
- **Flow bar:** visual breakdown of where the month's money goes.
- **Eight summary cards:**
  1. Income
  2. Expenses
  3. EMI
  4. SIP
  5. Outstanding debt
  6. FD value
  7. SIP contributed
  8. Stocks invested
- **Quick Add:** shortcut inputs for logging salary and expenses directly from the dashboard.

### 3.2 Income & Expenses

- Add and delete income entries and expense entries.
- Expenses capture:
  - Category
  - Date
  - Optional "Why?" note
- A **category dropdown filter** narrows the visible list — filtering only *hides* entries, it never deletes data.

### 3.3 Investments

Four sub-sections, each supporting add/delete:

| Type | Fields |
|---|---|
| **Loans** | EMI, interest rate, months remaining |
| **FDs** | Principal, interest rate, start/maturity dates |
| **SIPs** | Monthly contribution, start date |
| **My Stocks** | Name, sector, quantity, buy price |

- **My Stocks** additionally supports **inline editing** (not just add/delete).

### 3.4 Stocks to Watch

- A fixed, hardcoded sample list (not user-editable data).
- Toggle to sort by top performers.
- Filter by sector.
- Clearly labelled as **sample data for learning purposes** — not live prices, not investment advice.

---

## 4. Functional Requirements

- [ ] **Five entry types + owned stocks** (income, expenses, loans, FDs, SIPs, stocks) — each supports add / delete, with filtering available where specified.
- [ ] **Dashboard is fully calculated:** all nine derived values (net cash flow + eight cards) are recomputed on every render and never stored.
- [ ] **Single source of truth:** one state object; every change follows change → save → redraw; no direct DOM manipulation.
- [ ] **Persistence:**
  - Saves to `localStorage` on every change.
  - Loads from `localStorage` on startup.
  - Seeds sensible defaults when storage is empty.
  - Falls back safely (does not crash) if stored data is corrupt or malformed.
- [ ] **Data integrity:** no faked or fabricated numbers — only money actually entered by the user (no simulated returns/growth).
- [ ] **Input safety:** all user input is escaped before rendering.
- [ ] **Formatting:** currency displayed in ₹ with Indian-style digit grouping.
- [ ] **Accessibility & UX:** visible focus rings on interactive elements.
- [ ] **Responsive layout:** usable on mobile screen sizes.

---

## 5. Out of Scope

- No backend, API, or database — `localStorage` only.
- No external frameworks or libraries (no React, no Bootstrap, no chart libraries, etc.).
- No real-time or live stock price data.
- No investment advice or return projections — "Stocks to Watch" is explicitly sample/learning data only.

# Country Intelligence Dashboard — SPEC.md

**Assignment 3 · Homework 2**

Search any country and instantly see its demographics, geography, economy, and national symbols.

---

## 1. Overview

A fully frontend dashboard for exploring country data — search once, see everything: population, geography, currency, languages, and national symbols, with the ability to compare two countries side by side.

- **No backend, no database, no login** — purely client-side.
- **Persistence:** favorites saved locally via `localStorage`.

**Stack:** React · Tailwind CSS · Fetch API · `localStorage`

---

## 2. Data Sources

Free, public, no-auth datasets:

- REST Countries API
- Open GeoJSON and flag sets
- Timezone and currency data

No authentication and no database — all data is fetched directly from public endpoints at request time.

---

## 3. Layout & Sections

### 3.1 Search

- Search by: name, capital, region, currency, or language.
- Instant results as the user types.

### 3.2 Overview

- Flag
- Official name
- Capital
- Population
- Area
- Region
- Subregion
- Timezone

### 3.3 Geography

- Continent
- Bordering countries
- Coordinates
- Map link
- Coastline (present / length, as data allows)

### 3.4 Languages & Currency

- Official language(s)
- Native language name(s)
- Currency name and symbol

### 3.5 National Info

- Flag
- Coat of arms
- Calling code
- Internet domain (TLD)
- Driving side

### 3.6 Statistics

Card-based summary of:
- Population density
- Area
- Number of borders
- Number of time zones
- Number of languages

### 3.7 Compare

- Select two countries and view their key fields side by side (population, area, region, currency, languages, etc.).

### 3.8 Favorites

- Save/remove countries to a personal favorites list.
- Persisted in `localStorage` — survives page reloads, no account needed.

---

## 4. Functional Requirements

- [ ] **Instant search:** results update live by name, capital, region, currency, or language.
- [ ] **Full country profile:** overview, geography, languages/currency, national info, and statistics all populated from live API data.
- [ ] **Compare mode:** any two countries can be viewed side by side across the same set of fields.
- [ ] **Favorites:** add/remove, persisted in `localStorage`, restored on load.
- [ ] **Dark / light mode:** toggle applied across the whole dashboard.
- [ ] **Responsive layout:** usable across desktop, tablet, and mobile widths.
- [ ] **Graceful handling of missing data:** fields absent from the API for a given country (e.g. no borders for an island nation) degrade cleanly rather than breaking the layout.
- [ ] **No stored duplication:** country data is fetched fresh from the API, not hardcoded or duplicated into local state beyond the current session/cache.

---

## 5. Out of Scope

- No backend server, proxy, or database — all data comes directly from public APIs.
- No user accounts or authentication — favorites are local to the browser only.
- No editing of country data — the app is read-only/exploratory.
- No real-time data (e.g. live population counters) — reflects whatever the underlying public dataset currently reports.
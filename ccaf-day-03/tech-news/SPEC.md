# Global Tech News Dashboard — SPEC.md

**Assignment 2 · Homework 1**

A clean, filterable dashboard that aggregates tech news and trending repos from public feeds into one place.

---

## 1. Overview

Pull tech news and trending GitHub repos from multiple public sources and present them in a single searchable, filterable, bookmarkable dashboard.

- **No backend** — all data fetching happens client-side.
- **Persistence:** bookmarks saved locally via `localStorage`.

**Stack:** React · Tailwind CSS · CSS · Fetch API · `localStorage`

---

## 2. Data Sources

Public RSS / JSON feeds, pulled client-side:

- Hacker News
- GitHub Trending (via community JSON mirrors)
- TechCrunch
- Ars Technica
- The Verge

Where a source only provides RSS, convert it to JSON via a public RSS-to-JSON service, contingent on CORS support.

---

## 3. Layout & Sections

### 3.1 Header

- Logo
- Search bar
- Dark / light mode toggle
- "Last updated" timestamp

### 3.2 Trending News

Per article:
- Headline
- Source
- Publish time
- Estimated reading time
- Thumbnail
- "Read" button (links out to the original article)

### 3.3 Category Filter

Instant (client-side, no reload) filtering across:
- AI
- Programming
- Startups
- Cybersecurity
- Cloud
- Mobile
- Web Dev

### 3.4 GitHub Trending

Per repo:
- Repo name
- Star count
- Primary language
- Description
- Growth today (stars gained)

### 3.5 Search

A single search bar that queries across:
- Headlines
- Repo names
- Categories

### 3.6 Bookmarks

- Save/remove articles or repos to a personal bookmark list.
- Persisted in `localStorage` — survives page reloads, no account or backend needed.

### 3.7 Footer

- Total items loaded
- Manual refresh control
- Source credits / attribution

---

## 4. Functional Requirements

- [ ] **Multi-source aggregation:** fetch and merge news + trending repos from all listed sources.
- [ ] **Category filtering:** instant, client-side, across all seven categories.
- [ ] **Search:** live search spanning headlines, repos, and categories.
- [ ] **Bookmarks:** add/remove, persisted in `localStorage`, restored on load.
- [ ] **Infinite scroll:** additional items load as the user scrolls, rather than pagination.
- [ ] **Dark / light mode:** toggle in header, applied across the whole dashboard.
- [ ] **Skeleton loading states:** placeholder UI shown while feeds are being fetched.
- [ ] **Responsive layout:** usable across desktop, tablet, and mobile widths.
- [ ] **Last-updated tracking:** header timestamp reflects the most recent successful fetch.
- [ ] **Graceful degradation:** a failed/unreachable feed doesn't break the whole dashboard — other sources still render.

---

## 5. Out of Scope

- No backend server, proxy, or database — feeds are fetched directly (or via a public conversion service) from the client.
- No user accounts or cross-device sync — bookmarks are local to the browser only.
- No push notifications or real-time streaming updates (refresh is manual or on a fetch interval, not a live socket feed).
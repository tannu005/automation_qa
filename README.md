# Automation & QA Developer — Take-Home Assessment

**Candidate:** Tannu Yadav  
**Role Applied:** Automation & QA Developer  
**Time Spent:** ~2 Hours  
**Submission Date:** May 21, 2026

---

## 📁 Repository Structure

```
automation_qa/
│
├── Task1_QA_Report.md              ← Task 1: Web App QA & Debug Report
├── Task2_Workflow.json             ← Task 2: n8n GitHub Trending Digest Workflow
├── Task2_README.md                 ← Task 2: Workflow explanation & setup guide
├── Bonus_UptimeMonitor.json        ← Bonus: n8n Uptime Monitor Workflow
├── Automation_QA_Assessment_Submission.zip  ← Full submission zip
│
└── realworld-demo/                 ← Local RealWorld demo app (for Task 1 testing)
    ├── index.html                  ← Entry HTML (CSS/font links fixed)
    ├── package.json                ← Dependencies manifest
    ├── vite.config.js              ← Vite 4 config (plugin updated)
    ├── public/
    │   └── main.css               ← Conduit theme CSS (hosted locally, CDN was dead)
    └── src/
        ├── main.jsx               ← React 18 entry point (createRoot API)
        ├── App.jsx                ← Root app with Router & page routes
        ├── server.js              ← MirageJS mock API (auto-generates fake data)
        ├── components/            ← Reusable UI components
        ├── hooks/                 ← React Query data-fetching hooks
        ├── pages/                 ← Page-level components (Home, Article, Editor…)
        └── models/                ← Data models (Article, Author)
```

---

## ✅ Task 1 — Web App QA & Debug Report

**File:** [`Task1_QA_Report.md`](./Task1_QA_Report.md)

### App Tested
- **Primary target:** `https://demo.realworld.io` (RealWorld "Conduit" demo)
- **Alternate working endpoint:** `https://demo.realworld.show` (active mirror)

### Bugs Found (6 total)

| # | Severity | Bug |
|---|---|---|
| 1 | 🔴 Critical | Cloudflare 1016 Origin DNS Error — `demo.realworld.io` is completely down |
| 2 | 🟠 High | JWT token stored in `localStorage` — vulnerable to XSS |
| 3 | 🟠 High | Comments deleted instantly with no confirmation dialog |
| 4 | 🟡 Medium | Blank screen / infinite loader on network errors — no error boundary |
| 5 | 🟡 Medium | Missing `alt` attributes on user avatar `<img>` tags — WCAG 2.1 violation |
| 6 | 🟢 Low | No character limits on article title/body — causes UI overflow |

> **Root cause analysis** for Bug #1 (Critical DNS failure) is fully documented in the report.

### How to Run the Demo Locally

The `realworld-demo/` folder contains a React + Vite implementation of the RealWorld spec. It runs fully offline using **MirageJS** (in-browser mock API) — no backend needed.

```bash
cd realworld-demo
npm install
npm run dev
# → App runs at http://localhost:5173
```

**Test credentials (MirageJS local mode):**
- Email: `test@test.com`
- Password: *(any value)*

**Tech Stack:**
| Layer | Technology |
|---|---|
| Language | JavaScript (JSX) |
| Framework | React 18 |
| Build Tool | Vite 4 |
| Mock API | MirageJS (in-browser, offline) |
| Data Fetching | React Query |
| HTTP Client | Axios |
| Forms | Formik |
| Routing | React Router v6 |

**Bugs fixed to run locally (documented in Task 1):**
- `index.html`: CSS pointed to dead CDN (`demo.productionready.io`) → replaced with local `/main.css`
- `index.html`: Ionicons pointing to dead `code.ionicframework.com` → switched to cdnjs
- `vite.config.js`: Deprecated `@vitejs/plugin-react-refresh` → updated to `@vitejs/plugin-react@4`
- `src/main.jsx`: Legacy `ReactDOM.render` → React 18 `createRoot` API
- `src/main.jsx`: `process.env.NODE_ENV` → `import.meta.env.DEV` (Vite ESM standard)
- Production API URL: `api.realworld.io` (dead) → `api.realworld.show` (active)

---

## ✅ Task 2 — n8n GitHub Trending Repos Digest

**Workflow file:** [`Task2_Workflow.json`](./Task2_Workflow.json)  
**Explanation:** [`Task2_README.md`](./Task2_README.md)

### Workflow Summary
An n8n v1.x workflow that runs **hourly**, fetches the top 5 trending GitHub repositories, formats a rich message with repo name, stars, language, and a decoded README excerpt, then posts to a **Discord webhook**.

### Key Features
- ✅ Cron trigger (every hour)
- ✅ GitHub Search API integration with Header Auth credential
- ✅ Base64 README decoding (native JS `atob()`)
- ✅ Inline error handling via `continueOnFail` + JS checks
- ✅ Full n8n v1.x JSON schema compliance

### Setup
1. Import `Task2_Workflow.json` into your n8n instance
2. Add `DISCORD_WEBHOOK_URL` to n8n environment variables
3. Create a **Header Auth** credential named `github_token` with your GitHub PAT
4. Activate the workflow

---

## ✅ Bonus — n8n Uptime Monitor

**Workflow file:** [`Bonus_UptimeMonitor.json`](./Bonus_UptimeMonitor.json)

### Workflow Summary
Pings a configurable web app URL every **5 minutes**, measures real response time (`Date.now()` delta), sends Discord alerts on downtime, and logs results to Google Sheets.

### Setup
- `APP_URL`: URL to monitor (defaults to `https://demo.realworld.show`)
- `DISCORD_WEBHOOK_URL`: Discord webhook for alerts
- `SHEET_ID`: Google Sheet ID for uptime logs
- Configure Google OAuth2 credentials in n8n

---

## 🔑 Key Highlights

1. **Real DNS Bug Investigation** — Live Cloudflare 1016 error on `demo.realworld.io` documented with root-cause analysis and three-step fix plan
2. **n8n Schema Compliance** — All workflows validated against n8n v1.x JSON structure; no placeholder UUIDs
3. **Real Response-Time Measurement** — `Date.now() - startTime` delta replaces any random simulation
4. **Dead CDN Discovery** — `demo.productionready.io/main.css` (app's stylesheet CDN) was also dead — found, diagnosed, and fixed with a locally-hosted replacement
5. **React 18 Migration** — Upgraded the demo app from React 17 + Vite 2 to React 18 + Vite 4 to get it running

---

## 📬 Contact

**Tannu Yadav**  
📧 ytannu1410@gmail.com  
🔗 GitHub: [@tannu005](https://github.com/tannu005)

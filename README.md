# QA & Automation Developer Assessment - Submission Package

**Candidate:** Tannu  
**Time Spent:** ~2 Hours  

This repository contains the complete submission package for the Automation & QA Developer Take-Home Assessment.

---

## 📂 Deliverables & File Manifest

| File | Purpose | Description |
|---|---|---|
| [Task1_QA_Report.md](file:///c:/Users/YTANNU/Downloads/oa_assignment/Task1_QA_Report.md) | **Task 1: QA & Debug Report** | Report on 6 identified bugs (Infrastructure, Security, UI/UX, Accessibility) for `demo.realworld.io`, plus root cause analysis for the critical DNS error. |
| [Task2_Workflow.json](file:///c:/Users/YTANNU/Downloads/oa_assignment/Task2_Workflow.json) | **Task 2: n8n Workflow JSON** | Fully importable, modern n8n v1.x workflow JSON for the GitHub Trending Repos Hourly Digest. |
| [Task2_README.md](file:///c:/Users/YTANNU/Downloads/oa_assignment/Task2_README.md) | **Task 2: Workflow README** | Detailed explanation of the APIs, data transformation (base64 decoding), branching conditions, and error-handling logic. |
| [Bonus_UptimeMonitor.json](file:///c:/Users/YTANNU/Downloads/oa_assignment/Bonus_UptimeMonitor.json) | **Bonus: n8n Uptime Monitor** | Fully importable n8n v1.x workflow that pings the web app every 5 minutes, measures real response time, alerts on downtime, and logs to Google Sheets. |

---

## 🛠️ Quick Start & Setup Instructions

### 1. Importing the n8n Workflows
1. Log into your **n8n** instance (Cloud or self-hosted).
2. Click **New Workflow** -> Select **Workflow Settings (top-right)** -> **Import from file**.
3. Import `Task2_Workflow.json` for the trending repos digest, or `Bonus_UptimeMonitor.json` for the uptime monitor.

### 2. Required n8n Environment Configuration
Add the following variables to your n8n environment configuration:
- `DISCORD_WEBHOOK_URL`: The webhook URL for your Discord notification channel.
- `APP_URL`: The target application URL to monitor (defaults to `https://demo.realworld.show` if not set).
- `SHEET_ID`: The ID of your Google Sheet used by the Uptime Monitor logs.

### 3. Credential Setup
- **GitHub API (Task 2)**: Create a new Header Auth credential in n8n named `github_token` containing your GitHub Personal Access Token (PAT).
- **Google Sheets API (Bonus)**: Authenticate the Google Sheets node using your Google OAuth2 credentials to write log lines.

---

## 💡 Highlights of Key Improvements Added

- **Real DNS Bug Investigation**: Discovered and documented the live Cloudflare 1016 DNS origin error currently affecting the `demo.realworld.io` backend, analyzing edge redirects as a primary fix.
- **n8n Workflow Schema Compliance**: Rewrote all node definitions to follow modern n8n v1.x JSON structure, fixing previous schema and UUID validation issues.
- **Base64 Decode Integration**: Integrated real UTF-8 decoding of GitHub README base64 files instead of treating raw API payloads as strings.
- **Real Uptime Measurement**: Rewrote response-time tracking to use actual execution-based millisecond measurements (`Date.now() - startTime`) instead of random simulations.
- **Robust Inline Error Handling**: Handled node failures inline using `continueOnFail` and Javascript checks inside Code nodes to prevent workflow crashes.

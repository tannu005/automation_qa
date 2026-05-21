# Task 2: n8n API Integration Workflow

## Workflow: GitHub Trending Repos Digest

### Overview
This workflow is a data integration and notification pipeline. It:
1. Fetches trending JavaScript repositories from GitHub.
2. Filters, checks, and maps the top 5 results.
3. If the top repo has over 1,000 stars, fetches its `README.md` and decodes it.
4. Sends a formatted markdown digest to a Discord channel via Webhook.
5. Employs inline error checking to prevent silent failures and routes API errors to Discord.

---

### APIs Integrated

1. **GitHub Search API (`GET /search/repositories`)**:
   - **Why**: Returns real-time repository data. No auth is strictly required for testing, but a Personal Access Token (PAT) is utilized to avoid rate limiting.
2. **GitHub Repository Content API (`GET /repos/{owner}/{repo}/readme`)**:
   - **Why**: Used for second-stage data enrichment. Fetches the README file of the top-ranking repo to extract preview text.
3. **Discord Webhooks API (`POST /api/webhooks/...`)**:
   - **Why**: Provides an easy, zero-dependency endpoint for real-time rich-text formatting and notification delivery.

---

### Data Transformation & Enrichment

- **Check & Transform (Code Node)**: 
  - Validates that the GitHub API responded successfully. If the API failed (e.g. rate limit/5xx), it returns an error payload: `{ error: true, message: "..." }`.
  - Otherwise, it slices the raw response to extract the top 5 repositories and maps them into a clean schema: `name`, `url`, `stars`, `description`, `language`, and `owner`.
- **Enrich with README (Code Node)**:
  - The GitHub API returns README files as base64-encoded text.
  - This node decodes the base64 content (`Buffer.from(content, 'base64').toString('utf-8')`), extracts the first 500 characters as a preview, and appends it to the repository metadata.

---

### Conditional Logic & Branching

- **IF: Has Error?**: Checks if `error === true`. If yes, it routes immediately to the **Discord Error Notification** node to alert the team. If no, it routes to the next condition.
- **IF: High Popularity**: Compares the top repository's star count against a threshold of **1,000**.
  - **TRUE**: Triggers README enrichment and sends the rich hourly digest.
  - **FALSE**: Sends a simple notification notifying the team that lower popularity repos were found.

---

### Robust Error Handling

- **Resilient Execution**: The `Fetch GitHub Trending` and `Fetch Top Repo README` nodes have **Continue On Fail** enabled. If GitHub is down, the workflow does not crash.
- **Error Propagation**: Any error in the primary API call is captured in the `Check & Transform` code node, which flags the output as an error and routes it through the `IF: Has Error?` node to post a detailed warning message directly to Discord.
- **Partial Degradation**: If the README fetch fails (e.g., repository has no README or is private), the workflow gracefully falls back to sending the repo metadata with a "README not available" notice.

---

### Credentials Configuration

- **No Secrets Hardcoded**: Credentials are managed via n8n's secure credential manager.
  - **GitHub API PAT** is set up as a Header Auth credential or predefined GitHub Account named `github_token`.
  - **Discord Webhook URL** is loaded dynamically via an environment variable (`$env.DISCORD_WEBHOOK_URL`) configured in the n8n environment.

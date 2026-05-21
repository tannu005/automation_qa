# Automation & QA Assessment - Task 1: QA & Debug Report

**Candidate Name:** Tannu  
**Date:** May 21, 2026  
**App Tested:** RealWorld Demo (https://demo.realworld.io & https://demo.realworld.show)  

---

## Bug Report Summary

| # | Title / Summary | Steps to Reproduce | Expected vs Actual | Severity | Suspected Cause |
|---|---|---|---|---|---|
| 1 | **Critical Infrastructure**: Cloudflare 1016 Origin DNS Error | 1. Navigate to `https://demo.realworld.io` or fetch `https://api.realworld.io/api/articles`. | Should load the app/API normally. Instead, Cloudflare displays "Error 1016: Origin DNS error" and returns HTTP 530. | Critical | DNS misconfiguration or decommissioned backend server with stale DNS records. |
| 2 | **High Security**: JWT token stored in LocalStorage | 1. Log in to the application.<br>2. Open DevTools > Application > Local Storage.<br>3. Locate the auth token. | Auth token should be stored in secure, HttpOnly, SameSite cookies. Instead, it is stored in LocalStorage, vulnerable to XSS. | High | Insecure frontend storage strategy for session tokens. |
| 3 | **High UX**: Instant comment deletion without confirmation | 1. Create/view an article.<br>2. Add a comment.<br>3. Click the trash icon on the comment. | Clicking delete should prompt a confirmation dialog. Instead, the comment is deleted instantly. | High | Missing verification step/modal in the UI component code. |
| 4 | **Medium UX**: Blank screen/infinite loading on network error | 1. Throttling network or simulating server downtime (e.g. invalid endpoint).<br>2. Observe app behavior. | UI should display a user-friendly error message with a retry button. Instead, it stays in infinite loading or turns blank. | Medium | Lack of global error boundaries or error-catch state handling in API service layer. |
| 5 | **Medium Accessibility**: Missing `alt` tags on user avatar images | 1. Open DevTools and inspect any user avatar in feed or comments. | Image tags should contain descriptive `alt` text (e.g., `alt="Tannu's profile image"`). Instead, the `alt` attribute is missing. | Medium | Violation of WCAG 2.1 Guideline 1.1 (Non-text Content); missing alt properties in image components. |
| 6 | **Low UX**: No character limits or truncation on article inputs | 1. Click "New Article".<br>2. Enter a title with 500+ characters.<br>3. Submit the article. | Inputs should validate length on the client side. Instead, it submits, causing text overflow that breaks the UI card layout. | Low | Missing client-side form validation attributes (`maxlength`) or CSS text-overflow truncation rules. |

---

## Root Cause Analysis: Issue #1 (Critical)

### Cloudflare 1016 (Origin DNS Error) on demo.realworld.io and api.realworld.io

**What is happening:**  
When visiting `https://demo.realworld.io` or calling the backend endpoint at `https://api.realworld.io`, requests fail with an HTTP 530 status code and show a Cloudflare "Error 1016: Origin DNS Error" page. This makes the legacy hosted demo application and API completely unusable for global users and automated API integrations.

**Why it's happening:**  
This error indicates that Cloudflare is acting as a reverse proxy for the subdomains, but it is unable to resolve the IP address of the origin server behind them. The hosting infrastructure for the legacy `.io` domains was decommissioned or moved, but the DNS A/AAAA records in the Cloudflare DNS dashboard were either deleted, left empty, or are pointing to inactive servers. The project has recently migrated its official active endpoints to `demo.realworld.show` and `api.realworld.show`, but the legacy `.io` DNS configurations remain uncorrected.

**How to fix it:**  
1. **Redirect at Edge**: The domain administrator needs to log into the DNS manager (Cloudflare) and set up a Page Rule or Redirect Rule to perform a `301 Permanent Redirect` from `https://demo.realworld.io/*` to `https://demo.realworld.show/$1` and `https://api.realworld.io/*` to `https://api.realworld.show/$1`. This instantly restores service compatibility for clients still pointing to the legacy domain names.
2. **Update DNS Records**: If the legacy domain must be retained without redirection, A/AAAA records for the subdomains must be updated to point to the active backend IP addresses.
3. **Codebase Cleanup**: Update all API URLs in the frontend implementations across the repository ecosystem from `https://api.realworld.io` to `https://api.realworld.show`.

---

## Testing Methodology

- **Client Environment**: Google Chrome with Chrome DevTools (Console, Application, Network, Elements).
- **API Environment**: Windows PowerShell invoking REST queries against `api.realworld.io` and `api.realworld.show` endpoints to verify availability, response headers, and payloads.
- **Accessibility Testing**: Inspections of DOM nodes to check compliance with WCAG 2.1 accessibility criteria.

---

## Recommendations

1. **Immediate (P0)**: Update the legacy Cloudflare DNS records or implement redirect rules to point to the new `.show` domains.
2. **Short-term (P1)**: Update frontend authentication state storage to use secure, HttpOnly, and SameSite cookies instead of LocalStorage to prevent XSS-based token theft.
3. **Medium-term (P2)**: Implement a modal confirmation dialog before destructive actions (like comment deletion) and add client-side input validations (such as maximum length constraints).
4. **Long-term (P3)**: Integrate global UI error boundaries and fallback screens to handle failed API calls gracefully without locking the interface, and audit all image tags for WCAG-compliant `alt` text.

# Goofind — App Store Release Guide

Step-by-step checklist to publish **Goofind** (`com.goofind.app`) on the Apple App Store.

---

## Current project facts

| Item | Value |
|------|--------|
| App name | Goofind |
| Bundle ID | `com.goofind.app` |
| iOS version | 1.0 (build 1) |
| Firebase project | `gen-lang-client-0422005049` |
| Live app URL | https://gen-lang-client-0422005049.firebaseapp.com |
| GitHub repo | https://github.com/songul63/GOOFIND-.git |
| Capacitor | Loads live Firebase URL (web updates without new App Store build) |

### Required public URLs (App Store Connect)

Use these in **App Privacy**, **Support URL**, and **Privacy Policy URL**:

- **Privacy Policy:** https://gen-lang-client-0422005049.firebaseapp.com/?page=privacy
- **Support / Contact:** https://gen-lang-client-0422005049.firebaseapp.com/?page=support
- **Account deletion:** https://gen-lang-client-0422005049.firebaseapp.com/?page=delete-account

---

## Phase 1 — Accounts (you do manually)

### Step 1: Apple Developer Program
1. Go to https://developer.apple.com/programs/
2. Enroll with Apple ID (**$99 USD / year**).
3. Wait for approval (usually 24–48 hours).
4. Note your **Team ID** (Apple Developer → Membership).

### Step 2: App Store Connect app record
1. https://appstoreconnect.apple.com → **Apps** → **+** → **New App**
2. Platform: **iOS**
3. Name: **Goofind**
4. Primary language: English or Turkish
5. Bundle ID: **com.goofind.app** (create in Developer portal first if missing)
6. SKU: e.g. `goofind-ios-001`

### Step 3: Register Bundle ID (if not exists)
1. https://developer.apple.com/account/resources/identifiers/list
2. **+** → App IDs → App → Description: Goofind
3. Bundle ID: **com.goofind.app**
4. Enable: **Sign In with Apple** (required for Apple login)

### Step 4: Apple Sign-In (already configured in code)
Verify in Apple Developer → **Identifiers** → Services ID `ca.goofind.signin`:
- Domain: `gen-lang-client-0422005049.firebaseapp.com`
- Return URL: `https://gen-lang-client-0422005049.firebaseapp.com/__/auth/handler`

Verify Firebase → Authentication → Apple provider matches Team ID, Key ID, Services ID.

---

## Phase 2 — Firebase & GitHub (technical)

### Step 5: Deploy production web app
From project root:

```bash
npm install
npm run deploy
```

This deploys **hosting**, **functions**, and **storage rules**.  
Hosting-only quick update:

```bash
npm run deploy:hosting
```

Login if needed:

```bash
npx firebase login
npx firebase use gen-lang-client-0422005049
```

### Step 6: Push code to GitHub
```bash
git add .
git commit -m "Prepare Goofind 1.0 for App Store release"
git push origin main
```

GitHub Actions (`.github/workflows/ios_build.yml`) verifies the iOS project builds on every push.

### Step 7: Sync Capacitor iOS (on your Mac)
```bash
npm run app:sync
npm run app:open:ios
```

---

## Phase 3 — Xcode archive & upload

### Step 8: Signing in Xcode
1. Open `ios/App/App.xcodeproj` in Xcode.
2. Select target **App** → **Signing & Capabilities**.
3. Team: your Apple Developer team.
4. Bundle Identifier: `com.goofind.app`
5. Add capability: **Sign In with Apple** (if using native wrapper later).

Create in Developer portal:
- **Distribution certificate** (Apple Distribution)
- **App Store provisioning profile** for `com.goofind.app`

### Step 9: Archive
1. Xcode → destination: **Any iOS Device (arm64)**
2. **Product → Archive**
3. **Distribute App → App Store Connect → Upload**

Or export IPA with `ios/ExportOptions.plist` (edit Team ID + profile name first).

### Step 10: TestFlight (recommended before public release)
1. App Store Connect → your app → **TestFlight**
2. Wait for processing (~5–30 min)
3. Add internal testers (your Apple ID)
4. Install via TestFlight app and test: login, maps, photos, chat, reviews

---

## Phase 4 — App Store listing

### Step 11: App information
- **Subtitle:** Canada Turkish Community Hub
- **Category:** Social Networking (primary) or Lifestyle
- **Age rating:** complete questionnaire (likely 4+ or 12+ depending on UGC/chat)
- **Copyright:** © 2026 Goofind Canada

### Step 12: Screenshots (required sizes)
Use iPhone 6.7" (1290×2796) and 6.5" (1284×2778) at minimum.  
Tip: run app in simulator → **Cmd+S** screenshot, or use in-app Screenshot Optimizer.

Minimum sets:
- 3–10 screenshots per device size
- Optional: App Preview video (15–30 sec)

### Step 13: App Privacy (nutrition labels)
Declare in App Store Connect based on actual data collection:
- Contact info (email, name) — account
- User content (photos, messages, reviews)
- Location — approximate/precise when user uses map
- Identifiers — Firebase Auth user ID
- Data linked to user: Yes (account features)
- Tracking: No (unless you add ads/analytics later)

Link privacy policy URL (see table above).

### Step 14: Review notes for Apple
Paste in **App Review Information → Notes**:

```
Goofind is a community business directory for the Turkish diaspora in Canada.

Test account (if you create one):
Email: [YOUR_TEST_EMAIL]
Password: [YOUR_TEST_PASSWORD]

The app loads our hosted web application inside a Capacitor WebView from:
https://gen-lang-client-0422005049.firebaseapp.com

Account deletion: https://gen-lang-client-0422005049.firebaseapp.com/?page=delete-account
Privacy policy: https://gen-lang-client-0422005049.firebaseapp.com/?page=privacy
Support: https://gen-lang-client-0422005049.firebaseapp.com/?page=support
```

### Step 15: Submit for review
1. Select the uploaded build under **App Store** tab
2. Complete all required fields (screenshots, description, keywords)
3. **Submit for Review**

Review typically takes **1–3 days**.

---

## Phase 5 — After approval

- Monitor **App Store Connect → Analytics**
- For web-only UI changes: `npm run deploy:hosting` (no new iOS build needed)
- For native changes (permissions, bundle ID, plugins): bump `MARKETING_VERSION` / `CURRENT_PROJECT_VERSION` in Xcode and upload new build

---

## Quick command reference

```bash
npm run build              # Web production build
npm run deploy             # Firebase hosting + functions + storage
npm run app:sync           # Build + cap sync iOS/Android
npm run app:open:ios       # Open Xcode
npm run release:check      # Pre-flight checklist script
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Apple Sign-In fails | Check Services ID domain + Firebase Apple provider |
| Blank white screen in app | Deploy hosting; verify CAPACITOR_LIVE URL in capacitor.config.ts |
| Archive signing error | Regenerate provisioning profile; match bundle ID |
| Missing privacy strings | Info.plist already includes camera/photos/location/mic |
| GitHub Actions iOS fail | Check macos runner logs; run `npm run app:sync` locally |

---

## Next step (start here)

**If you have Apple Developer account:** tell me and we do **Step 8 (Xcode signing)** together.

**If not enrolled yet:** complete **Step 1** first, then continue with Step 2.

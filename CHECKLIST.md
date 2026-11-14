# Build checklist: Jeff Jen Care Plus

Legend: `[ ]` to do · `[x]` done and verified · `[!]` needs the client

## 1. Brief
- [x] Interview: facts taken from the current site (owner asked for this), goal/CTA/style/hero chosen
- [x] `BRIEF.md` written and confirmed
- [x] Name checks: not needed (existing business)

## 2. Setup
- [x] Template copied into a new folder
- [x] `package.json` name changed, `npm install` done
- [x] `git init` on branch `main` (nothing committed yet)

## 3. Content
- [x] `site-config.ts`: name, legal name, contact, domain, area
- [!] Office opening hours (only "day and night, 7 days" is known)
- [x] Services in sales order (home care leads); no prices (none on old site); admin can add them
- [x] Process steps: call → get to know you → care plan → familiar carers
- [!] Process: confirm this matches how care is arranged (e.g. is the assessment free?)
- [x] Work section replaced by promises; optional "Team & news" appears only once real photos are added
- [x] Company number 09301895
- [!] Registered office: assumed to be the Cowley office
- [x] Privacy page: processors, retention, contact
- [x] Unknown facts marked `TO CONFIRM`; no reviews, years or ratings invented

## 4. Design
- [x] Preset D, warm & natural (light); Fraunces + Geist via next/font
- [x] Logo mark redrawn from the original (house held in two hands)
- [x] `contrast.mjs` run; faint text raised to ≥ 70% ink (≥ 4.5:1)
- [x] Pencil cursor removed
- [x] `DESIGN.md` written (awesome-design-md format; own system, no brand copied)
- [x] FAQ accordion (VengeanceUI, restyled, `inert` when closed) + FAQPage JSON-LD; answers are facts from the old site
- [x] Floating call button on phones (Uiverse.io, andrew-demchenk0) with pulse ring, off for reduced motion
- [x] Heart loader in the form's send button (Uiverse.io, FWDJc)

## 5. Hero
- [x] Concept confirmed: front door → hallway → sitting room → zoom on the cup of tea; no words, no people
- [x] Cost quoted (≈ 15.75 credits) and approved
- [x] Keyframes checked by eye
- [x] Clips checked with contact sheets; no glitches; seam matches
- [x] 1080p desktop (9.4 MB) + 121-frame mobile WebP sequence; poster + end stills
- [x] Zoom origin measured on the last frame (50% 53%)

## 5b. Admin panel (required)
- [x] Labels renamed: "Notice, prices & hours" (recruiting notice), "Team & news"
- [x] Editable: recruiting notice, price lines, opening hours, team/news photos
- [x] Tested locally (8/8 checks): notice edit on homepage, price on Services, photo on homepage, enquiry status saved, login + wrong password
- [x] `.data/` and `public/uploads/` deleted after testing

## 6. Verify
- [x] `npx tsc --noEmit`, `npx eslint .`, `npx next build` clean
- [x] Every route 200; `/admin` → login; old `/contact-us`, `/recruitment` redirect
- [x] Screenshots at 1440px and 390px; no horizontal overflow
- [x] Hero plays end to end; zoom lands on the cup
- [x] Contact form shows "please call" without storage/Resend
- [x] Only console error locally is Vercel Analytics (works once deployed)
- [x] Fixed template bug: proxy redirect loop when the canonical host has no `www`

## 7. Hand-over
- [x] Summary + `TO CONFIRM` list
- [x] Credits spent: 15.75 (270 → 254.25)
- [ ] Commit / push only when asked (private repo by default)
- [!] Launch: domain DNS to Vercel, Resend domain verification, env vars
- [!] Admin live: Upstash Redis + Blob, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
- [!] CQC location ID → switches on the official rating widget (required once rated)

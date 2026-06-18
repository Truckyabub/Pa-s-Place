# Steady Voice AI Studio

Steady Voice AI Studio is a local-first music creation workspace for original songwriting, legal-rights tracking, vocal consistency planning, and manual release packaging.

It is designed as a safe MVP first:

- mock generation by default
- no telemetry by default
- local browser storage
- no scraping
- no real-artist imitation
- no automated uploads

## Open locally

The primary app scaffold now lives in the Next.js source tree under `src/`.

If you want the static MVP fallback, you can still open `index.html` directly.

### Quick local server

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

### Next.js workflow

```bash
npm install
npm run dev
```

Verified build/runtime note:

- The Next.js production build was verified here with Node 22.22.3.
- Node 24.15.0 in this workspace triggered a Next build worker crash, so keep Node 22 around for local verification until that environment issue is resolved.

## Main features

- Artist Vault
- Voice Profile Builder
- Vocal Consistency Lab
- Lyric Studio
- Style Prompt Studio
- Song Builder
- Arrangement Timeline
- Stem Mixer
- Generation Queue
- Rights Ledger
- Album Builder
- Cover Art Prompt Studio
- Export and Release Checklist
- Settings
- Legal Compliance Center
- Dataset / License Manager
- Personal Development Mode
- Admin Debug Console

## Local data

The app stores data in browser localStorage under a single workspace key.

## Export behavior

If the browser supports the File System Access API, the export action writes a release folder tree directly to the folder you choose.

If that API is not available, the app downloads a JSON manifest and you can use it as a guide for manual folder creation.

## Safety rules

- Use only original, owned, licensed, public-domain, or otherwise permissioned material.
- Do not imitate real living artists.
- Do not clone voices without explicit consent.
- Do not scrape music platforms.
- Do not bypass DRM, paywalls, or platform terms.

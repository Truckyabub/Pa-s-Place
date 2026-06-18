# Vercel Deployment

This repo is configured for Vercel as a standard Next.js app.

## Requirements

- Node 22.x
- npm install
- build must pass locally

## Deploy steps

1. Push this repo to GitHub.
2. Import the GitHub repo into Vercel.
3. Keep the default Next.js framework detection.
4. Leave the build command as `npm run build`.
5. Deploy from the Vercel dashboard.

## Notes

- The app was verified locally with Node `22.22.3`.
- The workspace Node `24.15.0` caused a Next build worker crash, so use Node 22 for reliable local verification.
- The app still uses mock generation only and local browser storage.


export type ModulePageEntry = {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
};

export const modulePages: ModulePageEntry[] = [
  {
    slug: "dashboard",
    title: "Dashboard",
    summary: "High-level overview of artists, voices, albums, queue status, and rights readiness.",
    bullets: ["Shows current project health", "Highlights legal risk state", "Links to core studio workflows"]
  },
  {
    slug: "artist-vault",
    title: "Artist Vault",
    summary: "Persistent artist identity profiles with prompt memory, rights notes, and release history.",
    bullets: ["Original artist identities only", "No real-artist imitation", "Tracks ownership notes"]
  },
  {
    slug: "voice-profile-builder",
    title: "Voice Profile Builder",
    summary: "Create legal voice profiles for original, licensed, or consent-based voices only.",
    bullets: ["Source type and consent status", "Vocal range and tone controls", "Similarity target warnings"]
  },
  {
    slug: "vocal-consistency-lab",
    title: "Vocal Consistency Lab",
    summary: "Tools for seed locking, timbre stability, pronunciation notes, and drift warnings.",
    bullets: ["Fixed seed locking", "Phrase memory", "Similarity risk indicators"]
  },
  {
    slug: "lyric-studio",
    title: "Lyric Studio",
    summary: "Original lyric drafting with runtime targets, hook strength, and copyright-risk flags.",
    bullets: ["Tracklist generator", "Song section builder", "Export and copy actions"]
  },
  {
    slug: "style-prompt-studio",
    title: "Style Prompt Studio",
    summary: "Safe prompt building for internal mock generation and manual provider copy-paste.",
    bullets: ["Genre blend and BPM", "Avoid-soundalike notes", "Export prompt text"]
  },
  {
    slug: "song-builder",
    title: "Song Builder",
    summary: "Guided workflow for locking vocals, saving versions, and reviewing the rights ledger.",
    bullets: ["Mock generation", "Version history", "Human contribution notes"]
  },
  {
    slug: "arrangement-timeline",
    title: "Arrangement Timeline",
    summary: "DAW-inspired song layout with section durations, intensity, and regeneration notes.",
    bullets: ["Intro to outro flow", "Section-level controls", "Regeneration placeholder"]
  },
  {
    slug: "stem-mixer",
    title: "Stem Mixer",
    summary: "Placeholder mixer for vocals, drums, bass, guitars, synths, piano, FX, and master.",
    bullets: ["Volume and pan controls", "Mute and solo toggles", "Export-ready labels"]
  },
  {
    slug: "generation-queue",
    title: "Generation Queue",
    summary: "Queue-based generation state with retry tracking and provider labels.",
    bullets: ["No unlimited compute claims", "Tracks retries", "Supports adapter growth"]
  },
  {
    slug: "rights-ledger",
    title: "Rights Ledger",
    summary: "Traceable provenance for prompts, lyrics, voice sources, exports, and distribution state.",
    bullets: ["Asset-level ownership notes", "Commercial status", "Export history"]
  },
  {
    slug: "album-builder",
    title: "Album Builder",
    summary: "Album metadata, track counts, credits, explicit markers, and release-pack prep.",
    bullets: ["CSV export path", "Title casing helper", "Release checklist"]
  },
  {
    slug: "cover-art-prompt-studio",
    title: "Cover Art Prompt Studio",
    summary: "Trademark-safe cover prompt builder with square cover guidance.",
    bullets: ["No real logos", "No trademarked branding", "DistroKid-safe checklist"]
  },
  {
    slug: "export-release-checklist",
    title: "Export & Release Checklist",
    summary: "Manual release gating with folder-tree export support and manifest fallback.",
    bullets: ["Release pack export", "Downloadable manifests", "Checklist review"]
  },
  {
    slug: "legal-compliance-center",
    title: "Legal Compliance Center",
    summary: "Central place for rights warnings, consent checks, and commercial-readiness review.",
    bullets: ["Prompt risk scanning", "Rights confirmation", "Distribution notes"]
  },
  {
    slug: "dataset-license-manager",
    title: "Dataset / License Manager",
    summary: "Track dataset provenance, consent proof, and allowed use notes.",
    bullets: ["License inventory", "Proof locations", "Commercial-use flags"]
  },
  {
    slug: "personal-development-mode",
    title: "Personal Development Mode",
    summary: "Local experimentation mode with clear guardrails and no fake unlimited claims.",
    bullets: ["Local-first defaults", "Budget controls", "No telemetry by default"]
  },
  {
    slug: "settings",
    title: "Settings",
    summary: "Storage, privacy, budget, and backup controls for the local studio.",
    bullets: ["Data deletion", "Backup export", "API vault placeholder"]
  },
  {
    slug: "admin-debug-console",
    title: "Admin Debug Console",
    summary: "Inspect stored state, verify exports, and reset demo data locally.",
    bullets: ["JSON snapshot", "Backup helper", "Reset flow"]
  }
];

export const getModulePage = (slug: string) => modulePages.find((page) => page.slug === slug);

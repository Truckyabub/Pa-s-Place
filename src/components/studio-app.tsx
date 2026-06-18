"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { seedArtists } from "@/data/seed-artists";
import { seedTemplates } from "@/data/seed-templates";
import { flagRisk } from "@/lib/validation";
import { loadLocalState, saveLocalState } from "@/lib/storage";
import type { Album, ArtistProfile, VoiceProfile } from "@/types";

type StudioState = {
  artists: ArtistProfile[];
  voices: VoiceProfile[];
  albums: Album[];
  lyrics: string;
  stylePrompt: string;
  rightsNotes: string[];
};

const initialState: StudioState = {
  artists: seedArtists,
  voices: [
    {
      id: "voice-forged-lead",
      profileName: "Forged Lead",
      sourceType: "original-synthetic",
      consentLicenseStatus: "Original synthetic voice",
      vocalRange: "Baritone",
      tone: "Steel-edged and authoritative",
      grit: 7,
      rasp: 6,
      breathiness: 2,
      vibrato: 3,
      accentStrength: 3,
      deliverySpeed: 5,
      emotionCurve: "Steady verses, explosive choruses",
      pronunciationNotes: "Keep consonants crisp and clean",
      adLibLibrary: ["Right now", "Hold the line"],
      consistencySeed: "forged-001",
      vocalIdentityLock: true,
      bannedSimilarityTargets: ["No living artist imitation"],
      commercialUseAllowed: "pending",
      licenseProofNotes: "Original synthetic definition"
    }
  ],
  albums: [
    {
      id: "album-night-shift",
      artistId: "artist-iron-stallion",
      title: "Night Shift Anthem",
      trackCount: 8,
      genre: "Industrial metal",
      runtimeTarget: "3:12",
      credits: "Writer: demo user",
      releaseNotes: "Mock release pack",
      explicitMarkers: "Clean"
    }
  ],
  lyrics: "",
  stylePrompt: "",
  rightsNotes: []
};

export function StudioApp() {
  const [state, setState] = useState<StudioState>(() => loadLocalState(initialState));

  useEffect(() => {
    saveLocalState(state);
  }, [state]);

  const selectedArtist = (state.artists[0] ?? initialState.artists[0])!;
  const warnings = useMemo(() => flagRisk(`${state.lyrics}\n${state.stylePrompt}`), [state.lyrics, state.stylePrompt]);

  const addRightsNote = (note: string) => {
    setState((current) => ({ ...current, rightsNotes: [note, ...current.rightsNotes].slice(0, 10) }));
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl gap-4 p-4 text-slate-100">
      <section className="hidden w-72 shrink-0 rounded-3xl border border-white/10 bg-[#0b1214] p-4 lg:block">
        <h1 className="text-xl font-semibold">Steady Voice AI Studio</h1>
        <p className="mt-2 text-sm text-slate-400">Local-first, legal-first music workflow.</p>
        <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-3 text-sm text-emerald-100">
          Personal Development Mode
        </div>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          {["Dashboard", "Artist Vault", "Voice Builder", "Lyric Studio", "Style Prompt", "Song Builder", "Rights Ledger"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 px-3 py-2">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="flex-1 space-y-4">
        <header className="rounded-3xl border border-white/10 bg-[#11181b] p-5 shadow-[0_24px_72px_rgba(0,0,0,0.38)]">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Legal-first music creation workspace</p>
          <h2 className="mt-2 text-3xl font-semibold">{selectedArtist.name}</h2>
          <p className="mt-2 max-w-3xl text-slate-400">Mock generation only by default. No scraping, no unauthorized voice cloning, no real-artist imitation.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-full border border-white/15 px-4 py-2 font-medium" href="/modules">
              Browse module pages
            </Link>
            <Link className="rounded-full bg-emerald-300 px-4 py-2 font-medium text-slate-950" href="/">
              Studio home
            </Link>
          </div>
        </header>

        <div className="grid gap-4 xl:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-[#11181b] p-4">
            <h3 className="font-semibold">Lyric Studio</h3>
            <textarea
              className="mt-3 min-h-48 w-full rounded-2xl border border-white/10 bg-black/40 p-3 text-sm"
              value={state.lyrics}
              onChange={(event) => setState((current) => ({ ...current, lyrics: event.target.value }))}
              placeholder="Write original lyrics here"
            />
            <button
              className="mt-3 rounded-full bg-emerald-300 px-4 py-2 font-medium text-slate-950"
              onClick={() => {
                setState((current) => ({ ...current, lyrics: "Verse 1\nOriginal lines only.\n\nChorus\nKeep it legal and original." }));
                addRightsNote("Generated original lyric draft.");
              }}
            >
              Generate lyric mock
            </button>
          </article>

          <article className="rounded-3xl border border-white/10 bg-[#11181b] p-4">
            <h3 className="font-semibold">Style Prompt Studio</h3>
            <textarea
              className="mt-3 min-h-48 w-full rounded-2xl border border-white/10 bg-black/40 p-3 text-sm"
              value={state.stylePrompt}
              onChange={(event) => setState((current) => ({ ...current, stylePrompt: event.target.value }))}
              placeholder="Describe original style, BPM, mood, instrumentation"
            />
            <button
              className="mt-3 rounded-full border border-white/15 px-4 py-2 font-medium"
              onClick={() => {
                setState((current) => ({
                  ...current,
                  stylePrompt: `Original prompt for ${selectedArtist.name}: ${selectedArtist.genreIdentity}. Use ${seedTemplates.arrangement.join(" / ")} and avoid soundalike cues.`
                }));
                addRightsNote("Generated original style prompt.");
              }}
            >
              Generate style mock
            </button>
          </article>
        </div>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-[#11181b] p-4">
            <h3 className="font-semibold">Rights warnings</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {warnings.length ? warnings.map((warning) => <div key={warning}>• {warning}</div>) : <div>No obvious risk phrases detected.</div>}
            </div>
          </article>
          <article className="rounded-3xl border border-white/10 bg-[#11181b] p-4">
            <h3 className="font-semibold">Tracklist template</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {seedTemplates.arrangement.map((item) => <div key={item}>• {item}</div>)}
            </div>
          </article>
          <article className="rounded-3xl border border-white/10 bg-[#11181b] p-4">
            <h3 className="font-semibold">Rights ledger</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {state.rightsNotes.length ? state.rightsNotes.map((item) => <div key={item}>• {item}</div>) : <div>No rights notes yet.</div>}
            </div>
          </article>
        </section>

        <section className="rounded-3xl border border-white/10 bg-[#11181b] p-4">
          <h3 className="font-semibold">Commercial readiness checklist</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2 text-sm text-slate-300">
            {seedTemplates.checklist.map((item) => <div key={item}>☐ {item}</div>)}
          </div>
        </section>
      </section>
    </main>
  );
}

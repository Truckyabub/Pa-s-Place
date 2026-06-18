import Link from "next/link";
import type { ModulePageEntry } from "@/lib/module-pages";

export function ModulePage({ page }: { page: ModulePageEntry }) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl p-6 text-slate-100">
      <div className="rounded-3xl border border-white/10 bg-[#11181b] p-6 shadow-[0_24px_72px_rgba(0,0,0,0.38)]">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Steady Voice AI Studio</p>
        <h1 className="mt-2 text-3xl font-semibold">{page.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-400">{page.summary}</p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {page.bullets.map((bullet) => (
            <div key={bullet} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              {bullet}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-full bg-emerald-300 px-4 py-2 font-medium text-slate-950" href="/">
            Open studio
          </Link>
          <Link className="rounded-full border border-white/15 px-4 py-2 font-medium text-slate-100" href="/modules">
            All modules
          </Link>
        </div>
      </div>
    </main>
  );
}

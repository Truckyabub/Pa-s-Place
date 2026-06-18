import Link from "next/link";
import { modulePages } from "@/lib/module-pages";

export default function ModulesIndexPage() {
  return (
    <main className="mx-auto min-h-screen max-w-6xl p-6 text-slate-100">
      <div className="rounded-3xl border border-white/10 bg-[#11181b] p-6 shadow-[0_24px_72px_rgba(0,0,0,0.38)]">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Route index</p>
        <h1 className="mt-2 text-3xl font-semibold">Studio pages</h1>
        <p className="mt-3 max-w-2xl text-slate-400">Each module route is a focused page that explains the workflow and keeps the legal-first framing visible.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modulePages.map((page) => (
            <Link key={page.slug} href={`/modules/${page.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
              <h2 className="font-semibold">{page.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{page.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

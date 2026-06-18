import { notFound } from "next/navigation";
import { getModulePage } from "@/lib/module-pages";
import { ModulePage } from "@/components/module-page";

type Params = { slug: string };

export default async function ModuleRoutePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getModulePage(slug);
  if (!page) notFound();
  return <ModulePage page={page} />;
}

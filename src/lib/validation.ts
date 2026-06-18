export function flagRisk(text: string): string[] {
  const value = text.toLowerCase();
  const warnings: string[] = [];
  if (value.includes("in the style of")) warnings.push("Avoid soundalike style requests.");
  if (value.includes("sound like")) warnings.push("Do not imitate a real artist.");
  if (value.includes("clone")) warnings.push("Voice cloning needs explicit permission.");
  if (value.includes("lyrics from")) warnings.push("Do not reproduce copyrighted lyrics.");
  if (value.includes("logo")) warnings.push("Avoid trademarked branding.");
  return warnings;
}

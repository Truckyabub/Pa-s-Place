export interface AudioGenerationProvider {
  providerName: string;
  validateInput(input: unknown): boolean;
  estimateCost(input: unknown): { tokens?: number; dollars?: number; durationMs?: number };
  generateSong(input: unknown): Promise<{ summary: string; fileReference: string; status: string }>;
  generateVocals(input: unknown): Promise<{ summary: string; fileReference: string; status: string }>;
  generateInstrumental(input: unknown): Promise<{ summary: string; fileReference: string; status: string }>;
  regenerateSection(input: unknown): Promise<{ summary: string; fileReference: string; status: string }>;
  generateStems(input: unknown): Promise<{ summary: string; fileReference: string; status: string }>;
  getUsage(): { requests: number; cost: number };
  validateLicense(input: unknown): { allowed: boolean; reason: string };
}

const usage = { requests: 0, cost: 0 };

export const MockProvider: AudioGenerationProvider = {
  providerName: "MockProvider",
  validateInput() {
    return true;
  },
  estimateCost() {
    return { tokens: 0, dollars: 0, durationMs: 120 };
  },
  async generateSong() {
    usage.requests += 1;
    return { summary: "Mock song summary", fileReference: "mock/song.wav", status: "mock-complete" };
  },
  async generateVocals() {
    usage.requests += 1;
    return { summary: "Mock vocal summary", fileReference: "mock/vocals.wav", status: "mock-complete" };
  },
  async generateInstrumental() {
    usage.requests += 1;
    return { summary: "Mock instrumental summary", fileReference: "mock/instrumental.wav", status: "mock-complete" };
  },
  async regenerateSection() {
    usage.requests += 1;
    return { summary: "Mock section regenerated", fileReference: "mock/section.wav", status: "mock-complete" };
  },
  async generateStems() {
    usage.requests += 1;
    return { summary: "Mock stems prepared", fileReference: "mock/stems.zip", status: "mock-complete" };
  },
  getUsage() {
    return usage;
  },
  validateLicense() {
    return { allowed: true, reason: "Mock provider only; no external rights consumed." };
  }
};

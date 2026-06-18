export type VoiceSourceType =
  | "original-synthetic"
  | "user-owned"
  | "licensed"
  | "public-domain"
  | "consent-based";

export type CommercialStatus = "Not cleared" | "Personal use only" | "License confirmed" | "Ready for distribution";

export interface ArtistProfile {
  id: string;
  name: string;
  genreIdentity: string;
  vocalDirection: string;
  lyricalThemes: string[];
  visualBrandDirection: string;
  bannedReferences: string[];
  allowedReferences: string[];
  promptMemory: string;
  albumHistory: string[];
  voiceProfileConnection?: string;
  releaseHistory: string[];
  ownershipNotes: string;
  rightsNotes: string;
  commercialReadinessStatus: CommercialStatus;
}

export interface VoiceProfile {
  id: string;
  profileName: string;
  sourceType: VoiceSourceType;
  consentLicenseStatus: string;
  vocalRange: string;
  tone: string;
  grit: number;
  rasp: number;
  breathiness: number;
  vibrato: number;
  accentStrength: number;
  deliverySpeed: number;
  emotionCurve: string;
  pronunciationNotes: string;
  adLibLibrary: string[];
  consistencySeed: string;
  vocalIdentityLock: boolean;
  bannedSimilarityTargets: string[];
  commercialUseAllowed: "yes" | "no" | "pending";
  licenseProofNotes: string;
}

export interface Album {
  id: string;
  artistId: string;
  title: string;
  trackCount: number;
  genre: string;
  runtimeTarget: string;
  credits: string;
  releaseNotes: string;
  explicitMarkers: string;
}


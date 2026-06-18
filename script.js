(() => {
  const STORAGE_KEY = "steady-voice-ai-studio:v1";

  const now = () => new Date().toISOString();
  const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
  const slugify = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled";

  const titleCase = (value) =>
    String(value || "")
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const splitList = (value) =>
    String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const DEFAULT_STATE = {
    version: 1,
    ui: {
      selectedArtistId: "artist-iron-stallion",
      selectedVoiceId: "voice-iron-stallion",
      selectedAlbumId: "album-iron-stallion",
      selectedSongId: null,
      activeMode: "Personal Development Mode",
    },
    settings: {
      localFirst: true,
      promptWarnings: true,
      autoSave: true,
      generationBudget: 8,
      storageTarget: "Local browser storage",
      apiVault: "Encrypted placeholder only",
      telemetry: false,
    },
    lab: {
      identityLock: true,
      timbreLock: true,
      rangeLimiter: true,
      phraseMemory: true,
      similarityWarning: true,
      pronunciationDictionary: "steady -> stay-tee\nvault -> vowlt",
      adLibLibrary: "Right now\nHold the line\nNo shortcuts",
    },
    artists: [
      {
        id: "artist-iron-stallion",
        name: "Iron Stallion Mining Music",
        genre: "Heavy metal and industrial mining anthems",
        tone: "Powerful, mechanical, grounded vocals with a forge-like edge.",
        themes: ["haul trucks", "shop mechanics", "dispatch", "Northern Alberta power"],
        bannedWords: ["clone", "copy", "sound exactly like"],
        allowedReferences: ["industrial textures", "machine rhythms", "original chorus hooks"],
        visualBrand: "Dark steel, amber sparks, wide horizon, hard-edged typography.",
        legalNotes: "Original only. No imitation of real performers or copyrighted riffs.",
        ownershipNotes: "Created for local experimentation and rights-aware release planning.",
        releaseHistory: ["2026-06-14 demo batch"],
        albumConcepts: ["Night Shift Anthem", "Haul Road Horizon"],
        styleMemory: "Aggressive low-end, piston-like drums, anthemic but original.",
        consistency: {
          vocalConsistency: 8,
          lyricalContinuity: 7,
          bannedSimilarity: "No living-artist imitation",
        },
      },
      {
        id: "artist-keep-on-truckin-247",
        name: "Keep on Truckin’ 24 7",
        genre: "Roots rock, road songs, and late-night service station soul",
        tone: "Friendly, road-worn, warm, and conversational.",
        themes: ["highways", "night driving", "work boots", "coffee stops"],
        bannedWords: ["soundalike", "carbon copy"],
        allowedReferences: ["road-trip energy", "original singalong choruses", "human stories"],
        visualBrand: "Chrome highlights, diner neon, highway night sky, worn leather.",
        legalNotes: "Keep all references original and avoid borrowing recognizable hooks.",
        ownershipNotes: "Safe for personal-use release prototyping only.",
        releaseHistory: ["2026-06-14 demo batch"],
        albumConcepts: ["Late Shift Lanterns", "Mileage and Moonlight"],
        styleMemory: "Big singalong chorus, sturdy verses, easy tempo changes.",
        consistency: {
          vocalConsistency: 7,
          lyricalContinuity: 8,
          bannedSimilarity: "No classic-rock imitation",
        },
      },
      {
        id: "artist-clockwork-hare",
        name: "Clockwork Hare",
        genre: "Art-pop with kinetic synth patterns",
        tone: "Bright, precise, airy, and curious.",
        themes: ["time", "motion", "mystery", "restless optimism"],
        bannedWords: ["imitate", "replicate"],
        allowedReferences: ["metronomic pulse", "sparkling textures", "original melodic lifts"],
        visualBrand: "Brushed aluminum, soft green light, clean geometry.",
        legalNotes: "Use abstract melodic language only. No artist or track references.",
        ownershipNotes: "Internal demo identity with full original rights notes.",
        releaseHistory: ["2026-06-14 demo batch"],
        albumConcepts: ["Second-Hand Moon", "Fast Static"],
        styleMemory: "Precise percussion, playful hooks, and clear vocal pocketing.",
        consistency: {
          vocalConsistency: 8,
          lyricalContinuity: 6,
          bannedSimilarity: "No real-person vocal mapping",
        },
      },
      {
        id: "artist-echo-prism",
        name: "Echo Prism",
        genre: "Atmospheric pop and reflective electronica",
        tone: "Transparent, calm, centered, and luminous.",
        themes: ["reflection", "light", "memory", "tension and release"],
        bannedWords: ["in the style of", "sound like"],
        allowedReferences: ["sparse verses", "wide choruses", "original ambient shapes"],
        visualBrand: "Glass gradients, light refraction, cool shadows.",
        legalNotes: "No direct style transfers from existing catalogs.",
        ownershipNotes: "Original concept for legal-first development work.",
        releaseHistory: ["2026-06-14 demo batch"],
        albumConcepts: ["Glass Weather", "Soft Signal"],
        styleMemory: "Balanced low-end, spacious reverbs, and a clean vocal center.",
        consistency: {
          vocalConsistency: 9,
          lyricalContinuity: 8,
          bannedSimilarity: "No soundalike guidance",
        },
      },
      {
        id: "artist-harlan-echo",
        name: "Harlan Echo",
        genre: "Dusty folk-pop and midnight storytelling",
        tone: "Intimate, thoughtful, and quietly resonant.",
        themes: ["small towns", "memory", "passing weather", "family stories"],
        bannedWords: ["sample", "lift", "borrowed"],
        allowedReferences: ["handmade instrumentation", "story-first verses", "clean harmonies"],
        visualBrand: "Muted paper, brass details, porch-light glow.",
        legalNotes: "Keep the storytelling original and permission-based.",
        ownershipNotes: "Placeholder profile for a future release workflow.",
        releaseHistory: ["2026-06-14 demo batch"],
        albumConcepts: ["Porchlight Atlas", "Routes Back Home"],
        styleMemory: "Dry percussion, open guitars, and close vocal delivery.",
        consistency: {
          vocalConsistency: 7,
          lyricalContinuity: 9,
          bannedSimilarity: "No folk icon imitation",
        },
      },
      {
        id: "artist-subzero-pulsewavez",
        name: "Subzero Pulsewavez",
        genre: "Coldwave pop with crisp digital rhythm",
        tone: "Icy, smooth, and controlled.",
        themes: ["winter", "static", "blue light", "night transit"],
        bannedWords: ["copycat", "knockoff"],
        allowedReferences: ["digital shimmer", "tight bass", "original futuristic hooks"],
        visualBrand: "Frozen chrome, blue LEDs, black ice, minimal lines.",
        legalNotes: "No trademarked brand marks or copied sonic signatures.",
        ownershipNotes: "Safe mock-generation identity for future platform testing.",
        releaseHistory: ["2026-06-14 demo batch"],
        albumConcepts: ["Night Freeze Protocol", "Cold Signal"],
        styleMemory: "Tight kick, cool synths, deliberate vocal phrasing.",
        consistency: {
          vocalConsistency: 8,
          lyricalContinuity: 7,
          bannedSimilarity: "No real artist timbre matching",
        },
      },
    ],
    voiceProfiles: [
      {
        id: "voice-iron-stallion",
        artistId: "artist-iron-stallion",
        name: "Forged Lead",
        presentation: "Masculine",
        range: "Baritone",
        tone: "Steel-edged and authoritative",
        grit: 7,
        breathiness: 2,
        vibrato: 3,
        rasp: 6,
        accent: 3,
        speed: 5,
        emotion: "Steady verses, explosive choruses",
        seed: "forged-001",
        prohibitedSimilarity: "No living artist imitation",
        proof: "Original synthetic voice",
      },
      {
        id: "voice-echo-prism",
        artistId: "artist-echo-prism",
        name: "Glass Halo",
        presentation: "Androgynous",
        range: "Tenor",
        tone: "Clear and luminous",
        grit: 2,
        breathiness: 4,
        vibrato: 3,
        rasp: 1,
        accent: 2,
        speed: 5,
        emotion: "Calm verses, lifted refrains",
        seed: "glass-004",
        prohibitedSimilarity: "No real-person match",
        proof: "User-owned synthetic definition",
      },
      {
        id: "voice-harlan-echo",
        artistId: "artist-harlan-echo",
        name: "Porchlight Tenor",
        presentation: "Neutral",
        range: "Tenor",
        tone: "Close-miked and warm",
        grit: 3,
        breathiness: 3,
        vibrato: 4,
        rasp: 2,
        accent: 2,
        speed: 4,
        emotion: "Intimate storytelling with gentle lifts",
        seed: "porch-012",
        prohibitedSimilarity: "No folk icon imitation",
        proof: "Licensed dataset placeholder",
      },
    ],
    albums: [
      {
        id: "album-iron-stallion",
        artistId: "artist-iron-stallion",
        title: "Night Shift Anthem",
        genre: "Industrial metal",
        trackCount: 8,
        notes: "Demo release focused on original steel-and-sparks imagery.",
        credits: "Writer: demo user. Producer: local-first mock engine.",
        explicit: "Clean",
        releaseNotes: "Prepared for rights-aware prototype exports.",
        tracks: [],
      },
      {
        id: "album-echo-prism",
        artistId: "artist-echo-prism",
        title: "Glass Weather",
        genre: "Atmospheric pop",
        trackCount: 10,
        notes: "Soft signal album concept for original prompt testing.",
        credits: "Writer: demo user. Producer: mock provider.",
        explicit: "Clean",
        releaseNotes: "Original-only prototype album metadata.",
        tracks: [],
      },
      {
        id: "album-harlan-echo",
        artistId: "artist-harlan-echo",
        title: "Porchlight Atlas",
        genre: "Folk-pop",
        trackCount: 9,
        notes: "Story-led album structure with practical release fields.",
        credits: "Writer: demo user. Producer: local mock engine.",
        explicit: "Clean",
        releaseNotes: "Used to show release pack structure and rights ledger flow.",
        tracks: [],
      },
    ],
    songs: [
      {
        id: "song-001",
        artistId: "artist-iron-stallion",
        voiceId: "voice-iron-stallion",
        albumId: "album-iron-stallion",
        title: "Night Shift Anthem",
        lyrics: null,
        stylePrompt: null,
        template: "Intro / Verse / Pre-Chorus / Chorus / Verse / Chorus / Bridge / Outro",
        duration: "3:12",
        versions: [],
        arrangement: [],
        stems: [],
      },
    ],
    queue: [
      {
        id: "queue-001",
        task: "Generate lyrics",
        provider: "MockProvider",
        status: "done",
        retries: 0,
        note: "Created from the demo album package.",
        createdAt: now(),
      },
      {
        id: "queue-002",
        task: "Generate style prompt",
        provider: "MockProvider",
        status: "done",
        retries: 0,
        note: "Prompt sanitized for original-only output.",
        createdAt: now(),
      },
      {
        id: "queue-003",
        task: "Assemble release pack",
        provider: "MockProvider",
        status: "queued",
        retries: 0,
        note: "Waiting on export action from the user.",
        createdAt: now(),
      },
    ],
    ledger: [
      {
        id: "ledger-001",
        assetId: "song-001",
        artistProfileId: "artist-iron-stallion",
        promptUsed: "Original industrial metal release with no imitation or trademark cues.",
        lyricSource: "Local lyric draft",
        voiceSource: "Original synthetic voice",
        datasetSource: "User-owned placeholder dataset",
        generationDate: now(),
        modelProvider: "MockProvider",
        commercialStatus: "Not cleared",
        copyrightRiskFlag: "Low",
        humanContributionNotes: "User-reviewed draft, kept chorus only after revision.",
        ownershipNotes: "Original work created for personal development mode.",
        exportHistory: ["Draft JSON", "Metadata preview"],
        distributionStatus: "Not distributed",
      },
    ],
    licenses: [
      {
        id: "license-001",
        source: "Original demo lyric set",
        license: "User-created",
        proof: "Local-only original drafting",
        notes: "May be reused in this workspace because it was created here.",
      },
      {
        id: "license-002",
        source: "Public-domain sample note",
        license: "Public domain",
        proof: "Manual citation placeholder",
        notes: "Always verify public-domain status before commercial use.",
      },
    ],
    outputs: {
      lyrics: "",
      style: "",
      song: "",
      cover: "",
      exportManifest: "",
    },
    arrangement: [
      { section: "Intro", duration: 16, intensity: 2, vocal: 1, instruments: 3, notes: "Set the mood and keep it original." },
      { section: "Verse 1", duration: 32, intensity: 4, vocal: 4, instruments: 4, notes: "Tell the first story beat." },
      { section: "Pre-Chorus", duration: 16, intensity: 5, vocal: 5, instruments: 5, notes: "Lift into the hook." },
      { section: "Chorus", duration: 32, intensity: 8, vocal: 8, instruments: 8, notes: "Keep the chorus locked." },
      { section: "Verse 2", duration: 32, intensity: 5, vocal: 5, instruments: 5, notes: "Add new detail, no copied lines." },
      { section: "Bridge", duration: 16, intensity: 6, vocal: 6, instruments: 5, notes: "Create contrast without imitation." },
      { section: "Final Chorus", duration: 32, intensity: 9, vocal: 9, instruments: 8, notes: "Peak energy, no soundalike references." },
      { section: "Outro", duration: 16, intensity: 3, vocal: 2, instruments: 2, notes: "Land gently and cleanly." },
    ],
    stems: [
      { name: "Vocals", volume: 0.8, pan: 0, mute: false, solo: false, eq: "Presence lift" },
      { name: "Drums", volume: 0.82, pan: 0, mute: false, solo: false, eq: "Punchy low-mid cut" },
      { name: "Bass", volume: 0.76, pan: 0, mute: false, solo: false, eq: "Tight sub control" },
      { name: "Guitar", volume: 0.72, pan: -0.1, mute: false, solo: false, eq: "Wide mids" },
      { name: "Synth", volume: 0.7, pan: 0.08, mute: false, solo: false, eq: "Soft high sheen" },
      { name: "Piano", volume: 0.66, pan: -0.05, mute: false, solo: false, eq: "Neutral" },
      { name: "FX", volume: 0.55, pan: 0.05, mute: false, solo: false, eq: "Atmospheric" },
      { name: "Backing Vocals", volume: 0.6, pan: 0, mute: false, solo: false, eq: "Blend" },
      { name: "Master", volume: 0.9, pan: 0, mute: false, solo: false, eq: "Limiter placeholder" },
    ],
    checklist: [
      "Original lyrics only",
      "No real-artist imitation in vocals or prompts",
      "Rights ledger populated for every exported asset",
      "License or consent proof attached where required",
      "Commercial status reviewed before release",
      "Metadata verified for stores and distributors",
      "Manual final review completed by the user",
    ],
    selectedSongId: "song-001",
  };

  const STORAGE = {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return structuredClone(DEFAULT_STATE);
        const parsed = JSON.parse(raw);
        return mergeDefaults(structuredClone(DEFAULT_STATE), parsed);
      } catch {
        return structuredClone(DEFAULT_STATE);
      }
    },
    save(state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
  };

  const mergeDefaults = (base, incoming) => {
    if (!incoming || typeof incoming !== "object") return base;
    for (const [key, value] of Object.entries(incoming)) {
      if (Array.isArray(value)) {
        base[key] = value;
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        base[key] = mergeDefaults(base[key] || {}, value);
      } else {
        base[key] = value;
      }
    }
    return base;
  };

  let state = STORAGE.load();

  const els = {
    toast: document.getElementById("toast"),
    artistsList: document.getElementById("artists-list"),
    voiceList: document.getElementById("voice-list"),
    queuePreview: document.getElementById("queue-preview"),
    readinessPreview: document.getElementById("readiness-preview"),
    consistencyOutput: document.getElementById("consistency-output"),
    lyricOutput: document.getElementById("lyric-output"),
    lyricWarning: document.getElementById("lyric-warning"),
    styleOutput: document.getElementById("style-output"),
    styleWarning: document.getElementById("style-warning"),
    songOutput: document.getElementById("song-output"),
    arrangementList: document.getElementById("arrangement-list"),
    stemsList: document.getElementById("stems-list"),
    queueList: document.getElementById("queue-list"),
    ledgerList: document.getElementById("ledger-list"),
    albumTracklist: document.getElementById("album-tracklist"),
    coverOutput: document.getElementById("cover-output"),
    checklistList: document.getElementById("checklist-list"),
    settingsOutput: document.getElementById("settings-output"),
    legalWarnings: document.getElementById("legal-warnings"),
    licenseList: document.getElementById("license-list"),
    modeOutput: document.getElementById("mode-output"),
    debugOutput: document.getElementById("debug-output"),
    tokenSwatches: document.getElementById("token-swatches"),
    currentFocus: document.getElementById("current-focus"),
    statArtists: document.getElementById("stat-artists"),
    statVoices: document.getElementById("stat-voices"),
    statAlbums: document.getElementById("stat-albums"),
    statRights: document.getElementById("stat-rights"),
    modeChip: document.getElementById("mode-chip"),
    artistSelect: document.getElementById("artist-select"),
    albumSelect: document.getElementById("album-select"),
    voiceSelect: document.getElementById("voice-select"),
    voiceArtistSelect: document.getElementById("voice-artist-select"),
    lyricArtistSelect: document.getElementById("lyric-artist-select"),
    lyricAlbumSelect: document.getElementById("lyric-album-select"),
    songArtistSelect: document.getElementById("song-artist-select"),
    songVoiceSelect: document.getElementById("song-voice-select"),
    songAlbumSelect: document.getElementById("song-album-select"),
  };

  const notify = (message) => {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => els.toast.classList.remove("is-visible"), 2600);
  };

  const save = () => {
    STORAGE.save(state);
    render();
  };

  const selectedArtist = () => state.artists.find((artist) => artist.id === state.ui.selectedArtistId) || state.artists[0];
  const selectedAlbum = () => state.albums.find((album) => album.id === state.ui.selectedAlbumId) || state.albums[0];
  const selectedVoice = () => state.voiceProfiles.find((voice) => voice.id === state.ui.selectedVoiceId) || state.voiceProfiles[0];
  const currentSong = () => state.songs.find((song) => song.id === state.ui.selectedSongId) || state.songs[0];

  const renderBadgeRow = (items) => items.map((item) => `<span class="badge">${escapeHtml(item)}</span>`).join("");

  const collectWarnings = (...texts) => {
    const raw = texts.filter(Boolean).join(" ").toLowerCase();
    const issues = [];
    if (!raw) return issues;
    const rules = [
      [/in the style of/i, "Avoid soundalike language and living-artist style requests."],
      [/\bsound like\b/i, "Avoid real-artist imitation language."],
      [/\bclone\b/i, "Voice cloning requests must be original, owned, or licensed only."],
      [/\bimitate\b/i, "Do not imitate a real artist or trademarked sonic identity."],
      [/\bcopy (?:lyrics|melody|riff|hook|verse)\b/i, "Do not copy protected musical material."],
      [/\blyrics from\b/i, "Do not reproduce copyrighted lyrics without rights."],
      [/\bsample from\b/i, "Only use samples with clear permission or valid licensing."],
      [/\btrademark\b/i, "Check visual prompt language for trademark misuse."],
      [/\blogo\b/i, "Avoid real logos or branded marks."],
    ];
    for (const [needle, message] of rules) {
      if (needle.test(raw)) issues.push(message);
    }
    return [...new Set(issues)];
  };

  const makeStylePrompt = ({ artist, genreBlend, bpm, key, energy, mood, instrumentation, vocal, mix, mastering, era, avoid }) => {
    const lines = [
      `Original music prompt for ${artist.name}.`,
      `Genre blend: ${genreBlend}. BPM: ${bpm}. Key: ${key}.`,
      `Energy: ${energy}. Mood: ${mood}.`,
      `Instrumentation: ${instrumentation}.`,
      `Vocal direction: ${vocal}.`,
      `Mix direction: ${mix}.`,
      `Mastering target: ${mastering}.`,
      `Era influence: ${era}.`,
      `Avoid soundalike cues: ${avoid}.`,
      "Use original melodies, original lyrics, and a unique vocal identity.",
    ];
    return lines.join("\n");
  };

  const generateTracklist = (album) => {
    const artist = state.artists.find((item) => item.id === album.artistId) || state.artists[0];
    const words = [
      "Signal",
      "Horizon",
      "Pulse",
      "Drift",
      "Lantern",
      "Forge",
      "Weather",
      "Transit",
      "Echo",
      "Torch",
      "Static",
      "Road",
      "Shadow",
      "Spark",
      "Current",
    ];
    const prefixes = ["Open", "Midnight", "Silver", "Broken", "Hidden", "Northern", "Last", "Bright", "Cold", "Future"];
    const tracks = Array.from({ length: album.trackCount }, (_, index) => {
      const title = `${prefixes[index % prefixes.length]} ${words[(index + artist.name.length) % words.length]}`;
      return {
        number: index + 1,
        title,
        duration: `${2 + ((index * 13) % 2)}:${String(34 + ((index * 7) % 20)).padStart(2, "0")}`,
        note: index === 0 ? "Album opener" : index === album.trackCount - 1 ? "Closer" : "Original cut",
      };
    });
    album.tracks = tracks;
    return tracks;
  };

  const generateLyrics = ({ artist, title, concept, runtime, rhymeDensity, hookStrength, emotionArc, notes }) => {
    const safeTheme = concept || artist.genre;
    const verses = [
      `Verse 1\nWe built this moment from a line of sparks,\nkept it quiet where the night leaves marks,\n${title} moves through the rust and rain,\nsteady hands turn pressure into flame.`,
      `Pre-Chorus\nThe room leans in, the low end breathes,\nall the loose edges start to leave,\nwe keep the pulse and trim the noise,\nmake room for the honest voice.`,
      `Chorus\n${title} stays alive in the wheel and wire,\nsteady voice, clean light, controlled fire,\n${safeTheme} rises, then settles down,\norchestrated motion, original sound.`,
      `Verse 2\nEvery detail keeps its own direction,\nno borrowed shine, no false reflection,\nframes stay open, notes stay true,\nwhat we keep is what we grew.`,
      `Bridge\nLet the texture bend, let the shadows move,\ncarry the arc without a proof,\nif the path gets sharp, we do not copy,\nwe carve the lane until it drops deep.`,
      `Outro\nFade with care, let the signal land,\noriginal work in original hands,\n${title} fades but the line stays clear,\nrights and memory both remain here.`,
    ];
    return {
      title,
      concept,
      runtime,
      rhymeDensity,
      hookStrength,
      emotionArc,
      notes,
      text: verses.join("\n\n"),
    };
  };

  const generateSongDraft = ({ artist, voice, album, title, lyrics, stylePrompt, template, duration }) => {
    const arrangement = state.arrangement.map((item, index) => ({
      ...item,
      note: `${item.notes} (${titleCase(title)} / section ${index + 1})`,
    }));
    const stems = state.stems.map((stem) => ({
      ...stem,
      volume: stem.name === "Vocals" ? 0.84 : stem.volume,
    }));
    return {
      id: uid("song"),
      artistId: artist.id,
      voiceId: voice.id,
      albumId: album.id,
      title,
      lyrics,
      stylePrompt,
      template,
      duration,
      versions: [],
      arrangement,
      stems,
      createdAt: now(),
    };
  };

  const buildLedgerEntry = ({ song, artist, voice, lyrics, stylePrompt, provider = "MockProvider" }) => ({
    id: uid("ledger"),
    assetId: song.id,
    artistProfileId: artist.id,
    promptUsed: stylePrompt,
    lyricSource: "Local lyric draft",
    voiceSource: `${voice.name} - ${voice.proof}`,
    datasetSource: "User-owned / licensed / public-domain only",
    generationDate: now(),
    modelProvider: provider,
    commercialStatus: "Not cleared",
    copyrightRiskFlag: collectWarnings(stylePrompt, lyrics.text).length ? "Review required" : "Low",
    humanContributionNotes: "User reviewed and edited the draft locally.",
    ownershipNotes: artist.ownershipNotes,
    exportHistory: ["Draft created locally"],
    distributionStatus: "Not distributed",
  });

  const setSelectOptions = (select, items, selectedId, labelFn = (item) => item.name) => {
    if (!select) return;
    select.innerHTML = items
      .map((item) => `<option value="${escapeHtml(item.id)}"${item.id === selectedId ? " selected" : ""}>${escapeHtml(labelFn(item))}</option>`)
      .join("");
  };

  const buildCurrentFocus = () => {
    const artist = selectedArtist();
    const album = selectedAlbum();
    const voice = selectedVoice();
    return `
      <strong>${escapeHtml(artist?.name || "No artist")}</strong>
      <p>${escapeHtml(album?.title || "No album")} / ${escapeHtml(voice?.name || "No voice profile")}</p>
      <p class="helper">Local-first mode with mock generation and manual export controls.</p>
    `;
  };

  const renderTokenSwatches = () => {
    const tokens = [
      ["bg-950", "Deep studio black"],
      ["panel-900", "Console panel"],
      ["mint", "Signal mint"],
      ["amber", "Warm amber"],
    ];
    els.tokenSwatches.innerHTML = tokens
      .map(
        ([key, label]) => `
          <div class="token-card">
            <strong>${escapeHtml(label)}</strong>
            <p class="token-label">${escapeHtml(key)}</p>
          </div>`
      )
      .join("");
  };

  const renderArtists = () => {
    els.artistsList.innerHTML = state.artists
      .map((artist) => `
        <article class="track-card">
          <h5>${escapeHtml(artist.name)}</h5>
          <p>${escapeHtml(artist.genre)}</p>
          <div class="mini-row">${renderBadgeRow(artist.themes.slice(0, 3))}</div>
          <div class="badge-row">
            <span class="mini-badge">Consistency ${artist.consistency.vocalConsistency}/10</span>
            <span class="mini-badge">Lyrics ${artist.consistency.lyricalContinuity}/10</span>
          </div>
          <div class="badge-row">
            <button class="button button-secondary" type="button" data-action="select-artist" data-id="${escapeHtml(artist.id)}">Use artist</button>
          </div>
          <p class="draft-meta">${escapeHtml(artist.legalNotes)}</p>
        </article>
      `)
      .join("");
  };

  const renderVoices = () => {
    els.voiceList.innerHTML = state.voiceProfiles
      .map((voice) => {
        const artist = state.artists.find((item) => item.id === voice.artistId);
        return `
          <article class="track-card">
            <h5>${escapeHtml(voice.name)}</h5>
            <p>${escapeHtml(artist?.name || "No artist")} - ${escapeHtml(voice.presentation)} / ${escapeHtml(voice.range)}</p>
            <div class="mini-row">
              <span class="mini-badge">Tone ${escapeHtml(voice.tone)}</span>
              <span class="mini-badge">Seed ${escapeHtml(voice.seed)}</span>
            </div>
            <p class="draft-meta">${escapeHtml(voice.proof)}</p>
          </article>
        `;
      })
      .join("");
  };

  const renderQueue = () => {
    const items = state.queue.slice(-4).reverse();
    const card = (item) => `
      <article class="queue-card">
        <h5>${escapeHtml(item.task)}</h5>
        <p>${escapeHtml(item.provider)} / ${escapeHtml(item.status)} / retries ${item.retries}</p>
        <p>${escapeHtml(item.note)}</p>
        <div class="badge-row">
          <button class="button button-secondary" type="button" data-action="retry-task" data-id="${escapeHtml(item.id)}">Retry</button>
        </div>
      </article>
    `;
    els.queuePreview.innerHTML = items.map(card).join("");
    els.queueList.innerHTML = state.queue.map(card).join("");
  };

  const renderReadiness = () => {
    const checks = [
      ["Artist profile created", Boolean(state.artists.length)],
      ["Voice profile has proof", Boolean(state.voiceProfiles.some((voice) => voice.proof))],
      ["Album exists", Boolean(state.albums.length)],
      ["Rights ledger populated", Boolean(state.ledger.length)],
      ["Prompt warnings reviewed", Boolean(collectWarnings(state.outputs.style, state.outputs.lyrics).length === 0)],
      ["Export pack ready", Boolean(state.outputs.exportManifest || state.songs.length)],
    ];
    els.readinessPreview.innerHTML = checks
      .map(([label, ok]) => `<li>${ok ? "Complete" : "Review"} - ${escapeHtml(label)}</li>`)
      .join("");
    if (els.checklistList) {
      els.checklistList.innerHTML = state.checklist
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");
    }
  };

  const renderConsistency = () => {
    const artist = selectedArtist();
    const voice = selectedVoice();
    const warnings = collectWarnings(artist?.styleMemory, voice?.prohibitedSimilarity, state.lab.pronunciationDictionary, state.lab.adLibLibrary);
    const items = [
      `Seed lock: ${state.lab.identityLock ? "enabled" : "off"}`,
      `Timbre lock: ${state.lab.timbreLock ? "enabled" : "off"}`,
      `Range limiter: ${state.lab.rangeLimiter ? "enabled" : "off"}`,
      `Phrase memory: ${state.lab.phraseMemory ? "enabled" : "off"}`,
      `Similarity warnings: ${state.lab.similarityWarning ? "enabled" : "off"}`,
    ];
    els.consistencyOutput.innerHTML = `
      <div class="stack">
        ${items.map((item) => `<div class="track-card"><p>${escapeHtml(item)}</p></div>`).join("")}
        <div class="warning-box">${warnings.length ? warnings.map((warning) => `• ${escapeHtml(warning)}`).join("<br>") : "No obvious similarity issues in the current selections."}</div>
      </div>
    `;
  };

  const renderLyrics = () => {
    const song = currentSong();
    if (!song || !song.lyrics) {
      els.lyricOutput.innerHTML = `<p>Generate a lyric draft to see verse, pre-chorus, chorus, bridge, and outro sections here.</p>`;
      els.lyricWarning.textContent = "";
      return;
    }
    els.lyricOutput.innerHTML = `
      <div class="stack">
        <div class="track-card">
          <h5>${escapeHtml(song.lyrics.title)}</h5>
          <p>Runtime target: ${escapeHtml(song.lyrics.runtime)} | Rhyme density: ${escapeHtml(song.lyrics.rhymeDensity)}</p>
          <p>Hook strength: ${escapeHtml(song.lyrics.hookStrength)} | Emotion arc: ${escapeHtml(song.lyrics.emotionArc)}</p>
        </div>
        <div class="track-card"><pre class="preformatted">${escapeHtml(song.lyrics.text)}</pre></div>
      </div>
    `;
    const warnings = collectWarnings(song.lyrics.text);
    els.lyricWarning.textContent = warnings.length ? warnings.map((item) => `• ${item}`).join("\n") : "No copyright-risk phrases detected in the current draft.";
  };

  const renderStylePrompt = () => {
    const song = currentSong();
    if (!song || !song.stylePrompt) {
      els.styleOutput.innerHTML = `<p>Generate a style prompt to preview safe prompt copy here.</p>`;
      els.styleWarning.textContent = "";
      return;
    }
    els.styleOutput.innerHTML = `
      <div class="track-card">
        <h5>${escapeHtml(song.title)} - style prompt</h5>
        <pre class="preformatted">${escapeHtml(song.stylePrompt)}</pre>
      </div>
    `;
    const warnings = collectWarnings(song.stylePrompt);
    els.styleWarning.textContent = warnings.length ? warnings.map((item) => `• ${item}`).join("\n") : "Style prompt looks original-only and avoids soundalike language.";
  };

  const renderSongDraft = () => {
    const song = currentSong();
    if (!song) {
      els.songOutput.innerHTML = `<p>No song draft yet. Generate one from the Song Builder.</p>`;
      return;
    }
    const artist = state.artists.find((item) => item.id === song.artistId);
    const voice = state.voiceProfiles.find((item) => item.id === song.voiceId);
    const sections = song.arrangement.length ? song.arrangement : state.arrangement;
    els.songOutput.innerHTML = `
      <div class="stack">
        <div class="track-card">
          <h5>${escapeHtml(song.title)}</h5>
          <p>${escapeHtml(artist?.name || "")} / ${escapeHtml(voice?.name || "")}</p>
          <p>Template: ${escapeHtml(song.template)} | Duration target: ${escapeHtml(song.duration)}</p>
        </div>
        <div class="track-card">
          <p><strong>Lyrics:</strong></p>
          <pre class="preformatted">${escapeHtml(song.lyrics?.text || "")}</pre>
        </div>
        <div class="track-card">
          <p><strong>Style prompt:</strong></p>
          <pre class="preformatted">${escapeHtml(song.stylePrompt || "")}</pre>
        </div>
        <div class="track-card">
          <p><strong>Version history:</strong> ${song.versions.length ? escapeHtml(`${song.versions.length} saved`) : "No saved versions yet"}</p>
        </div>
      </div>
    `;
    els.arrangementList.innerHTML = sections
      .map(
        (section, index) => `
          <article class="timeline-item" data-section-index="${index}">
            <div class="timeline-head">
              <strong>${escapeHtml(section.section)}</strong>
              <button class="button button-secondary" type="button" data-action="regenerate-section" data-index="${index}">Regenerate section</button>
            </div>
            <label><span>Duration (beats)</span><input type="number" min="8" step="4" value="${section.duration}" data-action="timeline-duration" data-index="${index}"></label>
            <label><span>Intensity</span><input type="range" min="1" max="10" value="${section.intensity}" data-action="timeline-intensity" data-index="${index}"></label>
            <label><span>Vocal presence</span><input type="range" min="1" max="10" value="${section.vocal}" data-action="timeline-vocal" data-index="${index}"></label>
            <label><span>Instrument presence</span><input type="range" min="1" max="10" value="${section.instruments}" data-action="timeline-instruments" data-index="${index}"></label>
            <label><span>Notes</span><textarea rows="2" data-action="timeline-notes" data-index="${index}">${escapeHtml(section.note)}</textarea></label>
          </article>
        `
      )
      .join("");
  };

  const renderStems = () => {
    els.stemsList.innerHTML = state.stems
      .map(
        (stem, index) => `
          <article class="stem-card">
            <h5>${escapeHtml(stem.name)}</h5>
            <p>${escapeHtml(stem.eq)}</p>
            <div class="stem-controls">
              <label><span>Volume</span><input type="range" min="0" max="1" step="0.01" value="${stem.volume}" data-action="stem-volume" data-index="${index}"></label>
              <label><span>Pan</span><input type="range" min="-1" max="1" step="0.01" value="${stem.pan}" data-action="stem-pan" data-index="${index}"></label>
              <label class="toggle-row"><span>Mute</span><input type="checkbox"${stem.mute ? " checked" : ""} data-action="stem-mute" data-index="${index}"></label>
              <label class="toggle-row"><span>Solo</span><input type="checkbox"${stem.solo ? " checked" : ""} data-action="stem-solo" data-index="${index}"></label>
            </div>
          </article>
        `
      )
      .join("");
  };

  const renderLedger = () => {
    els.ledgerList.innerHTML = state.ledger
      .slice()
      .reverse()
      .map((entry) => {
        const artist = state.artists.find((item) => item.id === entry.artistProfileId);
        return `
          <article class="ledger-card">
            <h5>${escapeHtml(entry.assetId)}</h5>
            <p>${escapeHtml(artist?.name || "Unknown artist")} / ${escapeHtml(entry.modelProvider)}</p>
            <p>Risk: ${escapeHtml(entry.copyrightRiskFlag)} | Commercial: ${escapeHtml(entry.commercialStatus)}</p>
            <p>${escapeHtml(entry.promptUsed)}</p>
            <div class="mini-row">${renderBadgeRow(entry.exportHistory)}</div>
          </article>
        `;
      })
      .join("");
  };

  const renderAlbums = () => {
    const album = selectedAlbum();
    const artist = state.artists.find((item) => item.id === album?.artistId);
    const tracklist = album?.tracks?.length ? album.tracks : generateTracklist(album);
    els.albumTracklist.innerHTML = `
      <div class="track-card">
        <h5>${escapeHtml(album.title)}</h5>
        <p>${escapeHtml(artist?.name || "")} / ${escapeHtml(album.genre)} / ${album.trackCount} tracks</p>
        <p>${escapeHtml(album.notes)}</p>
      </div>
      ${tracklist
        .map(
          (track) => `
            <article class="track-card">
              <h5>${String(track.number).padStart(2, "0")}. ${escapeHtml(track.title)}</h5>
              <p>${escapeHtml(track.duration)} / ${escapeHtml(track.note)}</p>
            </article>
          `
        )
        .join("")}
    `;
  };

  const renderCover = () => {
    const album = selectedAlbum();
    const artist = selectedArtist();
    const prompt = `Square 3000x3000 cover for ${album.title} by ${artist.name}. Visual theme: cinematic, original, and trademark-safe. No real logos, no branded equipment, no copyrighted characters, no copied album art. Use abstract lighting, premium studio texture, and an original composition that matches the album mood.`;
    els.coverOutput.innerHTML = `<div class="track-card"><pre class="preformatted">${escapeHtml(prompt)}</pre></div>`;
    state.outputs.cover = prompt;
  };

  const renderSettings = () => {
    els.settingsOutput.innerHTML = `
      <div class="track-card"><strong>Local-first:</strong> ${state.settings.localFirst ? "enabled" : "off"}</div>
      <div class="track-card"><strong>Telemetry:</strong> ${state.settings.telemetry ? "on" : "off"} (default stays off)</div>
      <div class="track-card"><strong>Generation budget:</strong> ${escapeHtml(state.settings.generationBudget)}</div>
      <div class="track-card"><strong>Storage target:</strong> ${escapeHtml(state.settings.storageTarget)}</div>
      <div class="track-card"><strong>API vault:</strong> ${escapeHtml(state.settings.apiVault)}</div>
      <div class="track-card"><strong>Data policy:</strong> No upload without user action.</div>
    `;
  };

  const renderLegal = () => {
    const checks = collectWarnings(state.outputs.style, state.outputs.lyrics, state.outputs.cover, selectedArtist()?.legalNotes, selectedVoice()?.prohibitedSimilarity);
    els.legalWarnings.innerHTML = checks.length
      ? checks.map((item) => `<div>• ${escapeHtml(item)}</div>`).join("")
      : "<div>No obvious copyright or trademark red flags detected in the current draft set.</div>";
  };

  const renderLicenses = () => {
    els.licenseList.innerHTML = state.licenses
      .map(
        (license) => `
          <article class="license-card">
            <h5>${escapeHtml(license.source)}</h5>
            <p>${escapeHtml(license.license)}</p>
            <p>${escapeHtml(license.proof)}</p>
            <p>${escapeHtml(license.notes)}</p>
          </article>
        `
      )
      .join("");
  };

  const renderMode = () => {
    const items = [
      `Mode: ${state.ui.activeMode}`,
      "Personal use only until the user decides to commercialize with real licenses.",
      "MockProvider ships with the MVP so the app runs locally without paid APIs.",
      "Later adapters can plug into licensed cloud or user-owned local models.",
    ];
    els.modeOutput.innerHTML = items.map((item) => `<div class="track-card"><p>${escapeHtml(item)}</p></div>`).join("");
    if (els.modeChip) els.modeChip.textContent = state.ui.activeMode;
  };

  const renderDebug = () => {
    const snapshot = {
      version: state.version,
      artists: state.artists.length,
      voices: state.voiceProfiles.length,
      albums: state.albums.length,
      songs: state.songs.length,
      ledger: state.ledger.length,
      queue: state.queue.length,
      selectedArtist: selectedArtist()?.name || null,
      selectedAlbum: selectedAlbum()?.title || null,
      selectedVoice: selectedVoice()?.name || null,
      settings: state.settings,
      lab: state.lab,
    };
    els.debugOutput.textContent = JSON.stringify(snapshot, null, 2);
  };

  const renderFocus = () => {
    if (els.currentFocus) els.currentFocus.innerHTML = buildCurrentFocus();
  };

  const renderStats = () => {
    els.statArtists.textContent = String(state.artists.length);
    els.statVoices.textContent = String(state.voiceProfiles.length);
    els.statAlbums.textContent = String(state.albums.length);
    els.statRights.textContent = String(state.ledger.length);
  };

  const renderSelects = () => {
    setSelectOptions(els.artistSelect, state.artists, state.ui.selectedArtistId, (item) => item.name);
    setSelectOptions(els.albumSelect, state.albums, state.ui.selectedAlbumId, (item) => item.title);
    setSelectOptions(els.voiceSelect, state.voiceProfiles, state.ui.selectedVoiceId, (item) => item.name);
    setSelectOptions(els.voiceArtistSelect, state.artists, state.ui.selectedArtistId, (item) => item.name);
    setSelectOptions(els.lyricArtistSelect, state.artists, state.ui.selectedArtistId, (item) => item.name);
    setSelectOptions(els.lyricAlbumSelect, state.albums, state.ui.selectedAlbumId, (item) => item.title);
    setSelectOptions(els.songArtistSelect, state.artists, state.ui.selectedArtistId, (item) => item.name);
    setSelectOptions(els.songVoiceSelect, state.voiceProfiles, state.ui.selectedVoiceId, (item) => item.name);
    setSelectOptions(els.songAlbumSelect, state.albums, state.ui.selectedAlbumId, (item) => item.title);
  };

  const renderInputs = () => {
    const identityLock = document.getElementById("identity-lock");
    const timbreLock = document.getElementById("timbre-lock");
    const rangeLimiter = document.getElementById("range-limiter");
    const phraseMemory = document.getElementById("phrase-memory");
    const similarityWarning = document.getElementById("similarity-warning");
    const pronunciationDictionary = document.getElementById("pronunciation-dictionary");
    const adLibLibrary = document.getElementById("ad-lib-library");
    const localFirst = document.getElementById("local-first");
    const telemetry = document.getElementById("telemetry");
    const promptWarnings = document.getElementById("prompt-warnings");
    const autoSave = document.getElementById("auto-save");
    const generationBudget = document.getElementById("generation-budget");
    const storageTarget = document.getElementById("storage-target");
    const apiVault = document.getElementById("api-vault");

    if (identityLock) identityLock.checked = state.lab.identityLock;
    if (timbreLock) timbreLock.checked = state.lab.timbreLock;
    if (rangeLimiter) rangeLimiter.checked = state.lab.rangeLimiter;
    if (phraseMemory) phraseMemory.checked = state.lab.phraseMemory;
    if (similarityWarning) similarityWarning.checked = state.lab.similarityWarning;
    if (pronunciationDictionary) pronunciationDictionary.value = state.lab.pronunciationDictionary;
    if (adLibLibrary) adLibLibrary.value = state.lab.adLibLibrary;
    if (localFirst) localFirst.checked = state.settings.localFirst;
    if (telemetry) telemetry.checked = state.settings.telemetry;
    if (promptWarnings) promptWarnings.checked = state.settings.promptWarnings;
    if (autoSave) autoSave.checked = state.settings.autoSave;
    if (generationBudget) generationBudget.value = state.settings.generationBudget;
    if (storageTarget) storageTarget.value = state.settings.storageTarget;
    if (apiVault) apiVault.value = state.settings.apiVault;
  };

  const renderOutputs = () => {
    if (state.outputs.lyrics) {
      const warnings = collectWarnings(state.outputs.lyrics);
      els.lyricWarning.textContent = warnings.length ? warnings.map((item) => `• ${item}`).join("\n") : "No copyright-risk phrases detected in the current draft.";
    }
    if (state.outputs.style) {
      const warnings = collectWarnings(state.outputs.style);
      els.styleWarning.textContent = warnings.length ? warnings.map((item) => `• ${item}`).join("\n") : "Style prompt looks original-only and avoids soundalike language.";
    }
    if (state.outputs.exportManifest) {
      const block = `
Release pack ready for:
${state.outputs.exportManifest}
      `.trim();
      const exportOutput = document.getElementById("export-output");
      if (exportOutput) exportOutput.innerHTML = `<div class="track-card"><pre class="preformatted">${escapeHtml(block)}</pre></div>`;
    }
  };

  const render = () => {
    renderSelects();
    renderInputs();
    renderTokenSwatches();
    renderStats();
    renderFocus();
    renderArtists();
    renderVoices();
    renderQueue();
    renderReadiness();
    renderConsistency();
    renderLyrics();
    renderStylePrompt();
    renderSongDraft();
    renderStems();
    renderLedger();
    renderAlbums();
    renderCover();
    renderSettings();
    renderLegal();
    renderLicenses();
    renderMode();
    renderDebug();
    renderOutputs();
    STORAGE.save(state);
  };

  const updateSelected = (type, id) => {
    if (type === "artist") state.ui.selectedArtistId = id;
    if (type === "album") state.ui.selectedAlbumId = id;
    if (type === "voice") state.ui.selectedVoiceId = id;
    save();
  };

  const buildReleaseManifest = () => {
    const artist = selectedArtist();
    const album = selectedAlbum();
    const song = currentSong();
    const tracklist = album.tracks.length ? album.tracks : generateTracklist(album);
    const albumSlug = slugify(album.title);
    const artistSlug = slugify(artist.name);
    const files = {};
    const root = `exports/${artistSlug}/${albumSlug}`;
    const songFolder = `${root}/${String(1).padStart(2, "0")}-${slugify(song.title)}`;
    files[`${songFolder}/lyrics.txt`] = song.lyrics?.text || "";
    files[`${songFolder}/style-prompt.txt`] = song.stylePrompt || "";
    files[`${songFolder}/arrangement.json`] = JSON.stringify(song.arrangement.length ? song.arrangement : state.arrangement, null, 2);
    files[`${songFolder}/rights-ledger.json`] = JSON.stringify(state.ledger.find((entry) => entry.assetId === song.id) || {}, null, 2);
    files[`${songFolder}/metadata.json`] = JSON.stringify(
      {
        title: song.title,
        artist: artist.name,
        album: album.title,
        duration: song.duration,
        voice: selectedVoice().name,
        commercialStatus: "Not cleared",
      },
      null,
      2
    );
    files[`${songFolder}/mock-audio-placeholder.txt`] = "No audio generated in this local-first MVP. Replace with a licensed or user-owned audio asset.";
    files[`${root}/album-metadata.csv`] = [
      "track_number,title,artist,album,genre,language,explicit,writer,producer,is_cover,lyrics_file,audio_file,commercial_rights_confirmed,notes",
      ...tracklist.map(
        (track) =>
          `${track.number},${csvValue(track.title)},${csvValue(artist.name)},${csvValue(album.title)},${csvValue(album.genre)},"English",${csvValue(album.explicit || "Clean")},${csvValue("Demo user")},${csvValue("MockProvider")},false,${csvValue(`${songFolder}/lyrics.txt`)},${csvValue(`${songFolder}/mock-audio-placeholder.txt`)},false,${csvValue(track.note)}`
      ),
    ].join("\n");
    files[`${root}/release-checklist.md`] = state.checklist.map((item) => `- [ ] ${item}`).join("\n");
    files[`${root}/cover-art-prompt.txt`] = state.outputs.cover || "";
    files[`${root}/rights-ledger-full.json`] = JSON.stringify(state.ledger, null, 2);
    files[`${root}/release-pack-manifest.json`] = JSON.stringify({ artist: artist.name, album: album.title, song: song.title, files: Object.keys(files) }, null, 2);
    files[`${root}/release-pack-tree.txt`] = Object.keys(files)
      .map((file) => file.replace(`${root}/`, ""))
      .sort()
      .join("\n");
    return { root, files, artist, album, song };
  };

  const csvValue = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

  const downloadText = (filename, content) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const exportToFolder = async () => {
    const { root, files, artist, album, song } = buildReleaseManifest();
    if (window.showDirectoryPicker) {
      const directory = await window.showDirectoryPicker({ mode: "readwrite" });
      const writeFile = async (dirHandle, path, content) => {
        const parts = path.split("/").filter(Boolean);
        const fileName = parts.pop();
        let current = dirHandle;
        for (const part of parts) current = await current.getDirectoryHandle(part, { create: true });
        const handle = await current.getFileHandle(fileName, { create: true });
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
      };
      for (const [path, content] of Object.entries(files)) {
        await writeFile(directory, path, content);
      }
      state.outputs.exportManifest = `${artist.name} / ${album.title} / ${song.title}`;
      state.ledger = state.ledger.map((entry) =>
        entry.assetId === song.id ? { ...entry, exportHistory: [...entry.exportHistory, `Exported to ${root}`] } : entry
      );
      save();
      notify("Release pack written to the selected folder.");
      return;
    }
    const manifest = JSON.stringify({ root, files }, null, 2);
    state.outputs.exportManifest = `${artist.name} / ${album.title} / ${song.title}`;
    downloadText("steady-voice-release-pack-manifest.json", manifest);
    notify("Folder access is unavailable, so a manifest download was created instead.");
    save();
  };

  const applyGeneratedSong = (draft) => {
    state.songs = [draft, ...state.songs.filter((song) => song.id !== draft.id)];
    state.ui.selectedSongId = draft.id;
    state.queue = [
      {
        id: uid("queue"),
        task: `Generate song draft - ${draft.title}`,
        provider: "MockProvider",
        status: "done",
        retries: 0,
        note: "Draft generated locally and saved to state.",
        createdAt: now(),
      },
      ...state.queue,
    ].slice(0, 8);
    const artist = state.artists.find((item) => item.id === draft.artistId);
    const voice = state.voiceProfiles.find((item) => item.id === draft.voiceId);
    const ledgerEntry = buildLedgerEntry({ song: draft, artist, voice, lyrics: draft.lyrics, stylePrompt: draft.stylePrompt });
    state.ledger = [ledgerEntry, ...state.ledger];
    notify(`Created draft for ${draft.title}.`);
  };

  const handleFormSubmit = (form, formName) => {
    const data = new FormData(form);
    if (formName === "artist") {
      const artist = {
        id: uid("artist"),
        name: data.get("name"),
        genre: data.get("genre"),
        tone: data.get("tone"),
        themes: splitList(data.get("themes")),
        bannedWords: splitList(data.get("banned")),
        allowedReferences: splitList(data.get("allowed")),
        visualBrand: data.get("visual"),
        legalNotes: data.get("legal"),
        ownershipNotes: "Created in Steady Voice AI Studio.",
        releaseHistory: [],
        albumConcepts: [],
        styleMemory: "",
        consistency: { vocalConsistency: 7, lyricalContinuity: 7, bannedSimilarity: "No real artist imitation" },
      };
      state.artists.unshift(artist);
      state.ui.selectedArtistId = artist.id;
      notify(`Created artist ${artist.name}.`);
      save();
      return;
    }
    if (formName === "voice") {
      const voice = {
        id: uid("voice"),
        artistId: data.get("artistId"),
        name: data.get("name"),
        presentation: data.get("presentation"),
        range: data.get("range"),
        tone: data.get("tone"),
        grit: Number(data.get("grit")),
        breathiness: Number(data.get("breathiness")),
        vibrato: Number(data.get("vibrato")),
        rasp: Number(data.get("rasp")),
        accent: Number(data.get("accent")),
        speed: Number(data.get("speed")),
        emotion: data.get("emotion"),
        seed: data.get("seed"),
        prohibitedSimilarity: data.get("prohibited"),
        proof: data.get("proof"),
      };
      state.voiceProfiles.unshift(voice);
      state.ui.selectedVoiceId = voice.id;
      notify(`Created voice profile ${voice.name}.`);
      save();
      return;
    }
    if (formName === "lyrics") {
      const artist = state.artists.find((item) => item.id === data.get("artistId")) || selectedArtist();
      const album = state.albums.find((item) => item.id === data.get("albumId")) || selectedAlbum();
      const lyrics = generateLyrics({
        artist,
        title: data.get("title"),
        concept: data.get("concept"),
        runtime: data.get("runtime"),
        rhymeDensity: data.get("rhymeDensity"),
        hookStrength: data.get("hookStrength"),
        emotionArc: data.get("emotionArc"),
        notes: data.get("notes"),
      });
      state.outputs.lyrics = lyrics.text;
      const draftSong = currentSong() || {
        id: uid("song"),
        artistId: artist.id,
        voiceId: selectedVoice().id,
        albumId: album.id,
      };
      const updated = {
        ...draftSong,
        artistId: artist.id,
        voiceId: selectedVoice().id,
        albumId: album.id,
        title: data.get("title"),
        lyrics,
        stylePrompt: state.outputs.style || "",
        template: "Intro / Verse / Pre-Chorus / Chorus / Verse / Chorus / Bridge / Outro",
        duration: data.get("runtime"),
        versions: draftSong.versions || [],
        arrangement: draftSong.arrangement || state.arrangement,
        stems: draftSong.stems || state.stems,
      };
      applyGeneratedSong(updated);
      save();
      return;
    }
    if (formName === "style") {
      const artist = selectedArtist();
      const style = makeStylePrompt({
        artist,
        genreBlend: data.get("genreBlend"),
        bpm: data.get("bpm"),
        key: data.get("key"),
        energy: data.get("energy"),
        mood: data.get("mood"),
        instrumentation: data.get("instrumentation"),
        vocal: data.get("vocal"),
        mix: data.get("mix"),
        mastering: data.get("mastering"),
        era: data.get("era"),
        avoid: data.get("avoid"),
      });
      state.outputs.style = style;
      const draftSong = currentSong() || state.songs[0];
      if (draftSong) {
        draftSong.stylePrompt = style;
      }
      state.queue.unshift({
        id: uid("queue"),
        task: "Generate style prompt",
        provider: "MockProvider",
        status: "done",
        retries: 0,
        note: "Prompt generated and stored locally.",
        createdAt: now(),
      });
      notify("Style prompt generated.");
      save();
      return;
    }
    if (formName === "song") {
      const artist = state.artists.find((item) => item.id === data.get("artistId")) || selectedArtist();
      const voice = state.voiceProfiles.find((item) => item.id === data.get("voiceId")) || selectedVoice();
      const album = state.albums.find((item) => item.id === data.get("albumId")) || selectedAlbum();
      const lyrics = {
        title: data.get("title"),
        text: data.get("lyrics"),
        runtime: data.get("duration"),
      };
      const draft = generateSongDraft({
        artist,
        voice,
        album,
        title: data.get("title"),
        lyrics,
        stylePrompt: data.get("stylePrompt"),
        template: data.get("template"),
        duration: data.get("duration"),
      });
      draft.lyrics = lyrics;
      draft.stylePrompt = data.get("stylePrompt");
      draft.arrangement = state.arrangement;
      draft.stems = state.stems;
      applyGeneratedSong(draft);
      state.outputs.song = `${draft.title}\n${draft.lyrics.text}\n${draft.stylePrompt}`;
      notify("Song draft assembled.");
      save();
      return;
    }
    if (formName === "album") {
      const album = {
        id: uid("album"),
        artistId: data.get("artistId"),
        title: data.get("title"),
        genre: data.get("genre"),
        trackCount: Number(data.get("trackCount")),
        notes: data.get("notes"),
        credits: data.get("credits"),
        explicit: data.get("explicit"),
        releaseNotes: "Created locally in the studio app.",
        tracks: [],
      };
      state.albums.unshift(album);
      state.ui.selectedAlbumId = album.id;
      generateTracklist(album);
      state.outputs.exportManifest = "";
      notify(`Created album ${album.title}.`);
      save();
      return;
    }
    if (formName === "license") {
      state.licenses.unshift({
        id: uid("license"),
        source: data.get("source"),
        license: data.get("license"),
        proof: data.get("proof"),
        notes: data.get("notes"),
      });
      notify("License entry added.");
      save();
    }
  };

  const saveLabSettings = () => {
    state.lab.identityLock = document.getElementById("identity-lock").checked;
    state.lab.timbreLock = document.getElementById("timbre-lock").checked;
    state.lab.rangeLimiter = document.getElementById("range-limiter").checked;
    state.lab.phraseMemory = document.getElementById("phrase-memory").checked;
    state.lab.similarityWarning = document.getElementById("similarity-warning").checked;
    state.lab.pronunciationDictionary = document.getElementById("pronunciation-dictionary").value;
    state.lab.adLibLibrary = document.getElementById("ad-lib-library").value;
    notify("Consistency lab settings saved.");
    save();
  };

  const saveSettings = () => {
    state.settings.localFirst = document.getElementById("local-first").checked;
    state.settings.promptWarnings = document.getElementById("prompt-warnings").checked;
    state.settings.autoSave = document.getElementById("auto-save").checked;
    state.settings.generationBudget = Number(document.getElementById("generation-budget").value);
    state.settings.storageTarget = document.getElementById("storage-target").value;
    state.settings.apiVault = document.getElementById("api-vault").value;
    notify("Settings saved.");
    save();
  };

  const saveSongVersion = () => {
    const song = currentSong();
    if (!song) return notify("Create a song draft first.");
    song.versions.unshift({
      id: uid("version"),
      savedAt: now(),
      title: song.title,
      lyrics: song.lyrics,
      stylePrompt: song.stylePrompt,
    });
    state.ledger = state.ledger.map((entry) =>
      entry.assetId === song.id ? { ...entry, exportHistory: [...entry.exportHistory, `Saved version at ${now()}`] } : entry
    );
    notify("Song version saved.");
    save();
  };

  const regenerateVerse = () => {
    const song = currentSong();
    if (!song || !song.lyrics) return notify("Create a lyric draft first.");
    const newVerse = `Verse 2\nFresh lines, original language, and a different route,\nno borrowed patterns, no copied pursuit,\n${song.title} keeps the center of the frame,\ncareful edits leave the voice the same.`;
    song.lyrics.text = song.lyrics.text.replace(/Verse 2[\s\S]*?Bridge/, `${newVerse}\n\nBridge`);
    state.queue.unshift({ id: uid("queue"), task: "Replace verse", provider: "MockProvider", status: "done", retries: 0, note: "Verse regenerated locally.", createdAt: now() });
    notify("Verse regenerated.");
    save();
  };

  const keepChorus = () => {
    const song = currentSong();
    if (!song || !song.lyrics) return notify("Create a lyric draft first.");
    state.queue.unshift({ id: uid("queue"), task: "Keep chorus", provider: "MockProvider", status: "done", retries: 0, note: "Chorus locked and preserved.", createdAt: now() });
    notify("Chorus locked.");
    save();
  };

  const lockHook = () => {
    const song = currentSong();
    if (!song || !song.lyrics) return notify("Create a lyric draft first.");
    song.lyrics.hookStrength = "Locked";
    state.queue.unshift({ id: uid("queue"), task: "Lock hook", provider: "MockProvider", status: "done", retries: 0, note: "Hook locked for consistent reuse.", createdAt: now() });
    notify("Hook locked.");
    save();
  };

  const regenerateSection = (index) => {
    const song = currentSong();
    if (!song) return;
    const section = song.arrangement[index];
    if (!section) return;
    section.note = `Regenerated locally for ${song.title}. Keep it original and clean.`;
    section.intensity = Math.min(10, section.intensity + 1);
    state.queue.unshift({
      id: uid("queue"),
      task: `Regenerate section - ${section.section}`,
      provider: "MockProvider",
      status: "done",
      retries: 0,
      note: `Section ${section.section} regenerated locally.`,
      createdAt: now(),
    });
    notify(`Section ${section.section} regenerated.`);
    save();
  };

  const retryTask = (taskId) => {
    const item = state.queue.find((entry) => entry.id === taskId);
    if (!item) return;
    item.retries += 1;
    item.status = item.retries > 1 ? "done" : "queued";
    item.note = `Retry attempt ${item.retries} recorded locally.`;
    notify(`Retry recorded for ${item.task}.`);
    save();
  };

  const updateTimelineValue = (index, field, value) => {
    const song = currentSong();
    const section = song?.arrangement?.[index] || state.arrangement[index];
    if (!section) return;
    if (field === "duration" || field === "intensity" || field === "vocal" || field === "instruments") {
      section[field === "duration" ? "duration" : field] = Number(value);
    } else if (field === "notes") {
      section.note = value;
    }
    save();
  };

  const updateStemValue = (index, field, value) => {
    const stem = state.stems[index];
    if (!stem) return;
    if (field === "volume" || field === "pan") stem[field] = Number(value);
    if (field === "mute" || field === "solo") stem[field] = Boolean(value);
    save();
  };

  const copyToClipboard = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "readonly");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  };

  const copyLyrics = async () => {
    const song = currentSong();
    if (!song?.lyrics?.text) return notify("Generate lyrics first.");
    await copyToClipboard(song.lyrics.text);
    notify("Lyrics copied.");
  };

  const copyStylePrompt = async () => {
    const song = currentSong();
    if (!song?.stylePrompt) return notify("Generate a style prompt first.");
    await copyToClipboard(song.stylePrompt);
    notify("Style prompt copied.");
  };

  const copySystemSummary = async () => {
    const artist = selectedArtist();
    const album = selectedAlbum();
    const voice = selectedVoice();
    const summary = [
      "Steady Voice AI Studio",
      `Artist: ${artist?.name || "None"}`,
      `Album: ${album?.title || "None"}`,
      `Voice: ${voice?.name || "None"}`,
      `Songs: ${state.songs.length}`,
      `Ledger entries: ${state.ledger.length}`,
      `Mode: ${state.ui.activeMode}`,
      "MockProvider enabled. No telemetry by default. No real-artist imitation.",
    ].join("\n");
    await copyToClipboard(summary);
    notify("System summary copied.");
  };

  const copyMetadata = async () => {
    const manifest = buildReleaseManifest();
    const csv = manifest.files[`${manifest.root}/album-metadata.csv`];
    await copyToClipboard(csv);
    notify("Album metadata CSV copied.");
  };

  const downloadManifest = () => {
    const manifest = buildReleaseManifest();
    downloadText("steady-voice-release-pack-manifest.json", JSON.stringify(manifest.files, null, 2));
    state.outputs.exportManifest = `${manifest.artist.name} / ${manifest.album.title} / ${manifest.song.title}`;
    notify("Manifest downloaded.");
    save();
  };

  const downloadTree = async () => {
    const manifest = buildReleaseManifest();
    await copyToClipboard(manifest.files[`${manifest.root}/release-pack-tree.txt`]);
    notify("Folder tree copied.");
  };

  const resetDemo = () => {
    state = structuredClone(DEFAULT_STATE);
    STORAGE.save(state);
    notify("Demo data restored.");
    render();
  };

  const backupData = async () => {
    await copyToClipboard(JSON.stringify(state, null, 2));
    notify("Local state copied for backup.");
  };

  const clearData = () => {
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(DEFAULT_STATE);
    render();
    notify("Local data cleared and demo state restored.");
  };

  const generateTracklistAction = () => {
    const album = selectedAlbum();
    if (!album) return notify("Create an album first.");
    generateTracklist(album);
    notify(`Tracklist generated for ${album.title}.`);
    save();
  };

  const titleCaseHelper = async () => {
    const album = selectedAlbum();
    await copyToClipboard(titleCase(album.title));
    notify("Title-cased album name copied.");
  };

  const exportPackage = async () => {
    try {
      await exportToFolder();
    } catch (error) {
      console.error(error);
      notify("Export failed or was cancelled.");
    }
  };

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const formName = form.dataset.form;
    if (!formName) return;
    event.preventDefault();
    handleFormSubmit(form, formName);
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    if (action === "timeline-duration" || action === "timeline-intensity" || action === "timeline-vocal" || action === "timeline-instruments") {
      updateTimelineValue(Number(target.dataset.index), action.split("-")[1], target.value);
    }
    if (action === "stem-volume" || action === "stem-pan") {
      updateStemValue(Number(target.dataset.index), action.split("-")[1], target.value);
    }
    if (action === "stem-mute" || action === "stem-solo") {
      updateStemValue(Number(target.dataset.index), action.split("-")[1], target.checked);
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === "identity-lock" || target.id === "timbre-lock" || target.id === "range-limiter" || target.id === "phrase-memory" || target.id === "similarity-warning") {
      return;
    }
    if (target.dataset.action === "timeline-notes") {
      updateTimelineValue(Number(target.dataset.index), "notes", target.value);
    }
  });

  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const action = target.dataset.action;
    const id = target.dataset.id;
    const index = target.dataset.index;
    if (action === "seed-demo" || action === "reset-demo") return resetDemo();
    if (action === "export-package") return exportPackage();
    if (action === "copy-system-summary") return copySystemSummary();
    if (action === "copy-lyrics") return copyLyrics();
    if (action === "copy-style-prompt") return copyStylePrompt();
    if (action === "copy-metadata") return copyMetadata();
    if (action === "download-manifest") return downloadManifest();
    if (action === "download-tree") return downloadTree();
    if (action === "copy-debug") return copyToClipboard(els.debugOutput.textContent).then(() => notify("Debug JSON copied."));
    if (action === "backup-data") return backupData();
    if (action === "clear-data") return clearData();
    if (action === "save-settings") return saveSettings();
    if (action === "save-lab-settings") return saveLabSettings();
    if (action === "save-song-version") return saveSongVersion();
    if (action === "regenerate-verse") return regenerateVerse();
    if (action === "keep-chorus") return keepChorus();
    if (action === "lock-hook") return lockHook();
    if (action === "generate-tracklist") return generateTracklistAction();
    if (action === "title-case") return titleCaseHelper();
    if (action === "select-artist") return updateSelected("artist", id);
    if (action === "retry-task") return retryTask(id);
    if (action === "regenerate-section") return regenerateSection(Number(index));
  });

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    if (target.id === "artist-select") return updateSelected("artist", target.value);
    if (target.id === "album-select") return updateSelected("album", target.value);
    if (target.id === "voice-select") return updateSelected("voice", target.value);
    if (target.id === "voice-artist-select") {
      state.ui.selectedArtistId = target.value;
      return save();
    }
    if (target.id === "lyric-artist-select") {
      state.ui.selectedArtistId = target.value;
      return save();
    }
    if (target.id === "lyric-album-select") {
      state.ui.selectedAlbumId = target.value;
      return save();
    }
    if (target.id === "song-artist-select") {
      state.ui.selectedArtistId = target.value;
      return save();
    }
    if (target.id === "song-voice-select") {
      state.ui.selectedVoiceId = target.value;
      return save();
    }
    if (target.id === "song-album-select") {
      state.ui.selectedAlbumId = target.value;
      return save();
    }
    save();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const active = document.activeElement;
    if (active && typeof active.blur === "function") active.blur();
  });

  const syncMode = () => {
    state.ui.activeMode = "Personal Development Mode";
    if (els.modeChip) els.modeChip.textContent = state.ui.activeMode;
  };

  syncMode();
  render();
})();

# Rights Ledger Schema

Every generated asset should have a ledger record.

## Core fields

- `id`
- `assetId`
- `artistProfileId`
- `promptUsed`
- `lyricSource`
- `voiceSource`
- `datasetSource`
- `generationDate`
- `modelProvider`
- `commercialStatus`
- `copyrightRiskFlag`
- `humanContributionNotes`
- `ownershipNotes`
- `exportHistory`
- `distributionStatus`

## Suggested values

- `commercialStatus`: `Not cleared`, `Personal use only`, `License confirmed`, `Ready for distribution`
- `copyrightRiskFlag`: `Low`, `Review required`, `High`
- `distributionStatus`: `Not distributed`, `Queued`, `Published`, `Archived`

## Ledger policy

- Create an entry for every song draft, voice profile, dataset, prompt, cover prompt, and export bundle.
- Update the export history whenever a file is copied, written, or downloaded.
- Keep human review notes for any asset that will leave personal development mode.


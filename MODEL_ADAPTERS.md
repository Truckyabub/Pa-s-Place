# Model Adapters

Steady Voice AI Studio is built to support multiple provider types without baking in unauthorized scraping or automation.

## Adapter interface

- `providerName`
- `generateSong()`
- `generateVocals()`
- `generateInstrumental()`
- `regenerateSection()`
- `generateStems()`
- `getUsage()`
- `validateLicense()`
- `estimateCost()`

## Placeholder adapters

- `MockProvider`
- `LocalModelProvider`
- `LicensedCloudProvider`
- `UserOwnedModelProvider`

## Adapter rules

- Providers must refuse illegal requests.
- Providers must surface usage and cost estimates.
- Providers must expose license checks before export.
- The app must never automate third-party releases or logins.


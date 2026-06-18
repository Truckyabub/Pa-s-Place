# Export Formats

## Supported outputs

- song prompt TXT
- lyric TXT
- style prompt TXT
- metadata JSON
- rights ledger JSON
- album CSV
- release checklist markdown
- folder tree manifest

## Release tree

```text
exports/
  artist-name/
    album-name/
      01-song-title/
        lyrics.txt
        style-prompt.txt
        rights-ledger.json
        metadata.json
        audio-placeholder.txt
      album-metadata.csv
      release-checklist.md
```

## Browser export behavior

- If folder access is available, the app writes the tree directly.
- If folder access is not available, the app downloads a JSON manifest that mirrors the tree.


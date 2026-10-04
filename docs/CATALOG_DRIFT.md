# Catalog drift policy

The kernel repo `contracts/catalog.json` may list more trunks than this surface repo ships on GitHub Pages.

## Intentionally kernel-only (as of 2026-10-04)

| Catalog id | File | Reason |
| --- | --- | --- |
| `adp.trunk` | `adp.sheaf.json` | Rolled specimen not yet mirrored to Pages; add when sync PR copies file + catalog entry |

## Rules

1. Every `*.sheaf.json` **present** under surface `contracts/` must validate and match the pinned kernel byte-for-byte (`check-kernel-sync.mjs`).
2. Adding a catalog entry here requires the matching file synced from kernel in the same PR.
3. Removing a file requires removing its catalog entry and updating the pin if kernel moved.

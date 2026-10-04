# Integration — cell-sheaf (surface) + cell-sheaf-swarm (kernel)

| Repo | Role |
| --- | --- |
| [cell-sheaf-swarm](https://github.com/manutej/cell-sheaf-swarm) | Contracts, schema, validation, TS/React observatory, pulse clock |
| **cell-sheaf** (this repo) | HTML template, GitHub Pages — swap sheaf JSON, never fork visual law |

Full integration procedure and federated-loop plan live in the kernel repo:

- [INTEGRATION.md](https://github.com/manutej/cell-sheaf-swarm/blob/main/docs/INTEGRATION.md)
- [MVP plan](https://github.com/manutej/cell-sheaf-swarm/blob/main/docs/plans/2026-10-04-unified-integration-mvp-plan.md)

## CI contract spine

On every push/PR, GitHub Actions:

1. Checks out **cell-sheaf-swarm** at the commit in `docs/SWARM_KERNEL_PIN.json`
2. Runs `scripts/validate-contracts.mjs` (kernel validator on surface `contracts/`)
3. Runs `scripts/check-kernel-sync.mjs` (byte parity for mirrored `*.sheaf.json` and `template/tokens.css`)

Bump the pin when you intentionally sync from a tagged kernel release.

## Catalog scope

Surface `contracts/catalog.json` lists only specimens shipped on Pages. See [CATALOG_DRIFT.md](./CATALOG_DRIFT.md) for entries that stay kernel-only until synced.

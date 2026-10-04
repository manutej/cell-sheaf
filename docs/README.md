# Build hub — unified cell-sheaf integration

Self-contained documentation for builders working in **cell-sheaf** (HTML surface + GitHub Pages). The kernel ([cell-sheaf-swarm](https://github.com/manutej/cell-sheaf-swarm)) remains contract authority; this tree is enough to work offline on sync, CI, and the integrated product direction.

## Kernel vs surface

| Repo | Role | Edit contracts / schema / pulse here first |
| --- | --- | --- |
| [cell-sheaf-swarm](https://github.com/manutej/cell-sheaf-swarm) | Schema, validation, TS/React observatory, swarm clock | Yes |
| **cell-sheaf** (this repo) | `template/`, Pages entry, mirrored `contracts/` | Mirror only after kernel merge + tag |

Canonical JSON schema and `validate-sheaf.mjs` live in the kernel. Surface CI runs that validator at the commit pinned in [SWARM_KERNEL_PIN.json](./SWARM_KERNEL_PIN.json).

## Start here

| Doc | Purpose |
| --- | --- |
| [INTEGRATION.md](./INTEGRATION.md) | Sync procedure, federated loop summary, CI spine, catalog policy |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Diagrams: release bus, federated pulse, eval harness |
| [UNIFIED_STRATEGY_DRAFT.md](./UNIFIED_STRATEGY_DRAFT.md) | Product strategy (draft) |
| [plans/2026-10-04-unified-integration-mvp-plan.md](./plans/2026-10-04-unified-integration-mvp-plan.md) | MVP requirements, units, verification |
| [IMPLEMENTATION_OUTLINE.md](./IMPLEMENTATION_OUTLINE.md) | Phased tasks for `ce-work` |
| [CATALOG_DRIFT.md](./CATALOG_DRIFT.md) | Which catalog entries stay kernel-only until sync |
| [ideation/2026-10-04-unified-cell-sheaf-integration-ideation.html](./ideation/2026-10-04-unified-cell-sheaf-integration-ideation.html) | Ranked ideation survivors (open in browser) |

## Pull requests (integration spine)

| Branch | PR | Scope |
| --- | --- | --- |
| `cursor/contract-release-bus-50e6` | [feat: contract release bus CI and kernel sync checks](https://github.com/manutej/cell-sheaf/pull/1) | Phase 0 — validate + kernel byte parity ([`.github/workflows/sheaf.yml`](../.github/workflows/sheaf.yml)) |

Kernel-side plans and duplicate copies may also exist under [cell-sheaf-swarm `docs/`](https://github.com/manutej/cell-sheaf-swarm/tree/main/docs); **this `docs/` tree is the surface build hub** to fetch when rolling Pages or opening sync PRs.

## Quick verify (local)

```sh
# From repo root — needs Node 22+ and a checkout of the pinned kernel (CI uses _kernel/)
node scripts/validate-contracts.mjs
node scripts/check-kernel-sync.mjs
```

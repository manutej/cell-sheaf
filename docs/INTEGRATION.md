# Integration — cell-sheaf (surface) + cell-sheaf-swarm (kernel)

## Roles

| Repo | Role | Change here first |
| --- | --- | --- |
| [cell-sheaf-swarm](https://github.com/manutej/cell-sheaf-swarm) | Contract schema, validation, TS kernel, React observatory, swarm clock | Contracts, schema, pulse logic, kernel CI |
| **cell-sheaf** (this repo) | HTML design template (`template/`), GitHub Pages entry | Never restyle `tokens.css`; swap sheaf JSON; mirror kernel on release |

## Workspace `/agent`

The `/agent` directory in Cloud Agent environments holds **two sibling clones** under `repos/`. It is not a monorepo — no shared root `package.json`. Use it to run cross-repo plans; **publish integration docs from this surface repo** (`docs/README.md`) so builders can pull one tree.

## Sync procedure (target state)

1. Merge contract changes in **cell-sheaf-swarm**; run `node scripts/validate-sheaf.mjs` green ([kernel scripts](https://github.com/manutej/cell-sheaf-swarm/tree/main/scripts)).
2. Tag release `vX.Y.Z` on the kernel.
3. Open PR in **cell-sheaf** copying `contracts/` and `template/` from that tag (or run an automated sync job when Phase 4 lands).
4. Bump [SWARM_KERNEL_PIN.json](./SWARM_KERNEL_PIN.json) to the kernel commit or tag SHA.
5. Surface CI runs the same validate script against the pin and checks byte parity for mirrored artifacts.

See [CATALOG_DRIFT.md](./CATALOG_DRIFT.md) before adding catalog entries that are not yet mirrored.

## Federated loop (MVP direction)

Full requirements: [plans/2026-10-04-unified-integration-mvp-plan.md](./plans/2026-10-04-unified-integration-mvp-plan.md). Architecture sketch: [ARCHITECTURE.md](./ARCHITECTURE.md).

**Summary:** Extract pulse clock law from Zustand ([`store.ts`](https://github.com/manutej/cell-sheaf-swarm/blob/main/src/lib/swarm/store.ts) → future `pulse-core` + CLI). Headless runner selects idle agents, assigns restriction ρ on a pillar, dispatches a **worker adapter** (local shell, GitHub Actions, etc.), then sets agent done/blocked. Kernel/fixer roles emit commits only when ρ is `ok`. Eval tick emits JEV / seat summary; reviewer agents append **draft** findings — humans promote `strange` → `ok`.

Workers map to agent roles on restriction edges; eval findings live on the sheaf JSON (schema extension in kernel).

## CI contract spine (this repo)

On every push/PR, GitHub Actions ([`.github/workflows/sheaf.yml`](../.github/workflows/sheaf.yml)):

1. Checks out **cell-sheaf-swarm** at the commit in [SWARM_KERNEL_PIN.json](./SWARM_KERNEL_PIN.json)
2. Runs `scripts/validate-contracts.mjs` (kernel validator on surface `contracts/`)
3. Runs `scripts/check-kernel-sync.mjs` (byte parity for mirrored `*.sheaf.json` and `template/tokens.css`)

Bump the pin when you intentionally sync from a tagged kernel release.

## Catalog scope

Surface `contracts/catalog.json` lists only specimens shipped on Pages. See [CATALOG_DRIFT.md](./CATALOG_DRIFT.md) for entries that stay kernel-only until synced.

## Related artifacts (this repo)

- Index: [README.md](./README.md)
- Ideation: [ideation/2026-10-04-unified-cell-sheaf-integration-ideation.html](./ideation/2026-10-04-unified-cell-sheaf-integration-ideation.html)
- Strategy draft: [UNIFIED_STRATEGY_DRAFT.md](./UNIFIED_STRATEGY_DRAFT.md)
- Implementation outline: [IMPLEMENTATION_OUTLINE.md](./IMPLEMENTATION_OUTLINE.md)

# cell-sheaf

HTML **design template** for a cellular sheaf volume. Copy [`template/`](template/). Do not restyle `tokens.css`. JSON is the sheaf.

This is the visual law people copy when rolling a new sheaf — not a screenshot, not the React observatory.

Kernel + swarm clock + contract schema: [manutej/cell-sheaf-swarm](https://github.com/manutej/cell-sheaf-swarm)

## Build & integration

Unified product direction, MVP plan, phased outline, and Phase 0 CI live under **[docs/README.md](docs/README.md)** (surface build hub). Start with [docs/INTEGRATION.md](docs/INTEGRATION.md) for kernel vs surface roles, sync procedure, and federated-loop summary; CI validates `contracts/` against [docs/SWARM_KERNEL_PIN.json](docs/SWARM_KERNEL_PIN.json).

## Copy this chrome

| file | role |
| --- | --- |
| `template/index.html` | Chrome. Loads catalog + any rolled sheaf. |
| `template/tokens.css` | Sanzo Wada tokens. Olive-buff paper, ube, emerald, gold. **Do not restyle.** |
| `template/volume.paint.js` | Curvilinear ρ, last-folder pillars, up/down fans. |
| `template/volume.boot.js` | Contract fetch, swipe/orbit, pause-default, roll file. |
| `contracts/*.sheaf.json` | The sheaf. Swap this. |

Root `index.html` is the same template over `contracts/` (GitHub Pages entry). Enable Pages from `main` / root.

Pause is default. Cap = ancillary (up). Base = downstream (down). Gold is earned (`onTrunk`).

## Views

The title is the one map that opens a closed folder. Mode remaps which family is drawn: Exists, Restricts, Stacks, Known, May fold, Lives.

## Glue

| status | color | fold into trunk? |
| --- | --- | --- |
| `ok` | green | yes |
| `strange` | orange | only after a person |
| `broken` | red | no |
| `missing` | gray dashed | no |

Pillars are **last-folders**. Color is glue, not taste.

License: MIT.

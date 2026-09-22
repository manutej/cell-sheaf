# cell-sheaf

HTML **design template** for a cellular sheaf volume. Copy [`template/`](template/). Do not restyle `tokens.css`. JSON is the sheaf.

This is the visual law people copy when rolling a new sheaf — not a screenshot, not the React observatory.

Kernel + swarm clock + contract schema: [manutej/cell-sheaf-swarm](https://github.com/manutej/cell-sheaf-swarm)

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

Mode remaps which ρ family is drawn: pillars · rho · strata · harmonic · trunk · subspaces.

## Glue

| status | color | fold into trunk? |
| --- | --- | --- |
| `ok` | green | yes |
| `strange` | orange | only after a person |
| `broken` | red | no |
| `missing` | gray dashed | no |

Pillars are **last-folders**. Color is glue, not taste.

License: MIT.

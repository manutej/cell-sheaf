# cell-sheaf

Cellular sheaf volume for mapping **stalks**, **restriction maps** ρ, and **glue status** — not a prettier graph.

Touch-first. Pause-first. Color is the restriction, not a review.

## Open it

Open [index.html](index.html) in a browser, or enable GitHub Pages on `main` (`/` root).

Phone and tablet: swipe **vertically** through modes. Restriction maps change with the mode. Tap a pillar. The inspector is a small bottom sheet.

## Modes (vertical)

| # | Mode | What ρ is drawn |
|---|---|---|
| 1 | Pillars | stalks only — height = dim |
| 2 | Restrictions | entity → relation \(R_{rv}: F(v)\to F(r)\) |
| 3 | Strata | hierarchy ρ (kind planes) |
| 4 | Harmonic | known boundary \(B\) extends into unknown \(U\) |
| 5 | Fan | one stalk’s ancillary nodes (up = can-see, down = downstream) |
| 6 | Subspaces | type discs ↔ artifacts ↔ lower sheaf pillars |

## Glue color (operadic trunk)

| Color | ρ status | Commit rule |
|---|---|---|
| Green | compose = collapse | legal trunk edge |
| Orange | map exists, rank/sort odd | needs a person |
| Red | missing, or \(\delta\) will not go to zero | do not fold |

## Touch

- Vertical swipe on the volume → next / previous mode (ρ family remaps)
- Horizontal drag → orbit
- Pinch → zoom
- Tap pillar / commit / artifact → sheet
- Swipe sheet down → dismiss
- Space or Play → orbit on/off (starts **paused**)

Desktop still has hover stalks. Coarse pointers never rely on hover.

## Data

Map a repo by writing SHAs into [`data/trunk-sheaf.json`](data/trunk-sheaf.json).

- `pooledFrom` is last-folder only, never a full path
- `note` on an edge is `ok | strange | broken | missing`
- a pre-commit hook can refuse a new ρ that would paint orange or red

Specimen graph in the volume is Greta / Little Women / Saoirse (Cobb–Gebhart inductive example) plus this repo as a trunk stalk.

## Palette

Sanzo Wada combinations — Olive Buff paper, Cossack Green known, wine unknown, Cinnamon Buff gold pinned, Neutral Gray silver edge-stalks, Burnt Sienna coboundary friction, Cotinga Purple / ube orchestration.

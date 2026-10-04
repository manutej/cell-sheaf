# Architecture — integrated cell-sheaf (surface view)

Concise maps for builders. Implementation authority for pulse, schema, and validate remains in [cell-sheaf-swarm](https://github.com/manutej/cell-sheaf-swarm).

## Sister repos and release bus

```mermaid
flowchart LR
  subgraph kernel["cell-sheaf-swarm (kernel)"]
    C[contracts + schema]
    V[validate-sheaf.mjs]
    P[pulse / store.ts → pulse-core]
  end
  subgraph surface["cell-sheaf (surface)"]
    T[template/ + Pages]
    M[mirrored contracts/]
    CI[sheaf.yml CI]
  end
  C -->|tag sync PR| M
  C -->|copy template| T
  V -->|pinned ref| CI
  CI -->|fail on drift| M
```

## Federated pulse loop (MVP)

```mermaid
sequenceDiagram
  participant Core as pulse-core / CLI
  participant Graph as sheaf JSON
  participant Worker as WorkerAdapter
  participant Eval as eval seats / JEV

  Core->>Graph: read agents + restrictions ρ
  Core->>Core: idle agent → assign edgeId
  Core->>Worker: dispatch role, edgeId, task
  Worker-->>Core: ok | blocked + reason
  alt ρ ok
    Core->>Graph: commit / done
  else ρ broken or blocked
    Core->>Graph: block agent
  end
  Core->>Eval: eval tick (e.g. every 14 ticks)
  Eval->>Graph: append findings[] draft patches
  Note over Graph: Human or operad q0 CI promotes patches
```

## Evaluation harness (v0)

```mermaid
flowchart TB
  EVAL[EVAL.md four seats]
  F[findings[] on sheaf JSON]
  R[reviewer agents on eval tick]
  P[draft patch proposals]
  H[human / operad q0 gate]
  EVAL --> F
  R --> F
  F --> P
  P --> H
  H -->|promote| OK[ρ status ok on trunk]
```

## Where to read more

- [INTEGRATION.md](./INTEGRATION.md) — sync steps and CI
- [plans/2026-10-04-unified-integration-mvp-plan.md](./plans/2026-10-04-unified-integration-mvp-plan.md) — requirements and implementation units

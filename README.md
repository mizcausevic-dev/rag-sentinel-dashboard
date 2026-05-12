# RAG Sentinel Dashboard

> Live governance dashboard for **RAG Sentinel** — hallucination detection, source freshness, citation quality, and drift monitoring for enterprise retrieval-augmented generation systems.

[![CI](https://github.com/mizcausevic-dev/rag-sentinel-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/mizcausevic-dev/rag-sentinel-dashboard/actions/workflows/ci.yml)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-A78BFA.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Live demo](https://img.shields.io/badge/demo-rag.kineticgain.com-A78BFA.svg)](https://rag.kineticgain.com)
[![React](https://img.shields.io/badge/React-19-A78BFA.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-A78BFA.svg)](https://www.typescriptlang.org/)

The visual surface for the [`rag-sentinel`](https://github.com/mizcausevic-dev/rag-sentinel) governance engine. Real-time-shaped UX showing what enterprise RAG oversight looks like — corpus freshness audits, retrieval quality scoring, hallucination signal detection, and a quality score that ML/AI Ops teams can actually read at 3 AM.

> **RAG** = retrieval-augmented generation. Most enterprise AI products built on LLMs use RAG to ground responses in proprietary knowledge — product docs, support KBs, internal wikis, contracts. Without governance, RAG hallucinates, cites stale sources, leaks deprecated info, and drifts. This dashboard makes that visible.

---

## Live demo

[**rag.kineticgain.com**](https://rag.kineticgain.com) — interactive preview of the governance UX.

---

## What you see

| Surface | What it shows |
|---|---|
| **Global Overview** | Indexed documents, retrieval call count, hallucination risk, average retrieval latency. The 30-second corpus health summary. |
| **Vector Search Heatmap** | Animated retrieval visualization — incoming queries flowing through the embedding layer. Semantic hits, hallucination-risk markers, and fresh-citation labels rendered as floating annotations around the index core. |
| **Retrieval Log** | Real-time-shaped log feed with `[HIT] / [MISS] / [HALL] / [STALE] / [INFO]` tagging. Visible at-a-glance whether the corpus is healthy, drifting, or hallucinating. |
| **Corpus Intelligence** | Inspect any collection or document in the corpus — selected file shows risk level, source freshness %, citation quality %, and a contextual code preview with policy-aware highlighting. |

---

## Why this exists

Modern AI products ship RAG fast. Most of them have **no quality oversight** — they trust the embeddings, hope the citations are good, and pray the corpus is fresh. This dashboard is what RAG quality looks like in production: a single-page operator surface that:

- **ML / AI Ops can dock to a wall** in their drift war room
- **Product leads can show the team** when a customer complains about a stale answer
- **CISO / Compliance can read** as part of an AI risk attestation
- **Hiring managers** review in 30 seconds during a portfolio scan

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.8 |
| Styling | Tailwind 4 (CSS variable theme) |
| Animations | Motion |
| Icons | Lucide React |
| Fonts | IBM Plex Sans / Mono / Serif |
| Theme | Black + violet — the AI/ML semiotic (violet = embeddings/intelligence, red = hallucination, amber = stale) |

---

## Quick start

```bash
git clone https://github.com/mizcausevic-dev/rag-sentinel-dashboard.git
cd rag-sentinel-dashboard
npm install
npm run dev
```

Open http://localhost:3000.

### Build for production

```bash
npm run build      # tsc + vite build → dist/
npm run preview    # serve dist/ locally to test
```

---

## Roadmap

### v0.1 — *Shipped*
- [x] Governance dashboard UX (Global Overview + Corpus Intelligence tabs)
- [x] Animated vector search heatmap
- [x] Retrieval log feed with semantic tagging (HIT / MISS / HALL / STALE)
- [x] Corpus tree + source-quality scoring panel
- [x] AGPL-3.0 license + CI matrix on Node 20 / 22

### v0.2 — *Next*
- [ ] **Live vector store scanning** — paste a Pinecone / Weaviate / Qdrant / Chroma URL, get a real audit
- [ ] Real hallucination detectors (semantic-similarity vs cited source, claim verification)
- [ ] Backend proxy (Cloudflare Workers) for vector store inspection without exposing API keys
- [ ] Source-freshness diff reports (week-over-week)

### v0.3 — *Product*
- [ ] Multi-corpus fleet view (compare quality across N vector stores)
- [ ] Webhook / Slack alerts on hallucination spikes or drift events
- [ ] Scheduled re-audits with diff reports
- [ ] Exportable PDF audit report for AI risk reviewers

### v1.0 — *Commercial*
- [ ] SaaS tiers (Free per-corpus / Pro / Team)
- [ ] Enterprise feature: org-wide RAG inventory + AI Act / SOC 2 attestations
- [ ] White-label / on-prem deploys

---

## Companion repository

This dashboard is the visual surface for [`rag-sentinel`](https://github.com/mizcausevic-dev/rag-sentinel) — the actual TypeScript implementation of the RAG governance engine. The two are deliberately split:

- **`rag-sentinel`** = the engine (chunk quality scorers, freshness audits, hallucination signals)
- **`rag-sentinel-dashboard`** = the UX (this repo)

Run them together for a complete audit, or run the dashboard standalone to showcase the UX.

---

## License

**AGPL-3.0-only**. See [LICENSE](LICENSE).

The AGPL means: you can fork, modify, and self-host this — but if you run a modified version as a service, you must publish your source. This protects the project's monetization runway while keeping it genuinely open-source for ML/AI teams.

For commercial licensing inquiries (closed-source forks, white-label deployments, on-prem with proprietary modifications), contact: **miz@kineticgain.com**

---

## Author

**Miz Causevic** — Director of Web Engineering · Platform Architecture
[mizcausevic-dev.github.io](https://mizcausevic-dev.github.io/) · [github.com/mizcausevic-dev](https://github.com/mizcausevic-dev) · [gv.kineticgain.com](https://gv.kineticgain.com) · [mcp.kineticgain.com](https://mcp.kineticgain.com)

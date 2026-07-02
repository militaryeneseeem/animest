# Animest

Animest is a production-oriented anime discovery, ratings, community, and AI recommendation platform designed as an IMDb/MyAnimeList/AniList/Letterboxd-class system.

## Architecture

- **Frontend:** Next.js App Router, React, TypeScript, TailwindCSS, Framer Motion, shadcn-style primitives.
- **Backend:** Node.js, Express, TypeScript, REST/OpenAPI-ready modules, Socket.io.
- **Data:** PostgreSQL with Prisma, Redis cache, Elasticsearch search indexes, pgvector-style embedding fields.
- **AI:** Hybrid recommender using metadata, collaborative signals, vector search, RAG explanations, and spoiler-aware chat.
- **Security:** JWT access tokens, rotating refresh sessions, OAuth providers, RBAC, rate limiting, audit logs, security headers.
- **Operations:** Docker Compose for local infrastructure and GitHub Actions CI.

## Commands

```bash
node --version # must be 24+
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

## Local Infrastructure

```bash
docker compose up -d postgres redis elasticsearch minio
```

Copy `.env.example` to `.env` before running services.

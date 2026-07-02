# Animest Production Architecture

## Product Surface

Animest combines a canonical anime database, social reviewing, lists, streaming-style discovery, AI recommendations, multilingual content, and administration.

## Bounded Contexts

1. **Identity & Trust:** OAuth, passkeys, 2FA, refresh-token rotation, device sessions, audit logs, RBAC.
2. **Anime Catalog:** titles, aliases, formats, seasons, studios, staff, characters, voice actors, tags, streaming availability, external IDs.
3. **Community:** reviews, ratings, reactions, comments, forums, follows, mentions, lists, messages, notifications.
4. **AI & Search:** lexical search, semantic search, embeddings, recommendation explanations, spoiler-gated chat, translations.
5. **Admin & Moderation:** moderation queues, AI-assisted triage, reports, bans, backups, analytics.

## Request Flow

- Browser renders SSR/streaming Next.js pages for SEO and Core Web Vitals.
- API clients call Express REST endpoints through a versioned `/api/v1` surface.
- PostgreSQL stores normalized source-of-truth data; Prisma enforces typed access.
- Redis stores hot cache, rate-limit counters, sessions, queues, and websocket presence.
- Elasticsearch stores denormalized searchable anime documents and autocomplete payloads.
- AI services retrieve candidates from Elasticsearch/vector metadata, augment with user history, then generate spoiler-safe explanations.

## Scalability Principles

- Every public list endpoint is cursor-paginated and cache-aware.
- Writes emit domain events for search indexing, feed fanout, notifications, and AI embedding refresh.
- Catalog entities use stable slugs and external IDs to survive provider imports.
- Security-critical flows log structured audit events.
- User-facing dynamic translations are stored independently from canonical locale strings.

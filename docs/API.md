# API Contract Overview

All endpoints live under `/api/v1` and return JSON envelopes:

```json
{ "data": {}, "meta": { "requestId": "..." } }
```

## Core Routes

- `GET /health` — process health and dependency hints.
- `GET /api/v1/anime/trending` — trending catalog rail.
- `GET /api/v1/anime/search?q=&filters=` — lexical and filter search entrypoint.
- `POST /api/v1/ai/recommendations` — natural-language recommendation query with explanation.
- `POST /api/v1/auth/login` — credential login placeholder for JWT issuance.
- `GET /api/v1/users/:username` — public profile summary.
- `GET /api/v1/admin/overview` — RBAC-protected operational overview.

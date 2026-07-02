# AI Recommendation and Chat System

The AI layer is designed as a hybrid retrieval system:

1. Parse natural-language intent into genres, moods, themes, exclusions, spoiler tolerance, and similarity anchors.
2. Retrieve candidates from Elasticsearch lexical filters and vector embeddings.
3. Re-rank candidates with profile signals: ratings, favorites, dropped shows, watch time, social graph, and similar cohorts.
4. Generate transparent explanations that cite user behavior without leaking private data.
5. Enforce spoiler levels from `0` to `FULL` before prompt assembly and response delivery.

Dynamic translation uses locale metadata, plural rules, RTL flags, and optional AI translations cached per content revision.

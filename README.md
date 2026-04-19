# askucits-web

Next.js front-end for [AskUcits.com Flow Radar](https://github.com/Al033/askucits-flow-radar).

Consumes the pipeline's public JSON API. **No direct DB access** — all reads go through `https://api.askucits.com` (the FastAPI app shipped in the pipeline repo).

## Stack

- Next.js 16 (App Router + Cache Components)
- React 19
- TypeScript 5.7
- Tailwind CSS 4
- Deployed to Vercel (or any Node host)

## Quick start

```bash
pnpm install           # or npm / yarn — package.json is portable
cp .env.example .env.local
# Point NEXT_PUBLIC_API_BASE at a running pipeline FastAPI. For local dev,
# start the pipeline's uvicorn on :8000 and leave the default.
pnpm dev
# http://localhost:3000
```

If the API isn't reachable, every page renders a graceful "no data yet" state — safe to develop against a cold pipeline.

## Pages

- `/` — this week by category + latest approved editorial commentary.
- `/methodology` — verbatim from the pipeline's `docs/05-flow-methodology.md` (published per `docs/06-legal-compliance.md`).

## API contract

Documented upstream in the pipeline repo at
[`docs/08-api-contract.md`](https://github.com/Al033/askucits-flow-radar/blob/main/docs/08-api-contract.md).
Endpoints consumed:

- `GET /api/v1/flows/weekly`
- `GET /api/v1/flows/latest?limit=25`
- `GET /api/v1/commentary/latest`

The typed client in [`lib/api.ts`](lib/api.ts) mirrors the response shapes.
When the pipeline contract changes, regenerate the OpenAPI spec upstream
(`uv run python -m scripts.export_openapi`) and update the TypeScript
types here in the same PR.

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE` | yes | `https://api.askucits.com` in prod, `http://localhost:8000` in dev |

## Deploying

### Vercel

```bash
vercel link
vercel env add NEXT_PUBLIC_API_BASE production
vercel deploy --prod
```

### Self-hosted (same Hetzner as the pipeline)

```bash
pnpm install --prod
pnpm build
PORT=3000 pnpm start
```

Put behind the same Caddy reverse proxy with `askucits.com` as the host.

## License

MIT. See [LICENSE](LICENSE).

## Disclosure

Information only. Not investment advice. Not a financial promotion. ETPs can fall as well as rise; capital is at risk.

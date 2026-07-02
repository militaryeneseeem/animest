import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import http from 'node:http';
import { randomUUID } from 'node:crypto';
import pinoHttp from 'pino-http';
import { Server } from 'socket.io';
import { envelope, recommendationRequestSchema } from '@animest/shared/index';

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000', credentials: true } });

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.WEB_ORIGIN ?? 'http://localhost:3000', credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp());
app.use(rateLimit({ windowMs: 60_000, limit: 600, standardHeaders: true, legacyHeaders: false }));
app.use((req, _res, next) => { req.id = req.headers['x-request-id']?.toString() ?? randomUUID(); next(); });

app.get('/health', (req, res) => res.json(envelope(req.id, { status: 'ok', service: 'animest-api' })));

app.get('/api/v1/anime/trending', (req, res) => {
  res.json(envelope(req.id, { items: [], strategy: 'popularity_velocity_v1', cursor: null }));
});

app.get('/api/v1/anime/search', (req, res) => {
  res.json(envelope(req.id, { query: req.query.q ?? '', filters: req.query.filters ?? null, items: [], facets: {} }));
});

app.post('/api/v1/ai/recommendations', (req, res) => {
  const input = recommendationRequestSchema.parse(req.body);
  res.json(envelope(req.id, { query: input.query, spoilerLevel: input.spoilerLevel, items: [], explanationPolicy: 'profile_aware_rag_v1' }));
});

app.post('/api/v1/auth/login', (req, res) => {
  res.status(202).json(envelope(req.id, { flow: 'jwt_refresh_rotation', mfaRequired: false }));
});

app.get('/api/v1/users/:username', (req, res) => {
  res.json(envelope(req.id, { username: req.params.username, stats: { anime: 0, watchMinutes: 0 } }));
});

app.get('/api/v1/admin/overview', (req, res) => {
  res.json(envelope(req.id, { moderationQueue: 0, reports: 0, indexingLagSeconds: 0 }));
});

io.on('connection', socket => {
  socket.emit('presence:ready', { socketId: socket.id });
});

const port = Number(process.env.PORT ?? 4000);
server.listen(port, () => console.log(`Animest API listening on :${port}`));

declare global {
  namespace Express { interface Request { id: string } }
}

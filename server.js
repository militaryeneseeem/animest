const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const crypto = require("node:crypto");
const { URL, URLSearchParams } = require("node:url");
const { DatabaseSync } = require("node:sqlite");

const ROOT = __dirname;
const DB_PATH = resolveDatabasePath();
const SESSION_COOKIE = "animemest_session";
const OAUTH_STATE_COOKIE = "animemest_oauth_state";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
const PBKDF2_ROUNDS = 210000;

function resolveDatabasePath() {
  if (process.env.ANIMEST_DB) {
    const explicit = path.resolve(process.env.ANIMEST_DB);
    fs.mkdirSync(path.dirname(explicit), { recursive: true });
    return explicit;
  }

  const preferredRoot = process.env.LOCALAPPDATA
    ? path.join(process.env.LOCALAPPDATA, "AniMest")
    : path.join(os.homedir(), ".animemest");
  try {
    fs.mkdirSync(preferredRoot, { recursive: true });
    return path.join(preferredRoot, "animemest.db");
  } catch {
    const fallbackRoot = path.join(os.tmpdir(), "AniMest");
    fs.mkdirSync(fallbackRoot, { recursive: true });
    return path.join(fallbackRoot, "animemest.db");
  }
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = MEMORY");
db.exec("PRAGMA temp_store = MEMORY");
db.exec("PRAGMA foreign_keys = ON");
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  avatar TEXT NOT NULL,
  color TEXT NOT NULL,
  bio TEXT NOT NULL DEFAULT '',
  google_sub TEXT UNIQUE,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS follows (
  follower_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  followed_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL,
  PRIMARY KEY (follower_id, followed_id),
  CHECK (follower_id <> followed_id)
);

CREATE TABLE IF NOT EXISTS media (
  uid TEXT PRIMARY KEY,
  data_json TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS collection_entries (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  media_uid TEXT NOT NULL REFERENCES media(uid) ON DELETE CASCADE,
  status TEXT NOT NULL,
  progress REAL NOT NULL DEFAULT 0,
  hours REAL NOT NULL DEFAULT 0,
  started_at TEXT NOT NULL DEFAULT '',
  completed_at TEXT NOT NULL DEFAULT '',
  rating INTEGER NOT NULL DEFAULT 0,
  notes TEXT NOT NULL DEFAULT '',
  updated_at INTEGER NOT NULL,
  UNIQUE (user_id, media_uid)
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS oauth_states (
  state TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL
);
`);

function now() {
  return Math.floor(Date.now() / 1000);
}

function token(prefix = "") {
  return prefix + crypto.randomBytes(16).toString("hex");
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const digest = crypto.pbkdf2Sync(String(password), salt, PBKDF2_ROUNDS, 32, "sha256");
  return `pbkdf2_sha256$${PBKDF2_ROUNDS}$${salt.toString("base64")}$${digest.toString("base64")}`;
}

function verifyPassword(password, stored) {
  if (!stored) return false;
  const [algorithm, rounds, salt64, digest64] = String(stored).split("$");
  if (algorithm !== "pbkdf2_sha256" || !rounds || !salt64 || !digest64) return false;
  const digest = crypto.pbkdf2Sync(String(password), Buffer.from(salt64, "base64"), Number(rounds), 32, "sha256");
  return safeEqual(digest.toString("base64"), digest64);
}

function cleanUsername(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, "")
    .slice(0, 32);
}

function initials(name) {
  return (
    String(name || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("") || "AM"
  );
}

function userColor(seed) {
  const colors = ["coral", "teal", "amber", "violet", "blue"];
  const sum = String(seed || "animemest")
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))];
      }),
  );
}

function setCookie(res, name, value, options = {}) {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${options.maxAge ?? SESSION_MAX_AGE}`,
    "SameSite=Lax",
  ];
  if (options.httpOnly !== false) parts.push("HttpOnly");
  res.appendCookie(parts.join("; "));
}

function expireCookie(res, name) {
  res.appendCookie(`${name}=; Path=/; Max-Age=0; SameSite=Lax; HttpOnly`);
}

http.ServerResponse.prototype.appendCookie = function appendCookie(cookie) {
  const existing = this.getHeader("Set-Cookie");
  if (!existing) this.setHeader("Set-Cookie", cookie);
  else if (Array.isArray(existing)) this.setHeader("Set-Cookie", [...existing, cookie]);
  else this.setHeader("Set-Cookie", [existing, cookie]);
};

function sendJson(res, status, payload) {
  const body = Buffer.from(JSON.stringify(payload), "utf8");
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": body.length,
  });
  res.end(body);
}

function redirect(res, location) {
  res.writeHead(302, { Location: location });
  res.end();
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function currentUser(req) {
  const session = parseCookies(req)[SESSION_COOKIE];
  if (!session) return null;
  return db
    .prepare(
      `SELECT users.*
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token = ? AND sessions.expires_at > ?`,
    )
    .get(session, now());
}

function requireUser(req, res) {
  const user = currentUser(req);
  if (!user) {
    sendJson(res, 401, { error: "auth_required" });
    return null;
  }
  return user;
}

function publicUser(row, viewerId = null) {
  const followingCount = db.prepare("SELECT COUNT(*) AS count FROM follows WHERE follower_id = ?").get(row.id).count;
  const followersCount = db.prepare("SELECT COUNT(*) AS count FROM follows WHERE followed_id = ?").get(row.id).count;
  const collectionCount = db.prepare("SELECT COUNT(*) AS count FROM collection_entries WHERE user_id = ?").get(row.id).count;
  const isFollowing = viewerId
    ? Boolean(db.prepare("SELECT 1 FROM follows WHERE follower_id = ? AND followed_id = ?").get(viewerId, row.id))
    : false;
  return {
    id: row.id,
    name: row.name,
    username: row.username,
    email: row.id === viewerId ? row.email : "",
    avatar: row.avatar,
    color: row.color,
    bio: row.bio,
    followingCount,
    followersCount,
    collectionCount,
    isFollowing,
    authProvider: row.google_sub ? "google" : "password",
  };
}

function createSession(res, userId) {
  const sessionToken = crypto.randomBytes(40).toString("base64url");
  const created = now();
  db.prepare("INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)").run(
    sessionToken,
    userId,
    created,
    created + SESSION_MAX_AGE,
  );
  setCookie(res, SESSION_COOKIE, sessionToken);
}

function saveMedia(media) {
  const uid = String(media.uid || media.id || token("media_"));
  const normalized = { ...media, uid };
  db.prepare(
    `INSERT INTO media (uid, data_json, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(uid) DO UPDATE SET data_json = excluded.data_json, updated_at = excluded.updated_at`,
  ).run(uid, JSON.stringify(normalized), now());
  return uid;
}

function collectionFor(userId) {
  return db
    .prepare(
      `SELECT collection_entries.*, media.data_json
       FROM collection_entries
       JOIN media ON media.uid = collection_entries.media_uid
       WHERE collection_entries.user_id = ?
       ORDER BY collection_entries.updated_at DESC`,
    )
    .all(userId)
    .map((row) => ({
      id: row.id,
      media: JSON.parse(row.data_json),
      status: row.status,
      progress: row.progress,
      hours: row.hours,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      rating: row.rating,
      notes: row.notes,
      updatedAt: row.updated_at,
    }));
}

function activity() {
  return db
    .prepare(
      `SELECT collection_entries.*, media.data_json, users.name, users.username, users.avatar, users.color
       FROM collection_entries
       JOIN media ON media.uid = collection_entries.media_uid
       JOIN users ON users.id = collection_entries.user_id
       ORDER BY collection_entries.updated_at DESC
       LIMIT 12`,
    )
    .all()
    .map((row) => ({
      user: {
        id: row.user_id,
        name: row.name,
        username: row.username,
        avatar: row.avatar,
        color: row.color,
      },
      entry: {
        media: JSON.parse(row.data_json),
        status: row.status,
        updatedAt: row.updated_at,
      },
    }));
}

function messagesBetween(a, b) {
  return db
    .prepare(
      `SELECT * FROM messages
       WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
       ORDER BY created_at ASC`,
    )
    .all(a, b, b, a)
    .map((row) => ({
      id: row.id,
      senderId: row.sender_id,
      receiverId: row.receiver_id,
      text: row.body,
      createdAt: row.created_at,
    }));
}

function bootstrap(req, res) {
  const user = currentUser(req);
  const users = db.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
  sendJson(res, 200, {
    user: user ? publicUser(user, user.id) : null,
    users: users.map((row) => publicUser(row, user?.id || null)),
    collection: user ? collectionFor(user.id) : [],
    activity: activity(),
  });
}

function register(req, res, data) {
  const name = String(data.name || "").trim();
  const username = cleanUsername(data.username);
  const email = String(data.email || "").trim().toLowerCase();
  const password = String(data.password || "");
  if (name.length < 2 || username.length < 3 || !email.includes("@") || password.length < 6) {
    sendJson(res, 400, { error: "invalid_fields" });
    return;
  }
  const exists = db.prepare("SELECT 1 FROM users WHERE username = ? OR email = ?").get(username, email);
  if (exists) {
    sendJson(res, 409, { error: "user_exists" });
    return;
  }
  const id = token("u_");
  db.prepare(
    `INSERT INTO users (id, name, username, email, password_hash, avatar, color, bio, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(id, name, username, email, hashPassword(password), initials(name), userColor(username), "AniMest üyesi", now());
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  createSession(res, id);
  sendJson(res, 200, { user: publicUser(row, id) });
}

function login(req, res, data) {
  const identity = String(data.identity || "").trim().toLowerCase();
  const password = String(data.password || "");
  const row = db.prepare("SELECT * FROM users WHERE lower(email) = ? OR lower(username) = ?").get(identity, identity);
  if (!row || !verifyPassword(password, row.password_hash)) {
    sendJson(res, 401, { error: "invalid_login" });
    return;
  }
  createSession(res, row.id);
  sendJson(res, 200, { user: publicUser(row, row.id) });
}

function logout(req, res) {
  const session = parseCookies(req)[SESSION_COOKIE];
  if (session) db.prepare("DELETE FROM sessions WHERE token = ?").run(session);
  expireCookie(res, SESSION_COOKIE);
  sendJson(res, 200, { ok: true });
}

function saveCollection(req, res, user, data) {
  if (!data.media || typeof data.media !== "object") {
    sendJson(res, 400, { error: "media_required" });
    return;
  }
  const mediaUid = saveMedia(data.media);
  const entryId = String(data.id || token("entry_"));
  db.prepare(
    `INSERT INTO collection_entries
      (id, user_id, media_uid, status, progress, hours, started_at, completed_at, rating, notes, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(user_id, media_uid) DO UPDATE SET
      status = excluded.status,
      progress = excluded.progress,
      hours = excluded.hours,
      started_at = excluded.started_at,
      completed_at = excluded.completed_at,
      rating = excluded.rating,
      notes = excluded.notes,
      updated_at = excluded.updated_at`,
  ).run(
    entryId,
    user.id,
    mediaUid,
    String(data.status || "current"),
    Number(data.progress || 0),
    Number(data.hours || 0),
    String(data.startedAt || ""),
    String(data.completedAt || ""),
    Number(data.rating || 0),
    String(data.notes || ""),
    now(),
  );
  sendJson(res, 200, { ok: true, collection: collectionFor(user.id), activity: activity() });
}

function toggleFollow(res, user, followedId) {
  if (followedId === user.id) {
    sendJson(res, 400, { error: "cannot_follow_self" });
    return;
  }
  const target = db.prepare("SELECT 1 FROM users WHERE id = ?").get(followedId);
  if (!target) {
    sendJson(res, 404, { error: "user_not_found" });
    return;
  }
  const existing = db.prepare("SELECT 1 FROM follows WHERE follower_id = ? AND followed_id = ?").get(user.id, followedId);
  if (existing) {
    db.prepare("DELETE FROM follows WHERE follower_id = ? AND followed_id = ?").run(user.id, followedId);
    sendJson(res, 200, { ok: true, following: false });
  } else {
    db.prepare("INSERT INTO follows (follower_id, followed_id, created_at) VALUES (?, ?, ?)").run(user.id, followedId, now());
    sendJson(res, 200, { ok: true, following: true });
  }
}

function sendMessage(res, user, receiverId, data) {
  const body = String(data.text || "").trim();
  if (!body) {
    sendJson(res, 400, { error: "empty_message" });
    return;
  }
  if (!db.prepare("SELECT 1 FROM users WHERE id = ?").get(receiverId)) {
    sendJson(res, 404, { error: "user_not_found" });
    return;
  }
  db.prepare("INSERT INTO messages (id, sender_id, receiver_id, body, created_at) VALUES (?, ?, ?, ?, ?)").run(
    token("msg_"),
    user.id,
    receiverId,
    body.slice(0, 2000),
    now(),
  );
  sendJson(res, 200, { ok: true, messages: messagesBetween(user.id, receiverId) });
}

function googleRedirectUri(req) {
  return process.env.GOOGLE_REDIRECT_URI || `http://${req.headers.host || "127.0.0.1:5174"}/api/auth/google/callback`;
}

function googleStart(req, res) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    redirect(res, "/?google=not_configured");
    return;
  }
  const state = crypto.randomBytes(32).toString("base64url");
  db.prepare("INSERT INTO oauth_states (state, created_at) VALUES (?, ?)").run(state, now());
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: googleRedirectUri(req),
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "online",
    prompt: "select_account",
  });
  res.statusCode = 302;
  res.setHeader("Location", `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  setCookie(res, OAUTH_STATE_COOKIE, state, { maxAge: 600 });
  res.end();
}

async function googleCallback(req, res, url) {
  const state = url.searchParams.get("state") || "";
  const code = url.searchParams.get("code") || "";
  const cookieState = parseCookies(req)[OAUTH_STATE_COOKIE];
  const saved = db.prepare("SELECT * FROM oauth_states WHERE state = ?").get(state);
  if (!state || !code || state !== cookieState || !saved || saved.created_at < now() - 600) {
    redirect(res, "/?google=invalid_state");
    return;
  }
  db.prepare("DELETE FROM oauth_states WHERE state = ?").run(state);
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    redirect(res, "/?google=not_configured");
    return;
  }
  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: googleRedirectUri(req),
        grant_type: "authorization_code",
      }),
    });
    if (!tokenResponse.ok) throw new Error("token_failed");
    const tokenPayload = await tokenResponse.json();
    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenPayload.access_token}` },
    });
    if (!profileResponse.ok) throw new Error("profile_failed");
    const profile = await profileResponse.json();
    const email = String(profile.email || "").toLowerCase();
    const sub = String(profile.sub || "");
    const name = String(profile.name || email.split("@")[0] || "AniMest User");
    if (!email || !sub) throw new Error("missing_profile");

    let row = db.prepare("SELECT * FROM users WHERE google_sub = ? OR lower(email) = ?").get(sub, email);
    let userId = row?.id;
    if (row) {
      db.prepare("UPDATE users SET google_sub = ? WHERE id = ?").run(sub, row.id);
    } else {
      const usernameBase = cleanUsername(email.split("@")[0]) || "google";
      let username = usernameBase;
      let suffix = 1;
      while (db.prepare("SELECT 1 FROM users WHERE username = ?").get(username)) {
        suffix += 1;
        username = `${usernameBase}${suffix}`;
      }
      userId = token("u_");
      db.prepare(
        `INSERT INTO users (id, name, username, email, password_hash, avatar, color, bio, google_sub, created_at)
         VALUES (?, ?, ?, ?, NULL, ?, ?, ?, ?, ?)`,
      ).run(userId, name, username, email, initials(name), userColor(username), "Google ile kayıt oldu", sub, now());
    }
    createSession(res, userId);
    expireCookie(res, OAUTH_STATE_COOKIE);
    redirect(res, "/");
  } catch {
    redirect(res, "/?google=exchange_failed");
  }
}

function serveStatic(req, res, url) {
  const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  const target = path.resolve(ROOT, "." + pathname);
  if (!target.startsWith(ROOT) || !fs.existsSync(target) || !fs.statSync(target).isFile()) {
    sendJson(res, 404, { error: "not_found" });
    return;
  }
  const content = fs.readFileSync(target);
  res.writeHead(200, {
    "Content-Type": MIME[path.extname(target).toLowerCase()] || "application/octet-stream",
    "Content-Length": content.length,
  });
  res.end(content);
}

async function handleApi(req, res, url) {
  try {
    if (req.method === "GET" && url.pathname === "/api/bootstrap") return bootstrap(req, res);
    if (req.method === "GET" && url.pathname === "/api/auth/me") {
      const user = currentUser(req);
      return sendJson(res, 200, { user: user ? publicUser(user, user.id) : null });
    }
    if (req.method === "GET" && url.pathname === "/api/auth/google/start") return googleStart(req, res);
    if (req.method === "GET" && url.pathname === "/api/auth/google/callback") return googleCallback(req, res, url);
    if (req.method === "GET" && url.pathname === "/api/users") {
      const user = currentUser(req);
      const users = db.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
      return sendJson(res, 200, { users: users.map((row) => publicUser(row, user?.id || null)) });
    }

    const data = ["POST", "PUT", "PATCH"].includes(req.method) ? await readBody(req) : {};

    if (req.method === "POST" && url.pathname === "/api/auth/register") return register(req, res, data);
    if (req.method === "POST" && url.pathname === "/api/auth/login") return login(req, res, data);
    if (req.method === "POST" && url.pathname === "/api/auth/logout") return logout(req, res);

    if (url.pathname === "/api/collection") {
      const user = requireUser(req, res);
      if (!user) return;
      if (req.method === "GET") return sendJson(res, 200, { collection: collectionFor(user.id) });
      if (req.method === "POST") return saveCollection(req, res, user, data);
    }

    if (url.pathname.startsWith("/api/collection/") && req.method === "DELETE") {
      const user = requireUser(req, res);
      if (!user) return;
      const entryId = decodeURIComponent(url.pathname.split("/").pop());
      db.prepare("DELETE FROM collection_entries WHERE id = ? AND user_id = ?").run(entryId, user.id);
      return sendJson(res, 200, { ok: true, collection: collectionFor(user.id) });
    }

    if (url.pathname.startsWith("/api/follows/") && req.method === "POST") {
      const user = requireUser(req, res);
      if (!user) return;
      return toggleFollow(res, user, decodeURIComponent(url.pathname.split("/").pop()));
    }

    if (url.pathname.startsWith("/api/messages/")) {
      const user = requireUser(req, res);
      if (!user) return;
      const otherId = decodeURIComponent(url.pathname.split("/").pop());
      if (req.method === "GET") return sendJson(res, 200, { messages: messagesBetween(user.id, otherId) });
      if (req.method === "POST") return sendMessage(res, user, otherId, data);
    }

    sendJson(res, 404, { error: "not_found" });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "server_error" });
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url);
  } else {
    serveStatic(req, res, url);
  }
});

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 5174);
server.listen(port, host, () => {
  if (process.stdout.isTTY) {
    console.log(`AniMest running at http://${host}:${port}/`);
    console.log(`SQLite database: ${DB_PATH}`);
  }
});

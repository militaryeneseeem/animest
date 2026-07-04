const LANG_KEY = "animemest_language";

const LANGUAGES = [
  ["tr", "Türkçe"],
  ["en", "English"],
  ["es", "Español"],
  ["de", "Deutsch"],
  ["fr", "Français"],
  ["pt", "Português"],
  ["ja", "日本語"],
  ["ko", "한국어"],
  ["ar", "العربية"],
  ["ru", "Русский"],
];

const I18N = {
  tr: {
    "nav.discover": "Keşfet",
    "nav.library": "Kütüphanem",
    "nav.social": "Sosyal",
    "nav.chat": "Sohbet",
    "nav.settings": "Ayarlar",
    "topbar.workspace": "Kişisel alan",
    "discover.title": "Anime ve manga ara",
    "discover.keyword": "Anahtar kelime",
    "discover.searchPlaceholder": "Frieren, seinen, spor...",
    "discover.search": "Ara",
    "discover.results": "Sonuçlar",
    "discover.resultCount": "{count} sonuç",
    "discover.sourceAnilist": "Canlı AniList",
    "discover.sourceLocal": "Yerel katalog",
    "filters.type": "Tür",
    "filters.all": "Hepsi",
    "filters.genre": "Kategori",
    "filters.format": "Format",
    "filters.year": "Yıl",
    "filters.score": "Puan",
    "filters.genreAll": "Tüm kategoriler",
    "filters.formatAll": "Tüm formatlar",
    "library.overview": "Koleksiyon",
    "library.title": "Profil listem",
    "social.people": "İnsanlar",
    "social.suggestions": "Kayıtlı profiller",
    "chat.placeholder": "Mesaj yaz...",
    "chat.empty": "Henüz mesaj yok.",
    "chat.select": "Bir sohbet seç",
    "settings.account": "Hesap",
    "settings.language": "Dil",
    "settings.interfaceLanguage": "Arayüz dili",
    "settings.data": "Veritabanı",
    "settings.logout": "Çıkış yap",
    "settings.dbTitle": "Gerçek kayıt sistemi aktif",
    "settings.dbBody": "Kullanıcılar, oturumlar, takipler, mesajlar ve profil listeleri SQLite veritabanında kalıcı tutulur.",
    "settings.dbFile": "Veritabanı dosyası",
    "rail.activity": "Aktivite",
    "rail.following": "Takip",
    "auth.title": "Hesabına gir",
    "auth.login": "Login",
    "auth.register": "Kayıt",
    "auth.emailOrUser": "E-posta veya kullanıcı adı",
    "auth.password": "Şifre",
    "auth.loginAction": "Giriş yap",
    "auth.google": "Google ile devam et",
    "auth.name": "Ad",
    "auth.username": "Kullanıcı adı",
    "auth.email": "E-posta",
    "auth.create": "Hesap oluştur",
    "auth.invalid": "Bilgiler eşleşmiyor.",
    "auth.exists": "Bu kullanıcı adı veya e-posta zaten var.",
    "auth.created": "Hesap oluşturuldu.",
    "auth.required": "Devam etmek için giriş yapmalısın.",
    "auth.googleMissing": "Google girişi gerçek OAuth ile çalışır; önce GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET ayarlanmalı.",
    "auth.googleFailed": "Google girişi tamamlanamadı.",
    "collection.saveToProfile": "Profile ekle",
    "collection.status": "Durum",
    "collection.progress": "Bölüm / chapter",
    "collection.hours": "Saat",
    "collection.started": "Başladı",
    "collection.completed": "Bitirdi",
    "collection.rating": "Puanım",
    "collection.notes": "Not",
    "collection.save": "Kaydet",
    "collection.add": "Listeye ekle",
    "collection.edit": "Düzenle",
    "collection.remove": "Sil",
    "status.all": "Tüm durumlar",
    "status.current": "İzliyor / okuyor",
    "status.planned": "İzleyecek / okuyacak",
    "status.paused": "Yarıda kaldı",
    "status.completed": "Bitirdi",
    "stats.total": "Toplam",
    "stats.completed": "Bitirdi",
    "stats.hours": "Saat",
    "stats.following": "Takip",
    "stats.followers": "Takipçi",
    "empty.results": "Kriterlere uygun sonuç bulunamadı.",
    "empty.library": "Profil listesi boş.",
    "empty.people": "Henüz senden başka kayıtlı kullanıcı yok.",
    "empty.following": "Henüz takip yok.",
    "empty.login": "Bu bölüm gerçek hesabına bağlı.",
    "actions.follow": "Takip et",
    "actions.unfollow": "Takiptesin",
    "actions.message": "Mesaj",
    "common.anime": "Anime",
    "common.manga": "Manga",
  },
  en: {
    "nav.discover": "Discover",
    "nav.library": "Library",
    "nav.social": "Social",
    "nav.chat": "Chat",
    "nav.settings": "Settings",
    "topbar.workspace": "Personal space",
    "discover.title": "Search anime and manga",
    "discover.keyword": "Keyword",
    "discover.searchPlaceholder": "Frieren, seinen, sports...",
    "discover.search": "Search",
    "discover.results": "Results",
    "discover.resultCount": "{count} results",
    "discover.sourceAnilist": "Live AniList",
    "discover.sourceLocal": "Local catalog",
    "filters.type": "Type",
    "filters.all": "All",
    "filters.genre": "Genre",
    "filters.format": "Format",
    "filters.year": "Year",
    "filters.score": "Score",
    "filters.genreAll": "All genres",
    "filters.formatAll": "All formats",
    "library.overview": "Collection",
    "library.title": "My profile list",
    "social.people": "People",
    "social.suggestions": "Registered profiles",
    "chat.placeholder": "Write a message...",
    "chat.empty": "No messages yet.",
    "chat.select": "Select a chat",
    "settings.account": "Account",
    "settings.language": "Language",
    "settings.interfaceLanguage": "Interface language",
    "settings.data": "Database",
    "settings.logout": "Log out",
    "settings.dbTitle": "Real account system is active",
    "settings.dbBody": "Users, sessions, follows, messages, and profile lists are stored persistently in SQLite.",
    "settings.dbFile": "Database file",
    "rail.activity": "Activity",
    "rail.following": "Following",
    "auth.title": "Sign in",
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.emailOrUser": "Email or username",
    "auth.password": "Password",
    "auth.loginAction": "Sign in",
    "auth.google": "Continue with Google",
    "auth.name": "Name",
    "auth.username": "Username",
    "auth.email": "Email",
    "auth.create": "Create account",
    "auth.invalid": "The details do not match.",
    "auth.exists": "That username or email already exists.",
    "auth.created": "Account created.",
    "auth.required": "Sign in to continue.",
    "auth.googleMissing": "Google login uses real OAuth; set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET first.",
    "auth.googleFailed": "Google login could not be completed.",
    "collection.saveToProfile": "Save to profile",
    "collection.status": "Status",
    "collection.progress": "Episode / chapter",
    "collection.hours": "Hours",
    "collection.started": "Started",
    "collection.completed": "Completed",
    "collection.rating": "My score",
    "collection.notes": "Notes",
    "collection.save": "Save",
    "collection.add": "Add to list",
    "collection.edit": "Edit",
    "collection.remove": "Remove",
    "status.all": "All statuses",
    "status.current": "Watching / reading",
    "status.planned": "Planning",
    "status.paused": "Paused",
    "status.completed": "Completed",
    "stats.total": "Total",
    "stats.completed": "Completed",
    "stats.hours": "Hours",
    "stats.following": "Following",
    "stats.followers": "Followers",
    "empty.results": "No results match your criteria.",
    "empty.library": "Your profile list is empty.",
    "empty.people": "No registered users besides you yet.",
    "empty.following": "Not following anyone yet.",
    "empty.login": "This section belongs to a real account.",
    "actions.follow": "Follow",
    "actions.unfollow": "Following",
    "actions.message": "Message",
    "common.anime": "Anime",
    "common.manga": "Manga",
  },
};

const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

const FORMATS = ["TV", "MOVIE", "OVA", "ONA", "MANGA", "NOVEL", "ONE_SHOT"];
const STATUSES = ["current", "planned", "paused", "completed"];

const FALLBACK_CATALOG = [
  item("local-1", "Sousou no Frieren", "葬送のフリーレン", "ANIME", "TV", 2023, ["Fantasy", "Adventure", "Drama"], 88, "Elf bir büyücünün uzun yolculuğu, hatıralar ve yeni bağlarla sessizce büyür."),
  item("local-2", "One Piece", "ワンピース", "ANIME", "TV", 1999, ["Action", "Adventure", "Comedy"], 87, "Büyük denizde ekip ruhu, hazine arayışı ve uzun soluklu macera."),
  item("local-3", "Berserk", "ベルセルク", "MANGA", "MANGA", 1989, ["Action", "Drama", "Fantasy"], 91, "Karanlık fantezi, savaş ve kader üstüne yoğun bir manga klasiği."),
  item("local-4", "Jujutsu Kaisen", "呪術廻戦", "ANIME", "TV", 2020, ["Action", "Supernatural"], 84, "Lanetler, hızlı dövüş koreografisi ve modern okul atmosferi."),
  item("local-5", "Blue Lock", "ブルーロック", "ANIME", "TV", 2022, ["Sports", "Drama"], 79, "Futbolu ego, rekabet ve taktik baskı üzerinden anlatan tempolu seri."),
  item("local-6", "Oshi no Ko", "推しの子", "ANIME", "TV", 2023, ["Drama", "Mystery"], 85, "İdol dünyasının parlak yüzüyle karanlık sırları aynı sahnede buluşur."),
  item("local-7", "Vinland Saga", "ヴィンランド・サガ", "ANIME", "TV", 2019, ["Action", "Drama", "Adventure"], 86, "Viking çağı, intikam ve barış arayışı üstüne olgun bir hikaye."),
  item("local-8", "Monster", "モンスター", "ANIME", "TV", 2004, ["Psychological", "Thriller", "Mystery"], 88, "Bir doktorun kararı, Avrupa boyunca süren psikolojik kovalamacaya dönüşür."),
  item("local-9", "Vagabond", "バガボンド", "MANGA", "MANGA", 1998, ["Action", "Drama"], 92, "Kılıç, disiplin ve iç hesaplaşma üzerine çizgisi güçlü bir manga."),
  item("local-10", "Kingdom", "キングダム", "MANGA", "MANGA", 2006, ["Action", "Drama"], 89, "Savaş meydanları, strateji ve yükseliş hikayesi."),
  item("local-11", "Haikyu!!", "ハイキュー!!", "ANIME", "TV", 2014, ["Sports", "Comedy", "Drama"], 84, "Voleybol, takım kimyası ve net karakter gelişimi."),
  item("local-12", "A Silent Voice", "聲の形", "ANIME", "MOVIE", 2016, ["Drama", "Romance"], 86, "Suçluluk, iletişim ve affetme üzerine hassas bir film."),
  item("local-13", "Yotsuba&!", "よつばと!", "MANGA", "MANGA", 2003, ["Comedy", "Slice of Life"], 86, "Gündelik hayatı sıcak, komik ve sade bir gözle izleyen manga."),
  item("local-14", "Steins;Gate", "シュタインズ・ゲート", "ANIME", "TV", 2011, ["Sci-Fi", "Thriller"], 87, "Zaman yolculuğu, arkadaşlık ve yüksek gerilimli bilim kurgu."),
  item("local-15", "Nana", "NANA", "ANIME", "TV", 2006, ["Drama", "Romance"], 84, "Müzik, aşk ve yetişkinliğe geçişin keskin tarafları."),
  item("local-16", "Mob Psycho 100", "モブサイコ100", "ANIME", "TV", 2016, ["Action", "Comedy", "Supernatural"], 85, "Psişik güçler, absürt komedi ve duygusal büyüme."),
];

const ANILIST_QUERY = `
query SearchMedia($search: String, $type: MediaType, $genres: [String], $year: Int, $formats: [MediaFormat], $minScore: Int) {
  Page(page: 1, perPage: 18) {
    media(
      search: $search
      type: $type
      genre_in: $genres
      seasonYear: $year
      format_in: $formats
      averageScore_greater: $minScore
      sort: TRENDING_DESC
    ) {
      id
      title { romaji english native }
      type
      format
      genres
      episodes
      chapters
      averageScore
      startDate { year }
      coverImage { large extraLarge }
      bannerImage
      description(asHtml: false)
    }
  }
}`;

let language = localStorage.getItem(LANG_KEY) || "tr";
let activeView = "discover";
let activeAuthTab = "login";
let activeChatUserId = null;
let editingMedia = null;
let latestResults = [];
let searchTimer = null;
let state = {
  user: null,
  users: [],
  collection: [],
  activity: [],
  messages: {},
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function item(id, title, nativeTitle, type, format, year, genres, score, description) {
  return { uid: id, id, title, nativeTitle, type, format, year, genres, score, description, cover: "", source: "local" };
}

function t(key, replacements = {}) {
  const value = I18N[language]?.[key] || I18N.en[key] || I18N.tr[key] || key;
  return Object.entries(replacements).reduce((text, [name, replacement]) => text.replaceAll(`{${name}}`, replacement), value);
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function stripText(value) {
  const node = document.createElement("textarea");
  node.innerHTML = String(value || "");
  return node.value.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
}

function formatNumber(value) {
  return new Intl.NumberFormat(language).format(value || 0);
}

function formatDate(epochSeconds) {
  if (!epochSeconds) return "";
  return new Intl.DateTimeFormat(language, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(
    new Date(epochSeconds * 1000),
  );
}

function mediaTitle(media) {
  return media?.title || media?.nativeTitle || "Untitled";
}

function mediaTypeLabel(type) {
  return type === "MANGA" ? t("common.manga") : t("common.anime");
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  let payload = {};
  try {
    payload = await response.json();
  } catch {
    payload = {};
  }
  if (!response.ok) {
    const error = new Error(payload.error || "request_failed");
    error.payload = payload;
    error.status = response.status;
    throw error;
  }
  return payload;
}

function updateIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  $$("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });
  $$("[data-i18n-placeholder]").forEach((node) => {
    node.setAttribute("placeholder", t(node.dataset.i18nPlaceholder));
  });
  const active = $(".view.active");
  if (active) $("#viewTitle").textContent = t(active.dataset.titleKey);
}

function renderSelectors() {
  const languageOptions = LANGUAGES.map(([code, label]) => `<option value="${code}">${esc(label)}</option>`).join("");
  $("#languageSelect").innerHTML = languageOptions;
  $("#settingsLanguageSelect").innerHTML = languageOptions;
  $("#languageSelect").value = language;
  $("#settingsLanguageSelect").value = language;

  $("#genreFilter").innerHTML = `<option value="">${esc(t("filters.genreAll"))}</option>${GENRES.map(
    (genre) => `<option value="${esc(genre)}">${esc(genre)}</option>`,
  ).join("")}`;
  $("#formatFilter").innerHTML = `<option value="">${esc(t("filters.formatAll"))}</option>${FORMATS.map(
    (format) => `<option value="${esc(format)}">${esc(format.replace("_", " "))}</option>`,
  ).join("")}`;
  $("#libraryStatusFilter").innerHTML = `<option value="all">${esc(t("status.all"))}</option>${STATUSES.map(
    (status) => `<option value="${status}">${esc(t(`status.${status}`))}</option>`,
  ).join("")}`;
  $("#entryStatus").innerHTML = STATUSES.map((status) => `<option value="${status}">${esc(t(`status.${status}`))}</option>`).join("");
}

function renderNavigation() {
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.viewTarget === activeView));
}

function renderSidebarProfile() {
  const container = $("#sidebarProfile");
  const user = state.user;
  if (!user) {
    $("#brandHandle").textContent = "@animemest";
    container.innerHTML = `
      <button class="secondary-button full" type="button" data-open-auth>
        <i data-lucide="log-in"></i>
        <span>${esc(t("auth.loginAction"))}</span>
      </button>`;
    return;
  }
  $("#brandHandle").textContent = `@${user.username}`;
  container.innerHTML = `
    <div class="mini-profile">
      <span class="avatar ${esc(user.color)}">${esc(user.avatar)}</span>
      <span class="truncate">
        <strong>${esc(user.name)}</strong>
        <span>@${esc(user.username)}</span>
      </span>
    </div>`;
}

function renderHeroMetrics() {
  const entries = state.collection || [];
  const completed = entries.filter((entry) => entry.status === "completed").length;
  const hours = entries.reduce((sum, entry) => sum + Number(entry.hours || 0), 0);
  $("#heroMetrics").innerHTML = [
    [entries.length, t("stats.total")],
    [completed, t("stats.completed")],
    [hours, t("stats.hours")],
  ]
    .map(
      ([value, label]) => `
        <div class="metric">
          <strong>${esc(formatNumber(value))}</strong>
          <span>${esc(label)}</span>
        </div>`,
    )
    .join("");
}

function renderLibrary() {
  const entries = state.collection || [];
  const completed = entries.filter((entry) => entry.status === "completed").length;
  const hours = entries.reduce((sum, entry) => sum + Number(entry.hours || 0), 0);
  $("#libraryStats").innerHTML = [
    [t("stats.total"), entries.length, "library"],
    [t("stats.completed"), completed, "check-circle-2"],
    [t("stats.hours"), hours, "clock-3"],
    [t("stats.following"), state.user?.followingCount || 0, "user-check"],
  ]
    .map(
      ([label, value, icon]) => `
        <article class="stat-card">
          <i data-lucide="${icon}"></i>
          <strong>${esc(formatNumber(value))}</strong>
          <span>${esc(label)}</span>
        </article>`,
    )
    .join("");

  const selected = $("#libraryStatusFilter").value || "all";
  const visible = selected === "all" ? entries : entries.filter((entry) => entry.status === selected);
  const grid = $("#libraryGrid");
  if (!state.user) {
    grid.innerHTML = `<div class="empty-state">${esc(t("empty.login"))}</div>`;
    return;
  }
  if (!visible.length) {
    grid.innerHTML = `<div class="empty-state">${esc(t("empty.library"))}</div>`;
    return;
  }

  grid.innerHTML = visible
    .map((entry) => {
      const media = entry.media;
      return `
        <article class="library-card">
          <div class="library-card-top">
            <span class="avatar ${media.type === "MANGA" ? "amber" : "teal"}">${esc(media.type === "MANGA" ? "M" : "A")}</span>
            <div class="truncate">
              <strong>${esc(mediaTitle(media))}</strong>
              <span>${esc(mediaTypeLabel(media.type))} · ${esc(media.format || "-")} · ${esc(media.year || "-")}</span>
            </div>
            <span class="status-pill">${esc(t(`status.${entry.status}`))}</span>
          </div>
          <div class="progress-line"><span>${esc(t("collection.progress"))}</span><strong>${esc(formatNumber(entry.progress || 0))}</strong></div>
          <div class="progress-line"><span>${esc(t("collection.hours"))}</span><strong>${esc(formatNumber(entry.hours || 0))}</strong></div>
          <p>${esc(entry.notes || media.description || "")}</p>
          <div class="genre-list">
            <button class="secondary-button" type="button" data-edit-entry="${esc(entry.id)}">
              <i data-lucide="pencil"></i><span>${esc(t("collection.edit"))}</span>
            </button>
            <button class="ghost-button" type="button" data-remove-entry="${esc(entry.id)}">
              <i data-lucide="trash-2"></i><span>${esc(t("collection.remove"))}</span>
            </button>
          </div>
        </article>`;
    })
    .join("");
}

function otherUsers() {
  return state.users.filter((user) => user.id !== state.user?.id);
}

function renderSocial() {
  const user = state.user;
  $("#profileHero").innerHTML = user
    ? `
      <div class="profile-main">
        <span class="avatar ${esc(user.color)}">${esc(user.avatar)}</span>
        <div class="truncate">
          <h3>${esc(user.name)}</h3>
          <p>@${esc(user.username)} · ${esc(user.bio)}</p>
        </div>
      </div>
      <div class="profile-counts">
        <span class="count-pill"><strong>${esc(formatNumber(state.collection.length))}</strong><span>${esc(t("stats.total"))}</span></span>
        <span class="count-pill"><strong>${esc(formatNumber(user.followersCount || 0))}</strong><span>${esc(t("stats.followers"))}</span></span>
        <span class="count-pill"><strong>${esc(formatNumber(user.followingCount || 0))}</strong><span>${esc(t("stats.following"))}</span></span>
      </div>`
    : `<button class="primary-button" type="button" data-open-auth>${esc(t("auth.loginAction"))}</button>`;

  const people = otherUsers();
  if (!people.length) {
    $("#peopleGrid").innerHTML = `<div class="empty-state">${esc(t("empty.people"))}</div>`;
    return;
  }
  $("#peopleGrid").innerHTML = people
    .map(
      (person) => `
        <article class="person-card">
          <div class="person-top">
            <span class="avatar ${esc(person.color)}">${esc(person.avatar)}</span>
            <div class="truncate">
              <strong>${esc(person.name)}</strong>
              <span>@${esc(person.username)}</span>
            </div>
            <span class="source-pill">${esc(formatNumber(person.collectionCount || 0))}</span>
          </div>
          <p>${esc(person.bio)}</p>
          <div class="genre-list">
            <button class="${person.isFollowing ? "ghost-button" : "secondary-button"}" type="button" data-follow="${esc(person.id)}">
              <i data-lucide="${person.isFollowing ? "user-check" : "user-plus"}"></i>
              <span>${esc(t(person.isFollowing ? "actions.unfollow" : "actions.follow"))}</span>
            </button>
            <button class="secondary-button" type="button" data-message-user="${esc(person.id)}">
              <i data-lucide="message-circle"></i>
              <span>${esc(t("actions.message"))}</span>
            </button>
          </div>
        </article>`,
    )
    .join("");
}

async function ensureMessages(userId) {
  if (!state.user || !userId) return [];
  if (!state.messages[userId]) {
    const payload = await api(`/api/messages/${encodeURIComponent(userId)}`);
    state.messages[userId] = payload.messages || [];
  }
  return state.messages[userId];
}

async function renderChat() {
  const user = state.user;
  const contacts = otherUsers();
  if (!user) {
    $("#chatList").innerHTML = `<button class="secondary-button full" type="button" data-open-auth>${esc(t("auth.loginAction"))}</button>`;
    $("#chatHead").innerHTML = "";
    $("#chatMessages").innerHTML = `<div class="empty-state">${esc(t("empty.login"))}</div>`;
    return;
  }
  if (!contacts.length) {
    $("#chatList").innerHTML = "";
    $("#chatHead").innerHTML = "";
    $("#chatMessages").innerHTML = `<div class="empty-state">${esc(t("empty.people"))}</div>`;
    return;
  }
  if (!activeChatUserId || !contacts.some((contact) => contact.id === activeChatUserId)) {
    activeChatUserId = contacts[0].id;
  }

  $("#chatList").innerHTML = contacts
    .map((person) => {
      const convo = state.messages[person.id] || [];
      const last = convo.at(-1);
      return `
        <button class="chat-contact ${person.id === activeChatUserId ? "active" : ""}" type="button" data-chat-user="${esc(person.id)}">
          <span class="avatar ${esc(person.color)}">${esc(person.avatar)}</span>
          <span class="truncate">
            <strong>${esc(person.name)}</strong>
            <span>${esc(last?.text || person.bio)}</span>
          </span>
          <span>${esc(last ? formatDate(last.createdAt) : "")}</span>
        </button>`;
    })
    .join("");

  const contact = contacts.find((person) => person.id === activeChatUserId);
  $("#chatHead").innerHTML = `
    <div class="chat-head-profile">
      <span class="avatar ${esc(contact.color)}">${esc(contact.avatar)}</span>
      <span class="truncate"><strong>${esc(contact.name)}</strong><span>@${esc(contact.username)}</span></span>
      <span class="status-pill">${esc(contact.isFollowing ? t("actions.unfollow") : t("actions.follow"))}</span>
    </div>`;

  const messages = await ensureMessages(contact.id);
  $("#chatMessages").innerHTML = messages.length
    ? messages
        .map(
          (message) => `
            <div class="message ${message.senderId === user.id ? "mine" : ""}">
              ${esc(message.text)}
              <small>${esc(formatDate(message.createdAt))}</small>
            </div>`,
        )
        .join("")
    : `<div class="empty-state">${esc(t("chat.empty"))}</div>`;
  requestAnimationFrame(() => {
    const area = $("#chatMessages");
    area.scrollTop = area.scrollHeight;
  });
}

function renderRails() {
  $("#activityFeed").innerHTML = state.activity.length
    ? state.activity
        .map(
          ({ user, entry }) => `
            <div class="activity-item">
              <strong>${esc(user.name)}</strong>
              <span>${esc(mediaTitle(entry.media))} · ${esc(t(`status.${entry.status}`))}</span>
            </div>`,
        )
        .join("")
    : `<div class="empty-state">${esc(t("empty.library"))}</div>`;

  const following = otherUsers().filter((person) => person.isFollowing);
  $("#followingRail").innerHTML = following.length
    ? following
        .map(
          (person) => `
            <div class="rail-user">
              <span class="avatar ${esc(person.color)}">${esc(person.avatar)}</span>
              <span class="truncate"><strong>${esc(person.name)}</strong><span>@${esc(person.username)}</span></span>
              <button class="icon-button" type="button" data-message-user="${esc(person.id)}" aria-label="${esc(t("actions.message"))}">
                <i data-lucide="message-circle"></i>
              </button>
            </div>`,
        )
        .join("")
    : `<div class="empty-state">${esc(t("empty.following"))}</div>`;
}

function renderSettings() {
  const user = state.user;
  $("#accountSettings").innerHTML = user
    ? `
      <div class="mini-profile">
        <span class="avatar ${esc(user.color)}">${esc(user.avatar)}</span>
        <span class="truncate"><strong>${esc(user.name)}</strong><span>${esc(user.email)}</span></span>
      </div>
      <br />
      <button class="ghost-button full" type="button" id="logoutButton">
        <i data-lucide="log-out"></i><span>${esc(t("settings.logout"))}</span>
      </button>`
    : `<button class="primary-button full" type="button" data-open-auth>${esc(t("auth.loginAction"))}</button>`;

  $("#dbStatus").innerHTML = `
    <strong>${esc(t("settings.dbTitle"))}</strong>
    <span>${esc(t("settings.dbBody"))}</span>
    <span>${esc(t("settings.dbFile"))}: <code>animemest.db</code></span>`;
}

function renderAll() {
  applyLanguage();
  renderSelectors();
  renderNavigation();
  renderSidebarProfile();
  renderHeroMetrics();
  renderLibrary();
  renderSocial();
  renderRails();
  renderSettings();
  renderChat().finally(updateIcons);
  updateIcons();
}

function normalizeAniList(media) {
  return {
    uid: `anilist-${media.id}`,
    id: media.id,
    title: media.title?.english || media.title?.romaji || media.title?.native || "Untitled",
    nativeTitle: media.title?.native || "",
    type: media.type || "ANIME",
    format: media.format || "",
    year: media.startDate?.year || "",
    genres: media.genres || [],
    score: media.averageScore || 0,
    description: stripText(media.description || ""),
    cover: media.coverImage?.extraLarge || media.coverImage?.large || media.bannerImage || "",
    source: "anilist",
  };
}

async function searchAniList() {
  const variables = {
    search: $("#searchInput").value.trim() || null,
    type: $("#typeFilter").value === "ALL" ? null : $("#typeFilter").value,
    genres: $("#genreFilter").value ? [$("#genreFilter").value] : null,
    year: Number($("#yearFilter").value) || null,
    formats: $("#formatFilter").value ? [$("#formatFilter").value] : null,
    minScore: Number($("#scoreFilter").value) || null,
  };
  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: ANILIST_QUERY, variables }),
  });
  if (!response.ok) throw new Error("anilist_failed");
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors[0].message);
  return payload.data.Page.media.map(normalizeAniList);
}

function filterLocalCatalog() {
  const search = $("#searchInput").value.trim().toLowerCase();
  const type = $("#typeFilter").value;
  const genre = $("#genreFilter").value;
  const format = $("#formatFilter").value;
  const year = Number($("#yearFilter").value);
  const minScore = Number($("#scoreFilter").value);
  return FALLBACK_CATALOG.filter((media) => {
    const haystack = [media.title, media.nativeTitle, media.description, ...media.genres].join(" ").toLowerCase();
    return (
      (!search || haystack.includes(search)) &&
      (type === "ALL" || media.type === type) &&
      (!genre || media.genres.includes(genre)) &&
      (!format || media.format === format) &&
      (!year || media.year === year) &&
      (!minScore || media.score >= minScore)
    );
  });
}

async function runSearch() {
  $("#resultsGrid").innerHTML = `<div class="empty-state">...</div>`;
  try {
    latestResults = await searchAniList();
    renderResults(latestResults, "anilist");
  } catch {
    latestResults = filterLocalCatalog();
    renderResults(latestResults, "local");
  }
}

function renderResults(results, source) {
  $("#resultSummary").textContent = t("discover.resultCount", { count: formatNumber(results.length) });
  $("#sourcePill").textContent = t(source === "anilist" ? "discover.sourceAnilist" : "discover.sourceLocal");
  const grid = $("#resultsGrid");
  if (!results.length) {
    grid.innerHTML = `<div class="empty-state">${esc(t("empty.results"))}</div>`;
    updateIcons();
    return;
  }
  const template = $("#mediaCardTemplate");
  grid.innerHTML = "";
  results.forEach((media, index) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const img = $(".poster-image", node);
    const fallback = $(".poster-fallback", node);
    const colors = [
      ["#f05d46", "#0d9488"],
      ["#2563eb", "#d97706"],
      ["#7c3aed", "#0d9488"],
      ["#15171d", "#f05d46"],
    ][index % 4];
    if (media.cover) {
      img.src = media.cover;
      img.alt = mediaTitle(media);
    } else {
      img.hidden = true;
    }
    fallback.textContent = mediaTitle(media);
    fallback.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
    $(".type-badge", node).textContent = mediaTypeLabel(media.type);
    $("h4", node).textContent = mediaTitle(media);
    $(".score-badge", node).textContent = media.score ? `${media.score}%` : "-";
    $(".media-meta", node).textContent = `${media.format || "-"} · ${media.year || "-"} · ${media.nativeTitle || media.source}`;
    $(".genre-list", node).innerHTML = media.genres.slice(0, 4).map((genre) => `<span class="tag">${esc(genre)}</span>`).join("");
    $(".media-description", node).textContent = media.description || "";
    $(".add-button span", node).textContent = t("collection.add");
    $(".add-button", node).dataset.addMedia = media.uid;
    grid.appendChild(node);
  });
  updateIcons();
}

function openCollectionModal(media, existingEntry = null) {
  if (!state.user) {
    showAuthModal(t("auth.required"));
    return;
  }
  editingMedia = { media, entryId: existingEntry?.id || null };
  $("#collectionTitle").textContent = mediaTitle(media);
  $("#entryStatus").value = existingEntry?.status || "current";
  $("#entryProgress").value = existingEntry?.progress || 0;
  $("#entryHours").value = existingEntry?.hours || 0;
  $("#entryStarted").value = existingEntry?.startedAt || "";
  $("#entryCompleted").value = existingEntry?.completedAt || "";
  $("#entryRating").value = existingEntry?.rating || 0;
  $("#entryNotes").value = existingEntry?.notes || "";
  $("#collectionModal").classList.add("show");
  $("#collectionModal").setAttribute("aria-hidden", "false");
}

function closeCollectionModal() {
  $("#collectionModal").classList.remove("show");
  $("#collectionModal").setAttribute("aria-hidden", "true");
  editingMedia = null;
}

async function saveCollectionEntry(event) {
  event.preventDefault();
  if (!editingMedia) return;
  const payload = await api("/api/collection", {
    method: "POST",
    body: JSON.stringify({
      id: editingMedia.entryId,
      media: editingMedia.media,
      status: $("#entryStatus").value,
      progress: Number($("#entryProgress").value) || 0,
      hours: Number($("#entryHours").value) || 0,
      startedAt: $("#entryStarted").value,
      completedAt: $("#entryCompleted").value,
      rating: Number($("#entryRating").value) || 0,
      notes: $("#entryNotes").value.trim(),
    }),
  });
  state.collection = payload.collection || [];
  state.activity = payload.activity || state.activity;
  closeCollectionModal();
  renderAll();
  switchView("library");
}

function switchView(view) {
  activeView = view;
  $$(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${view}`));
  const active = $(`#view-${view}`);
  $("#viewTitle").textContent = t(active.dataset.titleKey);
  renderNavigation();
  if (view === "chat") renderChat().finally(updateIcons);
  updateIcons();
}

function showAuthModal(message = "") {
  $("#authModal").classList.add("show");
  $("#authModal").setAttribute("aria-hidden", "false");
  renderAuthTabs();
  $("#authMessage").textContent = message;
}

function hideAuthModal() {
  $("#authModal").classList.remove("show");
  $("#authModal").setAttribute("aria-hidden", "true");
}

function renderAuthTabs() {
  $$("[data-auth-tab]").forEach((button) => button.classList.toggle("active", button.dataset.authTab === activeAuthTab));
  $$(".auth-form").forEach((form) => form.classList.toggle("active", form.id === `${activeAuthTab}Form`));
}

async function refreshBootstrap() {
  const payload = await api("/api/bootstrap");
  state.user = payload.user;
  state.users = payload.users || [];
  state.collection = payload.collection || [];
  state.activity = payload.activity || [];
  state.messages = {};
}

async function login(identity, password) {
  const payload = await api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ identity, password }),
  });
  state.user = payload.user;
  await refreshBootstrap();
}

async function registerUser(formData) {
  const payload = await api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(formData),
  });
  state.user = payload.user;
  await refreshBootstrap();
}

async function logout() {
  await api("/api/auth/logout", { method: "POST", body: "{}" });
  await refreshBootstrap();
  renderAll();
  showAuthModal();
}

async function toggleFollow(personId) {
  if (!state.user) {
    showAuthModal(t("auth.required"));
    return;
  }
  await api(`/api/follows/${encodeURIComponent(personId)}`, { method: "POST", body: "{}" });
  await refreshBootstrap();
  renderAll();
}

async function removeEntry(entryId) {
  const payload = await api(`/api/collection/${encodeURIComponent(entryId)}`, { method: "DELETE" });
  state.collection = payload.collection || [];
  renderAll();
}

async function sendChatMessage(event) {
  event.preventDefault();
  const text = $("#chatInput").value.trim();
  if (!state.user || !activeChatUserId || !text) return;
  const payload = await api(`/api/messages/${encodeURIComponent(activeChatUserId)}`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  state.messages[activeChatUserId] = payload.messages || [];
  $("#chatInput").value = "";
  await renderChat();
  renderRails();
  updateIcons();
}

function googleLogin() {
  window.location.href = "/api/auth/google/start";
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    const nav = event.target.closest("[data-view-target]");
    if (nav) switchView(nav.dataset.viewTarget);

    if (event.target.closest("[data-open-auth]")) showAuthModal();

    const addButton = event.target.closest("[data-add-media]");
    if (addButton) {
      const media = latestResults.find((candidate) => candidate.uid === addButton.dataset.addMedia);
      if (media) openCollectionModal(media);
    }

    const editButton = event.target.closest("[data-edit-entry]");
    if (editButton) {
      const entry = state.collection.find((candidate) => candidate.id === editButton.dataset.editEntry);
      if (entry) openCollectionModal(entry.media, entry);
    }

    const removeButton = event.target.closest("[data-remove-entry]");
    if (removeButton) await removeEntry(removeButton.dataset.removeEntry);

    const followButton = event.target.closest("[data-follow]");
    if (followButton) await toggleFollow(followButton.dataset.follow);

    const messageButton = event.target.closest("[data-message-user]");
    if (messageButton) {
      activeChatUserId = messageButton.dataset.messageUser;
      switchView("chat");
      await renderChat();
      updateIcons();
    }

    const chatButton = event.target.closest("[data-chat-user]");
    if (chatButton) {
      activeChatUserId = chatButton.dataset.chatUser;
      await renderChat();
      updateIcons();
    }

    if (event.target.closest("#openAuthButton")) {
      state.user ? switchView("settings") : showAuthModal();
    }

    if (event.target.closest("#logoutButton")) await logout();
  });

  $$("[data-auth-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeAuthTab = button.dataset.authTab;
      renderAuthTabs();
      $("#authMessage").textContent = "";
    });
  });

  $("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await login($("#loginIdentity").value, $("#loginPassword").value);
      hideAuthModal();
      renderAll();
    } catch {
      $("#authMessage").textContent = t("auth.invalid");
    }
  });

  $("#registerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      await registerUser({
        name: $("#registerName").value,
        username: $("#registerUsername").value,
        email: $("#registerEmail").value,
        password: $("#registerPassword").value,
      });
      hideAuthModal();
      renderAll();
    } catch (error) {
      $("#authMessage").textContent = error.status === 409 ? t("auth.exists") : t("auth.invalid");
    }
  });

  $("#googleLoginButton").addEventListener("click", googleLogin);
  $("#googleRegisterButton").addEventListener("click", googleLogin);

  $("#languageSelect").addEventListener("change", (event) => setLanguage(event.target.value));
  $("#settingsLanguageSelect").addEventListener("change", (event) => setLanguage(event.target.value));

  $("#runSearchButton").addEventListener("click", runSearch);
  ["searchInput", "typeFilter", "genreFilter", "formatFilter", "yearFilter", "scoreFilter"].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(runSearch, 420);
    });
  });

  $("#libraryStatusFilter").addEventListener("change", () => {
    renderLibrary();
    updateIcons();
  });

  $("#collectionForm").addEventListener("submit", saveCollectionEntry);
  $("#closeCollectionModal").addEventListener("click", closeCollectionModal);
  $("#collectionModal").addEventListener("click", (event) => {
    if (event.target.id === "collectionModal") closeCollectionModal();
  });
  $("#chatForm").addEventListener("submit", sendChatMessage);
}

function setLanguage(nextLanguage) {
  language = nextLanguage;
  localStorage.setItem(LANG_KEY, language);
  renderAll();
  renderResults(latestResults, $("#sourcePill").textContent === t("discover.sourceLocal") ? "local" : "anilist");
}

function handleOAuthQuery() {
  const params = new URLSearchParams(window.location.search);
  const google = params.get("google");
  if (!google) return;
  window.history.replaceState({}, "", window.location.pathname);
  if (google === "not_configured") showAuthModal(t("auth.googleMissing"));
  else showAuthModal(t("auth.googleFailed"));
}

async function boot() {
  bindEvents();
  await refreshBootstrap();
  renderAll();
  await runSearch();
  handleOAuthQuery();
  if (!state.user) showAuthModal();
}

boot().catch((error) => {
  console.error(error);
  $("#resultsGrid").innerHTML = `<div class="empty-state">Backend bağlantısı kurulamadı. Siteyi server.py ile çalıştır.</div>`;
});

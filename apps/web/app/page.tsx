const rails = ['Trending Anime', 'Popular', 'Top Rated', 'Recently Released', 'Most Anticipated', 'AI Picks', 'Community Picks', 'Upcoming Episodes'];

export default function HomePage() {
  return <main className="overflow-hidden">
    <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,.35),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,.25),transparent_35%)]" />
      <div className="glass max-w-4xl rounded-3xl p-8 md:p-12">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-violet-200">Anime dünyasının IMDb'si</p>
        <h1 className="text-5xl font-black tracking-tight md:text-7xl">AI destekli anime keşfi, sosyal incelemeler ve evrensel katalog.</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">Animest; gelişmiş filtreler, spoiler korumalı AI chat, kişisel tema sistemi, çok dilli içerik ve topluluk listelerini tek platformda birleştirir.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="rounded-full bg-brand px-6 py-3 font-semibold text-brand-foreground" href="/search">Keşfet</a><a className="rounded-full border border-white/15 px-6 py-3 font-semibold" href="/ai">AI öneri al</a></div>
      </div>
    </section>
    <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-24 md:grid-cols-4">{rails.map((rail) => <article key={rail} className="glass rounded-2xl p-5"><h2 className="font-bold">{rail}</h2><p className="mt-2 text-sm text-slate-300">Cursor pagination, Redis cache, Elasticsearch ranking ve SSR için hazır keşif alanı.</p></article>)}</section>
  </main>;
}

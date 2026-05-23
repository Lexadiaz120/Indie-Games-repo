import { tr } from '../lib/i18n';

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition-colors ${
        active
          ? 'bg-zinc-900 text-white'
          : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400'
      }`}
    >
      {label}
    </button>
  );
}

export default function Filters({ lang, genres, statuses, filterStatus, filterGenre, sortBy, onStatus, onGenre, onSort }) {
  const t = tr[lang];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide w-16 shrink-0">{t.status}</span>
        <Chip label={t.all} active={!filterStatus} onClick={() => onStatus(null)} />
        {statuses.map((s) => (
          <Chip key={s} label={s} active={filterStatus === s} onClick={() => onStatus(s === filterStatus ? null : s)} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide w-16 shrink-0">{t.genre}</span>
        <Chip label={t.all} active={!filterGenre} onClick={() => onGenre(null)} />
        {genres.map((g) => (
          <Chip key={g} label={g} active={filterGenre === g} onClick={() => onGenre(g === filterGenre ? null : g)} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide w-16 shrink-0">{t.sort}</span>
        <Chip label={t.sortDefault} active={sortBy === 'default'} onClick={() => onSort('default')} />
        <Chip label={t.sortScore} active={sortBy === 'score'} onClick={() => onSort('score')} />
        <Chip label={t.sortRevenue} active={sortBy === 'revenue'} onClick={() => onSort('revenue')} />
      </div>
    </div>
  );
}

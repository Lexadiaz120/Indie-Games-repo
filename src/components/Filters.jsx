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

export default function Filters({ genres, statuses, filterStatus, filterGenre, sortBy, onStatus, onGenre, onSort }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide w-16 shrink-0">Статус</span>
        <Chip label="Все" active={!filterStatus} onClick={() => onStatus(null)} />
        {statuses.map((s) => (
          <Chip key={s} label={s} active={filterStatus === s} onClick={() => onStatus(s === filterStatus ? null : s)} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide w-16 shrink-0">Жанр</span>
        <Chip label="Все" active={!filterGenre} onClick={() => onGenre(null)} />
        {genres.map((g) => (
          <Chip key={g} label={g} active={filterGenre === g} onClick={() => onGenre(g === filterGenre ? null : g)} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide w-16 shrink-0">Сорт.</span>
        <Chip label="По умолчанию" active={sortBy === 'default'} onClick={() => onSort('default')} />
        <Chip label="По релевантности" active={sortBy === 'score'} onClick={() => onSort('score')} />
        <Chip label="По доходу" active={sortBy === 'revenue'} onClick={() => onSort('revenue')} />
      </div>
    </div>
  );
}

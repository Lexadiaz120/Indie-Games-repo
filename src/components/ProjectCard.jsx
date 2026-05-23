import { useState } from 'react';

function ScoreDots({ score }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`w-2 h-2 rounded-full ${n <= score ? 'bg-zinc-700' : 'bg-zinc-200'}`}
        />
      ))}
    </div>
  );
}

function PlatformBadge({ platform }) {
  const map = {
    Patreon: { label: 'Patreon', cls: 'bg-orange-50 text-orange-600 border border-orange-200' },
    'itch.io': { label: 'itch.io', cls: 'bg-pink-50 text-pink-600 border border-pink-200' },
    Обе: { label: 'Patreon + itch.io', cls: 'bg-zinc-100 text-zinc-600 border border-zinc-200' },
  };
  const { label, cls } = map[platform] || map['Обе'];
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${cls}`}>{label}</span>
  );
}

export default function ProjectCard({ project, genres, statuses, getGenreStyle, getStatusStyle, onEdit, onDelete }) {
  const [showNotes, setShowNotes] = useState(false);
  const genreStyle = getGenreStyle(project.genre, genres);
  const statusStyle = getStatusStyle(project.status, statuses);

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col gap-3 hover:border-zinc-300 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-zinc-900 text-base leading-tight">{project.title}</h3>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(project)}
            className="p-1 text-zinc-400 hover:text-zinc-700 transition-colors"
            title="Редактировать"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-1 text-zinc-400 hover:text-red-500 transition-colors"
            title="Удалить"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tags row */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className={`text-xs px-2 py-0.5 rounded font-medium ${genreStyle}`}>{project.genre}</span>
        <span className={`text-xs px-2 py-0.5 rounded font-medium flex items-center gap-1 ${statusStyle.bg} ${statusStyle.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
          {project.status}
        </span>
      </div>

      {/* Metrics */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex flex-col gap-0.5">
          <span className="text-zinc-400 text-xs">Релевантность</span>
          <ScoreDots score={project.score} />
        </div>
        <div className="flex flex-col gap-0.5 items-end">
          <span className="text-zinc-400 text-xs">Доход / мес.</span>
          <span className="font-semibold text-zinc-800 text-sm">
            {project.revenue > 0 ? `$${project.revenue.toLocaleString()}` : '—'}
          </span>
        </div>
      </div>

      {/* Platform */}
      <div className="flex items-center justify-between">
        <PlatformBadge platform={project.platform} />
        {project.notes && (
          <button
            onClick={() => setShowNotes((v) => !v)}
            className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            {showNotes ? 'скрыть' : 'заметки ↓'}
          </button>
        )}
      </div>

      {/* Notes */}
      {showNotes && project.notes && (
        <p className="text-xs text-zinc-500 bg-zinc-50 rounded-lg p-3 leading-relaxed border border-zinc-100">
          {project.notes}
        </p>
      )}
    </div>
  );
}

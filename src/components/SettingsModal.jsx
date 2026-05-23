import { useState } from 'react';
import { tr, LANGS } from '../lib/i18n';

function TagList({ items, onDelete, onAdd, placeholder }) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const val = input.trim();
    if (!val || items.includes(val)) return;
    onAdd(val);
    setInput('');
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-1.5 bg-zinc-100 rounded-full px-3 py-1 text-sm text-zinc-700">
            <span>{item}</span>
            {items.length > 1 && (
              <button onClick={() => onDelete(item)} className="text-zinc-400 hover:text-red-500 transition-colors leading-none">×</button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
          placeholder={placeholder}
          className="flex-1 border border-zinc-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-zinc-400 transition-colors"
        />
        <button onClick={handleAdd} className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm hover:bg-zinc-700 transition-colors">+</button>
      </div>
    </div>
  );
}

export default function SettingsModal({ lang, genres, statuses, onSave, onLangChange, onClose }) {
  const t = tr[lang];
  const [localGenres, setLocalGenres] = useState(genres);
  const [localStatuses, setLocalStatuses] = useState(statuses);

  const handleSave = () => {
    onSave({ genres: localGenres, statuses: localStatuses });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">{t.settings}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-700 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* Language */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-zinc-700">{t.language}</h3>
            <div className="flex gap-2">
              {Object.entries(LANGS).map(([code, { label, flag }]) => (
                <button
                  key={code}
                  onClick={() => onLangChange(code)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors ${
                    lang === code
                      ? 'border-zinc-900 bg-zinc-900 text-white'
                      : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  <span>{flag}</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-zinc-100" />

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-zinc-700">{t.genresLabel}</h3>
            <TagList
              items={localGenres}
              onDelete={(g) => setLocalGenres((prev) => prev.filter((x) => x !== g))}
              onAdd={(g) => setLocalGenres((prev) => [...prev, g])}
              placeholder={t.newGenrePlaceholder}
            />
          </div>

          <div className="w-full h-px bg-zinc-100" />

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-zinc-700">{t.statusesLabel}</h3>
            <TagList
              items={localStatuses}
              onDelete={(s) => setLocalStatuses((prev) => prev.filter((x) => x !== s))}
              onAdd={(s) => setLocalStatuses((prev) => [...prev, s])}
              placeholder={t.newStatusPlaceholder}
            />
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 border border-zinc-200 rounded-lg py-2 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">
            {t.cancel}
          </button>
          <button onClick={handleSave} className="flex-1 bg-zinc-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-zinc-700 transition-colors">
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
}

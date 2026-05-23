import { useState, useEffect } from 'react';
import { GENRES, STATUSES, PLATFORMS } from '../data';

const EMPTY = {
  title: '',
  genre: GENRES[0],
  status: STATUSES[0],
  score: 3,
  revenue: '',
  platform: PLATFORMS[0],
  notes: '',
};

function ScorePicker({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
            n <= value
              ? 'bg-zinc-800 text-white'
              : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export default function ProjectModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY);

  useEffect(() => {
    setForm(initial || EMPTY);
  }, [initial]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      ...form,
      revenue: Number(form.revenue) || 0,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            {initial ? 'Редактировать проект' : 'Новый проект'}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Название</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Название игры..."
              required
              className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 transition-colors"
            />
          </div>

          {/* Genre + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Жанр</label>
              <select
                value={form.genre}
                onChange={(e) => set('genre', e.target.value)}
                className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 transition-colors bg-white"
              >
                {GENRES.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Статус</label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 transition-colors bg-white"
              >
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Score */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
              Релевантность
            </label>
            <ScorePicker value={form.score} onChange={(v) => set('score', v)} />
          </div>

          {/* Revenue + Platform */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Доход / мес. ($)</label>
              <input
                type="number"
                min="0"
                value={form.revenue}
                onChange={(e) => set('revenue', e.target.value)}
                placeholder="0"
                className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Платформа</label>
              <select
                value={form.platform}
                onChange={(e) => set('platform', e.target.value)}
                className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 transition-colors bg-white"
              >
                {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">Заметки</label>
            <textarea
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="Комментарии, идеи, задачи..."
              rows={3}
              className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-zinc-200 rounded-lg py-2 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 bg-zinc-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              {initial ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

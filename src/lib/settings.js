import { GENRES, STATUSES } from '../data';

const GENRE_COLORS = [
  'bg-violet-100 text-violet-700',
  'bg-sky-100 text-sky-700',
  'bg-rose-100 text-rose-700',
  'bg-orange-100 text-orange-700',
  'bg-teal-100 text-teal-700',
  'bg-lime-100 text-lime-700',
  'bg-indigo-100 text-indigo-700',
  'bg-pink-100 text-pink-700',
  'bg-amber-100 text-amber-700',
  'bg-cyan-100 text-cyan-700',
];

const STATUS_COLORS = [
  { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400' },
  { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-400' },
  { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-400' },
];

const KEY = 'indie-board-settings';

export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { genres: GENRES, statuses: STATUSES };
}

export function saveSettings(settings) {
  localStorage.setItem(KEY, JSON.stringify(settings));
}

export function getGenreStyle(genre, genres) {
  const idx = genres.indexOf(genre);
  return GENRE_COLORS[(idx >= 0 ? idx : 0) % GENRE_COLORS.length];
}

export function getStatusStyle(status, statuses) {
  const idx = statuses.indexOf(status);
  return STATUS_COLORS[(idx >= 0 ? idx : 0) % STATUS_COLORS.length];
}

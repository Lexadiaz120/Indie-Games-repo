export const GENRES = ['Визуальная новелла', 'Песочница', 'RPG', '3D', 'Мифология'];
export const STATUSES = ['Идея', 'В разработке', 'Выпущена'];
export const PLATFORMS = ['Patreon', 'itch.io', 'Обе'];

export const STATUS_STYLES = {
  'Идея':          { bg: 'bg-slate-100',  text: 'text-slate-600',  dot: 'bg-slate-400'  },
  'В разработке':  { bg: 'bg-amber-50',   text: 'text-amber-700',  dot: 'bg-amber-400'  },
  'Выпущена':      { bg: 'bg-emerald-50', text: 'text-emerald-700',dot: 'bg-emerald-500' },
};

export const GENRE_STYLES = {
  'Визуальная новелла': 'bg-violet-100 text-violet-700',
  'Песочница':          'bg-sky-100 text-sky-700',
  'RPG':                'bg-rose-100 text-rose-700',
  '3D':                 'bg-orange-100 text-orange-700',
  'Мифология':          'bg-teal-100 text-teal-700',
};

export const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Забытые боги',
    genre: 'Мифология',
    status: 'В разработке',
    score: 4,
    revenue: 320,
    platform: 'Patreon',
    notes: 'Сценарий готов на 60%. Нужен художник для фонов.',
  },
  {
    id: 2,
    title: 'Тихая гавань',
    genre: 'Визуальная новелла',
    status: 'Выпущена',
    score: 5,
    revenue: 890,
    platform: 'Обе',
    notes: 'Стабильный доход. Планируется DLC.',
  },
  {
    id: 3,
    title: 'Железный мир',
    genre: 'Песочница',
    status: 'Идея',
    score: 3,
    revenue: 0,
    platform: 'itch.io',
    notes: 'Прототип механики крафта. Пока только концепт.',
  },
  {
    id: 4,
    title: 'Хроники Аравии',
    genre: 'RPG',
    status: 'В разработке',
    score: 4,
    revenue: 150,
    platform: 'Patreon',
    notes: 'Открытый мир на движке Godot 4.',
  },
];

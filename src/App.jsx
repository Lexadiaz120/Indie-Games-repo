import { useState, useEffect, useMemo } from 'react';
import { supabase } from './lib/supabase';
import { loadSettings, saveSettings, getGenreStyle, getStatusStyle } from './lib/settings';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import Filters from './components/Filters';
import SettingsModal from './components/SettingsModal';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterGenre, setFilterGenre] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [modal, setModal] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) {
      setError(error.message);
    } else {
      setProjects(data);
    }
    setLoading(false);
  }

  function handleSettingsSave(newSettings) {
    setSettings(newSettings);
    saveSettings(newSettings);
    setFilterStatus(null);
    setFilterGenre(null);
  }

  function handleAddGenre(genre) {
    const next = { ...settings, genres: [...settings.genres, genre] };
    setSettings(next);
    saveSettings(next);
  }

  function handleAddStatus(status) {
    const next = { ...settings, statuses: [...settings.statuses, status] };
    setSettings(next);
    saveSettings(next);
  }

  const displayed = useMemo(() => {
    let list = [...projects];
    if (filterStatus) list = list.filter((p) => p.status === filterStatus);
    if (filterGenre) list = list.filter((p) => p.genre === filterGenre);
    if (sortBy === 'score') list.sort((a, b) => b.score - a.score);
    else if (sortBy === 'revenue') list.sort((a, b) => b.revenue - a.revenue);
    return list;
  }, [projects, filterStatus, filterGenre, sortBy]);

  const totalRevenue = useMemo(
    () => displayed.reduce((s, p) => s + p.revenue, 0),
    [displayed]
  );

  async function handleSave(data) {
    if (modal && modal !== 'add') {
      const { error } = await supabase
        .from('projects')
        .update(data)
        .eq('id', modal.id);
      if (!error) {
        setProjects((ps) =>
          ps.map((p) => (p.id === modal.id ? { ...p, ...data } : p))
        );
      }
    } else {
      const { data: inserted, error } = await supabase
        .from('projects')
        .insert(data)
        .select()
        .single();
      if (!error) {
        setProjects((ps) => [...ps, inserted]);
      }
    }
    setModal(null);
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (!error) {
      setProjects((ps) => ps.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-zinc-900 leading-tight m-0">
              Инди-игры
            </h1>
            <p className="text-sm text-zinc-400 mt-0.5">Трекер проектов</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-zinc-400">Показано проектов</p>
              <p className="text-sm font-semibold text-zinc-700">
                {displayed.length} / {projects.length}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs text-zinc-400">Суммарный доход</p>
              <p className="text-sm font-semibold text-emerald-600">
                ${totalRevenue.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors"
              title="Настройки"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
            <button
              onClick={() => setModal('add')}
              className="flex items-center gap-2 bg-zinc-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Добавить
            </button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b border-zinc-200 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <Filters
            genres={settings.genres}
            statuses={settings.statuses}
            filterStatus={filterStatus}
            filterGenre={filterGenre}
            sortBy={sortBy}
            onStatus={setFilterStatus}
            onGenre={setFilterGenre}
            onSort={setSortBy}
          />
        </div>
      </div>

      {/* Board */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-zinc-400">
            <svg className="animate-spin" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <p className="text-sm">Загрузка...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <p className="text-sm text-red-500">Ошибка: {error}</p>
            <button
              onClick={fetchProjects}
              className="text-sm text-zinc-500 underline hover:text-zinc-800 transition-colors"
            >
              Повторить
            </button>
          </div>
        ) : displayed.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-zinc-400">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <p className="text-sm">
              {projects.length === 0
                ? 'Проектов пока нет. Добавьте первый!'
                : 'Нет проектов, соответствующих фильтрам'}
            </p>
            {projects.length > 0 && (
              <button
                onClick={() => { setFilterStatus(null); setFilterGenre(null); }}
                className="text-sm text-zinc-500 underline hover:text-zinc-800 transition-colors"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayed.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                genres={settings.genres}
                statuses={settings.statuses}
                getGenreStyle={getGenreStyle}
                getStatusStyle={getStatusStyle}
                onEdit={(proj) => setModal(proj)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>

      {modal && (
        <ProjectModal
          initial={modal !== 'add' ? modal : null}
          genres={settings.genres}
          statuses={settings.statuses}
          onAddGenre={handleAddGenre}
          onAddStatus={handleAddStatus}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {showSettings && (
        <SettingsModal
          genres={settings.genres}
          statuses={settings.statuses}
          onSave={handleSettingsSave}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

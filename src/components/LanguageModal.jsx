import { LANGS } from '../lib/i18n';

export default function LanguageModal({ onSelect }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)' }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <div className="text-4xl mb-1">🎮</div>
          <h2 className="text-xl font-semibold text-zinc-900">Indie Game Board</h2>
          <p className="text-sm text-zinc-400">Choose your language / Выберите язык</p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          {Object.entries(LANGS).map(([code, { label, flag }]) => (
            <button
              key={code}
              onClick={() => onSelect(code)}
              className="flex items-center gap-4 w-full border border-zinc-200 rounded-xl px-5 py-4 hover:border-zinc-400 hover:bg-zinc-50 transition-all group"
            >
              <span className="text-3xl">{flag}</span>
              <span className="text-base font-medium text-zinc-800 group-hover:text-zinc-900">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

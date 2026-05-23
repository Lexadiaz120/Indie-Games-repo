import { useState, useEffect } from 'react';

const PIN_LENGTH = 4;
const CORRECT_PIN = import.meta.env.VITE_APP_PIN;

export default function PinModal({ onUnlock }) {
  const [digits, setDigits] = useState([]);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);

  const push = (d) => {
    if (digits.length >= PIN_LENGTH) return;
    setDigits((prev) => [...prev, d]);
  };

  const pop = () => setDigits((prev) => prev.slice(0, -1));

  const clear = () => { setDigits([]); setError(false); };

  useEffect(() => {
    if (digits.length !== PIN_LENGTH) return;
    const entered = digits.join('');
    if (entered === String(CORRECT_PIN)) {
      sessionStorage.setItem('pin-unlocked', 'true');
      onUnlock();
    } else {
      setShake(true);
      setError(true);
      setTimeout(() => { setShake(false); clear(); }, 700);
    }
  }, [digits]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key >= '0' && e.key <= '9') push(e.key);
      if (e.key === 'Backspace') pop();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [digits]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 p-4">
      <div className="flex flex-col items-center gap-8 w-full max-w-xs">
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl mb-1">🔒</div>
          <h2 className="text-white text-xl font-semibold">Indie Game Board</h2>
          <p className="text-zinc-500 text-sm">Введите PIN-код</p>
        </div>

        {/* Dots */}
        <div className={`flex gap-4 ${shake ? 'animate-[shake_0.4s_ease]' : ''}`}>
          {Array.from({ length: PIN_LENGTH }).map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                i < digits.length
                  ? error ? 'bg-red-500 border-red-500' : 'bg-white border-white'
                  : 'bg-transparent border-zinc-600'
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-400 text-sm -mt-4">Неверный код</p>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <button
              key={n}
              onClick={() => push(String(n))}
              className="h-16 rounded-2xl bg-zinc-800 text-white text-xl font-medium hover:bg-zinc-700 active:bg-zinc-600 transition-colors"
            >
              {n}
            </button>
          ))}
          <div />
          <button
            onClick={() => push('0')}
            className="h-16 rounded-2xl bg-zinc-800 text-white text-xl font-medium hover:bg-zinc-700 active:bg-zinc-600 transition-colors"
          >
            0
          </button>
          <button
            onClick={pop}
            className="h-16 rounded-2xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 active:bg-zinc-600 transition-colors flex items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/>
              <line x1="18" y1="9" x2="12" y2="15"/>
              <line x1="12" y1="9" x2="18" y2="15"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

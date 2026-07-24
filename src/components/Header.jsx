import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { IconBall, IconSun, IconMoon } from './icons';

function useTheme() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('goalstats-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return [isDark, setIsDark];
}

export default function Header() {
  const { goHome, brCurrentRound } = useApp();
  const [isDark, setIsDark] = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={goHome} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-md bg-green-500 flex items-center justify-center overflow-hidden">
            <IconBall className="w-5 h-5 text-white transition-transform duration-500 group-hover:rotate-[360deg]" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-lg font-display font-bold text-ink-900 tracking-tight">
              GoalStats
            </span>
            <span className="tag bg-gold-100 text-gold-700 hidden sm:inline-flex">BR 2026</span>
          </div>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 text-ink-600 border border-gray-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-medium">Rodada {brCurrentRound}</span>
            </span>
            <span className="text-ink-400">•</span>
            <span className="text-ink-400">Série A</span>
          </div>

          <button
            onClick={() => setIsDark((v) => !v)}
            aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="relative w-9 h-9 rounded-md border border-gray-100 bg-gray-50 text-ink-600 hover:text-ink-900 hover:border-gray-200 transition-colors flex items-center justify-center overflow-hidden"
          >
            <IconSun className={`w-4.5 h-4.5 absolute transition-all duration-300 ${isDark ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
            <IconMoon className={`w-4.5 h-4.5 absolute transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`} />
          </button>
        </div>
      </div>
    </header>
  );
}

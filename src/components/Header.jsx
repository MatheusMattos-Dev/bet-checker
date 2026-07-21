import { useApp } from '../context/AppContext';

export default function Header() {
  const { goHome, brCurrentRound } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-surface-900/80 backdrop-blur-xl border-b border-surface-600/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <button onClick={goHome} className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500 to-accent-400 flex items-center justify-center shadow-lg shadow-accent-500/20 group-hover:shadow-accent-500/40 transition-shadow">
              <span className="text-lg">⚽</span>
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent-400 border-2 border-surface-900 animate-pulse" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-lg font-display font-bold text-text-primary tracking-tight group-hover:text-accent-300 transition-colors">
              GoalStats
            </span>
            <span className="hidden sm:inline-flex text-[10px] font-bold font-mono tracking-wider text-accent-300 bg-accent-500/10 px-2 py-0.5 rounded-md border border-accent-500/20">
              BR 2026
            </span>
          </div>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-700/50 text-text-secondary border border-surface-600/40">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
              <span className="font-medium">Rodada {brCurrentRound}</span>
            </span>
            <span className="text-text-muted">•</span>
            <span className="text-text-muted">Série A</span>
          </div>
        </div>
      </div>
    </header>
  );
}
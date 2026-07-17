import { useApp } from '../context/AppContext';

export default function Header() {
  const { goHome } = useApp();

  return (
    <header className="sticky top-0 z-40 glass-card border-b border-surface-600/50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={goHome} className="flex items-center gap-3 group">
          {/* Logo icon */}
          <div className="w-9 h-9 rounded-lg bg-accent-500/10 border border-accent-500/20 flex items-center justify-center group-hover:bg-accent-500/20 transition-all">
            <span className="text-lg">⚽</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-display font-bold text-text-primary group-hover:text-accent-300 transition-colors">
              GoalStats
            </span>
            <span className="text-xs font-mono font-medium text-text-muted bg-surface-700/50 px-2 py-0.5 rounded-md">
              2026
            </span>
          </div>
        </button>

        {/* Right side — status indicator */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
            <span className="font-medium">Final em 19/07</span>
          </div>
        </div>
      </div>
    </header>
  );
}
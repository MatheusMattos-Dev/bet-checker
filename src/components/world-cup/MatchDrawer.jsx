import { useState } from 'react';

function DonutMini({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      className="w-10 h-10 rounded-full relative flex-shrink-0"
      style={{ background: `conic-gradient(var(--color-accent-500) 0% ${pct}%, var(--color-surface-600) ${pct}% 100%)` }}
    >
      <div className="absolute inset-1.5 bg-surface-800 rounded-full flex items-center justify-center">
        <span className="text-[9px] font-bold text-accent-300">{pct}%</span>
      </div>
    </div>
  );
}

function BolaoItem({ bolao }) {
  const pct = bolao.coverage;
  const gradient =
    pct >= 80 ? 'linear-gradient(90deg, #00e676, #69f0ae)'
      : pct >= 50 ? 'linear-gradient(90deg, #ffd740, #ffe400)'
        : 'linear-gradient(90deg, #ff5252, #ff8a80)';

  const badgeStyle =
    bolao.type === 'zebra' ? 'bg-danger-500/10 text-danger-400 border-danger-500/20'
      : bolao.type === 'premium' ? 'bg-gold-500/10 text-gold-400 border-gold-500/20'
        : 'bg-accent-500/10 text-accent-300 border-accent-500/20';

  const badgeIcon =
    bolao.type === 'zebra' ? '⚡'
      : bolao.type === 'premium' ? '🏆'
        : '🛡️';

  const badgeLabel =
    bolao.type === 'zebra' ? 'Zebra'
      : bolao.type === 'premium' ? 'Premium'
        : 'Fav';

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-700/30 hover:bg-surface-700/60 transition-colors cursor-pointer group">
      <div className="w-12 text-center">
        <span className="text-xs font-mono font-bold text-text-primary group-hover:text-accent-300 transition-colors">
          #{bolao.id}
        </span>
      </div>

      <div className="flex-1">
        <div className="h-1.5 bg-surface-600 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: gradient }} />
        </div>
      </div>

      <span className="text-xs font-mono font-bold text-text-primary w-10 text-right">{pct}%</span>

      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyle}`}>
        {badgeIcon} {badgeLabel}
      </span>
    </div>
  );
}

// Generate mock bolão data
function generateMockBoloes(home, away) {
  const boloes = [];
  const types = ['zebra', 'favorite', 'premium'];
  for (let i = 1; i <= 80; i++) {
    boloes.push({
      id: String(1000 + Math.floor(Math.random() * 9000)),
      coverage: Math.floor(Math.random() * 50) + 40,
      type: types[Math.floor(Math.random() * types.length)],
    });
  }
  return boloes.sort((a, b) => b.coverage - a.coverage);
}

export default function MatchDrawer({ match, onClose }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const mockBoloes = generateMockBoloes(match?.home, match?.away);

  const filtered = mockBoloes.filter(b => {
    if (filter !== 'all' && b.type !== filter) return false;
    if (search && !b.id.includes(search)) return false;
    return true;
  });

  const totalCovering = mockBoloes.length;
  const zebraCount = mockBoloes.filter(b => b.type === 'zebra').length;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-surface-900 border-l border-surface-600/50 shadow-2xl animate-slide-in-right overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 p-4 border-b border-surface-600/50">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-lg hover:bg-surface-700"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <span className="text-xs font-mono text-text-muted bg-surface-700 px-2 py-0.5 rounded-md">{match?.round || 'Jogo'}</span>
          </div>

          {/* Match info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{match?.homeFlag || '🏳️'}</span>
              <span className="font-display font-bold text-text-primary">{match?.home}</span>
            </div>
            <div className="text-center px-3">
              {match?.homeGoals !== undefined ? (
                <span className="text-xl font-mono font-bold text-accent-300">
                  {match.homeGoals} : {match.awayGoals}
                </span>
              ) : (
                <span className="text-xl font-mono font-bold text-gold-400">? : ?</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-text-primary">{match?.away}</span>
              <span className="text-2xl">{match?.awayFlag || '🏳️'}</span>
            </div>
          </div>

          {match?.venue && (
            <p className="text-xs text-text-muted mt-2 text-center">{match.venue} • {match.date}</p>
          )}
        </div>

        {/* Summary cards */}
        <div className="flex-shrink-0 p-4 grid grid-cols-2 gap-3">
          <div className="bg-surface-800 rounded-lg p-3 border border-surface-600/50">
            <div className="flex items-center gap-3">
              <DonutMini value={totalCovering} max={1203} />
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Cobertura</p>
                <p className="text-sm font-bold text-text-primary">{totalCovering}/1.203</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-800 rounded-lg p-3 border border-surface-600/50">
            <div className="flex items-center gap-3">
              <DonutMini value={zebraCount} max={totalCovering} />
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider">Zebras</p>
                <p className="text-sm font-bold text-text-primary">{zebraCount} cercadas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex-shrink-0 px-4 pb-3">
          <div className="flex gap-2 mb-3">
            {['all', 'zebra', 'premium', 'favorite'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f
                    ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
                    : 'bg-surface-700/50 text-text-muted border border-transparent hover:text-text-secondary'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'zebra' ? '⚡ Zebra' : f === 'premium' ? '🏆 Premium' : '🛡️ Fav'}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Buscar bolão #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-800 border border-surface-600/50 rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-500/50 transition-colors"
          />
        </div>

        {/* Bolão list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.length === 0 ? (
            <p className="text-center text-text-muted text-sm py-8">Nenhum bolão encontrado</p>
          ) : (
            filtered.map(bolao => (
              <BolaoItem key={bolao.id} bolao={bolao} />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-3 border-t border-surface-600/50 text-center">
          <p className="text-[10px] text-text-muted">{filtered.length} de {mockBoloes.length} bolões</p>
        </div>
      </div>
    </div>
  );
}
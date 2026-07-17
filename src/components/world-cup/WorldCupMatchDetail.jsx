import { useApp } from '../../context/AppContext';

function FormCircle({ result }) {
  const colors = { W: 'bg-accent-500', D: 'bg-gold-500', L: 'bg-danger-500' };
  const labels = { W: 'V', D: 'E', L: 'D' };
  return (
    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${colors[result]}`}>
      {labels[result]}
    </div>
  );
}

function StatBar({ label, home, away }) {
  const total = home + away;
  const homePct = total > 0 ? (home / total) * 100 : 50;
  const awayPct = total > 0 ? (away / total) * 100 : 50;

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-mono font-bold text-text-primary">{home}</span>
        <span className="text-text-muted">{label}</span>
        <span className="font-mono font-bold text-text-primary">{away}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        <div className="h-full bg-accent-500 rounded-l-full transition-all" style={{ width: `${homePct}%` }} />
        <div className="h-full bg-info-500 rounded-r-full transition-all" style={{ width: `${awayPct}%` }} />
      </div>
    </div>
  );
}

export default function WorldCupMatchDetail({ match }) {
  const { navigateWCView, getWCH2H, getWCEligibleGoals, getWCTeamForm, getWCTeamStyle } = useApp();

  const homeTeam = match.home;
  const awayTeam = match.away;
  const h2h = getWCH2H(homeTeam, awayTeam);
  const xG = getWCEligibleGoals(homeTeam, awayTeam);

  const homeForm = getWCTeamForm(homeTeam);
  const awayForm = getWCTeamForm(awayTeam);
  const homeStyle = getWCTeamStyle(homeTeam);
  const awayStyle = getWCTeamStyle(awayTeam);

  const formColors = { W: 'bg-accent-500', D: 'bg-gold-500', L: 'bg-danger-500' };
  const formLabels = { W: 'V', D: 'E', L: 'D' };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Match header */}
      <div className="relative bg-surface-800 rounded-2xl p-6 mb-6 overflow-hidden border border-surface-600/50">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateWCView('bracket')}
              className="text-text-secondary hover:text-text-primary transition-colors text-sm flex items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Voltar
            </button>
            <span className="text-xs font-mono text-text-muted bg-surface-700 px-2 py-1 rounded-md">{match.round || 'Mata-Mata'}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <span className="text-4xl block mb-2">{match.homeFlag || '🏳️'}</span>
              <span className="font-display font-bold text-text-primary text-lg">{homeTeam}</span>
            </div>

            <div className="px-6 text-center">
              {match.homeGoals !== undefined ? (
                <div className="text-4xl font-mono font-bold text-accent-300">
                  {match.homeGoals} : {match.awayGoals}
                </div>
              ) : (
                <div className="text-4xl font-mono font-bold text-gold-400">? : ?</div>
              )}
              {match.venue && <p className="text-xs text-text-muted mt-1">{match.venue}</p>}
              {match.date && <p className="text-xs text-text-muted">{match.date}</p>}
            </div>

            <div className="flex-1 text-center">
              <span className="text-4xl block mb-2">{match.awayFlag || '🏳️'}</span>
              <span className="font-display font-bold text-text-primary text-lg">{awayTeam}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50">
          <h3 className="text-sm font-display font-semibold text-text-primary mb-3">{homeTeam} — Forma</h3>
          <div className="flex gap-2 mb-2">
            {homeForm?.split('').map((r, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${formColors[r]}`}>
                  {formLabels[r]}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted">{homeStyle}</p>
        </div>
        <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50">
          <h3 className="text-sm font-display font-semibold text-text-primary mb-3">{awayTeam} — Forma</h3>
          <div className="flex gap-2 mb-2">
            {awayForm?.split('').map((r, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${formColors[r]}`}>
                  {formLabels[r]}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-muted">{awayStyle}</p>
        </div>
      </div>

      {/* xG */}
      <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50 mb-6">
        <h3 className="text-sm font-display font-semibold text-text-primary mb-3">⚽ Gols Esperados (xG)</h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-mono font-bold text-accent-300">{xG[homeTeam]?.toFixed(2) || '—'}</span>
          <span className="text-text-muted">vs</span>
          <span className="text-2xl font-mono font-bold text-info-500">{xG[awayTeam]?.toFixed(2) || '—'}</span>
        </div>
      </div>

      {/* H2H */}
      <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50 mb-6">
        <h3 className="text-sm font-display font-semibold text-text-primary mb-3">📋 Confronto Direto</h3>
        <div className="space-y-2">
          {h2h.map((game, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-surface-600/30 last:border-0">
              <div className="flex items-center gap-2">
                <span>{game.homeFlag}</span>
                <span className="font-medium text-text-primary">{game.home}</span>
              </div>
              <span className="font-mono font-bold text-text-primary">{game.homeGoals} - {game.awayGoals}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">{game.away}</span>
                <span>{game.awayFlag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats comparison */}
      <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50">
        <h3 className="text-sm font-display font-semibold text-text-primary mb-4">📊 Comparação</h3>
        <StatBar label="Gols/Jogo" home={3} away={2} />
        <StatBar label="Chutes/Jogo" home={14} away={11} />
        <StatBar label="Desarmes/Jogo" home={18} away={15} />
        <StatBar label="Interceptações/Jogo" home={10} away={12} />
      </div>
    </div>
  );
}
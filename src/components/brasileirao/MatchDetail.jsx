import { useApp } from '../../context/AppContext';

function StatBar({ label, home, away }) {
  const total = home + away || 1;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-text-primary font-semibold">{home}</span>
        <span className="text-text-muted">{label}</span>
        <span className="text-text-primary font-semibold">{away}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        <div className="h-full rounded-l-full bg-accent-500 transition-all" style={{ width: `${(home / total) * 100}%` }} />
        <div className="h-full rounded-r-full bg-danger-500 transition-all" style={{ width: `${(away / total) * 100}%` }} />
      </div>
    </div>
  );
}

export default function MatchDetail({ match }) {
  const { getTeam, getH2HTeams, getExpectedGoals, getTeamForm, getTeamStyle } = useApp();

  const h2h = getH2HTeams(match.home, match.away);
  const homeExpected = getExpectedGoals(match.home, match.away);
  const awayExpected = getExpectedGoals(match.away, match.home);
  const homeForm = getTeamForm(match.home);
  const awayForm = getTeamForm(match.away);
  const homeStyle = getTeamStyle(match.home);
  const awayStyle = getTeamStyle(match.away);

  const formLabel = { excellent: 'Excelente', good: 'Bom', average: 'Médio', poor: 'Ruim' };
  const formColor = { excellent: 'text-accent-300', good: 'text-accent-400', average: 'text-gold-400', poor: 'text-danger-400' };

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <div className="glass-card rounded-2xl border border-surface-600/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center shrink-0 mb-3 drop-shadow-md">
              {getTeam(match.home)?.logo_url ? <img src={getTeam(match.home).logo_url} alt={match.home} className="w-full h-full object-contain" /> : <span className="text-4xl">⚽</span>}
            </div>
            <div className="text-2xl font-bold font-display text-text-primary">{match.home}</div>
            <div className="text-xs text-text-muted mt-1">{formLabel[homeForm]}</div>
          </div>
          <div className="px-6">
            {match.homeGoals !== null ? (
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-text-primary">
                  {match.homeGoals} - {match.awayGoals}
                </div>
                <div className="text-xs text-text-muted mt-1">{match.date}</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm text-text-muted">vs</div>
                <div className="text-xs text-text-muted mt-1">{match.date}</div>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center shrink-0 mb-3 drop-shadow-md">
              {getTeam(match.away)?.logo_url ? <img src={getTeam(match.away).logo_url} alt={match.away} className="w-full h-full object-contain" /> : <span className="text-4xl">⚽</span>}
            </div>
            <div className="text-2xl font-bold font-display text-text-primary">{match.away}</div>
            <div className="text-xs text-text-muted mt-1">{formLabel[awayForm]}</div>
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="glass-card rounded-2xl border border-surface-600/50 p-5">
        <h3 className="text-sm font-bold text-text-primary mb-4">Comparação de Estatísticas</h3>
        <div className="space-y-4">
          <StatBar label="Gols/Jogo" home={3} away={2} />
          <StatBar label="Chutes/Jogo" home={14} away={11} />
          <StatBar label="Interceptações/Jogo" home={10} away={12} />
        </div>
      </div>

      {/* Expected Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl border border-surface-600/50 p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">{match.home} — xG</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-surface-800/50 rounded-lg">
              <div className="text-2xl font-bold text-accent-300">{homeExpected.expectedGoalsFor}</div>
              <div className="text-[10px] text-text-muted">xG Pró</div>
            </div>
            <div className="text-center p-3 bg-surface-800/50 rounded-lg">
              <div className="text-2xl font-bold text-danger-400">{homeExpected.expectedGoalsAgainst}</div>
              <div className="text-[10px] text-text-muted">xG Contra</div>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-3">{homeStyle}</p>
        </div>

        <div className="glass-card rounded-2xl border border-surface-600/50 p-5">
          <h3 className="text-sm font-bold text-text-primary mb-3">{match.away} — xG</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-surface-800/50 rounded-lg">
              <div className="text-2xl font-bold text-accent-300">{awayExpected.expectedGoalsFor}</div>
              <div className="text-[10px] text-text-muted">xG Pró</div>
            </div>
            <div className="text-center p-3 bg-surface-800/50 rounded-lg">
              <div className="text-2xl font-bold text-danger-400">{awayExpected.expectedGoalsAgainst}</div>
              <div className="text-[10px] text-text-muted">xG Contra</div>
            </div>
          </div>
          <p className="text-xs text-text-secondary mt-3">{awayStyle}</p>
        </div>
      </div>

      {/* H2H */}
      <div className="glass-card rounded-2xl border border-surface-600/50 p-5">
        <h3 className="text-sm font-bold text-text-primary mb-3">Confrontos Diretos</h3>
        <div className="space-y-2">
          {h2h.map((game, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-surface-800/30 rounded-lg">
              <span className="text-xs text-text-muted flex-1">{game.date}</span>
              <span className="text-sm font-semibold text-text-primary">{game.home}</span>
              <span className="text-sm font-mono text-text-primary">{game.homeGoals} - {game.awayGoals}</span>
              <span className="text-sm font-semibold text-text-primary">{game.away}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
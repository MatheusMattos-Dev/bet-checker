import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

function generateCoverage() {
  return Math.floor(Math.random() * 40) + 55;
}

export default function MatchGrid({ onMatchClick }) {
  const { brRounds, brCurrentRound, getTeam } = useApp();
  
  const availableRounds = useMemo(() => {
    const rounds = [];
    if (brCurrentRound > 1) rounds.push(brCurrentRound - 1);
    rounds.push(brCurrentRound);
    if (brCurrentRound < 38) rounds.push(brCurrentRound + 1);
    return rounds;
  }, [brCurrentRound]);

  const [selectedRound, setSelectedRound] = useState(() => {
    return availableRounds.includes(brCurrentRound) ? brCurrentRound : (availableRounds[0] || 1);
  });

  // Keep selected round in sync if it's not valid
  if (!availableRounds.includes(selectedRound) && availableRounds.length > 0) {
    setSelectedRound(availableRounds.includes(brCurrentRound) ? brCurrentRound : availableRounds[0]);
  }

  const currentMatches = brRounds[selectedRound] || [];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {availableRounds.map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRound(r)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              selectedRound === r
                ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30'
                : 'bg-surface-800/50 text-text-secondary border border-surface-700/50 hover:bg-surface-700/50'
            }`}
          >
            Rodada {r}
            {r === brCurrentRound && <span className="text-[10px] text-accent-300 bg-accent-500/10 px-1.5 py-0.5 rounded">PRÓXIMA</span>}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-2xl border border-surface-600/40 overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-600/30">
          <h2 className="text-base font-display font-bold text-text-primary">Rodada {selectedRound}</h2>
          <p className="text-xs text-text-secondary mt-0.5">
            {selectedRound < brCurrentRound ? 'Jogos encerrados' : 'Próximos jogos'}
          </p>
        </div>

        {currentMatches.length > 0 ? (
          <div className="divide-y divide-surface-600/20">
            {currentMatches.map((match, i) => (
              <button
                key={i}
                onClick={() => onMatchClick(match)}
                className="w-full px-5 py-4 flex items-center gap-4 hover:bg-surface-700/20 transition-colors group"
              >
                <div className="flex-1 text-right min-w-0 flex items-center justify-end gap-3">
                  <div className="text-sm font-semibold text-text-primary truncate group-hover:text-accent-300 transition-colors">{match.home}</div>
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    {getTeam(match.home)?.logo_url ? <img src={getTeam(match.home).logo_url} alt={match.home} className="w-full h-full object-contain" /> : <span className="text-sm">⚽</span>}
                  </div>
                </div>

                {match.homeGoals !== null ? (
                  <div className="flex items-center gap-2 px-3">
                    <span className="text-lg font-bold font-display text-text-primary">{match.homeGoals}</span>
                    <span className="text-xs text-text-muted">x</span>
                    <span className="text-lg font-bold font-display text-text-primary">{match.awayGoals}</span>
                  </div>
                ) : (
                  <div className="px-3">
                    <span className="text-xs text-text-muted">{match.date}</span>
                  </div>
                )}

                <div className="flex-1 min-w-0 flex items-center justify-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    {getTeam(match.away)?.logo_url ? <img src={getTeam(match.away).logo_url} alt={match.away} className="w-full h-full object-contain" /> : <span className="text-sm">⚽</span>}
                  </div>
                  <div className="text-sm font-semibold text-text-primary truncate group-hover:text-accent-300 transition-colors">{match.away}</div>
                </div>

                <div className="w-16">
                  <div className="w-full h-1.5 bg-surface-600 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      style={{ width: `${generateCoverage()}%` }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center text-sm text-text-muted">
            Aguardando tabela oficial de jogos para esta rodada.
          </div>
        )}
      </div>
    </div>
  );
}
import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';

function generateMockBoloes() {
  const boloes = [];
  for (let i = 0; i < 80; i++) {
    boloes.push({
      id: i + 1,
      name: `Bolão #${i + 1}`,
      coverage: Math.floor(Math.random() * 50) + 40,
      invested: Math.floor(Math.random() * 5000) + 500,
      prediction: Math.random() > 0.5 ? 'C' : Math.random() > 0.5 ? 'E' : 'F',
    });
  }
  return boloes;
}

export default function MatchDrawer({ match, onClose }) {
  const { getTeam, brPlayers } = useApp();
  const boloes = useMemo(() => generateMockBoloes(), []);

  const coverageStats = useMemo(() => {
    const casa = boloes.filter((b) => b.prediction === 'C').length;
    const empate = boloes.filter((b) => b.prediction === 'E').length;
    const fora = boloes.filter((b) => b.prediction === 'F').length;
    return {
      casa: Math.round((casa / boloes.length) * 100),
      empate: Math.round((empate / boloes.length) * 100),
      fora: Math.round((fora / boloes.length) * 100),
    };
  }, [boloes]);

  const topShooters = useMemo(() => {
    return brPlayers
      .filter((p) => p.team === match.home || p.team === match.away)
      .filter((p) => p.appearances > 0 && p.shotsOnTarget > 0)
      .map((p) => ({
        ...p,
        avgShotsTotal: (p.shots || 0) / p.appearances,
        avgShotsOnTarget: p.shotsOnTarget / p.appearances
      }))
      .sort((a, b) => b.shotsOnTarget - a.shotsOnTarget)
      .slice(0, 5);
  }, [brPlayers, match.home, match.away]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-surface-900 border-l border-surface-600/50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 glass-card border-b border-surface-600/50 px-5 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-display font-bold text-text-primary">Detalhes do Confronto</h3>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-surface-700/50 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">✕</button>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-surface-600/50">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {getTeam(match.home)?.logo_url ? <img src={getTeam(match.home).logo_url} alt={match.home} className="w-full h-full object-contain" /> : <span className="text-lg">⚽</span>}
              </div>
              <div className="text-sm font-semibold text-text-primary">{match.home}</div>
            </div>
            {match.homeGoals !== null ? (
              <div className="flex items-center gap-2 px-3">
                <span className="text-xl font-bold font-display text-text-primary">{match.homeGoals}</span>
                <span className="text-xs text-text-muted">x</span>
                <span className="text-xl font-bold font-display text-text-primary">{match.awayGoals}</span>
              </div>
            ) : (
              <div className="px-3">
                <span className="text-xs text-text-muted">{match.date}</span>
              </div>
            )}
            <div className="flex-1 flex items-center justify-end gap-2">
              <div className="text-sm font-semibold text-text-primary">{match.away}</div>
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {getTeam(match.away)?.logo_url ? <img src={getTeam(match.away).logo_url} alt={match.away} className="w-full h-full object-contain" /> : <span className="text-lg">⚽</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-surface-600/50">
          <h4 className="text-xs font-semibold text-text-secondary mb-3">Distribuição de Palpites</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-primary">Casa ({match.home})</span>
                <span className="text-accent-300 font-mono">{coverageStats.casa}%</span>
              </div>
              <div className="w-full h-2 bg-surface-600 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-accent-500" style={{ width: `${coverageStats.casa}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-primary">Empate</span>
                <span className="text-gold-400 font-mono">{coverageStats.empate}%</span>
              </div>
              <div className="w-full h-2 bg-surface-600 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gold-500" style={{ width: `${coverageStats.empate}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-primary">Fora ({match.away})</span>
                <span className="text-danger-400 font-mono">{coverageStats.fora}%</span>
              </div>
              <div className="w-full h-2 bg-surface-600 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-danger-500" style={{ width: `${coverageStats.fora}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4">
          <h4 className="text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wider">Top Finalizadores no Alvo</h4>
          <div className="space-y-2">
            {topShooters.length > 0 ? (
              topShooters.map((player, idx) => (
                <div key={player.id} className="flex items-center gap-3 p-3 bg-surface-800/50 rounded-xl border border-surface-600/30">
                  <span className={`w-5 text-center text-xs font-bold ${idx < 3 ? 'text-accent-300' : 'text-text-muted'}`}>{idx + 1}</span>
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    {getTeam(player.team)?.logo_url ? (
                      <img src={getTeam(player.team).logo_url} alt={player.team} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-sm">⚽</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-primary truncate">{player.name}</div>
                    <div className="text-[10px] text-text-muted truncate">{player.position}</div>
                  </div>
                  <div className="text-right flex flex-col items-end justify-center">
                    <div className="text-xl font-bold font-display text-accent-300">{player.shotsOnTarget}</div>
                    <div className={`text-[10px] mt-0.5 ${player.avgShotsOnTarget > 1.0 ? 'text-gold-400 font-bold' : 'text-text-muted'}`}>
                      Média: {player.avgShotsOnTarget.toFixed(2)} / jogo
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-text-muted p-4 text-center glass-card rounded-xl">Sem dados de finalizações suficientes.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
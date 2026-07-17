import { useState, useMemo } from 'react';
import { getPlayers, getTopPlayers, getStatCategories, getPlayersByTeam } from '../../data/world-cup';

export default function WorldCupPlayers() {
  const [stat, setStat] = useState('goals');
  const [teamFilter, setTeamFilter] = useState('');
  const categories = getStatCategories();
  const allPlayers = getPlayers();
  const teams = [...new Set(allPlayers.map(p => p.team))];

  const playersWithAvg = useMemo(() => {
    return allPlayers.map(p => ({
      ...p,
      shotsOnTargetPerGame: p.minutesPlayed > 0
        ? parseFloat(((p.shotsOnTarget / (p.minutesPlayed / 90)).toFixed(2)))
        : 0,
    }));
  }, [allPlayers]);

  const filtered = teamFilter
    ? playersWithAvg.filter(p => p.team === teamFilter)
    : playersWithAvg;

  const sorted = [...filtered].sort((a, b) => {
    if (stat === 'shotsOnTargetPerGame') return b[stat] - a[stat];
    return b[stat] - a[stat];
  });
  const top15 = sorted.slice(0, 15);

  const cat = categories[stat] || { label: 'Média Chutes ao Gol/Jogo', icon: '🎯' };

  return (
    <div>
      {/* Team filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setTeamFilter('')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            !teamFilter ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30' : 'bg-surface-700/50 text-text-muted border border-transparent hover:text-text-secondary'
          }`}
        >
          Todos
        </button>
        {teams.map((t) => (
          <button
            key={t}
            onClick={() => setTeamFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              teamFilter === t ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30' : 'bg-surface-700/50 text-text-muted border border-transparent hover:text-text-secondary'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Stat categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(categories).map(([key, c]) => (
          <button
            key={key}
            onClick={() => setStat(key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              stat === key
                ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30'
                : 'bg-surface-700/50 text-text-muted border border-transparent hover:text-text-secondary'
            }`}
          >
            <span className="mr-1">{c.icon}</span> {c.label}
          </button>
        ))}
        <button
          onClick={() => setStat('shotsOnTargetPerGame')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            stat === 'shotsOnTargetPerGame'
              ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30'
              : 'bg-surface-700/50 text-text-muted border border-transparent hover:text-text-secondary'
          }`}
        >
          <span className="mr-1">🎯</span> Média Chutes ao Gol/Jogo
        </button>
      </div>

      {/* Top 15 */}
      <div className="bg-surface-800 rounded-xl border border-surface-600/50 overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-surface-600/50 bg-surface-700/30">
          <h3 className="font-display font-bold text-text-primary text-sm">
            Top 15 — {cat.icon} {cat.label}
          </h3>
        </div>
        <div className="divide-y divide-surface-600/30">
          {top15.map((player, i) => (
            <div
              key={player.id}
              className={`flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-700/30 ${
                i < 3 ? 'bg-gold-500/5' : ''
              }`}
            >
              <div className={`w-6 text-center font-bold text-sm ${
                i === 0 ? 'text-gold-400' : i === 1 ? 'text-text-secondary' : i === 2 ? 'text-amber-600' : 'text-text-muted'
              }`}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">{player.name}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-surface-700 text-text-muted font-mono">{player.number}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span>{player.team}</span>
                  <span>•</span>
                  <span>{player.position}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-lg font-mono font-bold ${
                  i === 0 ? 'text-gold-400' : 'text-text-primary'
                }`}>
                  {player[stat]}
                </span>
                <p className="text-[10px] text-text-muted">{cat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full table */}
      <div className="bg-surface-800 rounded-xl border border-surface-600/50 overflow-hidden">
        <div className="px-5 py-3 border-b border-surface-600/50 bg-surface-700/30">
          <h3 className="font-display font-bold text-text-primary text-sm">
            Todos os Jogadores — {cat.icon} {cat.label}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600/30 text-left text-xs text-text-muted">
                <th className="px-4 py-2 font-medium">#</th>
                <th className="px-4 py-2 font-medium">Jogador</th>
                <th className="px-4 py-2 font-medium">Time</th>
                <th className="px-4 py-2 font-medium">Posição</th>
                <th className="px-4 py-2 font-medium text-right">Gols</th>
                <th className="px-4 py-2 font-medium text-right">Assist.</th>
                <th className="px-4 py-2 font-medium text-right">Chutes</th>
                <th className="px-4 py-2 font-medium text-right">Desarmes</th>
                <th className="px-4 py-2 font-medium text-right">Intercept.</th>
                <th className="px-4 py-2 font-medium text-right">Duelos</th>
                <th className="px-4 py-2 font-medium text-right">Min</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-600/30">
              {sorted.map((player, i) => (
                <tr key={player.id} className="hover:bg-surface-700/30 transition-colors">
                  <td className="px-4 py-2 text-text-muted">{i + 1}</td>
                  <td className="px-4 py-2">
                    <span className="font-medium text-text-primary">{player.name}</span>
                    <span className="text-xs text-text-muted ml-1 font-mono">#{player.number}</span>
                  </td>
                  <td className="px-4 py-2 text-text-secondary">{player.team}</td>
                  <td className="px-4 py-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-700 text-text-muted">{player.position}</span>
                  </td>
                  <td className="px-4 py-2 text-right font-medium text-accent-300">{player.goals}</td>
                  <td className="px-4 py-2 text-right font-medium text-info-400">{player.assists}</td>
                  <td className="px-4 py-2 text-right text-text-secondary">{player.shots}</td>
                  <td className="px-4 py-2 text-right text-text-secondary">{player.tackles}</td>
                  <td className="px-4 py-2 text-right text-text-secondary">{player.interceptions}</td>
                  <td className="px-4 py-2 text-right text-text-secondary">{player.duelsWon}</td>
                  <td className="px-4 py-2 text-right text-text-muted">{player.minutesPlayed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
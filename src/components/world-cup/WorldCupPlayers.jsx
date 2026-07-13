import { useState, useMemo } from 'react';
import { getPlayers, getTopPlayers, getStatCategories, getPlayersByTeam } from '../../data/world-cup';

export default function WorldCupPlayers() {
  const [stat, setStat] = useState('goals');
  const [teamFilter, setTeamFilter] = useState('');
  const categories = getStatCategories();
  const allPlayers = getPlayers();
  const teams = [...new Set(allPlayers.map(p => p.team))];

  // Calculate shotsOnTarget per game for each player
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
      {/* Filtro por time */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setTeamFilter('')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            !teamFilter ? 'bg-[#d4a017] text-dark-900' : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          Todos
        </button>
        {teams.map((t) => (
          <button
            key={t}
            onClick={() => setTeamFilter(t)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              teamFilter === t ? 'bg-[#d4a017] text-dark-900' : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Categorias de estatísticas */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(categories).map(([key, c]) => (
          <button
            key={key}
            onClick={() => setStat(key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              stat === key
                ? 'bg-[#d4a017] text-dark-900'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }`}
          >
            <span className="mr-1">{c.icon}</span> {c.label}
          </button>
        ))}
        <button
          onClick={() => setStat('shotsOnTargetPerGame')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            stat === 'shotsOnTargetPerGame'
              ? 'bg-[#d4a017] text-dark-900'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
          }`}
        >
          <span className="mr-1">🎯</span> Média Chutes ao Gol/Jogo
        </button>
      </div>

      {/* Top 15 */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-[#1f3a3a] to-[#2a4a4a] px-4 py-3 border-b border-[#d4a017]/30">
          <h3 className="font-bold text-white">
            Top 15 — {cat.icon} {cat.label}
          </h3>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
          {top15.map((player, i) => (
            <div
              key={player.id}
              className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30 ${
                i < 3 ? 'bg-[#d4a017]/5 dark:bg-[#d4a017]/10' : ''
              }`}
            >
              <div className={`w-6 text-center font-bold text-sm ${
                i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-amber-600' : 'text-gray-500'
              }`}>
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{player.name}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-gray-400">{player.number}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{player.team}</span>
                  <span>•</span>
                  <span>{player.position}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-lg font-bold ${
                  i === 0 ? 'text-[#d4a017]' : 'text-gray-800 dark:text-gray-200'
                }`}>
                  {player[stat]}
                </span>
                <p className="text-xs text-gray-400">{cat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela completa */}
      <div className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
        <div className="bg-gradient-to-r from-[#1f3a3a] to-[#2a4a4a] px-4 py-3 border-b border-[#d4a017]/30">
          <h3 className="font-bold text-white">
            Todos os Jogadores — {cat.icon} {cat.label}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700/50 text-left text-xs text-gray-400">
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
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {sorted.map((player, i) => (
                <tr key={player.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-2 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-2">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{player.name}</span>
                    <span className="text-xs text-gray-400 ml-1">#{player.number}</span>
                  </td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{player.team}</td>
                  <td className="px-4 py-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">{player.position}</span>
                  </td>
                  <td className="px-4 py-2 text-right font-medium text-green-500">{player.goals}</td>
                  <td className="px-4 py-2 text-right font-medium text-blue-500">{player.assists}</td>
                  <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-300">{player.shots}</td>
                  <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-300">{player.tackles}</td>
                  <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-300">{player.interceptions}</td>
                  <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-300">{player.duelsWon}</td>
                  <td className="px-4 py-2 text-right text-gray-500">{player.minutesPlayed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

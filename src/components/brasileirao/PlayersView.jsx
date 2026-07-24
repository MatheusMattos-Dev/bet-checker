import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { IconBall, IconTarget, IconJersey, IconGlobe } from '../icons';

const categories = [
  { id: 'goals', label: 'Gols', stat: 'goals', icon: IconBall },
  { id: 'assists', label: 'Assistências', stat: 'assists', icon: IconTarget },
  { id: 'shots', label: 'Chutes', stat: 'shots', icon: IconJersey },
];

function rankBadge(rank) {
  if (rank === 1) return 'bg-gold-100 text-gold-700';
  if (rank === 2) return 'bg-gray-200 text-ink-600';
  if (rank === 3) return 'bg-red-100 text-red-700';
  if (rank <= 5) return 'bg-green-100 text-green-700';
  return 'bg-gray-100 text-ink-400';
}

function PlayerRow({ player, rank, stat }) {
  const { getTeam } = useApp();
  const teamData = getTeam(player.team);
  const isTop5 = rank <= 5;
  const average = player.appearances > 0 ? (player[stat] / player.appearances).toFixed(2) : '0.00';

  return (
    <tr className={`cursor-pointer transition-colors hover:bg-gray-50 group ${isTop5 ? 'bg-gold-100/15' : ''}`}>
      <td className="px-4 py-3">
        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold font-display ${rankBadge(rank)}`}>
          {rank}
        </div>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            {teamData?.logo_url ? (
              <img src={teamData.logo_url} alt={player.team} className="w-full h-full object-contain" />
            ) : (
              <IconBall className="w-3.5 h-3.5 text-gray-300" />
            )}
          </div>
          <div>
            <span className="text-sm font-semibold text-ink-900 group-hover:text-green-600 transition-colors">{player.name}</span>
            <div className="text-[10px] text-ink-400">{player.team} • {player.position}</div>
          </div>
        </div>
      </td>
      <td className="px-2 py-3 text-center text-xs text-ink-600 font-mono">{player.appearances}</td>
      <td className="px-3 py-3 text-center">
        <span className="text-sm font-bold font-display text-ink-900">{player[stat]}</span>
      </td>
      <td className="px-4 py-3 text-right">
        <span className={`text-xs font-mono ${parseFloat(average) > 1.0 ? 'text-gold-700 font-bold' : 'text-ink-400'}`}>
          {average}/jogo
        </span>
      </td>
    </tr>
  );
}

export default function PlayersView() {
  const { brTopScorers, brTopAssists, brPlayers } = useApp();
  const [active, setActive] = useState('goals');
  const [teamFilter, setTeamFilter] = useState('');

  const allTeams = useMemo(() => [...new Set(brPlayers.map((p) => p.team))], [brPlayers]);
  const activeCat = categories.find((c) => c.id === active);

  const filteredPlayers = useMemo(() => {
    let list = brPlayers;
    if (teamFilter) list = list.filter((p) => p.team === teamFilter);
    const stat = activeCat?.stat || 'goals';
    return [...list].sort((a, b) => b[stat] - a[stat]);
  }, [brPlayers, teamFilter, active]);

  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all whitespace-nowrap ${
              active === cat.id
                ? 'bg-green-500 text-white'
                : 'card text-ink-600 hover:bg-gray-50'
            }`}
          >
            <cat.icon className="w-4 h-4" />
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Team Filter */}
      <div className="relative w-full sm:w-64 mb-6">
        <IconGlobe className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="appearance-none w-full bg-paper border border-gray-200 rounded-md pl-10 pr-4 py-2.5 text-sm font-medium text-ink-900 hover:border-gray-300 focus:outline-none focus:border-green-500 transition-all cursor-pointer shadow-sm"
        >
          <option value="">Todos os times</option>
          {allTeams.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-600">
          <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      {/* Player Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-ink-400 border-b border-gray-100">
                <th className="px-4 py-3 text-left font-semibold w-8">#</th>
                <th className="px-3 py-3 text-left font-semibold">Jogador</th>
                <th className="px-2 py-3 text-center font-semibold w-8">P</th>
                <th className="px-3 py-3 text-center font-semibold w-12">{activeCat?.label}</th>
                <th className="px-4 py-3 text-right font-semibold w-20">Média</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPlayers.slice(0, 20).map((player, i) => (
                <PlayerRow key={player.id} player={player} rank={i + 1} stat={activeCat?.stat} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

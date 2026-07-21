import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

const categories = [
  { id: 'goals', label: 'Gols', stat: 'goals', icon: '⚽' },
  { id: 'assists', label: 'Assistências', stat: 'assists', icon: '🎯' },
  { id: 'shots', label: 'Chutes', stat: 'shots', icon: '👟' },
];

function PlayerCard({ player, rank, stat }) {
  const { getTeam } = useApp();
  const teamData = getTeam(player.team);
  const isTop5 = rank <= 5;
  const average = player.appearances > 0 ? (player[stat] / player.appearances).toFixed(2) : '0.00';

  return (
    <div className={`glass-card rounded-xl border p-4 ${isTop5 ? 'border-accent-500/30 bg-accent-500/[0.02]' : 'border-surface-600/50'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-display ${
          rank === 1 ? 'bg-gold-500/20 text-gold-400' :
          rank === 2 ? 'bg-surface-400/20 text-text-primary' :
          rank === 3 ? 'bg-orange-600/20 text-orange-500' :
          rank === 4 ? 'bg-info-500/20 text-info-400' :
          rank === 5 ? 'bg-accent-500/20 text-accent-400' :
          'bg-surface-700/50 text-text-muted'
        }`}>
          {rank}
        </div>
        <div className="w-8 h-8 flex items-center justify-center shrink-0 mx-1">
          {teamData?.logo_url ? (
            <img src={teamData.logo_url} alt={player.team} className="w-full h-full object-contain" />
          ) : (
            <span className="text-sm">⚽</span>
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-text-primary">{player.name}</div>
          <div className="text-[10px] text-text-muted">{player.team} • {player.position}</div>
        </div>
        <div className="text-right flex flex-col items-end justify-center">
          <div className="text-lg font-bold font-display text-accent-300">{player[stat]}</div>
          <div className={`text-[10px] mt-0.5 ${parseFloat(average) > 1.0 ? 'text-gold-400 font-bold' : 'text-text-muted'}`}>
            Média: {average} / jogo
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlayersView() {
  const { brTopScorers, brTopAssists, brPlayers } = useApp();
  const [active, setActive] = useState('goals');
  const [teamFilter, setTeamFilter] = useState('');

  const allTeams = useMemo(() => [...new Set(brPlayers.map((p) => p.team))], [brPlayers]);

  const filteredPlayers = useMemo(() => {
    let list = brPlayers;
    if (teamFilter) list = list.filter((p) => p.team === teamFilter);
    const stat = categories.find((c) => c.id === active)?.stat || 'goals';
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              active === cat.id
                ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30'
                : 'bg-surface-800/50 text-text-secondary border border-surface-700/50 hover:bg-surface-700/50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Team Filter */}
      <select
        value={teamFilter}
        onChange={(e) => setTeamFilter(e.target.value)}
        className="bg-surface-800/50 border border-surface-600/50 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-500/50"
      >
        <option value="">Todos os times</option>
        {allTeams.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {/* Player List */}
      <div className="space-y-2">
        {filteredPlayers.slice(0, 20).map((player, i) => (
          <PlayerCard key={player.id} player={player} rank={i + 1} stat={categories.find((c) => c.id === active)?.stat} />
        ))}
      </div>
    </div>
  );
}
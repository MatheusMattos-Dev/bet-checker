import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';

function PrecisionRow({ player, rank, type }) {
  const { getTeam } = useApp();
  const isVolume = type === 'volume';
  const isTop5 = rank <= 5;
  const averageShots = player.appearances > 0 ? (player.shotsOnTarget / player.appearances).toFixed(2) : '0.00';
  const teamData = getTeam(player.team);
  
  return (
    <tr className={`cursor-pointer transition-colors hover:bg-surface-700/20 group ${isTop5 ? 'bg-accent-500/[0.03]' : ''}`}>
      <td className="px-4 py-3">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-display ${
          rank === 1 ? 'bg-gold-500/15 text-gold-400' :
          rank === 2 ? 'bg-white/20 text-white' :
          rank === 3 ? 'bg-orange-600/15 text-orange-500' :
          rank === 4 ? 'bg-info-500/15 text-info-400' :
          rank === 5 ? 'bg-accent-500/15 text-accent-300' :
          'bg-surface-700/50 text-text-muted'
        }`}>
          {rank}
        </div>
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            {teamData?.logo_url ? (
              <img src={teamData.logo_url} alt={player.team} className="w-full h-full object-contain" />
            ) : (
              <span className="text-base">⚽</span>
            )}
          </div>
          <div>
            <span className="text-sm font-semibold text-text-primary group-hover:text-accent-300 transition-colors">{player.name}</span>
            <div className="text-[10px] text-text-muted">{player.team} • {player.position}</div>
          </div>
        </div>
      </td>
      <td className="px-2 py-3 text-center text-xs text-text-secondary font-mono">{player.appearances}</td>
      <td className="px-3 py-3 text-center">
        <span className="text-sm font-bold font-display text-text-primary">{player.shotsOnTarget}</span>
      </td>
      <td className="px-4 py-3 text-right">
        <span className={`text-xs font-mono ${parseFloat(averageShots) > 1.0 ? 'text-gold-400 font-bold' : 'text-text-muted'}`}>
          {averageShots}/jogo
        </span>
      </td>
    </tr>
  );
}

export default function PrecisionView() {
  const { brPlayers } = useApp();
  const [teamFilter, setTeamFilter] = useState('');

  const allTeams = useMemo(() => [...new Set(brPlayers.map((p) => p.team))], [brPlayers]);

  const volumeRank = useMemo(() => {
    let list = brPlayers;
    if (teamFilter) list = list.filter((p) => p.team === teamFilter);
    
    return list
      .filter((p) => p.shotsOnTarget > 0)
      .sort((a, b) => b.shotsOnTarget - a.shotsOnTarget)
      .slice(0, 10);
  }, [brPlayers, teamFilter]);

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl border border-surface-600/40 p-5 bg-gradient-to-br from-surface-800 to-surface-900">
        <h2 className="text-xl font-bold text-text-primary mb-2">Chutes no Alvo</h2>
        <p className="text-sm text-text-secondary">
          Ranking dos jogadores mais perigosos do campeonato, focando exclusivamente nas finalizações que acertam o gol e dão trabalho ao goleiro.
        </p>
      </div>

      {/* Team Filter */}
      <div className="relative w-full sm:w-64 mb-6">
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="appearance-none w-full bg-surface-800/80 backdrop-blur-md border border-surface-600/50 rounded-xl px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-700/80 hover:border-surface-500/80 focus:outline-none focus:border-accent-500/80 focus:ring-1 focus:ring-accent-500/50 transition-all cursor-pointer shadow-sm"
        >
          <option value="">🌍 Todos os times</option>
          {allTeams.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
          <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      <div className="glass-card rounded-2xl border border-surface-600/40 overflow-hidden">
        <div className="px-5 sm:px-6 py-4 border-b border-surface-600/30">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-display font-bold text-text-primary">Mais Chutes no Alvo</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-text-muted border-b border-surface-600/30">
                <th className="px-4 py-3 text-left font-semibold w-8">#</th>
                <th className="px-3 py-3 text-left font-semibold">Jogador</th>
                <th className="px-2 py-3 text-center font-semibold w-8">P</th>
                <th className="px-3 py-3 text-center font-semibold w-12">CA</th>
                <th className="px-4 py-3 text-right font-semibold w-20">Média</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-600/20">
              {volumeRank.map((player, i) => (
                <PrecisionRow key={`vol-${player.id}`} player={player} rank={i + 1} type="volume" />
              ))}
            </tbody>
          </table>
        </div>

        {volumeRank.length === 0 && <div className="text-sm text-text-muted p-4 text-center">Sem dados suficientes.</div>}
      </div>
    </div>
  );
}

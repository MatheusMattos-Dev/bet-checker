import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';

function PrecisionCard({ player, rank, type }) {
  const { getTeam } = useApp();
  const isVolume = type === 'volume';
  const averageShots = player.appearances > 0 ? (player.shotsOnTarget / player.appearances).toFixed(2) : '0.00';
  const teamData = getTeam(player.team);
  
  return (
    <div className={`glass-card rounded-xl border p-4 ${rank <= 5 ? 'border-accent-500/30 bg-accent-500/[0.02]' : 'border-surface-600/50'}`}>
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
        <div className="text-right">
          {isVolume ? (
            <>
              <div className="text-lg font-bold font-display text-accent-300">{player.shotsOnTarget}</div>
              <div className={`text-[10px] mt-0.5 ${parseFloat(averageShots) > 1.0 ? 'text-gold-400 font-bold' : 'text-text-muted'}`}>Média: {averageShots} / jogo</div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function PrecisionView() {
  const { brPlayers } = useApp();

  const volumeRank = useMemo(() => {
    return [...brPlayers]
      .filter((p) => p.shotsOnTarget > 0)
      .sort((a, b) => b.shotsOnTarget - a.shotsOnTarget)
      .slice(0, 10);
  }, [brPlayers]);

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl border border-surface-600/50 p-5 bg-gradient-to-br from-surface-800 to-surface-900">
        <h2 className="text-xl font-bold text-text-primary mb-2">Chutes no Alvo</h2>
        <p className="text-sm text-text-secondary">
          Ranking dos jogadores mais perigosos do campeonato, focando exclusivamente nas finalizações que acertam o gol e dão trabalho ao goleiro.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 px-2">
          <span className="text-2xl">🎯</span>
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider">Mais Chutes no Alvo</h3>
        </div>
        <div className="space-y-2">
          {volumeRank.map((player, i) => (
            <PrecisionCard key={`vol-${player.id}`} player={player} rank={i + 1} type="volume" />
          ))}
          {volumeRank.length === 0 && <div className="text-sm text-text-muted p-4 text-center glass-card rounded-xl">Sem dados suficientes.</div>}
        </div>
      </div>
    </div>
  );
}

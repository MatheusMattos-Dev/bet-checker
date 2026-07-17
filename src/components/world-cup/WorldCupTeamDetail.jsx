import { useApp } from '../../context/AppContext';
import { getPlayersByTeam } from '../../data/world-cup';

export default function WorldCupTeamDetail({ team }) {
  const { navigateWCView, getWCEligibleGoals, getWCTeamForm, getWCTeamStyle, wcTeams } = useApp();
  const players = getPlayersByTeam(team.name);

  const form = getWCTeamForm(team);
  const style = getWCTeamStyle(team);

  const formColors = { W: 'bg-accent-500', D: 'bg-gold-500', L: 'bg-danger-500' };
  const formLabels = { W: 'V', D: 'E', L: 'D' };

  const opponent = wcTeams.find(t => t.id !== team.id) || wcTeams[0];
  const expectedGoals = getWCEligibleGoals(team, opponent);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Team Header */}
      <div className="relative bg-surface-800 rounded-2xl p-6 mb-6 overflow-hidden border border-surface-600/50">
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl -translate-y-24 translate-x-24"></div>

        <div className="relative flex items-center gap-4">
          <button
            onClick={() => navigateWCView('teams')}
            className="text-text-secondary hover:text-text-primary transition-colors text-sm flex items-center gap-1"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar
          </button>
          <span className="text-5xl">{team.flag}</span>
          <div>
            <h1 className="text-2xl font-display font-bold text-text-primary">{team.name}</h1>
            <p className="text-sm text-accent-300">{team.status}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-800 rounded-xl p-4 border border-surface-600/50 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gold-500/5 rounded-full blur-xl -translate-y-8 translate-x-8"></div>
          <p className="text-2xl font-mono font-bold text-gold-400">{team.points}</p>
          <p className="text-xs text-text-muted uppercase tracking-wider">Pontos</p>
        </div>
        <div className="bg-surface-800 rounded-xl p-4 border border-surface-600/50 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-accent-500/5 rounded-full blur-xl -translate-y-8 translate-x-8"></div>
          <p className="text-2xl font-mono font-bold text-accent-300">{team.won}</p>
          <p className="text-xs text-text-muted uppercase tracking-wider">Vitórias</p>
        </div>
        <div className="bg-surface-800 rounded-xl p-4 border border-surface-600/50 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-info-500/5 rounded-full blur-xl -translate-y-8 translate-x-8"></div>
          <p className="text-2xl font-mono font-bold text-info-400">{team.goalsFor}</p>
          <p className="text-xs text-text-muted uppercase tracking-wider">Gols Marcados</p>
        </div>
        <div className="bg-surface-800 rounded-xl p-4 border border-surface-600/50 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-danger-500/5 rounded-full blur-xl -translate-y-8 translate-x-8"></div>
          <p className="text-2xl font-mono font-bold text-danger-400">{team.goalsAgainst}</p>
          <p className="text-xs text-text-muted uppercase tracking-wider">Gols Sofridos</p>
        </div>
      </div>

      {/* Attack and Defense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50">
          <h3 className="text-sm font-display font-semibold text-text-primary mb-3">⚔️ Ataque</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Chutes</span>
              <span className="font-mono font-bold text-text-primary">{team.shots}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Chutes ao Gol</span>
              <span className="font-mono font-bold text-accent-300">{team.shotsOnTarget}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Assistências</span>
              <span className="font-mono font-bold text-info-400">{team.assists}</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50">
          <h3 className="text-sm font-display font-semibold text-text-primary mb-3">🛡️ Defesa</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Chutes Sofridos</span>
              <span className="font-mono font-bold text-text-primary">{team.shotsConceded}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Desarmes</span>
              <span className="font-mono font-bold text-accent-300">{team.tackles}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Interceptações</span>
              <span className="font-mono font-bold text-info-400">{team.interceptions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50 mb-6">
        <h3 className="text-sm font-display font-semibold text-text-primary mb-3">📈 Forma Recente</h3>
        <div className="flex gap-2 mb-3">
          {form?.split('').map((r, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${formColors[r]}`}>
                {formLabels[r]}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-text-muted">{style}</p>
      </div>

      {/* Last matches */}
      <div className="bg-surface-800 rounded-xl p-5 border border-surface-600/50 mb-6">
        <h3 className="text-sm font-display font-semibold text-text-primary mb-3">📋 Últimos Jogos</h3>
        <div className="space-y-2">
          {team.lastMatches.map((m, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-surface-600/30 last:border-0">
              <div className="flex items-center gap-2">
                <span>{m.flag}</span>
                <span className="font-medium text-text-primary">{m.opponent}</span>
                <span className="text-xs text-text-muted">({m.stage})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-text-primary">{m.gf}-{m.ga}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  m.result === 'W' ? 'bg-accent-500/10 text-accent-300' :
                  m.result === 'D' ? 'bg-gold-500/10 text-gold-400' :
                  'bg-danger-500/10 text-danger-400'
                }`}>
                  {m.result === 'W' ? 'V' : m.result === 'D' ? 'E' : 'D'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Players */}
      <div className="bg-surface-800 rounded-xl border border-surface-600/50 overflow-hidden">
        <div className="px-5 py-3 border-b border-surface-600/50 bg-surface-700/30">
          <h3 className="font-display font-bold text-text-primary text-sm">Elenco</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600/30 text-left text-xs text-text-muted">
                <th className="px-4 py-2 font-medium">#</th>
                <th className="px-4 py-2 font-medium">Jogador</th>
                <th className="px-4 py-2 font-medium">Posição</th>
                <th className="px-4 py-2 font-medium text-right">Gols</th>
                <th className="px-4 py-2 font-medium text-right">Assist.</th>
                <th className="px-4 py-2 font-medium text-right">Chutes</th>
                <th className="px-4 py-2 font-medium text-right">Min</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-600/30">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-surface-700/30 transition-colors">
                  <td className="px-4 py-2 text-text-muted font-mono">{player.number}</td>
                  <td className="px-4 py-2 font-medium text-text-primary">{player.name}</td>
                  <td className="px-4 py-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-700 text-text-muted">{player.position}</span>
                  </td>
                  <td className="px-4 py-2 text-right font-medium text-accent-300">{player.goals}</td>
                  <td className="px-4 py-2 text-right font-medium text-info-400">{player.assists}</td>
                  <td className="px-4 py-2 text-right text-text-secondary">{player.shots}</td>
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
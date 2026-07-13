import { useApp } from '../../context/AppContext';
import { getPlayersByTeam } from '../../data/world-cup';

export default function WorldCupTeamDetail({ team }) {
  const { navigateWCView, getWCEligibleGoals, getWCTeamForm, getWCTeamStyle, wcTeams } = useApp();
  const players = getPlayersByTeam(team.name);

  const form = getWCTeamForm(team);
  const style = getWCTeamStyle(team);

  const formColors = { W: 'bg-green-500', D: 'bg-yellow-500', L: 'bg-red-500' };
  const formLabels = { W: 'V', D: 'E', L: 'D' };

  // Find a likely opponent for xG calculation
  const opponent = wcTeams.find(t => t.id !== team.id) || wcTeams[0];
  const expectedGoals = getWCEligibleGoals(team, opponent);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Team Header */}
      <div className="bg-gradient-to-r from-[#1f3a3a] to-[#2a4a4a] rounded-xl p-6 shadow-sm border border-[#d4a017]/30 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl">{team.flag}</span>
          <div>
            <h1 className="text-2xl font-bold text-white">{team.name}</h1>
            <p className="text-sm text-[#d4a017]">{team.status}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <p className="text-2xl font-bold text-[#d4a017]">{team.points}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Pontos</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <p className="text-2xl font-bold text-green-500">{team.won}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Vitórias</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <p className="text-2xl font-bold text-[#d4a017]">{team.goalsFor}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Gols Marcados</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <p className="text-2xl font-bold text-red-400">{team.goalsAgainst}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Gols Sofridos</p>
        </div>
      </div>

      {/* Attack & Defense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-[#d4a017] mb-3 flex items-center gap-2">⚔️ Ataque</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Total de Chutes</span><span className="font-bold">{team.shots}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Chutes no Alvo</span><span className="font-bold">{team.shotsOnTarget}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Assistências</span><span className="font-bold">{team.assists}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Gols/Jogo</span><span className="font-bold text-green-500">{(team.goalsFor / team.played).toFixed(2)}</span></div>
          </div>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-[#d4a017] mb-3 flex items-center gap-2">🛡️ Defesa</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Chutes Sofridos</span><span className="font-bold">{team.shotsConceded}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Desarmes</span><span className="font-bold">{team.tackles}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Interceptações</span><span className="font-bold">{team.interceptions}</span></div>
            <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400">Gols Sofridos/Jogo</span><span className="font-bold text-red-400">{(team.goalsAgainst / team.played).toFixed(2)}</span></div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
        <h3 className="font-semibold text-[#d4a017] mb-3">Forma Recente</h3>
        <div className="flex gap-2 mb-3">
          {team.form.split('').map((r, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${formColors[r]}`}>
                {formLabels[r]}
              </div>
            </div>
          ))}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{style}</div>
      </div>

      {/* Last Matches */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
        <h3 className="font-semibold text-[#d4a017] mb-3">Últimos Jogos</h3>
        <div className="space-y-2">
          {team.lastMatches.map((m, i) => (
            <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
              <div className="flex items-center gap-2">
                <span>{m.flag}</span>
                <span className="font-medium">{m.opponent}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${m.result === 'W' ? 'text-green-500' : m.result === 'L' ? 'text-red-400' : 'text-yellow-400'}`}>
                  {m.gf} - {m.ga}
                </span>
                <span className="text-xs text-gray-400">{m.stage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elenco */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
        <h3 className="font-semibold text-[#d4a017] mb-3">👤 Elenco — {team.name}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700/50 text-left text-xs text-gray-400">
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Jogador</th>
                <th className="px-3 py-2 font-medium">Pos.</th>
                <th className="px-3 py-2 font-medium text-right">Gols</th>
                <th className="px-3 py-2 font-medium text-right">Assist.</th>
                <th className="px-3 py-2 font-medium text-right">Chutes</th>
                <th className="px-3 py-2 font-medium text-right">Desarmes</th>
                <th className="px-3 py-2 font-medium text-right">Intercept.</th>
                <th className="px-3 py-2 font-medium text-right">Duelos</th>
                <th className="px-3 py-2 font-medium text-right">Min</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {players.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-3 py-2 text-gray-500">{p.number}</td>
                  <td className="px-3 py-2 font-medium text-gray-800 dark:text-gray-200">{p.name}</td>
                  <td className="px-3 py-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">{p.position}</span>
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-green-500">{p.goals}</td>
                  <td className="px-3 py-2 text-right font-medium text-blue-500">{p.assists}</td>
                  <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">{p.shots}</td>
                  <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">{p.tackles}</td>
                  <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">{p.interceptions}</td>
                  <td className="px-3 py-2 text-right text-gray-600 dark:text-gray-300">{p.duelsWon}</td>
                  <td className="px-3 py-2 text-right text-gray-500">{p.minutesPlayed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={() => navigateWCView('teams')} className="text-[#d4a017] hover:text-[#f0c040] transition-colors font-medium text-sm">
        ← Voltar para Times
      </button>
    </div>
  );
}

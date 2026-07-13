import { useApp } from '../../context/AppContext';

export default function WorldCupMatchDetail({ match }) {
  const { navigateWCView, getWCEligibleGoals, getWCTeamForm, getWCTeamStyle, wcTeams } = useApp();

  const homeTeam = wcTeams.find(t => t.name === match.home);
  const awayTeam = wcTeams.find(t => t.name === match.away);

  if (!homeTeam || !awayTeam) return null;

  const homeForm = getWCTeamForm(homeTeam);
  const awayForm = getWCTeamForm(awayTeam);
  const homeStyle = getWCTeamStyle(homeTeam);
  const awayStyle = getWCTeamStyle(awayTeam);
  const homeExpected = getWCEligibleGoals(homeTeam, awayTeam);
  const awayExpected = getWCEligibleGoals(awayTeam, homeTeam);

  const formColors = { W: 'bg-green-500', D: 'bg-yellow-500', L: 'bg-red-500' };
  const formLabels = { W: 'V', D: 'E', L: 'D' };
  const isPlayed = match.homeGoals !== undefined && match.homeGoals !== null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Match Header */}
      <div className="bg-gradient-to-r from-[#1f3a3a] to-[#2a4a4a] rounded-xl p-6 shadow-sm border border-[#d4a017]/30 mb-6 text-center">
        <p className="text-xs text-[#d4a017] mb-3">{match.round} • {match.date} • {match.venue}</p>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <span className="text-5xl block mb-2">{homeTeam.flag}</span>
            <span className="font-bold text-white text-lg">{homeTeam.name}</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#d4a017]">
              {isPlayed ? `${match.homeGoals} - ${match.awayGoals}` : '? - ?'}
            </div>
            {match.extraTime && <p className="text-xs text-yellow-400 mt-1">Prorrogação</p>}
            {match.penalties && <p className="text-xs text-yellow-400 mt-1">Pênaltis</p>}
          </div>
          <div className="text-center">
            <span className="text-5xl block mb-2">{awayTeam.flag}</span>
            <span className="font-bold text-white text-lg">{awayTeam.name}</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-[#d4a017] mb-3">{homeTeam.flag} {homeTeam.name} — Forma</h3>
          <div className="flex gap-2 mb-3">
            {homeTeam.form.split('').map((r, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${formColors[r]}`}>
                {formLabels[r]}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{homeStyle}</p>
        </div>
        <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-[#d4a017] mb-3">{awayTeam.flag} {awayTeam.name} — Forma</h3>
          <div className="flex gap-2 mb-3">
            {awayTeam.form.split('').map((r, i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${formColors[r]}`}>
                {formLabels[r]}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{awayStyle}</p>
        </div>
      </div>

      {/* Expected Goals */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
        <h3 className="font-semibold text-[#d4a017] mb-3 text-center">🎯 Gols Esperados</h3>
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#d4a017]">{homeExpected.toFixed(2)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{homeTeam.name}</div>
          </div>
          <div className="text-gray-400 text-lg">vs</div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#d4a017]">{awayExpected.toFixed(2)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{awayTeam.name}</div>
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
        <h3 className="font-semibold text-[#d4a017] mb-3 text-center">Comparação de Stats</h3>
        <div className="space-y-3">
          {[
            { label: 'Gols/Jogo', home: (homeTeam.goalsFor / homeTeam.played).toFixed(2), away: (awayTeam.goalsFor / awayTeam.played).toFixed(2) },
            { label: 'Gols Sofridos/Jogo', home: (homeTeam.goalsAgainst / homeTeam.played).toFixed(2), away: (awayTeam.goalsAgainst / awayTeam.played).toFixed(2) },
            { label: 'Chutes', home: homeTeam.shots, away: awayTeam.shots },
            { label: 'Chutes no Alvo', home: homeTeam.shotsOnTarget, away: awayTeam.shotsOnTarget },
            { label: 'Assistências', home: homeTeam.assists, away: awayTeam.assists },
            { label: 'Desarmes', home: homeTeam.tackles, away: awayTeam.tackles },
            { label: 'Interceptações', home: homeTeam.interceptions, away: awayTeam.interceptions },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between text-sm">
              <span className="font-bold text-[#d4a017] w-16 text-right">{stat.home}</span>
              <span className="text-gray-500 dark:text-gray-400 flex-1 text-center">{stat.label}</span>
              <span className="font-bold text-[#d4a017] w-16">{stat.away}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigateWCView('bracket')} className="text-[#d4a017] hover:text-[#f0c040] transition-colors font-medium">
        ← Voltar para Mata-Mata
      </button>
    </div>
  );
}

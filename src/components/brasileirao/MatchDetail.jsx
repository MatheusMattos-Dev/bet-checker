import { useApp } from '../../context/AppContext';
import { getPairColors } from '../../lib/teamColors';
import { IconBall } from '../icons';

function StatBar({ label, home, away }) {
  const total = home + away || 1;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-ink-900 font-semibold">{home}</span>
        <span className="text-ink-400">{label}</span>
        <span className="text-ink-900 font-semibold">{away}</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5 bg-gray-100">
        <div className="h-full rounded-l-full bg-green-500 transition-all" style={{ width: `${(home / total) * 100}%` }} />
        <div className="h-full rounded-r-full bg-red-500 transition-all" style={{ width: `${(away / total) * 100}%` }} />
      </div>
    </div>
  );
}

export default function MatchDetail({ match }) {
  const { getTeam, getH2HTeams, getExpectedGoals, getTeamForm, getTeamStyle } = useApp();

  const h2h = getH2HTeams(match.home, match.away);
  const homeExpected = getExpectedGoals(match.home, match.away);
  const awayExpected = getExpectedGoals(match.away, match.home);
  const homeForm = getTeamForm(match.home);
  const awayForm = getTeamForm(match.away);
  const homeStyle = getTeamStyle(getTeam(match.home));
  const awayStyle = getTeamStyle(getTeam(match.away));
  const { colorA: homeColor, colorB: awayColor } = getPairColors(match.home, match.away);

  const formLabel = { excellent: 'Excelente', good: 'Bom', average: 'Médio', poor: 'Ruim' };

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <div className="card overflow-hidden">
        <div className="flex">
          <span className="h-1.5 flex-1" style={{ backgroundColor: homeColor }} />
          <span className="h-1.5 flex-1" style={{ backgroundColor: awayColor }} />
        </div>
        <div className="p-6 flex items-center justify-between">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center shrink-0 mb-3">
              {getTeam(match.home)?.logo_url ? <img src={getTeam(match.home).logo_url} alt={match.home} className="w-full h-full object-contain" /> : <IconBall className="w-9 h-9 text-gray-300" />}
            </div>
            <div className="text-2xl font-bold font-display text-ink-900">{match.home}</div>
            <div className="text-xs text-ink-400 mt-1">{formLabel[homeForm]}</div>
          </div>
          <div className="px-6">
            {match.homeGoals !== null ? (
              <div className="text-center">
                <div className="text-3xl font-bold font-display text-ink-900">
                  {match.homeGoals} - {match.awayGoals}
                </div>
                <div className="text-xs text-ink-400 mt-1">{match.date}</div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm text-ink-400">vs</div>
                <div className="text-xs text-ink-400 mt-1">{match.date}</div>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center shrink-0 mb-3">
              {getTeam(match.away)?.logo_url ? <img src={getTeam(match.away).logo_url} alt={match.away} className="w-full h-full object-contain" /> : <IconBall className="w-9 h-9 text-gray-300" />}
            </div>
            <div className="text-2xl font-bold font-display text-ink-900">{match.away}</div>
            <div className="text-xs text-ink-400 mt-1">{formLabel[awayForm]}</div>
          </div>
        </div>
      </div>

      {/* Stats Comparison */}
      <div className="card p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-4">Comparação de Estatísticas</h3>
        <div className="space-y-4">
          <StatBar label="Gols/Jogo" home={3} away={2} />
          <StatBar label="Chutes/Jogo" home={14} away={11} />
          <StatBar label="Interceptações/Jogo" home={10} away={12} />
        </div>
      </div>

      {/* Expected Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink-900 mb-3">{match.home} — xG</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold text-green-700">{homeExpected.expectedGoalsFor}</div>
              <div className="text-[10px] text-ink-400">xG Pró</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold text-red-600">{homeExpected.expectedGoalsAgainst}</div>
              <div className="text-[10px] text-ink-400">xG Contra</div>
            </div>
          </div>
          <p className="text-xs text-ink-600 mt-3">{homeStyle}</p>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink-900 mb-3">{match.away} — xG</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold text-green-700">{awayExpected.expectedGoalsFor}</div>
              <div className="text-[10px] text-ink-400">xG Pró</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-md">
              <div className="text-2xl font-bold text-red-600">{awayExpected.expectedGoalsAgainst}</div>
              <div className="text-[10px] text-ink-400">xG Contra</div>
            </div>
          </div>
          <p className="text-xs text-ink-600 mt-3">{awayStyle}</p>
        </div>
      </div>

      {/* H2H */}
      <div className="card p-5">
        <h3 className="text-sm font-bold text-ink-900 mb-3">Confrontos Diretos</h3>
        <div className="space-y-2">
          {h2h.recentMatches?.map((game, i) => (
            <div key={i} className="flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-gray-50 rounded-md group">
              <span className="text-xs text-ink-400 flex-1">{game.date}</span>
              <span className="text-sm font-semibold text-ink-900 group-hover:text-green-600 transition-colors">{game.home}</span>
              <span className="text-sm font-mono text-ink-900">{game.homeGoals} - {game.awayGoals}</span>
              <span className="text-sm font-semibold text-ink-900 group-hover:text-green-600 transition-colors">{game.away}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

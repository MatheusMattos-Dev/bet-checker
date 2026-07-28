import { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import SoccerField from './SoccerField';
import { getPairColors } from '../../lib/teamColors';
import { useRevealed } from '../../lib/useRevealed';
import { IconBall } from '../icons';

function generateMockBoloes() {
  const boloes = [];
  for (let i = 0; i < 80; i++) {
    boloes.push({
      id: i + 1,
      name: `Bolão #${i + 1}`,
      coverage: Math.floor(Math.random() * 50) + 40,
      invested: Math.floor(Math.random() * 5000) + 500,
      prediction: Math.random() > 0.5 ? 'C' : Math.random() > 0.5 ? 'E' : 'F',
    });
  }
  return boloes;
}

export default function MatchDrawer({ match, onClose }) {
  const { getTeam, brPlayers, getExpectedGoals, getTeamForm } = useApp();
  const boloes = useMemo(() => generateMockBoloes(), []);

  const coverageStats = useMemo(() => {
    const casa = boloes.filter((b) => b.prediction === 'C').length;
    const empate = boloes.filter((b) => b.prediction === 'E').length;
    const fora = boloes.filter((b) => b.prediction === 'F').length;
    return {
      casa: Math.round((casa / boloes.length) * 100),
      empate: Math.round((empate / boloes.length) * 100),
      fora: Math.round((fora / boloes.length) * 100),
    };
  }, [boloes]);

  const topShooters = useMemo(() => {
    return brPlayers
      .filter((p) => p.team === match.home || p.team === match.away)
      .filter((p) => p.appearances > 0 && p.shotsOnTarget > 0)
      .map((p) => ({
        ...p,
        avgShotsTotal: (p.shots || 0) / p.appearances,
        avgShotsOnTarget: p.shotsOnTarget / p.appearances
      }))
      .sort((a, b) => b.shotsOnTarget - a.shotsOnTarget)
      .slice(0, 5);
  }, [brPlayers, match.home, match.away]);

  const expectedGoals = useMemo(() => getExpectedGoals(match.home, match.away), [getExpectedGoals, match.home, match.away]);
  const homeForm = useMemo(() => getTeamForm(match.home), [getTeamForm, match.home]);
  const awayForm = useMemo(() => getTeamForm(match.away), [getTeamForm, match.away]);
  const { colorA: homeColor, colorB: awayColor } = getPairColors(match.home, match.away);
  const revealed = useRevealed();

  const formStyle = (result) => (
    result === 'W' ? 'bg-green-100 text-green-700' :
    result === 'L' ? 'bg-red-100 text-red-700' :
    result === 'D' ? 'bg-gold-100 text-gold-700' : 'bg-gray-100 text-ink-400'
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-between" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* LEFT PANEL - Soccer Field (Pinned to left) */}
      <div
        className="relative w-full md:w-1/2 max-w-[800px] bg-gray-50 border-r border-gray-200 shadow-2xl flex flex-col h-full animate-slideInLeft overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b border-gray-100 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-display font-bold text-ink-900 uppercase tracking-wide">Escalações</h3>
        </div>
        <div className="flex-1 relative flex items-center justify-center p-4">
          <SoccerField match={match} />
        </div>
      </div>

      {/* CLOSE BUTTON (Center Top) */}
      <button onClick={onClose} className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-paper flex items-center justify-center text-ink-600 hover:text-white hover:bg-red-500 transition-all border border-gray-200 shadow-lg cursor-pointer">✕</button>

      {/* RIGHT PANEL - Match Details (Pinned to right) */}
      <div
        className="relative w-full md:w-1/2 max-w-[800px] bg-paper border-l border-gray-100 h-full overflow-y-auto shadow-2xl animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-display font-bold text-ink-900 uppercase tracking-wide">Detalhes do Confronto</h3>
          <button onClick={onClose} className="md:hidden w-8 h-8 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-ink-600 hover:text-white hover:bg-red-500 transition-all">✕</button>
        </div>

        <div className="flex">
          <span className="h-1.5 flex-1" style={{ backgroundColor: homeColor }} />
          <span className="h-1.5 flex-1" style={{ backgroundColor: awayColor }} />
        </div>

        <div className="px-6 py-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {getTeam(match.home)?.logo_url ? <img src={getTeam(match.home).logo_url} alt={match.home} className="w-full h-full object-contain" /> : <IconBall className="w-5 h-5 text-gray-300" />}
              </div>
              <div className="text-sm font-semibold text-ink-900">{match.home}</div>
            </div>
            {match.homeGoals !== null ? (
              <div className="flex items-center gap-2 px-3">
                <span className="text-xl font-bold font-display text-ink-900">{match.homeGoals}</span>
                <span className="text-xs text-ink-400">x</span>
                <span className="text-xl font-bold font-display text-ink-900">{match.awayGoals}</span>
              </div>
            ) : (
              <div className="px-3">
                <span className="text-xs text-ink-400">{match.date}</span>
              </div>
            )}
            <div className="flex-1 flex items-center justify-end gap-2">
              <div className="text-sm font-semibold text-ink-900">{match.away}</div>
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                {getTeam(match.away)?.logo_url ? <img src={getTeam(match.away).logo_url} alt={match.away} className="w-full h-full object-contain" /> : <IconBall className="w-5 h-5 text-gray-300" />}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 border-b border-gray-100">
          <h4 className="text-xs font-semibold text-ink-600 mb-4 uppercase tracking-wider">Distribuição de Palpites</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-ink-900 font-medium">Casa ({match.home})</span>
                <span className="text-green-700 font-mono font-bold">{coverageStats.casa}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-green-500 transition-all duration-700 ease-out" style={{ width: `${revealed ? coverageStats.casa : 0}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-ink-900 font-medium">Empate</span>
                <span className="text-gold-700 font-mono font-bold">{coverageStats.empate}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gold-500 transition-all duration-700 ease-out" style={{ width: `${revealed ? coverageStats.empate : 0}%`, transitionDelay: '80ms' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-ink-900 font-medium">Fora ({match.away})</span>
                <span className="text-red-600 font-mono font-bold">{coverageStats.fora}%</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-red-500 transition-all duration-700 ease-out" style={{ width: `${revealed ? coverageStats.fora : 0}%`, transitionDelay: '160ms' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 border-b border-gray-100">
          <h4 className="text-[10px] font-bold text-ink-600 mb-3 uppercase tracking-wider text-center">xG (Gols Esperados)</h4>
          <div className="card p-5 grid grid-cols-[1fr_auto_1fr] items-start gap-3">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-green-700 tabular-nums">{expectedGoals.expectedGoalsFor}</div>
              <div className="text-[10px] text-ink-400 mt-1 truncate">{match.home}</div>
              <div className="flex justify-center gap-1 mt-3">
                {homeForm.map((result, i) => (
                  <div key={`h-${i}`} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${formStyle(result)}`}>
                    {result}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-lg font-bold text-ink-400 pt-2">×</div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-ink-900 tabular-nums">{expectedGoals.expectedGoalsAgainst}</div>
              <div className="text-[10px] text-ink-400 mt-1 truncate">{match.away}</div>
              <div className="flex justify-center gap-1 mt-3">
                {awayForm.map((result, i) => (
                  <div key={`a-${i}`} className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${formStyle(result)}`}>
                    {result}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-5">
          <h4 className="text-xs font-semibold text-ink-600 mb-4 uppercase tracking-wider">Top Finalizadores no Alvo</h4>
          <div className="space-y-2">
            {topShooters.length > 0 ? (
              topShooters.map((player, idx) => (
                <div key={player.id} className="flex items-center gap-3 p-3 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-50 border border-transparent hover:border-gray-100 group">
                  <span className={`w-5 text-center text-xs font-bold ${idx < 3 ? 'text-green-700' : 'text-ink-400'}`}>{idx + 1}</span>
                  <div className="w-8 h-8 flex items-center justify-center shrink-0">
                    {getTeam(player.team)?.logo_url ? (
                      <img src={getTeam(player.team).logo_url} alt={player.team} className="w-full h-full object-contain" />
                    ) : (
                      <IconBall className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-ink-900 group-hover:text-green-600 transition-colors truncate">{player.name}</div>
                    <div className="text-[10px] text-ink-400 truncate">{player.position}</div>
                  </div>
                  <div className="text-right flex flex-col items-end justify-center">
                    <div className="text-2xl font-bold font-display text-ink-900">{player.shotsOnTarget}</div>
                    <div className={`text-[10px] mt-0.5 ${player.avgShotsOnTarget > 1.0 ? 'text-gold-700 font-bold' : 'text-ink-400'}`}>
                      Média: {player.avgShotsOnTarget.toFixed(2)} / jogo
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-ink-400 p-6 text-center card">Sem dados de finalizações suficientes.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getTeamColor } from '../../lib/teamColors';
import { useRevealed } from '../../lib/useRevealed';

export default function ComparativeView() {
  const { brTeams, brRounds, brCurrentRound, brNextRound } = useApp();
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const revealed = useRevealed();

  const currentMatches = useMemo(() => {
    return brRounds[brNextRound] || brRounds[brCurrentRound] || [];
  }, [brRounds, brCurrentRound, brNextRound]);

  useEffect(() => {
    if (!teamA && !teamB) {
      if (currentMatches.length > 0) {
        setTeamA(currentMatches[0].home);
        setTeamB(currentMatches[0].away);
      } else if (brTeams.length >= 2) {
        setTeamA(brTeams[0].name);
        setTeamB(brTeams[1].name);
      }
    }
  }, [brTeams, currentMatches, teamA, teamB]);

  const teamAData = brTeams.find((t) => t.name === teamA);
  const teamBData = brTeams.find((t) => t.name === teamB);

  return (
    <div className="space-y-6">
      {/* Team Comparison */}
      <div className="card p-6">
        <h3 className="text-xl font-display font-bold text-ink-900 uppercase tracking-tight mb-6">Comparar Confronto</h3>

        {currentMatches.length > 0 && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-lg">
            <label className="block text-xs font-bold text-ink-600 uppercase tracking-widest mb-3">Confrontos da Rodada</label>
            <select
              onChange={(e) => {
                if (!e.target.value) return;
                const [home, away] = e.target.value.split('|');
                setTeamA(home);
                setTeamB(away);
              }}
              className="w-full bg-paper border border-gray-200 rounded-md px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-green-500 font-semibold transition-all appearance-none cursor-pointer"
            >
              <option value="">Selecione um jogo...</option>
              {currentMatches.map((m, idx) => (
                <option key={idx} value={`${m.home}|${m.away}`}>
                  {m.home} x {m.away}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <select
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            className="flex-1 bg-paper border border-gray-200 rounded-md px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-green-500 font-semibold transition-all appearance-none cursor-pointer"
          >
            <option value="">Selecione time A</option>
            {brTeams.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
          <select
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            className="flex-1 bg-paper border border-gray-200 rounded-md px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-green-500 font-semibold transition-all appearance-none cursor-pointer"
          >
            <option value="">Selecione time B</option>
            {brTeams.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        {teamAData && teamBData && (() => {
          const colorA = getTeamColor(teamAData.name);
          const colorB = getTeamColor(teamBData.name);
          return (
            <div className="space-y-6">
              <div className="card p-6 sm:p-8">
                <div className="flex items-center justify-center gap-6 sm:gap-12">
                  <div className={`w-32 sm:w-40 border border-gray-200 rounded-lg overflow-hidden flex flex-col items-center transition-all duration-500 ease-out ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}>
                    <span className="team-bar" style={{ backgroundColor: colorA }} />
                    <div className="p-4 sm:p-5 flex flex-col items-center">
                      {teamAData.logo_url ? (
                        <img src={teamAData.logo_url} alt={teamAData.name} className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
                      ) : (
                        <div className="text-4xl">{teamAData.flag}</div>
                      )}
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 w-full max-w-[120px] transition-opacity duration-500 delay-150 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="h-px flex-1 bg-gray-200" />
                    <span className="w-8 h-8 shrink-0 rounded-full border border-gray-200 flex items-center justify-center text-[10px] font-bold text-ink-400">VS</span>
                    <span className="h-px flex-1 bg-gray-200" />
                  </div>

                  <div className={`w-32 sm:w-40 border border-gray-200 rounded-lg overflow-hidden flex flex-col items-center transition-all duration-500 ease-out ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}>
                    <span className="team-bar" style={{ backgroundColor: colorB }} />
                    <div className="p-4 sm:p-5 flex flex-col items-center">
                      {teamBData.logo_url ? (
                        <img src={teamBData.logo_url} alt={teamBData.name} className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
                      ) : (
                        <div className="text-4xl">{teamBData.flag}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5 pt-4">
                {[
                  { label: 'Pontos', stat: 'points', reverse: false },
                  { label: 'Vitórias', stat: 'won', reverse: false },
                  { label: 'Gols Pró (Ataque)', stat: 'goalsFor', reverse: false },
                  { label: 'Gols Contra (Defesa)', stat: 'goalsAgainst', reverse: true },
                  { label: 'Saldo de Gols', stat: 'goalDiff', reverse: false }
                ].map((item, index) => {
                  const valA = teamAData[item.stat] || 0;
                  const valB = teamBData[item.stat] || 0;
                  const absMax = Math.max(Math.abs(valA), Math.abs(valB), 1);
                  const maxVal = item.stat === 'goalDiff' ? absMax * 2 : Math.max(valA, valB, 1);

                  let pctA = (valA / maxVal) * 100;
                  let pctB = (valB / maxVal) * 100;

                  if (item.stat === 'goalDiff') {
                    pctA = ((valA + absMax) / (absMax * 2)) * 100;
                    pctB = ((valB + absMax) / (absMax * 2)) * 100;
                  }

                  const isAWinner = item.reverse ? valA < valB : valA > valB;
                  const isBWinner = item.reverse ? valB < valA : valB > valA;

                  return (
                    <div key={item.stat} className="card p-5">
                      <div className="flex justify-between items-end mb-3">
                        <span className={`text-3xl font-bold font-display transition-all ${isAWinner ? 'scale-110 origin-bottom-left' : 'opacity-40'}`} style={{ color: colorA }}>{valA}</span>
                        <span className="text-xs font-bold text-ink-600 uppercase tracking-widest px-2">{item.label}</span>
                        <span className={`text-3xl font-bold font-display transition-all ${isBWinner ? 'scale-110 origin-bottom-right' : 'opacity-40'}`} style={{ color: colorB }}>{valB}</span>
                      </div>
                      <div className="flex h-3.5 rounded-full overflow-hidden bg-gray-100 relative">
                        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-300 z-10" />
                        <div
                          className={`h-full rounded-r-full transition-all duration-700 ease-out ${!isAWinner && 'opacity-40'}`}
                          style={{ width: `${revealed ? pctA : 0}%`, backgroundColor: colorA, transitionDelay: `${index * 70}ms` }}
                        />
                        <div
                          className={`h-full rounded-l-full transition-all duration-700 ease-out ml-auto ${!isBWinner && 'opacity-40'}`}
                          style={{ width: `${revealed ? pctB : 0}%`, backgroundColor: colorB, transitionDelay: `${index * 70}ms` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

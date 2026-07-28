import { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getPairColors } from '../../lib/teamColors';
import { useRevealed } from '../../lib/useRevealed';
import { IconBall, IconShield } from '../icons';

const STATS = [
  { label: 'Pontos', stat: 'points', reverse: false },
  { label: 'Vitórias', stat: 'won', reverse: false },
  { label: 'Gols Pró (Ataque)', stat: 'goalsFor', reverse: false },
  { label: 'Gols Contra (Defesa)', stat: 'goalsAgainst', reverse: true },
  { label: 'Saldo de Gols', stat: 'goalDiff', reverse: false },
];

function TeamColumn({ team }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2 max-w-[10rem]">
      <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
        {team.logo_url ? (
          <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain" />
        ) : (
          <IconBall className="w-10 h-10 text-gray-300" />
        )}
      </div>
      <div className="text-sm font-display font-bold text-ink-900 text-center truncate max-w-full">{team.name}</div>
      {team.pos > 0 && (
        <span className="text-[10px] font-mono font-bold text-ink-400">{team.pos}º na tabela</span>
      )}
    </div>
  );
}

export default function ComparativeView() {
  const { brTeams, brRounds, brCurrentRound, brNextRound, getExpectedGoals } = useApp();
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const revealed = useRevealed();

  const displayRound = brRounds[brCurrentRound]?.length > 0 ? brCurrentRound : brNextRound;
  const currentMatches = useMemo(() => {
    return brRounds[brCurrentRound] || brRounds[brNextRound] || [];
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

  const probabilities = useMemo(() => {
    if (!teamAData || !teamBData) return null;
    return getExpectedGoals(teamAData.name, teamBData.name);
  }, [teamAData, teamBData, getExpectedGoals]);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 bg-slate-950 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity pointer-events-none transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('/images/comparative_hero_banner.png')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase tracking-widest backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Head-to-Head & Análises Táticas
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white uppercase drop-shadow-md">
            Comparativo de Equipes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed drop-shadow">
            Compare o ataque, defesa, saldo de gols e expectativas xG entre duas equipes para identificar padrões e vantagens no confronto.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-display font-bold text-ink-900 uppercase tracking-tight mb-6">Comparar Confronto</h3>

        {/* Manual pick — crest preview sits above each dropdown so the choice
            feels tangible before the comparison below even renders. */}
        <div className="mb-6">
          <span className="text-xs font-bold text-ink-600 uppercase tracking-widest">Escolher times</span>
          <div className="flex gap-4 mt-3">
            <div className="flex-1 flex flex-col items-center gap-2.5">
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                {teamAData?.logo_url ? (
                  <img src={teamAData.logo_url} alt="" className="w-8 h-8 object-contain" />
                ) : (
                  <IconShield className="w-5 h-5 text-ink-400" />
                )}
              </div>
              <div className="relative w-full">
                <select
                  value={teamA}
                  onChange={(e) => setTeamA(e.target.value)}
                  className="w-full bg-paper border border-gray-200 rounded-md pl-4 pr-10 py-2.5 text-sm text-ink-900 hover:border-gray-300 focus:outline-none focus:border-green-500 font-semibold transition-all appearance-none cursor-pointer shadow-sm"
                >
                  <option value="">Selecione time A</option>
                  {brTeams.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-600">
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2.5">
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                {teamBData?.logo_url ? (
                  <img src={teamBData.logo_url} alt="" className="w-8 h-8 object-contain" />
                ) : (
                  <IconShield className="w-5 h-5 text-ink-400" />
                )}
              </div>
              <div className="relative w-full">
                <select
                  value={teamB}
                  onChange={(e) => setTeamB(e.target.value)}
                  className="w-full bg-paper border border-gray-200 rounded-md pl-4 pr-10 py-2.5 text-sm text-ink-900 hover:border-gray-300 focus:outline-none focus:border-green-500 font-semibold transition-all appearance-none cursor-pointer shadow-sm"
                >
                  <option value="">Selecione time B</option>
                  {brTeams.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ink-600">
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick pick — this round's fixtures as visual tiles, crest vs crest */}
        {currentMatches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-ink-600 uppercase tracking-widest">Confrontos da Rodada</span>
              <span className="text-xs font-mono text-ink-400">Rodada {displayRound}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentMatches.map((m, idx) => {
                const active = teamA === m.home && teamB === m.away;
                const home = brTeams.find((t) => t.name === m.home);
                const away = brTeams.find((t) => t.name === m.away);
                return (
                  <button
                    key={idx}
                    onClick={() => { setTeamA(m.home); setTeamB(m.away); }}
                    style={active ? { borderColor: 'var(--color-green-500)' } : undefined}
                    className={`card p-3.5 text-left transition-all ${active ? '' : 'card-hover'}`}
                  >
                    <div className="flex items-center justify-center gap-2.5">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0">
                        {home?.logo_url ? <img src={home.logo_url} alt="" className="w-full h-full object-contain" /> : <IconBall className="w-6 h-6 text-gray-300" />}
                      </div>
                      <span className="text-[9px] font-bold text-ink-400 shrink-0">×</span>
                      <div className="w-9 h-9 flex items-center justify-center shrink-0">
                        {away?.logo_url ? <img src={away.logo_url} alt="" className="w-full h-full object-contain" /> : <IconBall className="w-6 h-6 text-gray-300" />}
                      </div>
                    </div>
                    <div className="mt-2.5 text-[11px] font-bold text-ink-900 text-center leading-tight truncate">{m.home} <span className="text-ink-400 font-normal">×</span> {m.away}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {teamAData && teamBData && (() => {
        const { colorA, colorB } = getPairColors(teamAData.name, teamBData.name);
        return (
          <div className="card overflow-hidden">
            {/* H2H header — team identity + result probability, one cohesive strip */}
            <div className="relative px-6 py-7 sm:py-9 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{ background: `linear-gradient(90deg, ${colorA}, transparent 42%, transparent 58%, ${colorB})` }}
              />
              <div className={`relative flex items-center justify-center gap-6 sm:gap-14 transition-all duration-500 ease-out ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
                <TeamColumn team={teamAData} />
                <span className="w-9 h-9 shrink-0 rounded-full bg-paper border border-gray-200 shadow-sm flex items-center justify-center text-[10px] font-bold text-ink-400">VS</span>
                <TeamColumn team={teamBData} />
              </div>

              {probabilities && (
                <div className={`relative mt-7 sm:mt-8 max-w-md mx-auto transition-opacity duration-500 delay-150 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="text-center text-[10px] font-bold text-ink-400 uppercase tracking-widest mb-2.5">Probabilidade de Resultado</div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-gray-100">
                    <div className="transition-all duration-700 ease-out" style={{ width: `${revealed ? probabilities.homeWinPct : 0}%`, backgroundColor: colorA }} />
                    <div className="bg-gold-500 transition-all duration-700 ease-out" style={{ width: `${revealed ? probabilities.drawPct : 0}%` }} />
                    <div className="transition-all duration-700 ease-out ml-auto" style={{ width: `${revealed ? probabilities.awayWinPct : 0}%`, backgroundColor: colorB }} />
                  </div>
                  <div className="flex justify-between mt-2 text-[11px] font-bold font-mono">
                    <span style={{ color: colorA }}>{probabilities.homeWinPct}%</span>
                    <span className="text-ink-400">{probabilities.drawPct}% empate</span>
                    <span style={{ color: colorB }}>{probabilities.awayWinPct}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Stat comparison — one panel with hairline dividers instead of five stacked cards */}
            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {STATS.map((item) => {
                const valA = teamAData[item.stat] || 0;
                const valB = teamBData[item.stat] || 0;

                const isTie = valA === valB;
                const isAWinner = !isTie && (item.reverse ? valA < valB : valA > valB);
                const isBWinner = !isTie && (item.reverse ? valB < valA : valB > valA);

                // Leader gets a neutral filled pill instead of the team's own
                // color — a couple of clubs (Santos, Corinthians...) sit too
                // close to the app's own ink tone to stay legible as text.
                const pill = 'inline-flex items-center justify-center min-w-10 px-2.5 py-1 rounded-full bg-ink-900 text-paper font-display font-bold text-lg tabular-nums';
                const plain = `font-display font-bold text-lg tabular-nums ${isTie ? 'text-ink-900' : 'text-ink-400'}`;

                return (
                  <div key={item.stat} className={`px-6 py-4 flex justify-between items-center transition-opacity duration-500 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
                    <span className={isAWinner ? pill : plain}>{valA}</span>
                    <span className="text-xs font-bold text-ink-600 uppercase tracking-widest px-2 text-center">{item.label}</span>
                    <span className={isBWinner ? pill : plain}>{valB}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}
    </div>
  );
}

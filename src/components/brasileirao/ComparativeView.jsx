import { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

function FormScore(form) {
  return form.split('').reduce((acc, r) => acc + (r === 'W' ? 3 : r === 'D' ? 1 : 0), 0);
}

const getTeamColor = (teamName) => {
  if (!teamName) return '#10B981';
  const name = teamName.toLowerCase();
  
  if (name.includes('flamengo')) return '#ef4444'; // Red
  if (name.includes('palmeiras')) return '#10b981'; // Green
  if (name.includes('são paulo') || name.includes('sao paulo')) return '#ef4444'; // Red
  if (name.includes('corinthians')) return '#ffffff'; // White
  if (name.includes('santos')) return '#ffffff'; // White
  if (name.includes('vasco')) return '#ffffff'; // White
  if (name.includes('botafogo')) return '#ffffff'; // White
  if (name.includes('fluminense')) return '#9f1a24'; // Burgundy
  if (name.includes('cruzeiro')) return '#3b82f6'; // Blue
  if (name.includes('atlético-mg') || name.includes('atletico-mg')) return '#ffffff'; // White
  if (name.includes('grêmio') || name.includes('gremio')) return '#0ea5e9'; // Sky Blue
  if (name.includes('internacional')) return '#ef4444'; // Red
  if (name.includes('bahia')) return '#3b82f6'; // Blue
  if (name.includes('vitória') || name.includes('vitoria')) return '#ef4444'; // Red
  if (name.includes('athletico')) return '#ef4444'; // Red
  if (name.includes('fortaleza')) return '#3b82f6'; // Blue
  if (name.includes('criciúma') || name.includes('criciuma')) return '#facc15'; // Yellow
  if (name.includes('juventude')) return '#10b981'; // Green
  if (name.includes('bragantino')) return '#ef4444'; // Red
  if (name.includes('atlético-go') || name.includes('atletico-go')) return '#ef4444'; // Red
  if (name.includes('cuiabá') || name.includes('cuiaba')) return '#facc15'; // Yellow
  if (name.includes('coritiba')) return '#10b981'; // Green
  if (name.includes('remo')) return '#3b82f6'; // Blue
  if (name.includes('chapecoense')) return '#10b981'; // Green
  
  return '#10B981';
};

export default function ComparativeView() {
  const { brTeams, brRounds, brCurrentRound, brNextRound } = useApp();
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');

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
      <div className="glass-card rounded-2xl border border-surface-600/50 p-5">
        <h3 className="text-sm font-bold text-text-primary mb-4">Comparar Confronto</h3>
        
        {currentMatches.length > 0 && (
          <div className="mb-4 p-3 bg-surface-900/40 rounded-xl border border-surface-600/30">
            <label className="block text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">Confrontos da Rodada</label>
            <select
              onChange={(e) => {
                if (!e.target.value) return;
                const [home, away] = e.target.value.split('|');
                setTeamA(home);
                setTeamB(away);
              }}
              className="w-full bg-surface-800 border border-surface-600/50 rounded-lg px-3 py-2 text-sm text-accent-300 focus:outline-none focus:border-accent-500/50 font-semibold"
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

        <div className="flex gap-3 mb-4">
          <select
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            className="flex-1 bg-surface-800/50 border border-surface-600/50 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-500/50"
          >
            <option value="">Selecione time A</option>
            {brTeams.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
          <select
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            className="flex-1 bg-surface-800/50 border border-surface-600/50 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent-500/50"
          >
            <option value="">Selecione time B</option>
            {brTeams.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        {teamAData && teamBData && (() => {
          return (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-surface-800/50 rounded-xl border border-surface-600/30 flex flex-col items-center">
                  {teamAData.logo_url ? (
                    <img src={teamAData.logo_url} alt={teamAData.name} className="w-16 h-16 object-contain mb-3 drop-shadow-lg" />
                  ) : (
                    <div className="text-4xl mb-3 drop-shadow-lg">{teamAData.flag}</div>
                  )}
                  <div className="text-sm font-bold text-text-primary">{teamAData.name}</div>
                </div>
                <div className="text-center p-4 bg-surface-800/50 rounded-xl border border-surface-600/30 flex flex-col items-center">
                  {teamBData.logo_url ? (
                    <img src={teamBData.logo_url} alt={teamBData.name} className="w-16 h-16 object-contain mb-3 drop-shadow-lg" />
                  ) : (
                    <div className="text-4xl mb-3 drop-shadow-lg">{teamBData.flag}</div>
                  )}
                  <div className="text-sm font-bold text-text-primary">{teamBData.name}</div>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Pontos', stat: 'points', reverse: false },
                  { label: 'Vitórias', stat: 'won', reverse: false },
                  { label: 'Gols Pró (Ataque)', stat: 'goalsFor', reverse: false },
                  { label: 'Gols Contra (Defesa)', stat: 'goalsAgainst', reverse: true },
                  { label: 'Saldo de Gols', stat: 'goalDiff', reverse: false }
                ].map((item) => {
                  const valA = teamAData[item.stat] || 0;
                  const valB = teamBData[item.stat] || 0;
                  // Handle negative values for goal difference by shifting baseline
                  const absMax = Math.max(Math.abs(valA), Math.abs(valB), 1);
                  const maxVal = item.stat === 'goalDiff' ? absMax * 2 : Math.max(valA, valB, 1);
                  
                  // Calculate percentages. For goalDiff, baseline is 50%
                  let pctA = (valA / maxVal) * 100;
                  let pctB = (valB / maxVal) * 100;
                  
                  if (item.stat === 'goalDiff') {
                    pctA = ((valA + absMax) / (absMax * 2)) * 100;
                    pctB = ((valB + absMax) / (absMax * 2)) * 100;
                  }

                  const isAWinner = item.reverse ? valA < valB : valA > valB;
                  const isBWinner = item.reverse ? valB < valA : valB > valA;
                  const colorA = getTeamColor(teamAData.name);
                  const colorB = getTeamColor(teamBData.name);

                  return (
                    <div key={item.stat} className="bg-surface-800/30 p-4 rounded-xl border border-surface-600/20">
                      <div className="flex justify-between items-end mb-2">
                        <span className={`text-2xl font-bold font-display ${isAWinner ? '' : 'opacity-60'}`} style={{ color: colorA }}>{valA}</span>
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">{item.label}</span>
                        <span className={`text-2xl font-bold font-display ${isBWinner ? '' : 'opacity-60'}`} style={{ color: colorB }}>{valB}</span>
                      </div>
                      <div className="flex h-3 rounded-full overflow-hidden bg-surface-900 gap-1 p-0.5 border border-surface-600/30 relative">
                        {/* A small center line marker */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-surface-600/50 z-10" />
                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${isAWinner ? 'shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'opacity-60'}`} style={{ width: `${pctA}%`, backgroundColor: colorA }} />
                        <div className={`h-full rounded-full transition-all duration-1000 ease-out ${isBWinner ? 'shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'opacity-60'}`} style={{ width: `${pctB}%`, backgroundColor: colorB }} />
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
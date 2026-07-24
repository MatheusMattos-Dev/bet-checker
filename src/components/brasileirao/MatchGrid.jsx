import { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { IconBall } from '../icons';

function TeamRow({ name, logoUrl, goals, isWinner, played, isHome }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 shrink-0 flex items-center justify-center">
        {logoUrl ? <img src={logoUrl} alt={name} className="w-full h-full object-contain" /> : <IconBall className="w-5 h-5 text-gray-300" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-ink-900 truncate">{name}</div>
        <div className={`text-[9px] font-bold uppercase tracking-wider ${isHome ? 'text-blue-700' : 'text-gold-700'}`}>{isHome ? 'Casa' : 'Fora'}</div>
      </div>
      {played && <span className="text-lg font-bold font-display text-ink-900 tabular-nums">{goals}</span>}
      {isWinner && <span className="tag bg-green-500 text-white shrink-0">Vitória</span>}
    </div>
  );
}

export default function MatchGrid({ onMatchClick }) {
  const { brRounds, brCurrentRound, getTeam, getExpectedGoals } = useApp();

  const availableRounds = useMemo(() => {
    const rounds = [];
    if (brCurrentRound > 1) rounds.push(brCurrentRound - 1);
    rounds.push(brCurrentRound);
    if (brCurrentRound < 38) rounds.push(brCurrentRound + 1);
    return rounds;
  }, [brCurrentRound]);

  const [selectedRound, setSelectedRound] = useState(() => {
    return availableRounds.includes(brCurrentRound) ? brCurrentRound : (availableRounds[0] || 1);
  });

  // Keep selected round in sync if it's not valid
  if (!availableRounds.includes(selectedRound) && availableRounds.length > 0) {
    setSelectedRound(availableRounds.includes(brCurrentRound) ? brCurrentRound : availableRounds[0]);
  }

  const currentMatches = brRounds[selectedRound] || [];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {availableRounds.map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRound(r)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all whitespace-nowrap ${
              selectedRound === r
                ? 'bg-green-500 text-white'
                : 'card text-ink-600 hover:bg-gray-50'
            }`}
          >
            Rodada {r}
            {r === brCurrentRound && <span className="tag bg-gold-100 text-gold-700">Próxima</span>}
          </button>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-display font-bold text-ink-900 uppercase tracking-tight">Rodada {selectedRound}</h2>
        <p className="text-xs text-ink-600 mt-1 uppercase tracking-wider">
          {selectedRound < brCurrentRound ? 'Jogos encerrados' : 'Próximos jogos'}
        </p>
      </div>

      {currentMatches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentMatches.map((match, i) => {
            const xg = getExpectedGoals(match.home, match.away);
            const totalXG = parseFloat(xg.expectedGoalsFor) + parseFloat(xg.expectedGoalsAgainst);
            const isHighScoring = match.homeGoals === null && totalXG > 3.0;
            const played = match.homeGoals !== null;
            const isDraw = played && match.homeGoals === match.awayGoals;
            const homeWon = played && match.homeGoals > match.awayGoals;
            const awayWon = played && match.awayGoals > match.homeGoals;

            return (
              <button
                key={i}
                onClick={() => onMatchClick(match)}
                className="card card-hover text-left relative"
              >
                <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-paper border border-gray-200 shadow-sm flex items-center justify-center text-[9px] font-bold text-ink-400">VS</span>

                <div className="p-4 space-y-3">
                  <TeamRow name={match.home} logoUrl={getTeam(match.home)?.logo_url} goals={match.homeGoals} isWinner={homeWon} played={played} isHome />
                  <TeamRow name={match.away} logoUrl={getTeam(match.away)?.logo_url} goals={match.awayGoals} isWinner={awayWon} played={played} isHome={false} />

                  {isDraw && (
                    <div className="flex justify-center">
                      <span className="tag bg-gold-100 text-gold-700">Empate</span>
                    </div>
                  )}
                  {!played && isHighScoring && (
                    <div className="flex justify-center">
                      <span className="tag bg-red-100 text-red-700">Alta Intensidade</span>
                    </div>
                  )}
                </div>

                <div className="px-4 py-2.5 border-t border-gray-100 text-[10px] text-ink-400 uppercase tracking-wider flex items-center justify-between gap-2">
                  <span className="truncate">{match.venue}</span>
                  <span className="shrink-0 font-mono">{match.date}</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="card px-5 py-12 text-center text-sm text-ink-400">
          Aguardando tabela oficial de jogos para esta rodada.
        </div>
      )}
    </div>
  );
}

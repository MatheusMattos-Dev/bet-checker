import { useApp } from '../../context/AppContext';

function MatchCard({ match, round, isPlayed }) {
  const { navigateWCView } = useApp();

  return (
    <div
      className={`bg-white dark:bg-dark-800 rounded-xl p-3 shadow-sm border transition-all cursor-pointer ${
        isPlayed
          ? 'border-green-500/30 hover:border-[#d4a017]/50'
          : 'border-[#d4a017]/30 hover:border-[#d4a017]/60'
      }`}
      onClick={() => navigateWCView('match', null, { ...match, round })}
    >
      <div className="text-[10px] text-gray-400 mb-1.5 flex items-center justify-between">
        <span>{match.date}</span>
        <span>{match.venue}</span>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{match.homeFlag || ''}</span>
            <span className={`text-xs font-medium ${isPlayed && match.homeGoals > match.awayGoals ? 'text-green-500 font-bold' : ''}`}>
              {match.home}
            </span>
          </div>
          <span className={`text-xs font-bold ${isPlayed ? (match.homeGoals > match.awayGoals ? 'text-green-500' : 'text-gray-400') : 'text-[#d4a017]'}`}>
            {isPlayed ? match.homeGoals : '?'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{match.awayFlag || ''}</span>
            <span className={`text-xs font-medium ${isPlayed && match.awayGoals > match.homeGoals ? 'text-green-500 font-bold' : ''}`}>
              {match.away}
            </span>
          </div>
          <span className={`text-xs font-bold ${isPlayed ? (match.awayGoals > match.homeGoals ? 'text-green-500' : 'text-gray-400') : 'text-[#d4a017]'}`}>
            {isPlayed ? match.awayGoals : '?'}
          </span>
        </div>
      </div>
      {match.extraTime && <div className="text-[9px] text-yellow-400 mt-1 text-center">Prorrogação</div>}
      {match.penalties && <div className="text-[9px] text-yellow-400 mt-1 text-center">Disputa de pênaltis</div>}
    </div>
  );
}

function getFlag(name) {
  const flags = {
    'Espanha': '🇪🇸', 'Bélgica': '🇧🇪', 'Noruega': '🇳🇴', 'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'França': '🇫🇷', 'Marrocos': '🇲🇦', 'Argentina': '🇦🇷', 'Suíça': '🇨🇭',
    'Portugal': '🇵🇹', 'EUA': '🇺🇸', 'Brasil': '🇧🇷', 'México': '🇲🇽',
    'Paraguai': '🇵🇾', 'Canadá': '🇨🇦', 'Egito': '🇪🇬', 'Colômbia': '🇨🇴',
    'Cabo Verde': '🇨🇻',
    'Áustria': '🇦🇹', 'Senegal': '🇸🇳', 'Costa do Marfim': '🇨🇮', 'Congo DR': '🇨🇩',
    'Suécia': '🇸🇪', 'Holanda': '🇳🇱', 'Argélia': '🇩🇿', 'África do Sul': '🇿🇦',
    'Bósnia': '🇧🇦', 'Croácia': '🇭🇷', 'Alemanha': '🇩🇪', 'Gana': '🇬🇭',
    'Uruguai': '🇺🇾', 'Japão': '🇯🇵', 'Catar': '🇶🇦', 'Austrália': '🇦🇺',
  };
  return flags[name] || '';
}

export default function WorldCupBracket() {
  const { wcBracket } = useApp();
  const { roundOf32, roundOf16, quarterfinals, semifinals } = wcBracket;

  const r32WithFlags = roundOf32.map(m => ({
    ...m,
    homeFlag: getFlag(m.home),
    awayFlag: getFlag(m.away),
  }));

  const r16WithFlags = roundOf16.map(m => ({
    ...m,
    homeFlag: getFlag(m.home),
    awayFlag: getFlag(m.away),
  }));

  const qfWithFlags = quarterfinals.map(m => ({
    ...m,
    homeFlag: getFlag(m.home),
    awayFlag: getFlag(m.away),
  }));

  const sfWithFlags = semifinals.map(m => ({
    ...m,
    homeFlag: getFlag(m.home),
    awayFlag: getFlag(m.away),
  }));

  return (
    <div className="space-y-8">
      {/* Round of 32 */}
      <div>
        <h2 className="text-lg font-bold text-[#d4a017] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Round of 32 — Concluídas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {r32WithFlags.map((match, i) => (
            <MatchCard key={`r32-${i}`} match={match} round="Round of 32" isPlayed={true} />
          ))}
        </div>
      </div>

      {/* Oitavas de Final */}
      <div>
        <h2 className="text-lg font-bold text-[#d4a017] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Oitavas de Final — Concluídas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {r16WithFlags.map((match, i) => (
            <MatchCard key={`r16-${i}`} match={match} round="Oitavas" isPlayed={true} />
          ))}
        </div>
      </div>

      {/* Quartas de Final */}
      <div>
        <h2 className="text-lg font-bold text-[#d4a017] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Quartas de Final — Concluídas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {qfWithFlags.map((match, i) => (
            <MatchCard key={`qf-${i}`} match={match} round="Quartas" isPlayed={true} />
          ))}
        </div>
      </div>

      {/* Semifinais */}
      <div>
        <h2 className="text-lg font-bold text-[#d4a017] mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
          Semifinais — Em Andamento
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sfWithFlags.map((match, i) => (
            <MatchCard key={`sf-${i}`} match={match} round="Semifinais" isPlayed={false} />
          ))}
        </div>
      </div>

      {/* Final */}
      <div className="bg-white/5 dark:bg-dark-800/50 rounded-xl p-4 border border-dashed border-gray-600 text-center">
        <p className="text-sm text-gray-400">Final — 19 de Julho</p>
        <p className="text-xs text-gray-500 mt-1">A definir após semifinais</p>
      </div>
    </div>
  );
}
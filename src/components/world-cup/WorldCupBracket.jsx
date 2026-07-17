import { useApp } from '../../context/AppContext';

function MatchCard({ match, round, isPlayed }) {
  const { navigateWCView } = useApp();

  const homeWins = isPlayed && match.homeGoals > match.awayGoals;
  const awayWins = isPlayed && match.awayGoals > match.homeGoals;

  return (
    <div
      className={`bg-surface-800 rounded-xl p-4 border cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-500/5 active:scale-[0.98] ${
        isPlayed
          ? 'border-accent-500/30 hover:border-accent-500/50'
          : 'border-surface-600/50 hover:border-surface-700'
      }`}
      onClick={() => navigateWCView('match', null, { ...match, round })}
    >
      {/* Meta line */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-surface-600/30">
        <span className="text-[10px] text-text-muted font-mono">{match.date}</span>
        <span className="text-[10px] text-text-muted font-mono">{match.venue}</span>
      </div>

      {/* Teams */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">{match.homeFlag || ''}</span>
            <span className={`text-sm font-medium ${homeWins ? 'text-accent-300 font-bold' : 'text-text-primary'}`}>
              {match.home}
            </span>
          </div>
          <span className={`text-sm font-bold font-mono ${homeWins ? 'text-accent-300' : isPlayed ? 'text-text-muted' : 'text-gold-400'}`}>
            {isPlayed ? match.homeGoals : '?'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">{match.awayFlag || ''}</span>
            <span className={`text-sm font-medium ${awayWins ? 'text-accent-300 font-bold' : 'text-text-primary'}`}>
              {match.away}
            </span>
          </div>
          <span className={`text-sm font-bold font-mono ${awayWins ? 'text-accent-300' : isPlayed ? 'text-text-muted' : 'text-gold-400'}`}>
            {isPlayed ? match.awayGoals : '?'}
          </span>
        </div>
      </div>

      {/* Extra info */}
      {(match.extraTime || match.penalties) && (
        <div className="mt-3 pt-3 border-t border-surface-600/30 space-y-1">
          {match.extraTime && <p className="text-[10px] text-gold-400">Prorrogação</p>}
          {match.penalties && <p className="text-[10px] text-gold-400">Pênaltis: {match.penalties}</p>}
        </div>
      )}
    </div>
  );
}

function RoundSection({ title, matches, played, cols, accent = 'accent', subtitle }) {
  const dotColor = accent === 'gold' ? 'bg-gold-500' : accent === 'muted' ? 'bg-surface-600' : 'bg-accent-500';
  const titleColor = accent === 'gold' ? 'text-gold-400' : accent === 'muted' ? 'text-text-secondary' : 'text-accent-300';
  const lineColor = accent === 'gold' ? 'from-gold-500/20' : accent === 'muted' ? 'from-surface-600/20' : 'from-accent-500/20';

  return (
    <div className="mb-10">
      {/* Section header with decorative line */}
      <div className="flex items-center gap-3 mb-1">
        <div className={`w-2 h-2 rounded-full ${dotColor} ${accent === 'gold' ? 'animate-pulse' : ''}`} />
        <h2 className={`text-base font-display font-bold ${titleColor}`}>
          {title}
        </h2>
        {subtitle && (
          <span className="text-xs text-text-muted font-mono ml-1">{subtitle}</span>
        )}
      </div>
      {/* Decorative gradient line */}
      <div className={`h-px bg-gradient-to-r ${lineColor} to-transparent mb-5`} />

      {/* Matches grid */}
      <div className={cols}>
        {matches.map((match, i) => (
          <MatchCard key={`${title}-${i}`} match={match} round={title} isPlayed={played} />
        ))}
      </div>
    </div>
  );
}

export default function WorldCupBracket() {
  const { wcBracket } = useApp();

  const getFlag = (teamName) => {
    const flags = {
      'EUA': '🇺🇸', 'Uruguai': '🇺🇾', 'França': '🇫🇷', 'Austrália': '🇦🇺',
      'Bélgica': '🇧🇪', 'Marrocos': '🇲🇦', 'Holanda': '🇳🇱', 'Japão': '🇯🇵',
      'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Senaegal': '🇸🇳', 'Sénegal': '🇸🇳', 'Tunísia': '🇹🇳',
      'Brasil': '🇧🇷', 'Croácia': '🇭🇷', 'Portugal': '🇵🇹', 'Colômbia': '🇨🇴',
      'Espanha': '🇪🇸', 'Geórgia': '🇬🇪', 'Alemanha': '🇩🇪', 'Jordânia': '🇯🇴',
      'Argentina': '🇦🇷', 'Arábia Saudita': '🇸🇦', 'Itália': '🇮🇹', 'Ucrânia': '🇺🇦',
      'México': '🇲🇽', 'ZAF': '🇿🇦', 'Canadá': '🇨🇦', 'Camarões': '🇨🇲',
      'Coreia do Sul': '🇰🇷', 'Costa Rica': '🇨🇷', 'Nigéria': '🇳🇬', 'Paraguai': '🇵🇾',
      'Suíça': '🇨🇭', 'Egito': '🇪🇬', 'Irã': '🇮🇷', 'Quênia': '🇰🇪',
      'Áustria': '🇦🇹', 'Hungria': '🇭🇺', 'Mali': '🇲🇱',
      'Ucrânia': '🇺🇦', 'Israel': '🇮🇱', 'Sérvia': '🇷🇸', 'Cabo Verde': '🇨🇻',
      'Chile': '🇨🇱', 'Jamaica': '🇯🇲',
    };
    return flags[teamName] || '🏳️';
  };

  const r32WithFlags = (wcBracket?.roundOf32 || []).map(m => ({
    ...m, homeFlag: getFlag(m.home), awayFlag: getFlag(m.away),
  }));

  const r16WithFlags = (wcBracket?.roundOf16 || []).map(m => ({
    ...m, homeFlag: getFlag(m.home), awayFlag: getFlag(m.away),
  }));

  const qfWithFlags = (wcBracket?.quarterfinals || []).map(m => ({
    ...m, homeFlag: getFlag(m.home), awayFlag: getFlag(m.away),
  }));

  const sfWithFlags = (wcBracket?.semifinals || []).map(m => ({
    ...m, homeFlag: getFlag(m.home), awayFlag: getFlag(m.away),
  }));

  return (
    <div>
      <RoundSection
        title="Round de 32"
        subtitle="1ª Fase Eliminatória"
        matches={r32WithFlags}
        played={true}
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      />

      <RoundSection
        title="Oitavas de Final"
        matches={r16WithFlags}
        played={true}
        cols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      />

      <RoundSection
        title="Quartas de Final"
        matches={qfWithFlags}
        played={true}
        cols="grid-cols-1 md:grid-cols-2 gap-4"
      />

      <RoundSection
        title="Semifinais"
        matches={sfWithFlags}
        played={true}
        cols="grid-cols-1 md:grid-cols-2 gap-4"
      />

      {/* Final */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
          <h2 className="text-base font-display font-bold text-gold-400">Final</h2>
          <span className="text-xs text-text-muted font-mono ml-1">19 de Julho</span>
        </div>
        <div className="h-px bg-gradient-to-r from-gold-500/20 to-transparent mb-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(() => {
            const final = wcBracket?.final;
            if (!final) return null;
            return (
              <MatchCard
                key="final"
                match={{ ...final, homeFlag: getFlag(final.home), awayFlag: getFlag(final.away) }}
                round="Final"
                isPlayed={false}
              />
            );
          })()}
        </div>
      </div>

      {/* 3º Lugar */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-2 h-2 rounded-full bg-surface-600" />
          <h2 className="text-base font-display font-bold text-text-secondary">3º Lugar</h2>
          <span className="text-xs text-text-muted font-mono ml-1">18 de Julho</span>
        </div>
        <div className="h-px bg-gradient-to-r from-surface-600/20 to-transparent mb-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(() => {
            const tp = wcBracket?.thirdPlace;
            if (!tp) return null;
            return (
              <MatchCard
                key="third"
                match={{ ...tp, homeFlag: getFlag(tp.home), awayFlag: getFlag(tp.away) }}
                round="3º Lugar"
                isPlayed={false}
              />
            );
          })()}
        </div>
      </div>
    </div>
  );
}
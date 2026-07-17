import { useApp } from '../../context/AppContext';

function CoverageBar({ coverage }) {
  const color = coverage >= 70 ? 'accent' : coverage >= 40 ? 'gold' : 'danger';
  const gradient =
    color === 'accent'
      ? 'linear-gradient(90deg, #00e676, #69f0ae)'
      : color === 'gold'
        ? 'linear-gradient(90deg, #ffd740, #ffe400)'
        : 'linear-gradient(90deg, #ff5252, #ff8a80)';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-surface-600 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${coverage}%`, background: gradient }} />
      </div>
      <span className="text-[10px] font-mono font-medium text-text-muted w-8 text-right tabular-nums">{coverage}%</span>
    </div>
  );
}

function Badge({ children, variant = 'default' }) {
  const variants = {
    zebra: 'bg-danger-500/10 text-danger-400 border-danger-500/20',
    favorite: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
    premium: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
    played: 'bg-accent-500/10 text-accent-300 border-accent-500/20',
    scheduled: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
    default: 'bg-surface-700 text-text-secondary border-surface-600',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]}`}>
      {children}
    </span>
  );
}

function SportCard({ match, index, isPlayed, coverage, isZebra, onMatchClick }) {
  const { navigateWCView } = useApp();

  const handleClick = (e) => {
    // Click no card abre o drawer; clique no score vai pro detail
    if (onMatchClick) {
      onMatchClick(match);
    } else {
      navigateWCView('match', null, { ...match, round: match.round || 'Jogo' });
    }
  };

  const statusBadge = isPlayed ? <Badge variant="played">✓ Concluído</Badge> : <Badge variant="scheduled">● Agendado</Badge>;
  const zebraBadge = isZebra && <Badge variant="zebra">⚡ Zebra</Badge>;
  const favBadge = !isZebra && <Badge variant="favorite">🛡️ Favorito</Badge>;
  const borderClass = isZebra ? 'border-l-2 border-l-danger-500' : '';

  return (
    <div
      className={`bg-surface-800 rounded-xl border border-surface-600/50 p-5 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-accent-500/5 hover:border-surface-700 active:scale-[0.98] ${borderClass}`}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-text-muted">#{String(index + 1).padStart(2, '0')}</span>
          <span className="text-[10px] font-mono text-text-muted bg-surface-700 px-2 py-0.5 rounded-md">
            {match.round || 'R32'}
          </span>
        </div>
        {statusBadge}
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{match.homeFlag || '🏳️'}</span>
          <span className="text-sm font-display font-semibold text-text-primary truncate">{match.home}</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2 px-4">
          <span className="text-xl font-mono font-bold text-text-primary">
            {isPlayed ? match.homeGoals : '-'}
          </span>
          <span className="text-text-muted text-sm">:</span>
          <span className="text-xl font-mono font-bold text-text-primary">
            {isPlayed ? match.awayGoals : '-'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end">
          <span className="text-sm font-display font-semibold text-text-primary truncate text-right">{match.away}</span>
          <span className="text-2xl flex-shrink-0">{match.awayFlag || '🏳️'}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        {zebraBadge}
        {favBadge}
      </div>

      {/* Coverage bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-text-muted uppercase tracking-wider">Cobertura</span>
        </div>
        <CoverageBar coverage={coverage} />
      </div>
    </div>
  );
}

function RoundGroup({ title, matches, startIndex, mockCoverage, isZebra, onMatchClick }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-500" />
        <h3 className="text-sm font-display font-semibold text-text-primary">{title}</h3>
        <span className="text-xs text-text-muted font-mono">{matches.length} jogos</span>
      </div>
      <div className="h-px bg-gradient-to-r from-accent-500/20 to-transparent mb-5" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {matches.map((match, i) => (
          <SportCard
            key={`${title}-${i}`}
            match={match}
            index={startIndex + i}
            isPlayed={match.homeGoals !== undefined && match.homeGoals !== null}
            coverage={mockCoverage[`${match.home}-${match.away}`] || 0}
            isZebra={isZebra(match)}
            onMatchClick={onMatchClick}
          />
        ))}
      </div>
    </div>
  );
}

export default function MatchGrid({ onMatchClick }) {
  const { wcBracket } = useApp();

  const roundOf32 = wcBracket?.roundOf32 || [];
  const roundOf16 = wcBracket?.roundOf16 || [];
  const quarterfinals = wcBracket?.quarterfinals || [];
  const semifinals = wcBracket?.semifinals || [];

  // Mock coverage data
  const allMatches = [...roundOf32, ...roundOf16, ...quarterfinals, ...semifinals];
  const mockCoverage = {};
  allMatches.forEach((m) => {
    mockCoverage[`${m.home}-${m.away}`] = Math.floor(Math.random() * 40) + 55;
  });

  const isZebra = (m) => {
    const seeds = ['França', 'Espanha', 'Argentina', 'Inglaterra', 'Brasil', 'Portugal', 'Alemanha', 'Bélgica'];
    const homeIsUnderdog = !seeds.includes(m.home);
    const awayWon = m.awayGoals > m.homeGoals;
    return awayWon || homeIsUnderdog;
  };

  const totalGames = allMatches.length;

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-600/30">
        <div>
          <h2 className="text-lg font-display font-bold text-text-primary">
            Jogos da Rodada
          </h2>
          <p className="text-xs text-text-muted mt-1">Clique em um jogo para ver os bolões que cobrem</p>
        </div>
        <span className="text-xs text-text-muted font-mono bg-surface-800 px-3 py-1.5 rounded-lg border border-surface-600/50">
          {totalGames} jogos
        </span>
      </div>

      {/* Rounds */}
      <RoundGroup
        title="Round de 32"
        matches={roundOf32}
        startIndex={0}
        mockCoverage={mockCoverage}
        isZebra={isZebra}
        onMatchClick={onMatchClick}
      />

      <RoundGroup
        title="Oitavas de Final"
        matches={roundOf16}
        startIndex={roundOf32.length}
        mockCoverage={mockCoverage}
        isZebra={isZebra}
        onMatchClick={onMatchClick}
      />

      <RoundGroup
        title="Quartas de Final"
        matches={quarterfinals}
        startIndex={roundOf32.length + roundOf16.length}
        mockCoverage={mockCoverage}
        isZebra={isZebra}
        onMatchClick={onMatchClick}
      />

      <RoundGroup
        title="Semifinais"
        matches={semifinals}
        startIndex={roundOf32.length + roundOf16.length + quarterfinals.length}
        mockCoverage={mockCoverage}
        isZebra={isZebra}
        onMatchClick={onMatchClick}
      />
    </div>
  );
}
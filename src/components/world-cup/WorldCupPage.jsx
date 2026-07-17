import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import WorldCupBracket from './WorldCupBracket';
import WorldCupTeams from './WorldCupTeams';
import WorldCupTeamDetail from './WorldCupTeamDetail';
import WorldCupPlayers from './WorldCupPlayers';
import WorldCupComparative from './WorldCupComparative';
import WorldCupNews from './WorldCupNews';
import WorldCupMatchDetail from './WorldCupMatchDetail';
import KPICards from './KPICards';
import MatchGrid from './MatchGrid';
import MatchDrawer from './MatchDrawer';

const tabs = [
  { id: 'bracket', label: 'Mata-Mata', icon: '🏆' },
  { id: 'matches', label: 'Jogos', icon: '⚽' },
  { id: 'teams', label: 'Times', icon: '👥' },
  { id: 'players', label: 'Jogadores', icon: '👤' },
  { id: 'comparative', label: 'Análises', icon: '📊' },
  { id: 'news', label: 'Notícias', icon: '📰' },
];

// Countdown timer to final
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const finalDate = new Date('2026-07-19T20:00:00-03:00');

    const tick = () => {
      const now = new Date();
      const diff = finalDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Seg', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="bg-surface-900/80 backdrop-blur-sm border border-surface-600/50 rounded-lg px-2.5 py-1.5 min-w-[48px] text-center">
            <span className="text-lg font-mono font-bold text-gold-400 tabular-nums">
              {String(u.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-text-muted mt-1">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

// Upcoming match card
function UpcomingMatchCard({ match, label }) {
  const { navigateWCView } = useApp();

  const getFlag = (name) => {
    const flags = {
      'Espanha': '🇪🇸', 'Argentina': '🇦🇷', 'França': '🇫🇷', 'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    };
    return flags[name] || '🏳️';
  };

  return (
    <div
      className="bg-surface-800/60 backdrop-blur-sm rounded-xl border border-surface-600/50 p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5 active:scale-[0.98] group"
      onClick={() => navigateWCView('match', null, { ...match, round: label })}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full">
          {label}
        </span>
        <span className="text-[10px] text-text-muted">{match.date}</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <span className="text-3xl block mb-1">{getFlag(match.home)}</span>
          <span className="text-xs font-display font-semibold text-text-primary group-hover:text-gold-400 transition-colors">{match.home}</span>
        </div>
        <div className="px-4">
          <span className="text-xs font-mono font-bold text-text-muted">VS</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-3xl block mb-1">{getFlag(match.away)}</span>
          <span className="text-xs font-display font-semibold text-text-primary group-hover:text-gold-400 transition-colors">{match.away}</span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <span className="text-[10px] text-text-muted">{match.venue}</span>
      </div>
    </div>
  );
}

// Finalist journey mini-card
function FinalistJourney({ team, flag, path }) {
  return (
    <div className="bg-surface-800/40 rounded-xl border border-surface-600/30 p-4">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{flag}</span>
        <div>
          <h4 className="font-display font-bold text-text-primary text-sm">{team}</h4>
          <span className="text-[10px] text-accent-300 uppercase tracking-wider">Finalista</span>
        </div>
      </div>
      <div className="space-y-1.5">
        {path.map((round, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${i === path.length - 1 ? 'bg-gold-500' : 'bg-accent-500'}`} />
              <span className="text-text-muted">{round.opponent}</span>
            </div>
            <span className="ml-auto font-mono font-bold text-text-primary">{round.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hero section
function HeroBanner() {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-6">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-800 via-surface-800 to-surface-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 via-transparent to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl -translate-y-40 translate-x-40" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl translate-y-32 -translate-x-32" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Content */}
      <div className="relative px-6 py-8 md:px-10 md:py-10">
        {/* Status bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2 bg-surface-900/60 backdrop-blur-sm rounded-full px-3 py-1 border border-accent-500/20">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-[10px] font-mono text-accent-300 uppercase tracking-widest">Fase Final</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-900/60 backdrop-blur-sm rounded-full px-3 py-1 border border-gold-500/20">
            <span className="text-[10px]">🏆</span>
            <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Copa do Mundo 2026</span>
          </div>
        </div>

        {/* Main title */}
        <h1 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-2 tracking-tight">
          A Grande Final
        </h1>
        <p className="text-text-secondary text-sm md:text-base mb-6 max-w-lg">
          Duas potências mundiais se enfrentam. Acompanhe a cobertura completa com dados, estatísticas e análise de bolões.
        </p>

        {/* Final matchup */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
          <div className="text-center">
            <span className="text-5xl md:text-6xl block mb-2">🇪🇸</span>
            <span className="text-lg md:text-xl font-display font-bold text-text-primary">Espanha</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-display font-black text-gold-400 tracking-wider">VS</span>
            <span className="text-[10px] text-text-muted mt-1 font-mono">19 JUL • 20:00</span>
          </div>

          <div className="text-center">
            <span className="text-5xl md:text-6xl block mb-2">🇦🇷</span>
            <span className="text-lg md:text-xl font-display font-bold text-text-primary">Argentina</span>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex justify-center">
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
}

export default function WorldCupPage() {
  const { worldCupView, selectedWCTeam, selectedWCMatch, navigateWCView, wcBracket } = useApp();
  const [drawerMatch, setDrawerMatch] = useState(null);

  const renderContent = () => {
    switch (worldCupView) {
      case 'bracket':
        return <WorldCupBracket />;
      case 'matches':
        return <MatchGrid onMatchClick={setDrawerMatch} />;
      case 'teams':
        return <WorldCupTeams />;
      case 'team':
        return selectedWCTeam && <WorldCupTeamDetail team={selectedWCTeam} />;
      case 'players':
        return <WorldCupPlayers />;
      case 'comparative':
        return <WorldCupComparative />;
      case 'news':
        return <WorldCupNews />;
      case 'match':
        return selectedWCMatch && <WorldCupMatchDetail match={selectedWCMatch} />;
      default:
        return <WorldCupBracket />;
    }
  };

  // Show dashboard layout only on main views
  const isDashboard = ['bracket', 'matches', 'teams', 'players', 'comparative', 'news'].includes(worldCupView);

  return (
    <div>
      {isDashboard && (
        <>
          {/* Hero */}
          <HeroBanner />

          {/* KPI Cards */}
          <KPICards />

          {/* Upcoming matches + Finalist journeys */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Upcoming matches */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                Próximos Jogos
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {wcBracket?.final && (
                  <UpcomingMatchCard
                    match={wcBracket.final}
                    label="Final"
                  />
                )}
                {wcBracket?.thirdPlace && (
                  <UpcomingMatchCard
                    match={wcBracket.thirdPlace}
                    label="3º Lugar"
                  />
                )}
              </div>
            </div>

            {/* Finalist journeys */}
            <div className="space-y-3">
              <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                Caminho à Final
              </h3>
              <FinalistJourney
                team="Espanha"
                flag="🇪🇸"
                path={[
                  { opponent: 'Geórgia', score: '4-0' },
                  { opponent: 'Japão', score: '2-1' },
                  { opponent: 'Inglaterra', score: '1-0' },
                  { opponent: 'França', score: '2-0' },
                ]}
              />
              <FinalistJourney
                team="Argentina"
                flag="🇦🇷"
                path={[
                  { opponent: 'Arábia Saudita', score: '2-0' },
                  { opponent: 'Polônia', score: '2-1' },
                  { opponent: 'Países Baixos', score: '3-1' },
                  { opponent: 'França', score: '2-1' },
                ]}
              />
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => navigateWCView(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  worldCupView === tab.id
                    ? 'bg-accent-500/15 text-accent-300 border border-accent-500/30 shadow-lg shadow-accent-500/5'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-800 border border-transparent'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Content */}
      <div className="animate-fadeIn">
        {renderContent()}
      </div>

      {/* Drawer */}
      {drawerMatch && (
        <MatchDrawer match={drawerMatch} onClose={() => setDrawerMatch(null)} />
      )}
    </div>
  );
}
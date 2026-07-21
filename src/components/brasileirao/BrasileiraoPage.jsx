import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import StandingsTable from './StandingsTable';
import TeamsView from './TeamsView';
import TeamDetail from './TeamDetail';
import PlayersView from './PlayersView';
import PrecisionView from './PrecisionView';
import ComparativeView from './ComparativeView';
import NewsView from './NewsView';
import MatchGrid from './MatchGrid';
import MatchDrawer from './MatchDrawer';
import MatchDetail from './MatchDetail';

const tabs = [
  { id: 'standings', label: 'Classificação', icon: '🏆' },
  { id: 'matches', label: 'Jogos', icon: '🏟️' },
  { id: 'precision', label: 'Precisão', icon: '🎯' },
  { id: 'players', label: 'Jogadores', icon: '👟' },
  { id: 'teams', label: 'Times', icon: '🛡️' },
  { id: 'comparative', label: 'Análises', icon: '📈' },
  { id: 'news', label: 'Notícias', icon: '📰' },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const nextRoundDate = new Date('2026-07-26T16:00:00-03:00');

    const tick = () => {
      const now = new Date();
      const diff = nextRoundDate - now;
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
    <div className="flex gap-2.5">
      {units.map((u) => (
        <div key={u.label} className="bg-surface-800/80 border border-surface-600/40 rounded-xl px-3 py-2 min-w-[60px] text-center">
          <div className="text-xl font-bold font-display text-text-primary tabular-nums leading-none">{String(u.value).padStart(2, '0')}</div>
          <div className="text-[9px] font-semibold text-text-muted uppercase tracking-widest mt-1">{u.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function BrasileiraoPage() {
  const { brView, navigateView, selectedTeam, selectedMatch, brCurrentRound } = useApp();
  const [drawerMatch, setDrawerMatch] = useState(null);

  const isDetailView = brView === 'team' || brView === 'match';

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      {!isDetailView && (
        <div className="mb-8 space-y-6">
          {/* Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface-800 via-surface-900 to-surface-800 border border-surface-600/40 p-6 sm:p-8">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-info-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-accent-300 bg-accent-500/10 px-2 py-0.5 rounded-md border border-accent-500/20">AO VIVO</span>
                    <span className="text-xs text-text-muted">Rodada {brCurrentRound} de 38</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-primary tracking-tight">
                    Brasileirão <span className="gradient-text">Série A</span> 2026
                  </h1>
                  <p className="text-sm text-text-secondary mt-1">Campeonato Brasileiro de Futebol</p>
                </div>
                <div className="hidden sm:block text-4xl">🇧🇷</div>
              </div>

              <div className="mt-6">
                <p className="text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2">Acompanhe a próxima rodada</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 p-1.5 bg-surface-900/50 backdrop-blur-xl rounded-2xl border border-surface-600/40 overflow-x-auto scrollbar-hide mx-auto w-full sm:w-max max-w-full shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateView(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex-1 sm:flex-none justify-center ${
                  brView === tab.id
                    ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-surface-900 shadow-md transform scale-[1.02]'
                    : 'text-text-secondary hover:bg-surface-800 hover:text-text-primary'
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black ${
                  brView === tab.id ? 'bg-surface-900/30 text-surface-900' : 'bg-surface-700/50 text-text-muted'
                }`}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Back button for detail views */}
      {isDetailView && (
        <button
          onClick={() => navigateView('standings')}
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      )}

      {/* Content */}
      {isDetailView ? (
        brView === 'team' ? (
          <TeamDetail team={selectedTeam} />
        ) : (
          <MatchDetail match={selectedMatch} />
        )
      ) : brView === 'standings' ? (
        <StandingsTable />
      ) : brView === 'matches' ? (
        <MatchGrid onMatchClick={setDrawerMatch} />
      ) : brView === 'teams' ? (
        <TeamsView />
      ) : brView === 'players' ? (
        <PlayersView />
      ) : brView === 'precision' ? (
        <PrecisionView />
      ) : brView === 'comparative' ? (
        <ComparativeView />
      ) : brView === 'news' ? (
        <NewsView />
      ) : null}

      {/* Drawer */}
      {drawerMatch && <MatchDrawer match={drawerMatch} onClose={() => setDrawerMatch(null)} />}
    </div>
  );
}
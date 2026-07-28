import { useState, useEffect, useMemo } from 'react';
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
import { IconTrophy, IconPitch, IconTarget, IconJersey, IconShield, IconChart, IconNewspaper, IconBall } from '../icons';

const tabs = [
  { id: 'standings', label: 'Classificação', icon: IconTrophy, hue: 'text-gold-700' },
  { id: 'matches', label: 'Jogos', icon: IconPitch, hue: 'text-green-700' },
  { id: 'precision', label: 'Precisão', icon: IconTarget, hue: 'text-red-700' },
  { id: 'players', label: 'Jogadores', icon: IconJersey, hue: 'text-blue-700' },
  { id: 'teams', label: 'Times', icon: IconShield, hue: 'text-violet-700' },
  { id: 'comparative', label: 'Análises', icon: IconChart, hue: 'text-teal-700' },
  { id: 'news', label: 'Notícias', icon: IconNewspaper, hue: 'text-ink-600' },
];

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const nextRoundDate = new Date(targetDate);
    if (isNaN(nextRoundDate)) return;

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
  }, [targetDate]);

  const units = [
    { label: 'Dias', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Seg', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-4">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-xl bg-slate-950/80 border border-emerald-500/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_4px_20px_rgba(16,185,129,0.1)] flex items-center justify-center backdrop-blur-md">
            <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
              {String(u.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] font-extrabold text-emerald-400/80 uppercase tracking-widest mt-1.5">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function CarouselMatchCard({ match, getTeam, onClick }) {
  const homeTeam = getTeam(match.home);
  const awayTeam = getTeam(match.away);

  return (
    <button
      onClick={onClick}
      className="shrink-0 w-64 mx-2.5 bg-slate-900/85 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-3.5 flex items-center gap-3 shadow-lg shadow-black/40 backdrop-blur-md hover:scale-[1.02] transition-all group"
    >
      <div className="flex-1 min-w-0 flex flex-col items-center gap-1.5">
        <div className="w-11 h-11 p-1 flex items-center justify-center bg-slate-950/60 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors">
          {homeTeam?.logo_url ? <img src={homeTeam.logo_url} alt={match.home} className="w-full h-full object-contain filter drop-shadow" /> : <IconBall className="w-6 h-6 text-slate-600" />}
        </div>
        <div className="text-xs font-bold text-slate-200 truncate max-w-full group-hover:text-emerald-400 transition-colors">{match.home}</div>
      </div>

      <div className="flex flex-col items-center gap-1 shrink-0">
        <span className="w-7 h-7 rounded-full bg-slate-800/90 border border-slate-700 text-[9px] font-extrabold text-slate-300 flex items-center justify-center shadow-inner">VS</span>
        <span className="text-[9px] font-mono text-emerald-400 font-semibold bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/50 whitespace-nowrap">{match.date}</span>
      </div>

      <div className="flex-1 min-w-0 flex flex-col items-center gap-1.5">
        <div className="w-11 h-11 p-1 flex items-center justify-center bg-slate-950/60 rounded-lg border border-slate-800 group-hover:border-slate-700 transition-colors">
          {awayTeam?.logo_url ? <img src={awayTeam.logo_url} alt={match.away} className="w-full h-full object-contain filter drop-shadow" /> : <IconBall className="w-6 h-6 text-slate-600" />}
        </div>
        <div className="text-xs font-bold text-slate-200 truncate max-w-full group-hover:text-emerald-400 transition-colors">{match.away}</div>
      </div>
    </button>
  );
}

export default function BrasileiraoPage() {
  const { brView, navigateView, selectedTeam, selectedMatch, brCurrentRound, brNextRound, brRounds, getTeam } = useApp();
  const [drawerMatch, setDrawerMatch] = useState(null);

  const isDetailView = brView === 'team' || brView === 'match';

  const roundMatches = useMemo(() => {
    return brRounds[brCurrentRound] || brRounds[brNextRound] || [];
  }, [brRounds, brCurrentRound, brNextRound]);

  // Earliest kickoff among this round's matches — drives the countdown,
  // instead of a date that goes stale the moment the round changes.
  const nextKickoff = useMemo(() => {
    const withDates = roundMatches.filter((m) => m.dateISO);
    if (withDates.length === 0) return null;
    return withDates.reduce((earliest, m) => (new Date(m.dateISO) < new Date(earliest.dateISO) ? m : earliest)).dateISO;
  }, [roundMatches]);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      {!isDetailView && (
        <div className="mb-8 space-y-5">
          {/* Match banner hero */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-9 bg-slate-950">
            {/* Background Image Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
              style={{ backgroundImage: `url('/stadium_hero_banner.png')` }}
            />
            {/* Ambient glows */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {roundMatches.length > 0 ? (
                <>
                  <div className="flex flex-col items-center gap-2.5">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 backdrop-blur-md shadow-sm uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Rodada {brCurrentRound} · Ao Vivo
                    </div>
                    <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] flex items-center gap-2">
                      BRASILEIRÃO <span className="text-emerald-400 font-extrabold">2026</span>
                    </h1>
                    <CountdownTimer targetDate={nextKickoff} />
                  </div>

                  <div className="overflow-hidden mask-edges pt-2">
                    <div className="flex w-max animate-marquee-slow pause-on-hover py-1">
                      {[...roundMatches, ...roundMatches].map((match, i) => (
                        <CarouselMatchCard key={`${match.home}-${match.away}-${i}`} match={match} getTeam={getTeam} onClick={() => setDrawerMatch(match)} />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-400 text-center">Aguardando confirmação da tabela de jogos.</p>
              )}
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 p-1.5 card overflow-x-auto scrollbar-hide mx-auto w-full sm:w-max max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => navigateView(tab.id)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-bold transition-all whitespace-nowrap flex-1 sm:flex-none justify-center ${
                  brView === tab.id
                    ? 'bg-green-500 text-white'
                    : 'text-ink-600 hover:bg-gray-50 hover:text-ink-900'
                }`}
              >
                <tab.icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${brView === tab.id ? 'text-white' : tab.hue}`} />
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
          className="flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      )}

      {/* Content — keyed on the view so switching tabs always replays the transition */}
      <div key={isDetailView ? `${brView}-${selectedTeam?.name || selectedTeam || ''}-${selectedMatch?.date || ''}` : brView} className="animate-fadeIn">
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
      </div>

      {/* Drawer */}
      {drawerMatch && <MatchDrawer match={drawerMatch} onClose={() => setDrawerMatch(null)} />}
    </div>
  );
}

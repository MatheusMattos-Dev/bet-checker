import { useApp } from '../context/AppContext';

export default function FixtureCard({ fixture }) {
  const { navigateToFixture, navigateToTeam } = useApp();
  const { fixture: f } = fixture;
  const { teams, goals, score } = fixture;
  const status = f.status;
  const isLive = status.short === 'LIVE';
  const isFinished = status.short === 'FT';
  const isScheduled = !isLive && !isFinished;

  const homeGoals = goals?.home ?? score?.fulltime?.home ?? '-';
  const awayGoals = goals?.away ?? score?.fulltime?.away ?? '-';

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className="bg-white dark:bg-dark-800 rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700/50 hover:border-gold-500/50 group"
      onClick={() => navigateToFixture(fixture)}
    >
      <div className="flex items-center justify-between">
        {/* Home Team */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={teams.home.logo}
            alt={teams.home.name}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23333"/></svg>'; }}
          />
          <span className="text-sm sm:text-base font-semibold truncate text-gray-800 dark:text-gray-200 group-hover:text-gold-500 transition-colors">
            {teams.home.name}
          </span>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center px-3 sm:px-6">
          <div className="flex items-center gap-2 sm:gap-4 mb-1">
            <span className={`text-xl sm:text-2xl font-bold font-mono ${isLive ? 'text-red-500 animate-pulse' : 'text-gray-800 dark:text-white'}`}>
              {homeGoals}
            </span>
            <span className="text-gray-400 text-sm">-</span>
            <span className={`text-xl sm:text-2xl font-bold font-mono ${isLive ? 'text-red-500 animate-pulse' : 'text-gray-800 dark:text-white'}`}>
              {awayGoals}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {isLive && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              isLive ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
              isFinished ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400' :
              'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            }`}>
              {isLive ? `${status.elapsed}'` : isFinished ? 'Encerrado' : formatTime(f.date)}
            </span>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <span className="text-sm sm:text-base font-semibold truncate text-gray-800 dark:text-gray-200 group-hover:text-gold-500 transition-colors text-right">
            {teams.away.name}
          </span>
          <img
            src={teams.away.logo}
            alt={teams.away.name}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23333"/></svg>'; }}
          />
        </div>
      </div>

      {/* Date */}
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700/50 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{f.league?.name || 'Campeonato'}</span>
        <span>{formatDate(f.date)}</span>
      </div>
    </div>
  );
}

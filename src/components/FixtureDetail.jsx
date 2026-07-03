import { useApp } from '../context/AppContext';

export default function FixtureDetail({ fixture }) {
  const { goHome, selectedFixture } = useApp();
  const details = fixture || selectedFixture;

  if (!details) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-red-500">Jogo não encontrado</p>
        <button onClick={goHome} className="mt-4 text-gold-500 hover:underline">← Voltar</button>
      </div>
    );
  }

  const { teams, goals, score, league } = details;
  const f = details.fixture;
  const events = details.events || [];
  const stats = details.statistics || [];
  const homeStats = stats.filter(s => s.team.id === teams?.home?.id);
  const awayStats = stats.filter(s => s.team.id === teams?.away?.id);

  const homeGoals = goals?.home ?? score?.fulltime?.home ?? '-';
  const awayGoals = goals?.away ?? score?.fulltime?.away ?? '-';

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button onClick={goHome} className="mb-4 flex items-center gap-1 text-gold-500 hover:text-gold-400 transition-colors font-medium">
        ← Voltar
      </button>

      {/* Score Header */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <span>{league?.name || f.league?.name || 'Brasileiro Serie A'}</span>
          <span>•</span>
          <span>{formatDate(f.date)}</span>
          <span>•</span>
          <span>{formatTime(f.date)}</span>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <div className="text-center flex-1">
            <img src={teams.home.logo} alt={teams.home.name} className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-2" />
            <p className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">{teams.home.name}</p>
          </div>

          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-gold-500">
              {homeGoals} - {awayGoals}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {f.status.short === 'NS' ? 'Agendado' : f.status.short === 'FT' ? 'Encerrado' : `${f.status.elapsed}'`}
            </p>
          </div>

          <div className="text-center flex-1">
            <img src={teams.away.logo} alt={teams.away.name} className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-2" />
            <p className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">{teams.away.name}</p>
          </div>
        </div>
      </div>

      {/* Events */}
      {events.length > 0 && (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 mb-6">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Eventos</h3>
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                <span className="font-bold text-gold-500 w-10 text-center">{event.time?.elapsed}'</span>
                <span className="text-gray-500 dark:text-gray-400 w-6 text-center">
                  {event.type === 'Goal' ? '⚽' : event.type === 'Card' ? (event.detail === 'Yellow Card' ? '🟨' : '🟥') : '•'}
                </span>
                <span className="flex-1 text-gray-800 dark:text-gray-200">{event.team?.name} - {event.player?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statistics */}
      {stats.length > 0 && (
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Estatísticas</h3>
          <div className="space-y-3">
            {stats.map((stat) => {
              const homeVal = homeStats.find(s => s.type === stat.type)?.value || '-';
              const awayVal = awayStats.find(s => s.type === stat.type)?.value || '-';
              return (
                <div key={stat.type} className="flex items-center gap-3">
                  <div className="flex-1 text-right font-medium text-gray-800 dark:text-gray-200">{homeVal}</div>
                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 min-w-[120px]">{stat.type}</div>
                  <div className="flex-1 text-left font-medium text-gray-800 dark:text-gray-200">{awayVal}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

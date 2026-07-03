import { useApp } from '../context/AppContext';

export default function QuickAnalysis() {
  const { standings, topScorers } = useApp();
  const currentStandings = standings['br'] || [];

  const analyzePerformance = (standings) => {
    if (!standings.length) return null;
    const top3 = standings.slice(0, 3);
    const bottom3 = standings.slice(-3);

    const avgPointsTop3 = top3.reduce((sum, t) => sum + t.points, 0) / 3;
    const avgPointsBottom3 = bottom3.reduce((sum, t) => sum + t.points, 0) / 3;

    return {
      avgPointsTop3: avgPointsTop3.toFixed(1),
      avgPointsBottom3: avgPointsBottom3.toFixed(1),
      gap: (avgPointsTop3 - avgPointsBottom3).toFixed(1),
      top3WinRate: ((top3.reduce((sum, t) => sum + t.all.win, 0) / (top3.reduce((sum, t) => sum + t.all.played, 0) || 1)) * 100).toFixed(1),
      bottom3LossRate: ((bottom3.reduce((sum, t) => sum + t.all.lose, 0) / (bottom3.reduce((sum, t) => sum + t.all.played, 0) || 1)) * 100).toFixed(1),
    };
  };

  const perf = analyzePerformance(currentStandings);

  return (
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="text-gold-500">📊</span>
        Análise Rápida
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Performance */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Desempenho</h3>
          {perf ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Média pontos (Top 3)</span>
                <span className="font-bold text-green-600 dark:text-green-400">{perf.avgPointsTop3}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Média pontos (Zona rebaixamento)</span>
                <span className="font-bold text-red-600 dark:text-red-400">{perf.avgPointsBottom3}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Gap de pontos</span>
                <span className="font-bold text-gold-500">{perf.gap}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Taxa vitória (Top 3)</span>
                <span className="font-bold text-green-600 dark:text-green-400">{perf.top3WinRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Taxa derrota (Zona rebaixamento)</span>
                <span className="font-bold text-red-600 dark:text-red-400">{perf.bottom3LossRate}%</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">Dados insuficientes</p>
          )}
        </div>

        {/* Top Scorers */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-gray-200">Artilheiros</h3>
          {topScorers.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">Nenhum dado disponível</p>
          ) : (
            <div className="space-y-2">
              {topScorers.slice(0, 5).map((player, i) => (
                <div key={player.player.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                  <span className="text-gold-500 font-bold w-6 text-center">{i + 1}º</span>
                  <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 font-bold text-sm">
                    {player.player.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{player.player.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{player.team.name}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gold-500">{player.goals.total}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">gols</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

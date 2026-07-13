import { useApp } from '../../context/AppContext';

export default function WorldCupComparative({ analyses }) {
  const { navigateWCView, wcTeams } = useApp();

  const categoryIcons = {
    attack: '⚔️',
    defense: '🛡️',
    wins: '🏆',
    form: '📈',
  };

  const categoryLabels = {
    attack: 'Melhor Ataque',
    defense: 'Melhor Defesa',
    wins: 'Mais Vitórias',
    form: 'Melhor Forma',
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analyses.map((analysis) => (
          <div key={analysis.category} className="bg-white dark:bg-dark-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <h3 className="font-semibold text-[#d4a017] mb-3 flex items-center gap-2">
              <span>{categoryIcons[analysis.category] || '📊'}</span>
              {categoryLabels[analysis.category] || analysis.label}
            </h3>
            <div className="space-y-2">
              {analysis.data.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700/50 rounded-lg px-2 py-1.5 transition-colors"
                  onClick={() => {
                    const team = wcTeams.find(t => t.name === item.name);
                    if (team) navigateWCView('team', team);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 w-4">#{i + 1}</span>
                    <span className="text-base">{item.flag}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{item.name}</span>
                  </div>
                  <span className="font-bold text-[#d4a017]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
